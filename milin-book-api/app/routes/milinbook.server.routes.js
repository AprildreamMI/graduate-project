var MilinBookController = require('../controllers/milinbook.server.controller');


module.exports = function(app){
  // 监听url 调用数据操作模块中的方法
  app.route('/api/test')
    .get(MilinBookController.getAll)
};