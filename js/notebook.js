var icon = document.querySelector(".icon");
var aside = document.querySelector("aside");
// 导航的显示
icon.addEventListener("click",function(){
    aside.classList.toggle("appear");
},false);
// 点击其他地方移除导航
document.addEventListener("click",function(){
    aside.classList.remove("appear");
},true)
