webpackJsonp([9],{"3KkX":function(e,t){},z33s:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("gyMJ"),o=r("iPXC"),i=r("PJh5"),l=r.n(i),n={data:function(){return{activeName:"noPay",orderList:[],currentOrderList:[],currentOrderGoodsId:"",tables:[{label:"未付款",name:"noPay"},{label:"未发货",name:"noShip"},{label:"以发货",name:"shipped"},{label:"以收货",name:"receipt"}]}},created:function(){this.getShopOrderGoodsList()},methods:{getShopOrderGoodsList:function(){var e=this,t=this.$loading({lock:!0,text:"正在获取订单列表",background:"rgba(0, 0, 0, 0.2)"});a.m().then(function(r){0===r.data.code?(e.$message.success(r.data.message),t.close(),e.orderList=r.data.data.orderList,e.orderList.forEach(function(e,t){"http"!==e.BookPic.substring(0,4)&&(e.BookPic="http://localhost:3000/"+e.BookPic)}),e.fileterOrderList()):(e.$message.error(r.data.message),t.close())}).catch(function(r){console.error(r),e.$message.error("获取订单列表失败, 请重试"),t.close()})},fileterOrderList:function(){console.log(this.activeName),"noPay"===this.activeName?this.currentOrderList=this.orderList.filter(function(e,t){return"0"===e.isPlay}):"noShip"===this.activeName?this.currentOrderList=this.orderList.filter(function(e,t){return"1"===e.isPlay&&"0"===e.isShip}):"shipped"===this.activeName?this.currentOrderList=this.orderList.filter(function(e,t){return"1"===e.isPlay&&"1"===e.isShip&&"0"===e.isReceipt}):"receipt"===this.activeName&&(this.currentOrderList=this.orderList.filter(function(e,t){return"1"===e.isPlay&&"1"===e.isShip&&"1"===e.isReceipt}))},handleClick:function(e,t){this.fileterOrderList()},toShip:function(e,t){var r=this,o=this.$loading({lock:!0,text:"正在发货列表",background:"rgba(0, 0, 0, 0.2)"});a.t({id:t.id}).then(function(e){0===e.data.code?(r.$message.success(e.data.message),o.close(),r.getShopOrderGoodsList(),r.fileterOrderList()):(r.$message.error(e.data.message),o.close())}).catch(function(e){console.error(e),r.$message.error("发货失败, 请重试"),o.close()})},formatterDate:function(e,t){return l()(e.Orderdate).format("YYYY-MM-DD HH:ss:mm")},formatterDatePay:function(e,t){return l()(e.payTime).format("YYYY-MM-DD HH:ss:mm")}},computed:{admin_me:function(){return o.a.get("admin_me")?JSON.parse(o.a.get("admin_me")):""}}},s={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("right-content",[r("div",{staticClass:"content"},[r("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},e._l(e.tables,function(t,a){return r("el-tab-pane",{key:a,attrs:{label:t.label,name:t.name}},[r("el-table",{key:Math.random(),ref:"multipleTable",refInFor:!0,staticStyle:{width:"100%"},attrs:{data:e.currentOrderList,"header-align":"center"}},[r("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[r("el-form-item",{attrs:{label:"书籍作者"}},[r("span",[e._v(e._s(t.row.BookAuthor))])]),e._v(" "),r("el-form-item",{attrs:{label:"出版社"}},[r("span",[e._v(e._s(t.row.BookPress))])]),e._v(" "),r("el-form-item",{attrs:{label:"出版时间"}},[r("span",[e._v(e._s(e._f("dataFormat")(t.row.BookPubDate)))])]),e._v(" "),r("el-form-item",{attrs:{label:"ISBN"}},[r("span",[e._v(e._s(t.row.Bookisbn))])]),e._v(" "),r("el-form-item",{attrs:{label:"书籍简介"}},[r("span",[e._v(e._s(t.row.BookOutline))])]),e._v(" "),r("el-form-item",{attrs:{label:"书籍封面"}},[r("img",{attrs:{width:"150",height:"150",src:t.row.BookPic,alt:""}})])],1)]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"订单编号",prop:"OrderId","show-overflow-tooltip":!0,align:"center"}}),e._v(" "),r("el-table-column",{attrs:{label:"下单日期",prop:"Orderdate","show-overflow-tooltip":!0,formatter:e.formatterDate,align:"center"}}),e._v(" "),"noShip"===e.activeName?r("el-table-column",{attrs:{label:"付款时间",prop:"payTime","show-overflow-tooltip":!0,formatter:e.formatterDatePay,align:"center"}}):e._e(),e._v(" "),r("el-table-column",{attrs:{label:"书名",prop:"BookName","show-overflow-tooltip":!0,align:"center"}}),e._v(" "),r("el-table-column",{attrs:{label:"书籍原价(￥)",prop:"BookPrice",width:80,align:"center"}}),e._v(" "),r("el-table-column",{attrs:{label:"折扣",prop:"BookDiscount",width:50,align:"center"}}),e._v(" "),r("el-table-column",{attrs:{label:"书籍现价(￥)",prop:"BookMprice",width:80,align:"center"}}),e._v(" "),r("el-table-column",{attrs:{label:"购买数量",prop:"ordermount",width:50,align:"center"}}),e._v(" "),r("el-table-column",{attrs:{label:"总价(￥)",prop:"totalprice",width:50,align:"center"}}),e._v(" "),"noShip"===e.activeName?r("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(r){e.toShip(t.$index,t.row)}}},[e._v("发货\n              ")])]}}])}):e._e()],1)],1)}),1)],1)])},staticRenderFns:[]};var c=r("VU/8")(n,s,!1,function(e){r("3KkX")},"data-v-8cd11184",null);t.default=c.exports}});
//# sourceMappingURL=9.d7795e05298e5665ef7e.js.map