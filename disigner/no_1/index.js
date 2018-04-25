var btn = document.querySelector("button");
var title = document.querySelector("h1");
var banner = document.querySelector("span");


btn.addEventListener("click",function(){
    banner.classList.toggle("skin");
    title.classList.toggle("color-blue");
    btn.classList.add("press");
    // 添加一个press类增加按下后闪烁效果，然后马上移除类，实现多次执行
    setTimeout(() => {
        btn.classList.remove("press");
    }, 100);
},false);