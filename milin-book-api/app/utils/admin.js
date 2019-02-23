module.exports = {
  /**
   * 判断是不是最高的管理员
   * @param {*} req 
   * @param {*} res 
   */
  isRoot (req, res) {
    if (!req.cookies.admin_me) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<head><meta charset="utf-8"/></head>');
      res.end('<h1>错误！！！！没有权限</h1>');
      return res.send()
    }
    let admin_me = JSON.parse(req.cookies.admin_me)
  
    if (Number(admin_me.AdminFlag) < 3) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<head><meta charset="utf-8"/></head>');
      res.end('<h1>错误！！！！没有权限</h1>');
      return res.send()
    }
  },

  /**
   * 判断是不是第二等级的管理员
   * @param {*} req 
   * @param {*} res 
   */
  isBooksAdmin (req, res) {
    console.log('书籍书籍')
    if (!req.cookies.admin_me) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<head><meta charset="utf-8"/></head>');
      res.end('<h1>错误！！！！没有权限</h1>');
      return res.send()
    }
    let admin_me = JSON.parse(req.cookies.admin_me)
    console.log(admin_me)
  
    if (Number(admin_me.AdminFlag) < 2) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<head><meta charset="utf-8"/></head>');
      res.end('<h1>错误！！！！没有权限</h1>');
      return res.send()
    }
  },

  /**
   * 判断是不是第一等级的管理员
   * @param {*} req 
   * @param {*} res 
   */
  isAdmin (req, res) {
    if (!req.cookies.admin_me) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<head><meta charset="utf-8"/></head>');
      res.end('<h1>错误！！！！没有权限</h1>');
      return res.send()
    }
  },

  /**
   * 获取当前管理员的id
   * @param {*} req 
   * @param {*} res 
   */
  getAdminId (req, res) {
    if (!req.cookies.admin_me) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<head><meta charset="utf-8"/></head>');
      res.end(`<h1>错误！！！！</h1><br/>
              <h2>请登录</h2>`);
      return res.send()
    }
    let admin_me = JSON.parse(req.cookies.admin_me)
    return admin_me.AdminId
  },

  /**
   * 格式化时间 存入数据库
   */
  getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
          month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
              + " " + date.getHours() + seperator2 + date.getMinutes()
              + seperator2 + date.getSeconds();
      return currentdate;
  }
}