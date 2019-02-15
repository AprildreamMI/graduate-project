const fs = require('fs')

let booksArray = ''
function demo() {
  return new Promise((resovle, reject) => {
    fs.readFile('data/book.json', 'utf-8', (err, result) => {
      booksArray = JSON.parse(result)
      resovle(booksArray)
      reject(err)
    })
  })
}

demo().then(books => {
  fs.readFile('test/data/tb_booktypeinfo.json', 'utf-8', (err, result) => {
      let rescores = JSON.parse(result).RECORDS
      books.forEach((item, index) => {
        let typeName = item.book_type
        // 找到id
        let typeId = rescores.find(item => {
          return item.BookTypeName === typeName
        }).BookTypeId

        // console.log(index, rescores.find(item => {
        //      return item.BookTypeName === typeName
        //   }))

         let sql = `INSERT INTO tb_bookinfo
        (
          BookTypeId,
          BookName,
          BookPress,
          BookPubDate,
          BookSize,
          BookAuthor,
          BookTanslor,
          Bookisbn,
          BookPrice,
          BookOutline,
          BookMprice,
          BookDealmount,
          BookDiscount,
          BookPic,
          BookStoremount,
          BookPackstyle
        )
        VALUES
        (
          ${typeId},
          '${item.book_name}',
          '${item.book_press}',
          '${item.book_publish_date}',
           ${item.book_size},
          '${item.book_author}',
          '${item.book_tanslor}',
          '${item.book_isbn}',
          ${item.book_price},
          '${item.book_description}',
          ${item.book_discount_price},
          ${item.book_views},
          ${item.book_discount},
          '${item.book_pic}',
          ${item.book_storemount},
          '${item.book_packstyle}'
        );`
        fs.appendFile('test/data/books_sql.json', sql + '\n' , (err, result) => {
          if (err) {
            console.log(err)
          }
        })
      })
  })


  /* fs.appendFile('test/data/bookType_sql.json', sql + '\n' , (err, result) => {
    if (err) {
      console.log(err)
    }
  }) */

/* 
  fs.writeFile('test/data/bookType.json',JSON.stringify(typeArray) , (err, result) => {
    if (err) {
      console.log(err)
    }
  }) */

}).catch(err => {
  console.error(err)
})

