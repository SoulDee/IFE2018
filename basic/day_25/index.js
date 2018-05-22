let box = document.querySelector("#test1 .box");
let direction = "bottom";
let boxAngle = angle(direction);
let btn = document.getElementById("btn1");

btn.addEventListener("click",function() {
    turnLeft();

},false);

// 获取初始角度
function angle(direction) {
    let angle = 0;
    switch (direction) {
        case 'top':
            angle = 0;
            break;
        case 'right':
            angle = 90;
            break;
        case 'bottom':
            angle = 180;
            break;
        case 'left':
            angle = 270;
            break;
        default:
            break;
    }
    return angle;
}

// 前进
function go(n = 0) {
    let top = parseInt(box.style.marginTop);
    let left = parseInt(box.style.marginLeft);
    
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
};
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
