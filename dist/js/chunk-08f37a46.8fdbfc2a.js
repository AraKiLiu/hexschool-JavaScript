(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-08f37a46"],{"1dde":function(t,r,n){var e=n("d039"),o=n("b622"),c=n("2d00"),a=o("species");t.exports=function(t){return c>=51||!e((function(){var r=[],n=r.constructor={};return n[a]=function(){return{foo:1}},1!==r[t](Boolean).foo}))}},"65f0":function(t,r,n){var e=n("861d"),o=n("e8b5"),c=n("b622"),a=c("species");t.exports=function(t,r){var n;return o(t)&&(n=t.constructor,"function"!=typeof n||n!==Array&&!o(n.prototype)?e(n)&&(n=n[a],null===n&&(n=void 0)):n=void 0),new(void 0===n?Array:n)(0===r?0:r)}},8418:function(t,r,n){"use strict";var e=n("c04e"),o=n("9bf2"),c=n("5c6c");t.exports=function(t,r,n){var a=e(r);a in t?o.f(t,a,c(0,n)):t[a]=n}},"99af":function(t,r,n){"use strict";var e=n("23e7"),o=n("d039"),c=n("e8b5"),a=n("861d"),i=n("7b0b"),u=n("50c4"),d=n("8418"),f=n("65f0"),s=n("1dde"),p=n("b622"),l=n("2d00"),v=p("isConcatSpreadable"),h=9007199254740991,b="Maximum allowed index exceeded",y=l>=51||!o((function(){var t=[];return t[v]=!1,t.concat()[0]!==t})),w=s("concat"),x=function(t){if(!a(t))return!1;var r=t[v];return void 0!==r?!!r:c(t)},_=!y||!w;e({target:"Array",proto:!0,forced:_},{concat:function(t){var r,n,e,o,c,a=i(this),s=f(a,0),p=0;for(r=-1,e=arguments.length;r<e;r++)if(c=-1===r?a:arguments[r],x(c)){if(o=u(c.length),p+o>h)throw TypeError(b);for(n=0;n<o;n++,p++)n in c&&d(s,p,c[n])}else{if(p>=h)throw TypeError(b);d(s,p++,c)}return s.length=p,s}})},e6dc:function(t,r,n){"use strict";n.r(r);var e=function(){var t=this,r=t.$createElement,n=t._self._c||r;return n("div",[n("h1",[t._v("This is an products page")]),n("table",t._l(t.products,(function(r){return n("tr",{key:r.id},[n("td",[t._v(t._s(r.title))]),n("td",[n("router-link",{attrs:{to:"/product/"+r.id}},[t._v("連結")])],1)])})),0)])},o=[],c=(n("99af"),{data:function(){return{products:[]}},created:function(){var t=this;this.$http.get("".concat("https://course-ec-api.hexschool.io/","api/").concat("9cc644ce-dcbb-47ce-a1c2-55131daa05a0","/ec/products")).then((function(r){t.products=r.data.data}))}}),a=c,i=n("2877"),u=Object(i["a"])(a,e,o,!1,null,null,null);r["default"]=u.exports},e8b5:function(t,r,n){var e=n("c6b6");t.exports=Array.isArray||function(t){return"Array"==e(t)}}}]);
//# sourceMappingURL=chunk-08f37a46.8fdbfc2a.js.map