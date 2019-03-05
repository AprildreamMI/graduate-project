webpackJsonp([12],{BoV2:function(t,e){},x0vE:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("gyMJ"),o=a("iPXC"),n=a("BUS2"),s=a.n(n),r={data:function(){var t=this;return{isShowUpdateAdminAccountPwdDialog:!1,isShowUpdateAdminAccountDialog:!1,pwFrom:{oldPwd:"",newPwd:"",confirmPwd:""},pwRules:{oldPwd:[{required:!0,message:"请输入旧密码",trigger:"blur"},{pattern:/[A-Za-z].*[0-9]|[0-9].*[A-Za-z][\W_]{8,}/,message:"密码格式错误  大于8位,必须同时包含数字和字母",trigger:"blur"}],newPwd:[{required:!0,message:"请输入新密码",trigger:"blur"},{validator:function(e,a,i){a===t.pwFrom.oldPwd?i(new Error("新密码不能和旧密码一致")):i()},trigger:"blur"},{pattern:/[A-Za-z].*[0-9]|[0-9].*[A-Za-z][\W_]{8,}/,message:"密码格式错误  大于8位,必须同时包含数字和字母",trigger:"blur"}],confirmPwd:[{required:!0,message:"请确认新密码",trigger:"blur"},{validator:function(e,a,i){a!==t.pwFrom.newPwd?i(new Error("两次输入密码不一致!")):i()},trigger:"blur"},{pattern:/[A-Za-z].*[0-9]|[0-9].*[A-Za-z][\W_]{8,}/,message:"密码格式错误  大于8位,必须同时包含数字和字母",trigger:"blur"}]},updateAdminAccountFrom:{AdminId:"",AdminName:"",AdminFlag:"",AdminAvatar:""},newAdminAccountFromRules:{AdminName:[{required:!0,message:"请输入新增的管理员昵称",trigger:"blur"}],AdminAccount:[{required:!0,message:"请输入新增的管理员账号",trigger:"blur"}]}}},methods:{openUpdateAdminAccountDialog:function(){this.updateAdminAccountFrom.AdminId=this.admin_me.AdminId,this.updateAdminAccountFrom.AdminName=this.admin_me.AdminName,this.updateAdminAccountFrom.AdminAvatar=this.admin_me.AdminAvatar,this.updateAdminAccountFrom.AdminFlag=this.admin_me.AdminFlag,this.isShowUpdateAdminAccountDialog=!0},closeUpdateAdminAccountDialog:function(t){this.updateAdminAccountFrom={AdminId:"",AdminName:"",AdminFlag:"",AdminAvatar:""},this.isShowUpdateAdminAccountDialog=!1,this.$refs[t].resetFields()},updateAdminAccount:function(t){var e=this;this.$refs[t].validate(function(a){if(!a)return console.log("error submit!!"),!1;var n=e.$loading({lock:!0,text:"正在更新管理员账号中",background:"rgba(0, 0, 0, 0.2)"});i.o(e.updateAdminAccountFrom).then(function(a){0===a.data.code?(e.$message.success(a.data.message),n.close(),console.log("我进行更新了",a.data.data.newAccountInfo),o.a.set("admin_me",a.data.data.newAccountInfo),console.log("新的cookie",JSON.parse(o.a.get("admin_me"))),e.$router.go(0),e.closeUpdateAdminAccountDialog(t)):(e.$message.error(a.data.message),n.close())}).catch(function(t){console.log(t),e.$message.error("更新管理员账号失败，请重试"),n.close()})})},clearInput:function(t){this.$refs[t].resetFields(),this.isShowUpdateAdminAccountPwdDialog=!1},changePw:function(t){var e=this;this.$refs[t].validate(function(a){if(!a)return console.log("error submit!!"),!1;var o=e.$loading({lock:!0,text:"正在更新管理员密码中",background:"rgba(0, 0, 0, 0.2)"});i.q({oldPwd:s()(e.pwFrom.oldPwd),newPwd:s()(e.pwFrom.newPwd),confirmPwd:s()(e.pwFrom.confirmPwd)}).then(function(a){0===a.data.code?(e.$message.success(a.data.message),o.close(),e.clearInput(t),e.logOut()):(e.$message.error(a.data.message),o.close())}).catch(function(t){console.log(t),e.$message.error("更新管理员账号失败，请重试"),o.close()})})},logOut:function(){o.a.remove("admin_me"),this.$router.push("/admin/login")},updateHandleAvatarSuccess:function(t,e){0===t.code?(this.$message.success("上传头像成功"),this.updateAdminAccountFrom.AdminAvatar=t.data.newAvatarPath):this.$message.error("上传头像失败")},uploadActive:function(t,e){console.log(t),console.log(e)},beforeAvatarUpload:function(t){var e="image/jpeg"===t.type||"image/png"===t.type,a=t.size/1024/1024<2;return e||this.$message.error("上传头像图片只能是 JPG 或者 PNG 格式!"),a||this.$message.error("上传头像图片大小不能超过 2MB!"),e&&a},uploadsError:function(t,e,a){this.$message.error("上传头像失败, 请重试")}},computed:{admin_me:function(){return JSON.parse(o.a.get("admin_me"))},active:function(){return this.$route.path}}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("layout",[a("left-sidebar",[a("div",{staticClass:"logo"},[a("img",{attrs:{src:"http://localhost:3000/"+t.admin_me.AdminAvatar,alt:""}}),t._v(" "),a("div",{staticClass:"logo-title-box"},[a("div",{staticClass:"logo-title-box-name"},[a("p",{staticClass:"text-24-R"},[t._v(t._s(t.admin_me.AdminName))]),t._v(" "),a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"Right Center 提示文字",placement:"right"}},[a("div",{attrs:{slot:"content"},slot:"content"},[t._v("\n              管理员等级所对应的权限"),a("br"),t._v("\n              等级一：图书管理"),a("br"),t._v("\n              等级二：图书管理，订单管理"),a("br"),t._v("\n              等级三：图书管理，订单管理，账号管理"),a("br")]),t._v(" "),a("i",{staticClass:"iconfont",class:"3"===t.admin_me.AdminFlag?"icon-level3":"2"===t.admin_me.AdminFlag?"icon-level2":"icon-level1"})])],1)]),t._v(" "),a("div",{staticClass:"handles"},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.openUpdateAdminAccountDialog}},[t._v("编 辑")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){t.isShowUpdateAdminAccountPwdDialog=!0}}},[t._v("改 密")]),t._v(" "),a("el-button",{attrs:{type:"danger",size:"small"},on:{click:t.logOut}},[t._v("注 销")])],1),t._v(" "),a("div",{staticClass:"border-box"})]),t._v(" "),a("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"default-active":t.active,router:!0}},[a("el-submenu",{attrs:{index:"/admin/stats"}},[a("template",{slot:"title"},[a("i",{staticClass:"iconfont icon-tongji2 alibaba-icont"}),t._v(" "),a("span",[t._v("统计")])]),t._v(" "),a("el-menu-item",{attrs:{index:"/admin/stats/typeBook"}},[a("i",{staticClass:"iconfont icon-bingtu"}),t._v(" "),a("span",{attrs:{slot:"title"},slot:"title"},[t._v("书籍统计")])])],2),t._v(" "),a("el-submenu",{attrs:{index:"/admin/account",disabled:Number(t.admin_me.AdminFlag)<3}},[a("template",{slot:"title"},[a("i",{staticClass:"iconfont icon-tuandui alibaba-icont"}),t._v(" "),a("span",[t._v("账号管理")])]),t._v(" "),a("el-menu-item",{attrs:{index:"/admin/account/adminAccount"}},[a("i",{staticClass:"iconfont icon-guanliyuan alibaba-icont"}),t._v(" "),a("span",{attrs:{slot:"title"},slot:"title"},[t._v("管理员账号")])]),t._v(" "),a("el-menu-item",{attrs:{index:"/admin/account/userAccount"}},[a("i",{staticClass:"iconfont icon-yonghu alibaba-icont"}),t._v(" "),a("span",{attrs:{slot:"title"},slot:"title"},[t._v("用户账号")])])],2),t._v(" "),a("el-menu-item",{attrs:{index:"/admin/order",disabled:Number(t.admin_me.AdminFlag)<2}},[a("i",{staticClass:"iconfont icon-dingdan alibaba-icont"}),t._v(" "),a("span",{attrs:{slot:"title"},slot:"title"},[t._v("订单管理")])]),t._v(" "),a("el-menu-item",{attrs:{index:"/admin/books"}},[a("i",{staticClass:"iconfont icon-shu alibaba-icont"}),t._v(" "),a("span",{attrs:{slot:"title"},slot:"title"},[t._v("书籍管理")])])],1)],1),t._v(" "),a("el-dialog",{attrs:{"custom-class":"my-el-dialog",visible:t.isShowUpdateAdminAccountDialog,width:"420px",top:"120px"},on:{"update:visible":function(e){t.isShowUpdateAdminAccountDialog=e}}},[a("div",{staticClass:"handle-title text-16-M"},[t._v("\n      更新管理员账号\n    ")]),t._v(" "),a("div",{staticClass:"add-account-content add-account-from"},[a("el-form",{ref:"updateAccountFrom",attrs:{model:t.updateAdminAccountFrom,rules:t.newAdminAccountFromRules,"label-position":"left","label-width":"100px","hide-required-asterisk":""}},[a("div",{staticClass:"from-item"},[a("el-form-item",{attrs:{label:"管理员昵称",prop:"AdminName"}},[a("div",{staticClass:"item-input"},[a("el-input",{attrs:{placeholder:"请输入昵称或者姓名"},model:{value:t.updateAdminAccountFrom.AdminName,callback:function(e){t.$set(t.updateAdminAccountFrom,"AdminName",e)},expression:"updateAdminAccountFrom.AdminName"}})],1)])],1),t._v(" "),a("div",{staticClass:"from-item"},[a("el-form-item",{attrs:{label:"上传头像"}},[a("div",{staticClass:"item-input img-bg"},[a("el-upload",{ref:"uploadsAvatar",staticClass:"avatar-uploader",attrs:{action:"http://localhost:3000/api/admin/upload","show-file-list":!1,"on-success":t.updateHandleAvatarSuccess,"on-error":t.uploadsError,"on-change":t.uploadActive,"before-upload":t.beforeAvatarUpload}},[t.updateAdminAccountFrom.AdminAvatar?a("img",{staticClass:"avatar",attrs:{src:"http://localhost:3000/"+t.updateAdminAccountFrom.AdminAvatar}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)])],1)])],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.closeUpdateAdminAccountDialog("updateAccountFrom")}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.updateAdminAccount("updateAccountFrom")}}},[t._v("确 定")])],1)]),t._v(" "),a("el-dialog",{attrs:{"custom-class":"my-el-dialog",visible:t.isShowUpdateAdminAccountPwdDialog,width:"420px",top:"120px"},on:{"update:visible":function(e){t.isShowUpdateAdminAccountPwdDialog=e}}},[a("div",{staticClass:"handle-title text-16-M"},[t._v("\n      修改密码\n    ")]),t._v(" "),a("div",{staticClass:"add-account-content add-account-from"},[a("el-form",{ref:"pwFrom",attrs:{model:t.pwFrom,rules:t.pwRules,"label-width":"100px","hide-required-asterisk":"","label-position":"left"}},[a("div",{staticClass:"from-item"},[a("el-form-item",{attrs:{label:"旧密码",prop:"oldPwd"}},[a("div",{staticClass:"item-input"},[a("el-input",{attrs:{type:"password"},model:{value:t.pwFrom.oldPwd,callback:function(e){t.$set(t.pwFrom,"oldPwd",e)},expression:"pwFrom.oldPwd"}})],1)])],1),t._v(" "),a("div",{staticClass:"from-item"},[a("el-form-item",{attrs:{label:"新密码",prop:"newPwd"}},[a("div",{staticClass:"item-input"},[a("el-input",{attrs:{type:"password"},model:{value:t.pwFrom.newPwd,callback:function(e){t.$set(t.pwFrom,"newPwd",e)},expression:"pwFrom.newPwd"}})],1)])],1),t._v(" "),a("div",{staticClass:"from-item"},[a("el-form-item",{attrs:{label:"确认新密码",prop:"confirmPwd"}},[a("div",{staticClass:"item-input"},[a("el-input",{attrs:{type:"password"},model:{value:t.pwFrom.confirmPwd,callback:function(e){t.$set(t.pwFrom,"confirmPwd",e)},expression:"pwFrom.confirmPwd"}})],1)])],1)])],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.clearInput("pwFrom")}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.changePw("pwFrom")}}},[t._v("确 定")])],1)]),t._v(" "),a("router-view")],1)},staticRenderFns:[]};var c=a("VU/8")(r,l,!1,function(t){a("BoV2")},"data-v-46555b60",null);e.default=c.exports}});
//# sourceMappingURL=12.c5e0e0bf6a7312569b72.js.map