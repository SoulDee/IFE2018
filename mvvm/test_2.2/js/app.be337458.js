(function(t){function e(e){for(var r,o,u=e[0],s=e[1],l=e[2],d=0,p=[];d<u.length;d++)o=u[d],a[o]&&p.push(a[o][0]),a[o]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(t[r]=s[r]);c&&c(e);while(p.length)p.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],r=!0,u=1;u<n.length;u++){var s=n[u];0!==a[s]&&(r=!1)}r&&(i.splice(e--,1),t=o(o.s=n[0]))}return t}var r={},a={app:0},i=[];function o(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=r,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],s=u.push.bind(u);u.push=e,u=u.slice();for(var l=0;l<u.length;l++)e(u[l]);var c=s;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"0d94":function(t,e,n){},"41f3":function(t,e,n){"use strict";var r=n("0d94"),a=n.n(r);a.a},"56d7":function(t,e,n){"use strict";n.r(e);var r=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"btn-col"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],attrs:{type:"text",placeholder:"请输入人名"},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}}),n("button",{on:{click:t.addItem}},[t._v("add")])]),t.list.length?n("table",[t._m(0),n("tbody",t._l(t.list,function(e,r){return n("tr",{key:e.id},[n("td",[t._v(t._s(e.name))]),n("td",[t._v(t._s(e.statu))]),n("td",["待审核"===e.statu?n("button",{on:{click:function(e){t.checkItem(r)}}},[t._v("审核")]):n("button",{on:{click:function(e){t.delItem(r)}}},[t._v("删除")])])])}))]):n("div",[t._v("\n        当且没有需要审核或者删除的列表~\n    ")])])},i=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("tr",[n("th",[t._v("姓名")]),n("th",[t._v("审核")]),n("th",[t._v("操作")])])])}],o={name:"app",data(){return{name:"",list:[{id:1,name:"张三",statu:"合格"},{id:2,name:"李四",statu:"不合格"},{id:3,name:"王五",statu:"待审核"},{id:4,name:"赵六",statu:"待审核"},{id:5,name:"孙七",statu:"待审核"}],vmNextId:6}},methods:{addItem(){""!==this.name.replace(/\s/g,"")?this.list.push({id:this.vmNextId++,name:this.name,statu:"待审核"}):alert("请输入正确的人名"),this.name=""},delItem(t){this.list.splice(t,1)},checkItem(t){window.confirm("审核是否通过？")?this.list[t].statu="合格":this.list[t].statu="不合格"}}},u=o,s=(n("41f3"),n("2877")),l=Object(s["a"])(u,a,i,!1,null,"5949358c",null);l.options.__file="App.vue";var c=l.exports;r["a"].config.productionTip=!1,new r["a"]({render:t=>t(c)}).$mount("#app")}});
//# sourceMappingURL=app.be337458.js.map