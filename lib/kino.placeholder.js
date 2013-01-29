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
             if ($this.val() === '') {
                 $this.val($this.attr('placeholder'));
             }
             else {
                 $this.data("user_value", $this.val());
             }
        });

         placeHolderItem.on('focus', setEmptyByData);

         placeHolderItem.on('blur', setPlaceHolderValue);

         return this;
    };

    $.fn.clearPlaceHolder = function () {
        if (config.isNativeSupport) {
            return this;
        }
        var placeHolderItem = this.filter("[placeholder]");
        placeHolderItem.each(function () {
            setEmptyByData.call(this);
        });
    };

    var setEmptyByData = function () {
        var $this = $(this);
        var user_value = $(this).data("user_value");
        if (typeof user_value === 'undefined' || user_value === '') {
            this.value = '';
        }
    }

    var setPlaceHolderValue = function () {
        var $this = $(this);
        var user_value = $this.val();
        $(this).data("user_value", user_value);

        if (user_value === '') {
            $this.val($this.attr('placeholder'));
        }
    };

})(window, jQuery);