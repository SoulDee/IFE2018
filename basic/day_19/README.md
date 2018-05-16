# js高级选择器

## querySelector( )方法

接收一个CSS选择符，返回匹配的**第一个元素**，没有找到则返回**null**，如果传入的不被支持的选择符则会抛出错误。
```
// 获取类名为btn的元素
var btn = document.querySelector(".btn");
```
querySelector( )方法可以被Document类型调用也可以被Element类型调用，这意味着你可以先获得元素之后再用高级选择器选择，如下所示
```
// 先获取id为section的元素，然后再改元素下搜索类名为btn的元素
var btn = document.getElementById("#section").querySelector(".btn");
```

## querySelectorAll( )方法

接收一个CSS选择符，返回一个Nodelist**对象**，该对象包含所有匹配选择符的**所有元素**以及这些元素当中的所有属性和方法，没有找到则返回**空对象**，如果传入的不被支持的选择符则会抛出错误。
```
// 获取类名为btn的所有元素
var btn = document.querySelectorAll(".btn");
```
同样的querySelectorAll( )方法可以被Document类型调用也可以被Element类型调用。
### 参考

[JavaScript高级程序设计（第3版）第11章 11.1](http://zh.learnlayout.com/toc.html)

[MDN querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelectorAll)

[MDN document.querySelctor](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/querySelector)

[MDN element.querySelector](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/querySelector)
