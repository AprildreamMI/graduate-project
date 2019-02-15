// 设置字符编码 解决乱码
var charset = require("superagent-charset")
// 请求模块
var superagent = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs')
const MAX_PAGE = 20
let START_PAGE = 1

let booksArray = ''
fs.readFile('data/book.json', 'utf-8', (err, result) => {
  booksArray = JSON.parse(result)
})

// 设置字符编码 => gb2312
charset(superagent)

// 父类
class Spider {

    /**
     * init
     * @param baseUrl  地址
     * @param page    页码
     */
    constructor (baseUrl, page){
        this.base = baseUrl
        this.page = page
    }

    /**
     * 拼接页面地址
     * @param page
     * @returns {*}
     */
    get_next_page_url (page = null) {
        let url = ''
        if (page === null){
            url = this.base + this.page
        } else {
            url = this.base + parseInt(page)
        }
        // 带有页码的页面地址 下一页链接
        return url
    }

    /**
     * 下载网页源码
     * @param url 地址
     * @returns {*}
     */
    download_html (self, url) {
        return new Promise(function (success, error) {
            superagent.get(url)
                .charset('gb2312')
                .buffer(true)
                .end (function (err, response) {
                    let html = response.text
                    success( {self, html} )
                    error(err)
                })
        });
    }

}

class BookSpider extends Spider {

    /**
     * init
     */
    constructor () {
        super (
            'http://bang.dangdang.com/books/bestsellers/01.00.00.00.00.00-recent7-0-0-1-',
            START_PAGE
        );
    }

    run (page = 1){
        let url = super.get_next_page_url(page)
        let result = super.download_html(this, url)
        result.then(function ( {self, html} ) {
            self.resolve_books(html)
        }).catch(function (err) {
            console.error(err)
        });
    }

    /**
     * 解析书籍列表
     * @param html
     */
    resolve_books (html){
        let Jquery = cheerio.load(html)
        let parent = this
        Jquery('.bang_list>li').each(function (index, element) {

            let $element = cheerio.load(element)
            // 书籍名称
            let book_name = $element('.name>a').attr('title')
            // 分类
            let book_type = ''
            // 书籍出版社
            let book_press = $element('.publisher_info').eq(1).find('a').text()
            // 书籍出版时间
            let book_publish_date = $element('.publisher_info>span').text()
            // 书籍开本
            let book_size = ''
            // 书籍作者
            let book_author = $element('.publisher_info').eq(0).find('a').eq(0).text()
            // 书籍译者
            let book_tanslor = parent.subStrIngTanslor($element('.publisher_info>a').attr('title'))
            // 书籍ISBN
            let book_isbn = ''
            // 书籍定价
            let book_price = $element('.price>p:first-child>.price_r').text().replace('¥', '')
            // 书籍简介 小段
            let book_description = ''
            // 书籍市场价
            let book_discount_price = $element('.price>p:first-child>.price_n').text().replace('¥', '')
            // 书籍评论量 成交量 
            let book_views = $element('.star>a').text().replace('条评论', '')
            // 书籍折扣
            let book_discount = $element('.price>p:first-child>.price_s').text().replace('折', '')
            // 书籍封面 网络地址
            let book_pic = $element('.pic>a>img').attr('src')
            // 书籍库存量
            let book_storemount = 100
            // 书籍封装方式
            let book_packstyle = ''
            // 数据简介的图片
            let book_infopic = ''
            
            // 书籍详情页链接
            let details_url = $element('.pic>a').attr('href')
            parent.download_html(this, details_url).then(function ({self, html}) {
                console.log('爬取《' + book_name + '》 ...')
                let $html = cheerio.load(html)
                book_type = $html('#detail-category-path > span:nth-child(2) > a:nth-child(2)').text()
                book_size = $html('#detail_describe>ul>li:first-child').text().replace(/[\u4e00-\u9fa5]/g, '').replace('：', '');   
                book_isbn = $html('#detail_describe>ul>li:nth-child(5)').text().replace('国际标准书号ISBN：', '')
                book_packstyle = $html('#detail_describe>ul>li:nth-child(3)').text().replace('包 装：', '')
                book_description = $html('#product_info > .name_info > h2 > .head_title_name').attr('title')
                book_infopic = $html('#detail_all #detail > #feature > .descrip > img').attr('src')
                console.log('===> Success')
                let book_info = {
                  "book_name": book_name,
                  "book_type": book_type,
                  "book_pic": book_pic,
                  "book_views": book_views,
                  "book_author": book_author,
                  'book_tanslor': book_tanslor,
                  "book_press": book_press,
                  "book_publish_date": book_publish_date,
                  "book_price": book_price,
                  "book_discount_price": book_discount_price,
                  "book_discount": book_discount,
                  "book_size": book_size,
                  "book_isbn": book_isbn,
                  "book_description": book_description,
                  "book_storemount": book_storemount,
                  "book_packstyle": book_packstyle,
                  "book_infopic": book_infopic
                }
                parent.save_json(book_info)
            }).catch(function (err) {
                console.log('===> Error')
                console.log(err)
            })
        })
    }

    /**
     * 保存数据
     * @param data
     */
    save_json (data){

        // console.log(data.book_name)
        // let sql_insert = " INSERT INOT  ";
        console.log(data)
        booksArray.push(data)

        fs.writeFile('data/book.json', JSON.stringify(booksArray), 'utf-8', function (err) {
            // console.log(err)
        })

        // 下一页
        if (START_PAGE < MAX_PAGE){
            START_PAGE++
            this.run(START_PAGE)
        }
    }

    // 截取书籍的作者
    subStrIngTanslor (text) {
      // '(法) 古斯塔夫·勒庞 著，马晓佳 译'
      // 获取'著' 的位置 前面还有, 需要 加 2
      let zhuIndex = text.lastIndexOf('著') + 2 
      let yiIndex = text.lastIndexOf('译')

      if (yiIndex === -1) {
        return ''
      } else {
        yiIndex -- 
      }

      return text.substring(zhuIndex, yiIndex)
    }

}

// run
new BookSpider().run()
