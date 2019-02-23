let express = require("express");
let app = express();
 
app.use(express.static("html"));//关键是这一句，我的目录是html的目录
 
app.listen(8080, () => {
    console.log("服务启动成功。");
})