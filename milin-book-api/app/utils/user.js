module.exports = {
  /**
   *判断用户是否登录
   *
   * @param {*} req
   * @param {*} res
   */
  isUserLogin (req, res) {
    if (!req.cookies.user_me) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<head><meta charset="utf-8"/></head>');
      res.end('<h1>错误！！！！请登录</h1>');
      return res.send()
    }
  }
}