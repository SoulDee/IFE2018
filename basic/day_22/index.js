let queue = ["apple", "pear", "aa"];
let queueCont = document.getElementById("queue-cont");
let queueInput = document.getElementById("queue-input");
let btnList = document.getElementById("btn-list");

let stack = ["apple", "pear", "bb"];
let stackCont = document.getElementById("stack-cont");
let stackInput = document.getElementById("stack-input");
let btn2List = document.getElementById("btn2-list");

// 事件单元部分
let EventUtil = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    getEvent: function (event) {
        return event ? event : window.event;
    },
    getTarget: function (event) {
        return event.target || event.srcElement;
    },
};


// 队列与栈的更新
function updata() {
    let queueStr = queue.join(" &lt- ");
    let stackStr = stack.join(" -&gt");
    queueCont.innerHTML = "队列内容:" + queueStr;
    stackCont.innerHTML = "栈内容：" + stackStr;
}


// 绑定队列的相关方法
EventUtil.addHandler(btnList, "click", function (event) {
    event = EventUtil.getEvent();
    let target = EventUtil.getTarget(event);

    switch (target.id) {
        case 'in-btn':
            if (queueInput.value !== '' ) {
                queue.push(queueInput.value);
            }
            updata();
            break;
        case 'out-btn':
            queue.shift();
            updata();
            break;
        case 'font-btn':
            if (queue.length == 0) {
                queueCont.innerText = "当前队列为空";
            }else {
                queueCont.innerText = "队头元素:" + queue[0];
            }
            break;
        case 'empty-btn':
            if (queue.length == 0) {
                queueCont.innerText = "当前队列为空";
            }else {
                queueCont.innerText = "队列长度:" + queue.length;
            }
            break;
        default:
            break;
    }

    queueInput.value = '';
    queueInput.focus();
});

// 绑定栈的相关方法
EventUtil.addHandler(btn2List, "click", function (event) {
    event = EventUtil.getEvent();
    let target = EventUtil.getTarget(event);

    switch (target.id) {
        case 'push-btn':
            if (stackInput.value !== '') {
                stack.push(stackInput.value);
            }
            updata();
            break;
        case 'pop-btn':
            stack.pop();
            updata();
            break;
        case 'font2-btn':
            if (stack.length == 0) {
                stackCont.innerText = "当前队列为空";
            } else {
                stackCont.innerText = "队头元素:" + stack[stack.length-1];
            }
            break;
        case 'empty2-btn':
            if (stack.length == 0) {
                stackCont.innerText = "当前队列为空";
            } else {
                stackCont.innerText = "队列长度:" + stack.length;
            }
            break;
        default:
            break;
    }
});

// updata();