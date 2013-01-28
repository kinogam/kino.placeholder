/// <reference path="jquery.js" />

(function placeHolderInit(exports, $) {
    var config = {
        enableTest: false,
        isNativeSupport: 'placeholder' in document.createElement('input'),
        testFn: function () { }
    };


    $.placeholderTestConfig = function (options) {
        for (var prop in options) {
            config[prop] = options[prop];
        }
    };

    $.fn.placeholder = function () {

        if (config.isNativeSupport) {
            return this;
        }

        if (config.enableTest) {
            config.testFn();
        }

        var placeHolderItem = this.filter("[placeholder]");

         placeHolderItem.each(function () {
            var $this = $(this);
            $this.val($this.attr('placeholder'));
        });

         placeHolderItem.on('focus', function () {
             var user_value = $(this).data("user_value");
             if (typeof user_value === 'undefined' || user_value === '') {
                 this.value = '';
             }
             
         });

         placeHolderItem.on('blur', function () {
             var $this = $(this);
             var user_value = $this.val();
             $(this).data("user_value", user_value);

             if (user_value === '') {
                 $this.val($this.attr('placeholder'));
             }
         });

         return this;
    };

})(window, jQuery);