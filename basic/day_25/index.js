// ------------------------------- 这里是任务一 -------------------------------------------
let result = document.querySelector("p");
// 前进
function go() {  
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
    boxAngle = boxAngle-90;
    box.style.transform = `rotateZ(${boxAngle}deg)`;
    console.log(boxAngle);
};
// 右转
function turnRight() {
    turnLeft();
    turnLeft();
    turnLeft();
}
// 测试用例
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

//  ------------------------------- 这里是任务二 ---------------------------------------------


let time = document.getElementById("test2");
const today = ["日","一","二","三","四","五","六"];
let t = setInterval("isTime()",1000);

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
    
    console.log(day.getUTCHours());
    
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
let t2 = setInterval("isTime2()", 1000);
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

    console.log(day.getUTCHours());

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


// ------------------------------------------ 以下是待填坑，请忽略 ---------------------------------------

// let box = document.querySelector("#test1 .box");
// let direction = "bottom";
// let boxAngle = angle(direction);
// let btn = document.getElementById("btn1");

// 前进
// function go(n = 0) {
    // let top = parseInt(box.style.marginTop);
    // let left = parseInt(box.style.marginLeft);

    // switch (direction) {
    //     case "top":
    //         box.style.marginTop = (top - n*30) + "px";
    //         break;
    //     case "right":
    //         box.style.marginLeft = (left + n*30) + "px";
    //         break;
    //     case "bottom":
    //         box.style.marginTop = (top + n*30) + "px";
    //         break;
    //     case "left":
    //         box.style.marginLeft = (left - n*30) + "px";
    //         break;
    //     default:
    //         break;
    // }
// };

// 开始按钮
// btn.addEventListener("click",function() {

// },false);

// 获取初始角度
// function angle(direction) {
//     let angle = 0;
//     switch (direction) {
//         case 'top':
//             angle = 0;
//             break;
//         case 'right':
//             angle = 90;
//             break;
//         case 'bottom':
//             angle = 180;
//             break;
//         case 'left':
//             angle = 270;
//             break;
//         default:
//             break;
//     }
//     return angle;
// }