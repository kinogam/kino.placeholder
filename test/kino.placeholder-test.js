/// <reference path="qunit/qunit.js" />
/// <reference path="../lib/kino.placeholder.js" />
/// <reference path="../lib/jquery.js" />


var TestSuit = {
    container: null,
    placeHolderInput: null,
    init: function(){
        this.container = document.createElement("div");
        this.container.innerHTML = "<input type='text' placeholder='hello world' /><input type='text' />";
        this.placeHolderInput = $(this.container).find("[placeholder]")[0]
    },
    getPlaceHolderInputFrontColor: function () {
        var color = this.placeHolderInput.style.color;
        if(color == 'rgb(187, 187, 187)'){
            color = "#bbb";
        }
        return color;
    },
    getPlaceHolderInputValue: function () {
        return this.placeHolderInput.value;
    },
    setPlaceHolderInputValue: function (val) {
        $(this.placeHolderInput).val(val);
        return this;
    },
    focusOnPlaceHolderInput: function () {
        $(this.placeHolderInput).trigger("focus");
        return this;
    },
    blurOnPlaceHolderInput: function () {
        $(this.placeHolderInput).trigger("blur");
        return this;
    },
    afterUsePlaceHolder: function () {
        $(this.container).find('input').placeholder();        
        return this;
    },
    clearPlaceHolder: function () {
        $(this.container).find('input').clearPlaceHolder();
        return this;
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

        TestSuit.init();
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

    TestSuit.afterUsePlaceHolder();

});

test("调用placeholder方法后，将会把placeholder的值显示到输入框", function () {
    equal(TestSuit.afterUsePlaceHolder()
        .getPlaceHolderInputValue(),
        "hello world");
});

test("如果输入框原本内容为空，触发焦点后，输入框内的placeholder值将被清空", function () {
    equal(TestSuit.afterUsePlaceHolder()
        .focusOnPlaceHolderInput()
        .getPlaceHolderInputValue(),
        "");
});

test("如果输入框原本内容为空，离开焦点后，placeholder值将重新被填充", function () {
    equal(TestSuit.afterUsePlaceHolder()
        .focusOnPlaceHolderInput()
        .blurOnPlaceHolderInput()
        .getPlaceHolderInputValue()
        , "hello world")
});

test("如果输入框原本内容不为空，离开焦点后，placeholder值将不会重新被填充", function () {
    equal(TestSuit.afterUsePlaceHolder()
        .focusOnPlaceHolderInput()
        .setPlaceHolderInputValue("new text")
        .blurOnPlaceHolderInput()
        .getPlaceHolderInputValue(),
        "new text")
});

test("如果输入框原本内容不为空，触发焦点后，输入框内的placeholder值将不会被清空", function () {
    equal(TestSuit.afterUsePlaceHolder()
        .focusOnPlaceHolderInput()
        .setPlaceHolderInputValue("new text")
        .blurOnPlaceHolderInput()
        .focusOnPlaceHolderInput()
        .getPlaceHolderInputValue(),
        "new text");
});

test("如果浏览器原生支持元素placeholder属性,clearPlaceHolder将不进行任何处理", function () {
    expect(0);
    $.placeholderTestConfig({
        isNativeSupport: true,
        testFn: function () {
            ok(false);
        }
    });

    TestSuit.afterUsePlaceHolder().clearPlaceHolder();
});

//clearPlaceHolder 只是执行 输入框的值的清理，不移除事件

test("执行clearPlaceHolder操作后，如果输入框原本为空，则其值也为空", function () {
    equal(TestSuit
        .afterUsePlaceHolder()
        .clearPlaceHolder()
        .getPlaceHolderInputValue(),
        "");
});

test("执行clearPlaceHolder操作后，如果输入框原本为不空，则其值不改变", function () {
    equal(TestSuit
        .afterUsePlaceHolder()
        .focusOnPlaceHolderInput()
        .setPlaceHolderInputValue("new text")
        .blurOnPlaceHolderInput()
        .clearPlaceHolder()
        .getPlaceHolderInputValue(),
        "new text");
});

test("如果使用placeHolder之前，输入框已经有值，则触发焦点之后，输入框保持原有值", function () {
    equal(TestSuit
       .setPlaceHolderInputValue("new text")
       .afterUsePlaceHolder()
       .focusOnPlaceHolderInput()
       .getPlaceHolderInputValue(),
       "new text");
});

test("如果使用placeHolder之后，输入框的值被其他脚本动态填充，则触发焦点之后，输入框保持原有值", function () {
    equal(TestSuit
   .afterUsePlaceHolder()
   .focusOnPlaceHolderInput()
   .setPlaceHolderInputValue("other text")
   .getPlaceHolderInputValue(),
   "other text");
});

test("如果使用placeHolder之后，输入框的值被其他脚本动态填充，则离开焦点之后，输入框保持原有值", function () {
    equal(TestSuit
   .afterUsePlaceHolder()
   .setPlaceHolderInputValue("other text2")
   .blurOnPlaceHolderInput()
   .getPlaceHolderInputValue(),
   "other text2");
});

test("placeHolder值显示的时候为灰色(#bbb)", function () {
    equal(TestSuit
    .afterUsePlaceHolder()
    .getPlaceHolderInputFrontColor(),
    "#bbb");

    equal(TestSuit
    .focusOnPlaceHolderInput()
    .blurOnPlaceHolderInput()
    .getPlaceHolderInputFrontColor(),
    "#bbb");
});

test("输入框填写的时候，字体颜色不为灰色(#bbb)", function () {
    notEqual(TestSuit
    .afterUsePlaceHolder()
    .focusOnPlaceHolderInput()
    .setPlaceHolderInputValue("xxx")
    .getPlaceHolderInputFrontColor(),
    "#bbb");
});