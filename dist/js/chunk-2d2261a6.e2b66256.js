(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2261a6"],{e6dc:function(t,c,e){"use strict";e.r(c);var a=function(){var t=this,c=t.$createElement,e=t._self._c||c;return e("div",[e("h1",[t._v("This is an products page")]),e("table",t._l(t.products,(function(c){return e("tr",{key:c.id},[e("td",[t._v(t._s(c.title))]),e("td",[e("router-link",{attrs:{to:"/product/"+c.id}},[t._v("連結")])],1)])})),0)])},n=[],o=(e("99af"),{data:function(){return{products:[]}},created:function(){var t=this;this.$http.get("".concat("https://course-ec-api.hexschool.io/","api/").concat("9cc644ce-dcbb-47ce-a1c2-55131daa05a0","/ec/products")).then((function(c){t.products=c.data.data}))}}),r=o,u=e("2877"),d=Object(u["a"])(r,a,n,!1,null,null,null);c["default"]=d.exports}}]);
//# sourceMappingURL=chunk-2d2261a6.e2b66256.js.map