(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-search-search"],{2449:function(t,e,a){"use strict";a.r(e);var o=a("9ccc"),n=a.n(o);for(var r in o)["default"].indexOf(r)<0&&function(t){a.d(e,t,(function(){return o[t]}))}(r);e["default"]=n.a},"457e":function(t,e,a){"use strict";a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return r})),a.d(e,"a",(function(){return o}));var o={uSearch:a("6068").default},n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"margin-left-xs"},[a("navigationBar",{attrs:{title:"搜索",search:!0}}),a("v-uni-view",{staticClass:"padding"},[a("u-search",{attrs:{placeholder:"请输入关键字",animation:!0,height:"40"},on:{focus:function(e){arguments[0]=e=t.$handleEvent(e),t.searchFocus.apply(void 0,arguments)},search:function(e){arguments[0]=e=t.$handleEvent(e),t.handleSearch.apply(void 0,arguments)},change:function(e){arguments[0]=e=t.$handleEvent(e),t.searchChange.apply(void 0,arguments)}},model:{value:t.searchComObj.keyword,callback:function(e){t.$set(t.searchComObj,"keyword",e)},expression:"searchComObj.keyword"}})],1),t.lenovoShow?a("v-uni-view",{staticClass:"lenovo"},t._l(t.lenovoList,(function(e,o){return a("v-uni-view",{staticClass:"padding",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.searchCom(e)}}},[a("v-uni-text",{staticClass:"cuIcon-search color-huise margin-right-sm"}),a("v-uni-text",[t._v(t._s(e.associatedWord))])],1)})),1):t._e(),a("v-uni-view",{},[a("v-uni-view",{staticClass:"flex justify-between align-center padding-sm"},[a("v-uni-view",{},[a("v-uni-text",{staticClass:"cuIcon-infofill fs-30 margin-right-xs color-huise"}),a("v-uni-text",{staticClass:"color-huise fs-30"},[t._v("猜你想搜")])],1),a("v-uni-text",{staticClass:" fs-40 color-huise flex-wrap",class:[t.discoverShow?"cuIcon-attention":"cuIcon-attentionfill"],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.discoverShow=!t.discoverShow}}})],1),t.discoverShow?a("v-uni-view",{staticClass:"flex justify-between align-center flex-wrap"},t._l(t.discoverList,(function(e,o){return a("v-uni-view",{key:o,staticClass:"discover",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.handleisc(e)}}},[a("v-uni-text",[t._v(t._s(e.keyword))])],1)})),1):t._e()],1),""!==t.searchComObj.keyword?a("v-uni-view",{staticClass:"resultCom",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.lenovoShow=!1}}},t._l(t.searchComResult,(function(e,o){return a("v-uni-view",{key:o,staticClass:"topicInfo flex padding-sm",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.searchGoods(e)}}},[a("v-uni-image",{attrs:{src:e.picture,mode:"aspectFill"}}),a("v-uni-view",{staticClass:"padding-left-sm fs-26"},[a("h4",{staticClass:"fs-28 margin-bottom-xs"},[t._v(t._s(e.name))]),a("v-uni-view",{staticClass:"comelli margin-tb color-huise2"},[a("v-uni-text",{staticClass:"fs-26"},[t._v("商品数:"+t._s(e.orderNum))])],1),a("v-uni-text",{staticClass:"fs-26 color-red"},[t._v("￥"+t._s(e.price))])],1)],1)})),1):t._e()],1)},r=[]},"4c31":function(t,e,a){"use strict";a("7a82");var o=a("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.goodsList=e.gValuePage=e.gValue=e.gRelevant=e.gCategory=void 0;var n=o(a("45ba"));e.goodsList=function(t){return(0,n.default)({url:"/goods?id=".concat(t)})};e.gRelevant=function(t){return(0,n.default)({url:"/goods/relevant",data:t})};e.gCategory=function(t){return(0,n.default)({method:"POST",url:"/category/goods",data:t})};e.gValue=function(t){return(0,n.default)({url:"/goods/".concat(t,"/evaluate")})};e.gValuePage=function(t){var e=t.id,a=t.data;return(0,n.default)({url:"/goods/".concat(e,"/evaluate/page"),data:a})}},"57d9":function(t,e,a){"use strict";a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return r})),a.d(e,"a",(function(){return o}));var o={uIcon:a("8e71").default},n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"u-search",style:[{margin:t.margin},t.$u.addStyle(t.customStyle)],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clickHandler.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"u-search__content",style:{backgroundColor:t.bgColor,borderRadius:"round"==t.shape?"100px":"4px",borderColor:t.borderColor}},[t.$slots.label||null!==t.label?[t._t("label",[a("v-uni-text",{staticClass:"u-search__content__label"},[t._v(t._s(t.label))])])]:t._e(),a("v-uni-view",{staticClass:"u-search__content__icon"},[a("u-icon",{attrs:{size:t.searchIconSize,name:t.searchIcon,color:t.searchIconColor?t.searchIconColor:t.color},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clickIcon.apply(void 0,arguments)}}})],1),a("v-uni-input",{staticClass:"u-search__content__input",style:[{textAlign:t.inputAlign,color:t.color,backgroundColor:t.bgColor,height:t.$u.addUnit(t.height)},t.inputStyle],attrs:{"confirm-type":"search",value:t.value,disabled:t.disabled,focus:t.focus,maxlength:t.maxlength,"placeholder-class":"u-search__content__input--placeholder",placeholder:t.placeholder,"placeholder-style":"color: "+t.placeholderColor,type:"text"},on:{blur:function(e){arguments[0]=e=t.$handleEvent(e),t.blur.apply(void 0,arguments)},confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.search.apply(void 0,arguments)},input:function(e){arguments[0]=e=t.$handleEvent(e),t.inputChange.apply(void 0,arguments)},focus:function(e){arguments[0]=e=t.$handleEvent(e),t.getFocus.apply(void 0,arguments)}}}),t.keyword&&t.clearabled&&t.focused?a("v-uni-view",{staticClass:"u-search__content__icon u-search__content__close",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clear.apply(void 0,arguments)}}},[a("u-icon",{attrs:{name:"close",size:"11",color:"#ffffff",customStyle:"line-height: 12px"}})],1):t._e()],2),a("v-uni-text",{staticClass:"u-search__action",class:[(t.showActionBtn||t.show)&&"u-search__action--active"],style:[t.actionStyle],on:{click:function(e){e.stopPropagation(),e.preventDefault(),arguments[0]=e=t.$handleEvent(e),t.custom.apply(void 0,arguments)}}},[t._v(t._s(t.actionText))])],1)},r=[]},6068:function(t,e,a){"use strict";a.r(e);var o=a("57d9"),n=a("ec05");for(var r in n)["default"].indexOf(r)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(r);a("68fb");var i=a("f0c5"),c=Object(i["a"])(n["default"],o["b"],o["c"],!1,null,"313cf2d0",null,!1,o["a"],void 0);e["default"]=c.exports},"68fb":function(t,e,a){"use strict";var o=a("8966"),n=a.n(o);n.a},7355:function(t,e,a){var o=a("24fb");e=o(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 引入uView的全局SCSS主题文件 */.fs-40[data-v-da86b748]{font-size:%?40?%!important}.fs-36[data-v-da86b748]{font-size:%?36?%!important}.fs-34[data-v-da86b748]{font-size:%?34?%!important}.fs-30[data-v-da86b748]{font-size:%?30?%!important}.fs-28[data-v-da86b748]{font-size:%?28?%!important}.fs-26[data-v-da86b748]{font-size:%?26?%!important}.fs-24[data-v-da86b748]{font-size:%?24?%!important}.fs-22[data-v-da86b748]{font-size:%?22?%!important}.fs-20[data-v-da86b748]{font-size:%?20?%!important}.fs-18[data-v-da86b748]{font-size:%?18?%!important}.fs-16[data-v-da86b748]{font-size:%?16?%!important}.fs-14[data-v-da86b748]{font-size:%?14?%!important}.fs-12[data-v-da86b748]{font-size:%?12?%!important}.color-heise[data-v-da86b748]{color:#333!important}.color-huise[data-v-da86b748]{color:#9b9b9b!important}.color-huise2[data-v-da86b748]{color:#9b9b9b!important}.color-fff[data-v-da86b748]{color:#fff!important}.color-red[data-v-da86b748]{color:red!important}.color-zise[data-v-da86b748]{color:#b895b7!important}.color-lvse[data-v-da86b748]{color:#27bb9a!important}.color-skyblue[data-v-da86b748]{color:#87ceeb!important}.color-pink[data-v-da86b748]{color:pink!important}.color-chengse[data-v-da86b748]{color:#f0ad4e!important}.bg-kaqise[data-v-da86b748]{background-color:#e3cfbd!important}.bg-zise[data-v-da86b748]{background-color:#b895b7!important}.bg-fff[data-v-da86b748]{background-color:#fff!important}.bg-lvse[data-v-da86b748]{background-color:#27bb9a!important}.bg-pink[data-v-da86b748]{background-color:pink!important}.bg-huise[data-v-da86b748]{background-color:#f4f4f4!important}.bg-huise2[data-v-da86b748]{background-color:#ccc!important}.bg-qita[data-v-da86b748]{background-color:#23201e!important}.my-fixed[data-v-da86b748]{position:fixed!important;right:0;bottom:0;width:100%;box-shadow:0 0 %?8?% %?1?% grey}\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */uni-page-body[data-v-da86b748]{margin-top:50px}.lenovo[data-v-da86b748]{position:absolute;top:%?113?%;left:0;z-index:9;width:100%;border-radius:%?10?%;background-color:#fff}.discover[data-v-da86b748]{width:%?200?%;height:%?70?%;line-height:%?70?%;text-align:center;background-color:#f2f2f2;border-radius:%?30?%;margin:%?20?% %?20?% %?20?% 0}.resultCom[data-v-da86b748]{position:absolute;top:%?114?%;left:0;padding:%?20?%;width:100%;height:100%;background-color:#fff}.resultCom .topicInfo[data-v-da86b748]{background-color:#fff}.resultCom .topicInfo uni-image[data-v-da86b748]{width:%?200?%;height:%?200?%;border-radius:%?15?%}.resultCom .topicInfo uni-view h4[data-v-da86b748]{width:%?420?%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',""]),t.exports=e},8004:function(t,e,a){var o=a("7355");o.__esModule&&(o=o.default),"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var n=a("4f06").default;n("ef643926",o,!0,{sourceMap:!1,shadowMode:!1})},8966:function(t,e,a){var o=a("8d41");o.__esModule&&(o=o.default),"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var n=a("4f06").default;n("0e1ea126",o,!0,{sourceMap:!1,shadowMode:!1})},"8d41":function(t,e,a){var o=a("24fb");e=o(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 引入uView的全局SCSS主题文件 */.fs-40[data-v-313cf2d0]{font-size:%?40?%!important}.fs-36[data-v-313cf2d0]{font-size:%?36?%!important}.fs-34[data-v-313cf2d0]{font-size:%?34?%!important}.fs-30[data-v-313cf2d0]{font-size:%?30?%!important}.fs-28[data-v-313cf2d0]{font-size:%?28?%!important}.fs-26[data-v-313cf2d0]{font-size:%?26?%!important}.fs-24[data-v-313cf2d0]{font-size:%?24?%!important}.fs-22[data-v-313cf2d0]{font-size:%?22?%!important}.fs-20[data-v-313cf2d0]{font-size:%?20?%!important}.fs-18[data-v-313cf2d0]{font-size:%?18?%!important}.fs-16[data-v-313cf2d0]{font-size:%?16?%!important}.fs-14[data-v-313cf2d0]{font-size:%?14?%!important}.fs-12[data-v-313cf2d0]{font-size:%?12?%!important}.color-heise[data-v-313cf2d0]{color:#333!important}.color-huise[data-v-313cf2d0]{color:#9b9b9b!important}.color-huise2[data-v-313cf2d0]{color:#9b9b9b!important}.color-fff[data-v-313cf2d0]{color:#fff!important}.color-red[data-v-313cf2d0]{color:red!important}.color-zise[data-v-313cf2d0]{color:#b895b7!important}.color-lvse[data-v-313cf2d0]{color:#27bb9a!important}.color-skyblue[data-v-313cf2d0]{color:#87ceeb!important}.color-pink[data-v-313cf2d0]{color:pink!important}.color-chengse[data-v-313cf2d0]{color:#f0ad4e!important}.bg-kaqise[data-v-313cf2d0]{background-color:#e3cfbd!important}.bg-zise[data-v-313cf2d0]{background-color:#b895b7!important}.bg-fff[data-v-313cf2d0]{background-color:#fff!important}.bg-lvse[data-v-313cf2d0]{background-color:#27bb9a!important}.bg-pink[data-v-313cf2d0]{background-color:pink!important}.bg-huise[data-v-313cf2d0]{background-color:#f4f4f4!important}.bg-huise2[data-v-313cf2d0]{background-color:#ccc!important}.bg-qita[data-v-313cf2d0]{background-color:#23201e!important}.my-fixed[data-v-313cf2d0]{position:fixed!important;right:0;bottom:0;width:100%;box-shadow:0 0 %?8?% %?1?% grey}\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */uni-view[data-v-313cf2d0], uni-scroll-view[data-v-313cf2d0], uni-swiper-item[data-v-313cf2d0]{display:flex;flex-direction:column;flex-shrink:0;flex-grow:0;flex-basis:auto;align-items:stretch;align-content:flex-start}[type="search"][data-v-313cf2d0]::-webkit-search-decoration{display:none}.u-search[data-v-313cf2d0]{display:flex;flex-direction:row;align-items:center;flex:1}.u-search__content[data-v-313cf2d0]{display:flex;flex-direction:row;align-items:center;padding:0 10px;flex:1;justify-content:space-between;border-width:1px;border-color:transparent;border-style:solid;overflow:hidden}.u-search__content__icon[data-v-313cf2d0]{display:flex;flex-direction:row;align-items:center}.u-search__content__label[data-v-313cf2d0]{color:#303133;font-size:14px;margin:0 4px}.u-search__content__close[data-v-313cf2d0]{width:20px;height:20px;border-top-left-radius:100px;border-top-right-radius:100px;border-bottom-left-radius:100px;border-bottom-right-radius:100px;background-color:#c6c7cb;display:flex;flex-direction:row;align-items:center;justify-content:center;-webkit-transform:scale(.82);transform:scale(.82)}.u-search__content__input[data-v-313cf2d0]{flex:1;font-size:14px;line-height:1;margin:0 5px;color:#303133}.u-search__content__input--placeholder[data-v-313cf2d0]{color:#909193}.u-search__action[data-v-313cf2d0]{font-size:14px;color:#303133;width:0;overflow:hidden;transition-property:width;transition-duration:.3s;white-space:nowrap;text-align:center}.u-search__action--active[data-v-313cf2d0]{width:40px;margin-left:5px}',""]),t.exports=e},"9c14":function(t,e,a){"use strict";a.r(e);var o=a("457e"),n=a("2449");for(var r in n)["default"].indexOf(r)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(r);a("fdc7");var i=a("f0c5"),c=Object(i["a"])(n["default"],o["b"],o["c"],!1,null,"da86b748",null,!1,o["a"],void 0);e["default"]=c.exports},"9ccc":function(t,e,a){"use strict";(function(t){a("7a82");var o=a("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=o(a("c7eb")),r=o(a("2909")),i=o(a("1da1")),c=a("a574"),s=a("4c31"),d={data:function(){return{lenovoShow:!1,lenovoList:[{associatedWord:"胸包"},{associatedWord:"出行胸包"},{associatedWord:"多功能出行胸包"},{associatedWord:"超能装多功能出行胸包"}],copyLenovoList:[{associatedWord:"胸包"},{associatedWord:"出行胸包"},{associatedWord:"多功能出行胸包"},{associatedWord:"超能装多功能出行胸包"}],searchComObj:{keyword:"",associatedIds:[]},searchComResult:[],clickComShow:!1,discoverShow:!0,discoverList:[{keyword:"经典格子衫"},{keyword:"礼物"},{keyword:"男鞋"},{keyword:"女鞋"},{keyword:"回弹健腹滚轮"},{keyword:"黑科技"}]}},watch:{"searchComObj.keyword":{handler:function(t){""!==t&&!0!==this.clickComShow?this.lenovoShow=!0:this.lenovoShow=!1}}},methods:{searchFocus:function(){""!==this.searchComObj.keyword?this.lenovoShow=!0:this.lenovoShow=!1},searchChange:function(e){var a=this;return(0,i.default)((0,n.default)().mark((function o(){var i;return(0,n.default)().wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.next=2,(0,c.searchTips)(e);case 2:i=o.sent,t.log(i),0!==i.data.result.length?a.lenovoList=(0,r.default)(i.data.result):a.lenovoList=a.copyLenovoList;case 5:case"end":return o.stop()}}),o)})))()},goodsResult:function(e){var a=this;return(0,i.default)((0,n.default)().mark((function o(){var r;return(0,n.default)().wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.next=2,(0,c.searchAll)(e);case 2:r=o.sent,t.log(r),a.searchComResult=r.data.result.pageData.items;case 5:case"end":return o.stop()}}),o)})))()},searchCom:function(e){var a=this;return(0,i.default)((0,n.default)().mark((function o(){return(0,n.default)().wrap((function(o){while(1)switch(o.prev=o.next){case 0:t.log(e),Object.assign(a.searchComObj,e),a.goodsResult(a.searchComObj),a.lenovoShow=!1;case 4:case"end":return o.stop()}}),o)})))()},handleSearch:function(t){var e=this;return(0,i.default)((0,n.default)().mark((function a(){var o;return(0,n.default)().wrap((function(a){while(1)switch(a.prev=a.next){case 0:o={keyword:t},e.goodsResult(o),e.lenovoShow=!1;case 3:case"end":return a.stop()}}),a)})))()},searchGoods:function(e){return(0,i.default)((0,n.default)().mark((function a(){var o;return(0,n.default)().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,(0,s.goodsList)(e.id);case 2:o=a.sent,t.log(o),uni.navigateTo({url:"/pages/goods/goods-info",success:function(t){t.eventChannel.emit("item",{data:o.data.result})}});case 5:case"end":return a.stop()}}),a)})))()},handleisc:function(e){var a=this;return(0,i.default)((0,n.default)().mark((function o(){return(0,n.default)().wrap((function(o){while(1)switch(o.prev=o.next){case 0:t.log(e),a.clickComShow=!0,a.lenovoShow=!1,a.searchComObj.keyword=e.keyword,a.goodsResult(e);case 5:case"end":return o.stop()}}),o)})))()}}};e.default=d}).call(this,a("5a52")["default"])},a574:function(t,e,a){"use strict";a("7a82");var o=a("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.searchTips=e.searchAll=void 0;var n=o(a("45ba"));e.searchAll=function(t){return(0,n.default)({method:"POST",url:"/search/all",data:t})};e.searchTips=function(t){return(0,n.default)({url:"/search/tips",data:{keyword:t}})}},e97f:function(t,e,a){"use strict";a("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("ac1f"),a("841c"),a("a9e3");var o={props:{shape:{type:String,default:uni.$u.props.search.shape},bgColor:{type:String,default:uni.$u.props.search.bgColor},placeholder:{type:String,default:uni.$u.props.search.placeholder},clearabled:{type:Boolean,default:uni.$u.props.search.clearabled},focus:{type:Boolean,default:uni.$u.props.search.focus},showAction:{type:Boolean,default:uni.$u.props.search.showAction},actionStyle:{type:Object,default:uni.$u.props.search.actionStyle},actionText:{type:String,default:uni.$u.props.search.actionText},inputAlign:{type:String,default:uni.$u.props.search.inputAlign},inputStyle:{type:Object,default:uni.$u.props.search.inputStyle},disabled:{type:Boolean,default:uni.$u.props.search.disabled},borderColor:{type:String,default:uni.$u.props.search.borderColor},searchIconColor:{type:String,default:uni.$u.props.search.searchIconColor},color:{type:String,default:uni.$u.props.search.color},placeholderColor:{type:String,default:uni.$u.props.search.placeholderColor},searchIcon:{type:String,default:uni.$u.props.search.searchIcon},searchIconSize:{type:[Number,String],default:uni.$u.props.search.searchIconSize},margin:{type:String,default:uni.$u.props.search.margin},animation:{type:Boolean,default:uni.$u.props.search.animation},value:{type:String,default:uni.$u.props.search.value},maxlength:{type:[String,Number],default:uni.$u.props.search.maxlength},height:{type:[String,Number],default:uni.$u.props.search.height},label:{type:[String,Number,null],default:uni.$u.props.search.label}}};e.default=o},ec05:function(t,e,a){"use strict";a.r(e);var o=a("edd6"),n=a.n(o);for(var r in o)["default"].indexOf(r)<0&&function(t){a.d(e,t,(function(){return o[t]}))}(r);e["default"]=n.a},edd6:function(t,e,a){"use strict";a("7a82");var o=a("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=o(a("e97f")),r={name:"u-search",mixins:[uni.$u.mpMixin,uni.$u.mixin,n.default],data:function(){return{keyword:"",showClear:!1,show:!1,focused:this.focus}},watch:{keyword:function(t){this.$emit("input",t),this.$emit("change",t)},value:{immediate:!0,handler:function(t){this.keyword=t}}},computed:{showActionBtn:function(){return!this.animation&&this.showAction}},methods:{inputChange:function(t){this.keyword=t.detail.value},clear:function(){var t=this;this.keyword="",this.$nextTick((function(){t.$emit("clear")}))},search:function(t){this.$emit("search",t.detail.value);try{uni.hideKeyboard()}catch(t){}},custom:function(){this.$emit("custom",this.keyword);try{uni.hideKeyboard()}catch(t){}},getFocus:function(){this.focused=!0,this.animation&&this.showAction&&(this.show=!0),this.$emit("focus",this.keyword)},blur:function(){var t=this;setTimeout((function(){t.focused=!1}),100),this.show=!1,this.$emit("blur",this.keyword)},clickHandler:function(){this.disabled&&this.$emit("click")},clickIcon:function(){this.$emit("clickIcon")}}};e.default=r},fdc7:function(t,e,a){"use strict";var o=a("8004"),n=a.n(o);n.a}}]);