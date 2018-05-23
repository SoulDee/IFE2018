// 事件单元
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
    getEvent: function (event) {                      //跨浏览器获取event对象
        return event ? event : window.event;
    },
    getTarget: function (event) {                     //跨浏览器获取作用对象
        return event.target || event.srcElement;
    }
};



// ------------------------------- 这里是任务一 -------------------------------------------
const WIDTH = document.body.clientWidth;
const HEIGHT = document.body.clientHeight;
let box = document.querySelector(".box");
let beginAngle = 0;
EventUtil.addHandler(document, 'keydown', function (e) {
    let key = e.keyCode;
    switch (key) {
        case 37:
            turnLeft();
            break;
        case 38:
                go();
            break;
        case 39:
            turnRight();
            break;
        default:
            break;
    }
});


// 前进
function go() {
    let left = parseInt(box.style.left);
    let top = parseInt(box.style.top);
    let t = Math.abs(beginAngle / 90);
    let len = 30;
    console.log(left);
    console.log(top);
    
    
    if (left == 0 && t == 1) {
        t = t + 2;
    } else if (top == 0 && t == 0) {
        t = t + 2;
    }
    switch (t % 4) {
        case 0:
            box.style.top = (top - len) + 'px';
            break;
        case 1:
            box.style.left = (left - len) + 'px';
            break;
        case 2:
            box.style.top = (top + len) + 'px';
            break;
        case 3:
            box.style.left = (left + len) + 'px';
            break;
        default:
            break;
    }
    
}
// 多次前进
function goSteps(n = 1) {
    // 对输入的值进行过滤，转化为数字，然后判断是否数字以及大于0
    n = Math.floor(Number(n));
    if (isNaN(n) || n < 0) {
        n = 0;
    }
    console.log(n);
    while (n > 0) {
        go();
        n--;
    }
}
// 左转
function turnLeft(){
    beginAngle = parseInt(beginAngle) - 90;
    box.style.transform = `rotateZ(${beginAngle}deg)`;
};
// 右转
function turnRight() {
    turnLeft();
    turnLeft();
    turnLeft();
}
// 测试用例
function testItem() {
    goSteps(10); // Go 10次
    goSteps(1); // Go 1次
    goSteps(); // Go 1次，认为缺少参数时，默认参数为1
    goSteps(0);  // 0次
    goSteps(-1);  // 0次
    goSteps(1.4);  // Go 1次
    goSteps(1.6);  // Go 1次
    goSteps(-1);  // 0次
    goSteps(true);  // Go 1次
    goSteps(false);  // 0次
    goSteps("Test");  // 0次
    goSteps(NaN);  // 0次
    goSteps(null);  // 0次
}
testItem();
//  ------------------------------- 这里是任务二 ---------------------------------------------


let time = document.getElementById("test2");
const today = ["日","一","二","三","四","五","六"];
let t = setInterval("isTime();",1000);

// 封装一个函数，来根据某个日期返回这一天是星期几
function getToday(n) {
    return today[n];
}
// 封装一个函数，把月、日、小时等出现个位数的情况前面补充0，补充为两位，比如1变为01
function plus0(num) {
    if (num < 10) {
        num = `0${num.toString()}`;
    }
    return num;
}
// 封装一个函数，把最后的日期时间，按照要求的格式进行包装
function isTime() {
    let day = new Date();
    
    let year = day.getFullYear();
    let month = day.getMonth() + 1;
    let date = day.getDate();
    let aday = getToday(day.getDay());
    let hours = day.getHours();
    let minutes = day.getMinutes();
    let seconds = day.getSeconds();

    time.innerText = `${year}年 ${plus0(month)}月 ${plus0(date)}日 星期${plus0(aday)}  ${plus0(hours)}:${plus0(minutes)}:${plus0(seconds)}`;
}
isTime();

//  ------------------------------- 这里是任务三 ---------------------------------------------

let time2 = document.getElementById("test3");
let t2 = setInterval("isTime2();", 1000);
const today2 = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


// 封装一个函数，来根据某个日期返回这一天是星期几
function getToday2(n) {
    return today2[n];
}
// 封装一个函数判断是上午还是下午
function getAmOrPm(hours) {
    let amOrPm = '';
    if (hours >= 12) {
        amOrPm = "PM";
    } else {
        amOrPm = "AM";
    }
    return amOrPm;
}
// 封装一个函数，把最后的日期时间，按照要求的格式进行包装
function isTime2() {
    let day = new Date();

    let year = day.getFullYear();
    let month = day.getMonth() + 1;
    let date = day.getDate();
    let aday = getToday2(day.getDay());
    let hours = day.getHours();
    let minutes = day.getMinutes();
    let seconds = day.getSeconds();
    let amOrPm = getAmOrPm(hours);

    time2.innerText = `${year}-${plus0(month)}-${plus0(date)} ${aday}  ${plus0(hours)}:${plus0(minutes)}:${plus0(seconds)} ${amOrPm}`;
}
isTime2();


