## Slider实现思路与优化

### 初始思路

通过js获取图片列表，预览列表，然后为每一预览都绑定一个点击后增加动画的的点击事件,并增加一个z轴方向上的高度，使得这张图片处在最上面不会被盖住。
```
// css当中展示类
.show {
    z-index: 100;
}
// js代码
const picPre = document.querySelectorAll(".wrap ul li");
const picList = document.querySelectorAll(".wrap > img");

picPre[0].addEventListener("click", function () {
    picList[0].style.animation = "left-in 0.5s ease-out";
        picList[i].classList.add("show");
}, false);
// 省略若干代码...
```

然后发现动画是实现了，但是出现了三个问题

1.是代码冗长，一眼看过去就是一坨，并且很多步骤都是重复的。

2.动画只能播放一次，之后点击无反应。

3.动画切换的过程当中你会发现最底层的是html中排在最后的图片而不是上一张图片。

### 第一次优化

先是解决了动画只能播放一次的问题，在绑定动画之后增加删除动画的函数，延迟同播放时间相同的秒数，实现多次播放。

```
setTimeout(() => {
    picList[0].style.animation = '';
}, 500);
```

接着解决层级问题。增加了一个增加层次的函数，思路是每一次点击的时候先检测是否有show类名，有的话增加一个show-mid类使之成为中间层，然后遍历所有图片，去掉所有图片的show类，为刚刚点击的图片增加show类。这样子就实现了每次只有一张图片在最上面，以及上一张图片处于中间层。

```
// CSS代码
.show-mid {
    z-index: 50;
}
// js代码
function addLevel(){
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
```
然后你会发现现在的核心代码变成
```
picPre[0].addEventListener("click", function () {
    picList[0].style.animation = "left-in 0.5s ease-out";
    // 省略，就是上面你的延时函数
    addLevel()；
    picList[i].classList.add("show");
}, false);
```
然后你会发现代码更加冗长了，而且依然很多重复，于是想到，为什么不把绑定的过程也写成一个方法?通过switch和for循环结合，传入三个参数就行。
```
for (let i = 0; i < picList.length; i++) {
	let aAnimation = '';
    let time = 0;
    switch(i) {
	    case 0:
          aAnimation = "left-in 0.5s ease-out";
          time = 500;
          break;
	// 以下略
	}
	picPre[i].addEventListener("click", function () {
	    touchAnimation(i, aAnimation, time);
}, false);
}
touchAnimation: function (i, aAnimation, time) {
    picList[i].style.animation = aAnimation;
    setTimeout(() => {
        picList[i].style.animation = '';
    }, time);
    addLevel();
    picList[i].classList.add("show");
}
```
然后想了想，为什么不把这些写进一个对象里面成为方法呢？
```
var slider = {
	 binding: function() { }, // 绑定
	 touchAnimation: function (i, aAnimation, time){},// 实际绑定
	 addLevel: function () {}// 增加层级
}
```

### 第二次优化

第一次优化之后功能实现了，三个问题也相对解决了，但是还是看着不爽，尤其是那个switch还是感觉很长，转念一想，既然是对象当中的方法，那为什么不做成一个可以动态更改的呢？最后只需要做的是传入一个二维数组，然后就可以处理数据了。以后有其他的动画的时候也不用改很多代码。
```
var slider = {
	binding: function(data) {
	    for (let i = 0; i < picPre.length; i++) {
	        let aAnimation = data[i][0];
	        let time = data[i][1];
	        //略...
	    }
	}
}
// 在最后传入数据
slider.binding([
    ["left-in 0.5s ease-out", 500],
    ["bottom-in 0.5s ease-out", 500],
    ["amplifier 1s ease-in", 1000],
    ["shrink 1s ease-out", 1000],
    ["rotate-amplifier 0.7s ease-in-out", 700]
]);
```

### 一些未解决的问题和想法

#### 出现的问题
完成之后发现一个问题，那就是刚进入页面的时候或者刷新的时候会看到图片居然是有不完全覆盖的，但是只出现了一瞬然后就正常了，之后触发动画也没有问题出现。

#### 想法
有这么一个想法，既然数据动画能够动态的修改传入，那么图片呢？能不能给传入的data数组再增加一个两个图片路径，然后增加方法，实现dom动态插入图片和预览？然后再增加动画。这样子的话这个以后想要实现几张图都只要在img文件夹放入图片，然后在data那里填入路径和想要实现的动画和时间不就行了？

待尝试.........