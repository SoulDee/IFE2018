const picPre = document.querySelectorAll(".wrap ul li");
const picList = document.querySelectorAll(".wrap > img");

var slider = {
    // 为图片绑定动画 版本 2.0
    binding: function(data) {
        for (let i = 0; i < picPre.length; i++) {
            let aAnimation = data[i][0];
            let time = data[i][1];
            
            picPre[i].addEventListener("click", function () {
                slider.touchAnimation(i, aAnimation, time);
            }, false);
        }
    },
    // 绑定事件，动画
    touchAnimation: function (i, aAnimation, time) {
        picList[i].style.animation = aAnimation;
        // 延迟去掉动画，使之能够多次播放
        setTimeout(() => {
            picList[i].style.animation = '';
        }, time);
        slider.addLevel();
        picList[i].classList.add("show");
    },
    // 增加层次,实现上一张点击的图片会放在中间层次
    addLevel: function () {
        // 增加中间层
        for (let i = 0; i < picList.length; i++) {
            picList[i].classList.remove("show-mid");
            if (picList[i].classList.contains("show") === true) {
                picList[i].classList.add("show-mid");
            }
        }
        // 移除所有上层
        for (let i = 0; i < picList.length; i++) {
            picList[i].classList.remove("show");
        }
    }
}
// 传入数据版本 v2.0
slider.binding([
    ["left-in 0.5s ease-out", 500],
    ["bottom-in 0.5s ease-out", 500],
    ["amplifier 1s ease-in", 1000],
    ["shrink 1s ease-out", 1000],
    ["rotate-amplifier 0.7s ease-in-out", 700]
]);