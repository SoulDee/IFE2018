var btn = document.querySelector("button");
var title = document.querySelector("h1");
var banner = document.querySelector("span");


btn.addEventListener("click",function(){
    banner.classList.toggle("skin");
    title.classList.toggle("color-blue");
},false);