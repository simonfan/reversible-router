//     ArchetypoRouter
//     (c) simonfan
//     ArchetypoRouter is licensed under the MIT terms.

define(["require","exports","module","lodash","lowercase-backbone"],function(e,t,n){function f(e){return e.replace(/(\(|\(.*:|:|\)|\*)/,"")}function l(e,t){return e=e.replace(o,function(e){var n=f(e);return t[n]?t[n]:e}),e=e.replace(u,function(e){var n=f(e);return t[n]?t[n]:""}),e.replace(s,"")}var r=e("lodash"),i=e("lowercase-backbone").router,s=/\((.*?)\)/g,o=/(\(\?)?:\w+/g,u=/\*\w+/g,a=/[\-{}\[\]+?.,\\\^$|#\s]/g,c=n.exports=i.extend({initialize:function(){this.initializeArchRouter.apply(this,arguments)},initializeArchRouter:function(){this.routeFormats={}},route:function(t,n,s){return r.isString(n)&&(this.routeFormats[n]=t),i.prototype.route.apply(this,arguments)},navigate:function(t,n,r){var s=this.routeFormats[t];if(!s)return i.prototype.navigate.apply(this,arguments);var o=l(s,n);return i.prototype.navigate.call(this,o,r)}})});