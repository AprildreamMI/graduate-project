webpackJsonp([2],{"5sXz":function(e,t,a){a("wxh+"),e.exports=a("FeBl").String.trim},"9WQZ":function(e,t,a){e.exports={default:a("5sXz"),__esModule:!0}},hyta:function(e,t){e.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},jqHj:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("9WQZ"),s=a.n(r),n=a("gyMJ"),o=a("PJh5"),c=a.n(o),i={data:function(){return{searchText:"",total:100,pageNum:1,pageSize:10,userList:[]}},created:function(){this.getUsersList()},methods:{tableRowClassName:function(e){var t=e.row;e.rowIndex;return"2"===t.CustomerStatus?"warning-row":""},searchUser:function(){this.pageNum=1,this.getUsersList()},getUsersList:function(){var e=this,t=this.$loading({lock:!0,text:"正在获取账号列表",background:"rgba(0, 0, 0, 0.2)"});n.l({searchText:s()(this.searchText),total:this.total,pageNum:this.pageNum,pageSize:this.pageSize}).then(function(a){0===a.data.code?(e.$message.success(a.data.message),t.close(),console.log(a.data),e.userList=a.data.data.userList,e.total=a.data.data.total):(e.$message.error(a.data.message),t.close())}).catch(function(a){console.error(a),e.$message.error("获取用户账号列表失败, 请重试"),t.close()})},changeUserStatus:function(e,t){var a=this,r=this.$loading({lock:!0,text:"正在改变用户账号状态",background:"rgba(0, 0, 0, 0.2)"});n.c({newStatus:e,userId:t}).then(function(e){0===e.data.code?(a.$message.success(e.data.message),r.close(),a.getUsersList()):(a.$message.error(e.data.message),r.close())}).catch(function(e){console.error(e),a.$message.error("改变用户账号状态失败, 请重试"),r.close()})},handleDelete:function(e,t){var a=this,r=this.$loading({lock:!0,text:"正在删除用户账号",background:"rgba(0, 0, 0, 0.2)"});n.d({userId:t}).then(function(e){0===e.data.code?(a.$message.success(e.data.message),r.close(),a.getUsersList()):(a.$message.error(e.data.message),r.close())}).catch(function(e){console.error(e),a.$message.error("删除用户账号状态失败, 请重试"),r.close()})},prevPage:function(){this.pageNum--,this.getUsersList()},nextPage:function(){this.pageNum++,this.getUsersList()},currentPage:function(e){this.pageNum=e,this.getUsersList()},formatterSex:function(e,t){return"1"===e.CustomerSex?"男":"女"},formatterRegTimeDate:function(e,t){return c()(e.CustomerRegTime).format("YYYY-MM-DD HH:mm:ss")},formatterLastLogTimeDate:function(e,t){return e.CustomerLastLogTime?c()(e.CustomerLastLogTime).format("YYYY-MM-DD HH:mm:ss"):"从未登陆"}}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("right-content",[a("content-header",[a("div",{staticClass:"search-box"},[a("div",{staticClass:"search-box-input"},[a("el-input",{attrs:{placeholder:"输入用户昵称进行搜索","prefix-icon":"el-icon-search",clearable:""},on:{blur:e.searchUser},model:{value:e.searchText,callback:function(t){e.searchText=t},expression:"searchText"}})],1)])]),e._v(" "),a("div",{staticClass:"account-content"},[a("div",{staticClass:"user-table"},[a("el-table",{staticStyle:{width:"100%"},attrs:{border:"","header-align":"center",data:e.userList,"row-class-name":e.tableRowClassName}},[a("el-table-column",{attrs:{type:"index",index:1,align:"center",width:40}}),e._v(" "),a("el-table-column",{attrs:{prop:"CustomerName",align:"center",label:"昵称",width:80}}),e._v(" "),a("el-table-column",{attrs:{prop:"CustomerTrueName",align:"center",label:"姓名",width:80}}),e._v(" "),a("el-table-column",{attrs:{prop:"CustomerSex",align:"center",label:"性别",formatter:e.formatterSex,width:50}}),e._v(" "),a("el-table-column",{attrs:{prop:"CustomerEmail",align:"center",label:"邮箱"}}),e._v(" "),a("el-table-column",{attrs:{prop:"CustomerTel",align:"center",label:"电话",width:"110"}}),e._v(" "),a("el-table-column",{attrs:{prop:"CustomerAddr",align:"center",label:"地址"}}),e._v(" "),a("el-table-column",{attrs:{prop:"CustomerRegTime",align:"center",formatter:e.formatterRegTimeDate,label:"注册时间"}}),e._v(" "),a("el-table-column",{attrs:{prop:"CustomerLastLogTime",align:"center",formatter:e.formatterLastLogTimeDate,label:"最近登录"}}),e._v(" "),a("el-table-column",{attrs:{prop:"CustomerLogCount",align:"center",label:"登录次数",width:80}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-switch",{attrs:{"active-value":"1","inactive-value":"0","active-color":"#13ce66","inactive-color":"#ff4949",title:"禁用或者启用账号"},on:{change:function(a){e.changeUserStatus(t.row.CustomerStatus,t.row.CustomerId)}},model:{value:t.row.CustomerStatus,callback:function(a){e.$set(t.row,"CustomerStatus",a)},expression:"scope.row.CustomerStatus"}}),e._v(" "),a("el-button",{staticStyle:{"margin-top":"5px"},attrs:{size:"mini",type:"danger"},on:{click:function(a){e.handleDelete(t.$index,t.row.CustomerId)}}},[e._v("删除\n            ")])]}}])})],1)],1),e._v(" "),a("div",{staticClass:"pagination-box"},[a("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:e.total,"page-size":e.pageSize,"current-page":e.pageNum},on:{"prev-click":e.prevPage,"next-click":e.nextPage,"current-change":e.currentPage}})],1)])],1)},staticRenderFns:[]};var u=a("VU/8")(i,l,!1,function(e){a("qvnL")},"data-v-495e3cee",null);t.default=u.exports},mnVu:function(e,t,a){var r=a("kM2E"),s=a("52gC"),n=a("S82l"),o=a("hyta"),c="["+o+"]",i=RegExp("^"+c+c+"*"),l=RegExp(c+c+"*$"),u=function(e,t,a){var s={},c=n(function(){return!!o[e]()||"​"!="​"[e]()}),i=s[e]=c?t(m):o[e];a&&(s[a]=i),r(r.P+r.F*c,"String",s)},m=u.trim=function(e,t){return e=String(s(e)),1&t&&(e=e.replace(i,"")),2&t&&(e=e.replace(l,"")),e};e.exports=u},qvnL:function(e,t){},"wxh+":function(e,t,a){"use strict";a("mnVu")("trim",function(e){return function(){return e(this,3)}})}});
//# sourceMappingURL=2.d996b3f007f38677fc7a.js.map