/*  原文链接：https://blog.csdn.net/yiifaa/article/details/52372022

1. keydown事件发生时，输入值并没有发生变化，所以keydown可用于阻止某些输入字符的显示。
2. input事件发生时，无法获取到keyCode值，并且紧随在keydown事件之后。
3. keyup事件最后发生，一次键盘敲入事件彻底完成。
4. change事件只会发生在输入完成后，也就是输入框失去焦点之前。

当用户完成所有的输入时，这时候必定会发生blur事件，只有这时才会触发change，所以可用blur与change监听用户输入是否完成，输入框的验证多半发生在此时
*/

window.onload = function () {
    let result = [];
    //  change 后才会发生 注册blur事件
    username.addEventListener("blur", function (event) {
        result.push({
            event: 'blur',
            value: this.value,
            keyCode: event.keyCode
        });
        //  输出结果
        console.table(result);
    })
    //  注册keydown事件: 还未能获取值
    username.addEventListener("keydown", function (event) {
        result.push({
            event: 'keydown',
            value: this.value,
            keyCode: event.keyCode
        });
    });
    //  注册input事件：可以获取到值
    username.addEventListener("input", function (event) {
        result.push({
            event: 'input',
            value: this.value,
            keyCode: event.keyCode
        });
    })
    //  注册keyup事件
    username.addEventListener("keyup", function (event) {
        result.push({
            event: 'keyup',
            value: this.value,
            keyCode: event.keyCode
        });
    });
    //  注册change事件
    username.addEventListener("change", function (event) {
        result.push({
            event: 'change',
            value: this.value,
            keyCode: event.keyCode
        });
        //  输出结果
        console.table(result);
    });
    //  没有 ： 注册click事件
    username.addEventListener("click", function (event) {
        result.push({
            event: 'blur',
            value: this.value,
            keyCode: event.keyCode
        });
        //  输出结果
        console.table(result);
    })
}