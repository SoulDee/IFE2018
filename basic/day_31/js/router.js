// 序列化
function serialize(object) {
    let str = '?';
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            str += `${key}=${object[key].join(',')}&`;
        }
    }
    str = str.substring(0, str.length-1);
    return encodeURI(str);
}
// 压进浏览历史
setStatus = () => history.pushState(choiceSelect, null, getStatus());;
// 获取历史状态对象
getStatus = () => serialize(choiceSelect);
// 监控是否前进或者后退
window.onpopstate = (e) => {
    var currentState = history.state; 
    if (currentState) historyDraw(currentState);
}
// 根据状态的更改进行动作
function historyDraw(obj) {
    choiceSelect = obj;
    inputChange();
    draw(getData(choiceSelect));
}
// 更改选中状态
function inputChange() {
    let inputList = document.querySelectorAll('.select-box input');
    for (let i = 0; i < inputList.length; i++) {
        if (choiceSelect.product.indexOf(inputList[i].value) !== -1 || choiceSelect.region.indexOf(inputList[i].value) !== -1) {
            inputList[i].checked = true;
        } else {
            inputList[i].checked = false;
        }
    }
}

// 哈希方案

// 渲染
// function hashDraw() {
//     choiceSelect = getHash();
//     inputChange();
//     draw(getData(choiceSelect));
// }

// 哈希值监控
// window.onhashchange = function() {
//     hashDraw();
// }

// 获取哈希对象
// function getHash() {
//     let hash = location.hash.substring(1) || '';
//     let obj = {};
//     // 将hash按照&切分成 contABC=a,b,c
//     let items = hash.split('&');
//     // 每个部分单独创建成一个对象
//     for (let i = 0; i < items.length; i++) {
//         // 按照=切分成contABC 和 a,b,c
//         let keys = items[i].split('=');
//         obj[keys[0]] = decodeURI(keys[1]).split(',');
//     }
//     return obj;
// }

// 设置hash
// setHash= () => location.hash = serialize(choiceSelect);