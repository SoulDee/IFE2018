// 邮箱后缀参考
const postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];
const textInput = document.getElementById("email-input");
let list = document.getElementById("email-sug-wrapper");
let indexStatu = 1;
// 事件单元
var EventUtil = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    getEvent: function (event) {                      //跨浏览器获取event对象
        return event ? event : window.event;
    },
    getTarget: function (event) {                     //跨浏览器获取作用对象
        return event.target || event.srcElement;
    }
};
// 为输入框绑定输入改变事件
EventUtil.addHandler(textInput, "input", function () {
    let text = trim(textInput.value); 
    isDisapper(text);
    // 输入的话重置状态
    checkedStatu(1);
    indexStatu = 1;
    emailCheck();
})
// 通过事件委托为每个选项绑定事件 更换输入框的内容
EventUtil.addHandler(list, "click", function () {
    let e = EventUtil.getEvent();
    let target = EventUtil.getTarget(e);
    // 检测是否点击的是li标签
    if (e.toElement.localName === 'li') {
        textInput.value = target.innerText;
        addDisapper();
    }
});
// 绑定事件，是否点击上下按键
EventUtil.addHandler(document.body, 'keydown', function () {
    let e = EventUtil.getEvent();
    switch (e.keyCode) {
        case 38:
            changeStatu('down');
            break;
        case 40:
            changeStatu('up');
            break;
        case 27:
            textInput.select();
            break;
        case 13:
            enterText();
            emailCheck();
            break;
        default:
            break;
    }
});
// 去除前后空格返回正确的邮箱格式
function trim(str) {
    return str.replace( /(^\s*)|(\s*$)/g, "");
}
// 创建补足后缀的列表
function reCreate(text) {
    let val = check(text);
    list.innerHTML = '';
    if ((typeof val) === 'string') {
        createAll(val);
    }else{
        createMatch(val[0], val[1]);
    }
}
// @之后的未匹配正确创建全部列表
function createAll(val) {
    for (let i = 0; i < postfixList.length; i++) {
        let li = document.createElement("li");
        li.innerText = `${val}@${postfixList[i]}`;
        list.appendChild(li);
    }
}
// @之后的匹配正确创建部分列表
function createMatch(val, add) {
    let arr = isMatch(add);
    if (add === '') {
        createAll(val);
    }else if (arr.length !== 0) {
        for (let i = 0; i < arr.length; i++) {
            let li = document.createElement("li");
            li.innerText = `${val}@${arr[i]}`;
            list.appendChild(li);
        }
    }else{
        createAll(val);
    }
}
// 检测是否满足匹配，返回一个包含匹配的数组
function isMatch(add) {
    let arr = [];
    let pattern = new RegExp('^' + add);
    arr = postfixList.filter(function (val) {
        return pattern.test(val);
    });
    return arr;
}
// 隐藏还是显示判断
function isDisapper(text) {
    if (text == '') {
        addDisapper();
    } else {
        removeDisapper();
        reCreate(text);
    }
}
// 隐藏
function addDisapper() {
    list.classList.add('disapper');
}
// 显示
function removeDisapper() {
    list.classList.remove('disapper');
}
// 用户输入@时候则将@前面的内容剪切同后缀拼接
function trim_front(str) {
    let arr = str.split("@"); 
    return arr;
}
// 检测用户输入是否带有@
function check(str) {
    if (str.indexOf('@') !== -1) { 
        return trim_front(str);
    }
    return str;
}
// 为li添加一个选中的状态
function checkedStatu(n) {
    removeStatu();
    let index = document.querySelector(`#email-sug-wrapper li:nth-child(${n})`);
    index.classList.add('checkedStatu');
}
function changeStatu(str) {
    switch (str) {
        case 'down':
            if (indexStatu <= 1) {
                indexStatu = postfixList.length;
            }else {
                indexStatu--;
            }
            break;
        case 'up':
            if (indexStatu >= postfixList.length) {
                indexStatu = 1;
            } else {
                indexStatu++;
            }
            break;
        default:
            break;
    }
    checkedStatu(indexStatu);
}
// 移除所有checkedStatu类名
function removeStatu() {
    let list = document.querySelectorAll("#email-sug-wrapper li");
    for (let index = 0; index < list.length; index++) {
        list[index].classList.remove('checkedStatu');
    }
}
// 获取当前有checkedStatu类名的li的下标
function getStatu() {
    let list = document.querySelectorAll("#email-sug-wrapper li");
    for (let index = 0; index < list.length; index++) {
        if (list[index].classList.contains('checkedStatu')) {
            return index;
        }
    }
}
function enterText() {
    let index = getStatu();
    textInput.value = list.childNodes[index].innerText;
    addDisapper();
}
// 邮箱格式检测
function emailCheck() {
    const pattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    let icon = document.querySelector(".icon");
    console.log(textInput.value);
    
    if (pattern.test(textInput.value)) {
        icon.style.color = "green";
        icon.innerHTML = "✔";
    }else {
        icon.style.color = "red";
        icon.innerHTML = "✘";
    }  
}
// 进入页面聚焦
textInput.focus();