//  ------------------------------- 这里是任务四 ---------------------------------------------


let time3 = document.querySelector("#result-wrapper span:nth-child(4)");
let t3 = setInterval("isTime3();", 1000);
let testBox = document.getElementById("test4");
let yearSelect = document.getElementById("year-select");
let monthSelect = document.getElementById("month-select");
let choiceTime = new Date(1970, 0, 0, 0, 0, 0);

let choiceYear = 1970;
let choiceMonth = 0;
let choiceDate = 1;
let choiceHours = 0;
let choiceMinutes = 0;
let choiceSeconds = 0;
let changeDate = 0;

// 通过事件委托为每一select绑定更改事件
EventUtil.addHandler(testBox, "change", function (event) {
    event = EventUtil.getEvent();
    let target = EventUtil.getTarget(event);
    let option = checkedVal(target.id);
    let t = document.querySelector("#result-wrapper span:nth-child(2)");

    switch (target.id) {
        case 'year-select':
            choiceYear = option;
            break;
        case 'month-select':
            choiceMonth = option-1;
            break;
        case 'day-select':
            choiceDate = option;
            break;
        case 'hour-select':
            choiceHours = option;
            break;
        case 'minite-select':
            choiceMinutes = option;
            break;
        case 'second-select':
            choiceSeconds = option;
            break;
        default:
            break;
    }
    getDay(choiceMonth);
    console.log();
    
    t.innerText = ` ${choiceYear}年${choiceMonth+1}月${choiceDate}日 ${plus0(choiceHours)}:${plus0(choiceMinutes)}:${plus0(choiceSeconds)} `;
});
// 当更改月份的时候判断天数
EventUtil.addHandler(monthSelect, "change", function(){
    setTimeout(() => {
        createDay(changeDate);
    }, 30);
});
// 当更改年份的时候判断天数  都怪坑爹的二月份
EventUtil.addHandler(yearSelect, "change", function () {
    setTimeout(() => {
        createDay(changeDate);
    }, 30);
});
// 封装一个函数，把最后的日期时间，按照要求的格式进行包装
function isTime3() {
    let day = new Date();
    choiceTime = new Date(choiceYear, choiceMonth, choiceDate, plus0(choiceHours), plus0(choiceMinutes), plus0(choiceSeconds));

    let t = (day.getTime() - choiceTime.getTime()) / 1000;  
    
    let date = Math.floor(Math.abs(t / 86400));
    let hours = Math.floor(Math.abs(t % 86400 / 3600));
    let minutes = Math.floor(Math.abs(t % 3600 / 60));
    let seconds = Math.floor(Math.abs(t % 60));
    
    pastOrPresent(t);

    time3.innerHTML = ` ${Math.abs(date)}天 ${plus0(hours)}小时 ${plus0(minutes)}分 ${plus0(seconds)}秒`;
}
// 判断时间是超过了当前时间还是没有到达当前时间，改变文案
function pastOrPresent(date) {
    let text = document.querySelector("#result-wrapper span:nth-child(3)");
    if (date >= 0) {
        text.innerText = "过去";
    } else {
        text.innerText = "还有";
    }
}
// 每当选项改变的时候就返回改变后的选择数值
function checkedVal(id) {
    let option = document.getElementById(id).querySelectorAll("option");
    let val = 0;
    for (let index = 0; index < option.length; index++) {
        if (option[index].selected) {   
            return option[index].value;
        }
    }
}
// 创建单日元素
function createDay(n) {
    let day = document.getElementById("day-select");
    day.innerHTML = '';
    
    for (let index = 1; index <= n; index++) {
        let option = document.createElement("option");
        option.innerText = index;
        option.value = index;
        day.appendChild(option);
    }
}
// 获得不同月数的不同天数
function getDay(n) {
    let aNum = parseInt(n);
    let num = 0;
    switch (aNum) {
        case 1:
            if (choiceYear % 4 === 0 && choiceYear % 100 !== 0) {
                num = 29;
            } else {
                num = 28;
            }
            break;
        case 3:
        case 5:
        case 8:
        case 10:
            num = 30;
            break;
        case 0:
        case 2:
        case 4:
        case 6:
        case 7:
        case 9:
        case 11:
            num = 31;
            break;
        default:
            break;
    }
    changeDate = num;
}
isTime3();