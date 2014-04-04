//     ArchetypoRouter
//     (c) simonfan
//     ArchetypoRouter is licensed under the MIT terms.

define(["require","exports","module","lodash","lowercase-backbone","./__archetypo-router/format"],function(e,t,n){var r=e("lodash"),i=e("lowercase-backbone").router,s=e("./__archetypo-router/format"),o=/\((.*?)\)/g,u=/(\(\?)?:\w+/g,a=/\*\w+/g,f=/[\-{}\[\]+?.,\\\^$|#\s]/g,l=n.exports=i.extend({initialize:function(){this.initializeArchRouter.apply(this,arguments)},initializeArchRouter:function(){this.routeFormats={}},route:function(t,n,s){return r.isString(n)&&(this.routeFormats[n]=t),i.prototype.route.apply(this,arguments)},navigate:function(t,n,r){var o=this.routeFormats[t];if(!o)return i.prototype.navigate.apply(this,arguments);var u=s(o,n);return i.prototype.navigate.call(this,u,r)}})});