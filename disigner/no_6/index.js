const picPre = document.querySelectorAll(".wrap ul li");
const picList = document.querySelectorAll(".wrap > img");
let mid = 0;
let index = 0;
var slider = {
    // 为图片绑定动画 版本 2.0
    binding: function(data) {
        for (let i = 0; i < picPre.length; i++) {
            let aAnimation = data[i][0];
            let time = data[i][1];
            
            picPre[i].addEventListener("click", function(event) {
                // 获取点击的元素的下标,等价于jquery的list.indexOf(elt)
                index = [].indexOf.call(picPre, event.target);
                // 判断是否重复点击，是的话不更改层级，不是的话才更改
                if (picList[index].classList.contains("show") === true) {
                    slider.touchAnimation(index, aAnimation, time);
                }else {
                    slider.touchAnimation(index, aAnimation, time);
                    slider.addLevel(index, mid);
                    mid = index;
                }
            }, false);
        }
    },
    // 绑定事件，动画
    touchAnimation: function (index, aAnimation, time) {
        picList[index].style.animation = aAnimation;
        // 延迟去掉动画，使之能够多次播放
        setTimeout(() => {
            picList[index].style.animation = '';
        }, time);
    },
    // 增加层次
    addLevel: function (index, mid) {
        // 移除所有中间层和顶层
        for (let i = 0; i < picList.length; i++) {
            picList[i].classList.remove("show-mid");
            picList[i].classList.remove("show");
        }
        // 按照获得的下标绑定
        picList[index].classList.add("show");
        picList[mid].classList.add("show-mid");
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