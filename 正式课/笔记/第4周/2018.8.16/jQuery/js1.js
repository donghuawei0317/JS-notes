(function (global, factory) {

})(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {
    var version = '3.3.1',
        jQuery = function (selector, context) {
            return new jQuery.fn.init(selector, context)
        };
    //把jQuery当作对象：加了一个fn属性；把原型指向后边的对象
    jQuery.fn = jQuery.prototype ={
        constructor:jQuery,
        toArray: function() {
            return slice.call( this );
        },
    };
    jQuery.extend = jQuery.fn.extend = function(){};
    /*
    * extend JQ的扩展功能
    * jQuery.extend 扩展的内容是直接放到jQuery上（把jQuery当作对象）
    * jQuery.fn.extend 扩展到jQuery的原型对象上
    * */
    var init=jQuery.fn.init=function(selector,context,root){

    };
    var _jQuery = window.jQuery,
         _$ = window.$;
//让渡 $ jQuery这个变量
    jQuery.noConflict = function( deep ) {
        if ( window.$ === jQuery ) {
            window.$ = _$;
        }
        if ( deep && window.jQuery === jQuery ) {
            window.jQuery = _jQuery;
        }
        return jQuery;
    };
    if ( !noGlobal ) {
        window.jQuery = window.$ = jQuery;
    }
});
