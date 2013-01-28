/// <reference path="qunit/qunit.js" />
/// <reference path="../lib/kino.placeholder.js" />
/// <reference path="../lib/jquery.js" />


var TestSuit = {
    container: null,
    usePlaceHolder: function () {
        this.container = document.createElement("div");
        this.container.innerHTML = "<input type='text' placeholder='hello world' />";

        $(this.container).find('input').placeholder();
        return this;
    },
    $el: function (index) {
        return $(this.container).find('input:eq(' + index + ')');
    }
};


module("placeholder", {
    setup: function () {
        $.placeholderTestConfig({
            enableTest: true,
            isNativeSupport: false,
            testFn: function () {

            }
        });
    }
});


test("如果浏览器原生支持元素placeholder属性,函数将不进行任何处理", function () {
    expect(0);

    $.placeholderTestConfig({        
        isNativeSupport: true,
        testFn: function () {
            ok(false);
        }
    });

    TestSuit.usePlaceHolder();

});

test("调用placeholder方法后，将会把placeholder的值显示到输入框", function () {
    equal(TestSuit.usePlaceHolder().$el(0).val(), "hello world");
});

test("如果输入框原本内容为空，触发焦点后，输入框内的placeholder值将被清空", function () {
    equal(TestSuit.usePlaceHolder().$el(0).trigger("focus").val(), "");
});

test("如果输入框原本内容为空，离开焦点后，placeholder值将重新被填充", function () {
    equal(TestSuit.usePlaceHolder().$el(0).trigger("focus").trigger("blur").val(), "hello world")
});

test("如果输入框原本内容不为空，离开焦点后，placeholder值将不会重新被填充", function () {
    equal(TestSuit.usePlaceHolder().$el(0).trigger("focus").val("new text").trigger("blur").val(), "new text")
});

test("如果输入框原本内容不为空，触发焦点后，输入框内的placeholder值将不会被清空", function () {
    equal(TestSuit.usePlaceHolder().$el(0).trigger("focus").val("new text").trigger("blur").trigger("focus").val(), "new text");
});

