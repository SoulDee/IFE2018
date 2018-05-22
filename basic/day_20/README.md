#  事件详解与性能优化（事件委托）

## 1 事件流

1）首先为事件做一个定义，什么是事件？

在js高程三当中对于事件的定义是：**事件，就是文档或浏览器窗口中发生的一些特定的交互瞬间**，我们鼠标点击的时候是事件，鼠标移入移出某个元素的时候也是事件，通过事件我们可以同我们的页面进行交流，交互。

2）那么事件流又是什么呢？

**"页面中接收事件的顺序"**也就是事件发生的时候，是按照怎么样的顺序进行的。事件流分为三个阶段，捕获阶段，目标阶段，冒泡阶段。一下面html为例
```
 // html
<html>
<body>
    <div></div>
</body>
</html>

// css
div {
   background: #ccc;
   width: 100px;
   height: 100px;
}
```
（1）事件冒泡阶段

由最具体的实际触发的元素开始，由dom节点往上传播到最不具体的元素，一般是document。以上面栗子来演示，当你点击div的时候，传播顺序为` div > body > html > document`,我们来添加dom0级处理程序（dom0级是在冒泡阶段处理的）。
```
document.onclick = function () {
	alert(3);
}
document.body.onclick = function () {
	alert(2);
}       
div.onclick = function () {
	alert(1);
}
```
当你点击div时候会依次弹出1,2,3，调换绑定顺序后也不会变化。证明了冒泡的顺序。
（2） 事件捕获阶段

事件由最不具体的元素往下传播到实际触发的元素。还是上面的栗子，当你点击div的时候，事件传播顺序是`document > html > body > div`,同样的我们通过dom2级处理程序给他们添加事件，并制定捕获，你会发现弹出顺序同上面是相反的。

（3）一个完整的事件流

一个完整的dom2级事件的事件流包括三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段。并且处于目标阶段会被看成冒泡阶段的一部分，因此实际上一个完整的事件流应该是：

**捕获（document  > html > body ） >  冒泡（div > body > html > document）**

## 2 事件处理程序

**事件处理程序就是对于事件的响应**，事件处理程序有许多种，分别讨论。

1） HTML事件处理程序

在HTML的元素上直接绑定

```
// 直接绑定js代码或者也可以是一个函数调用 onclick="show()"
<input type="button" value="Click Me" onclick="alert(1)"/>
```

很简单，但是不推荐这么使用，因为存在时差问题，也就是当你在上面按钮定义了调用函数，而函数写在最下面，按钮加载了函数还没有加载，此时按下按钮就会报错，此外作用域链在不同浏览器会有不同的结果。还有就是违反了结构层、行为层分开的最佳实践，更改不方面。

2） DOM0 级事件处理程序

```
// 添加事件
btn.onclick = function(){  
	alert("Clicked");
};
// 删除事件处理程序
btn.onclick = null;  
```

以这种方法添加的事件处理程序是在事件流的冒牌阶段被处理，优点是简单而且跨浏览器，但是不能绑定多个事件。绑定多个的话只会执行最后一个。

3） DOM2级事件处理程序

```
// 添加事件1
btn.addEventListener("click", task1, false);
// 添加事件2
btn.addEventListener("click", task2, false); 
//移除事件
btn.removeEventListener("click", task1 , false); 
//用于停止冒泡
btn.stopPropagation();
```

`addEventListener( )`接收三个参数（事件，函数，布尔值），事件参数不再加on。直接用双引号包裹，函数参数可以是一个匿名函数，也可以写函数名调用函数，最后的布尔值决定事件是冒泡还是捕获，默认为false为冒泡阶段，非特殊情况都适用冒泡。并且可以添加多个事件。如上添加事件2也是有效的。

`removeEventListener( )`接收参数同上，需要注意的是移除一个事件需要参数完全一样才可以移除，并且如果要移除的是一个匿名函数是无效的，因为实际是两个不同的函数。如下所示就是无效的。

```
btn.addEventListener("click", function(){}, false);
btn.removeEventListener("click", function(){}, false);
```

3） IE事件处理程序

IE 实现了与 DOM 中类似的两个方法`attachEvent() `和` detachEvent() `。接收两个参数，名称与函数，名称又要加上on。与DOM0级的区别在于作用域，前者this指向所属元素，后者是在全局作用域，this指向window。

这两个方法支持添加多个事件，需要注意的是执行顺序是从下往上的。

## 3 跨浏览器处理程序

每一次绑定都要考虑是否兼容是很繁琐的，因此参考高程3，我们直接将添加事件处理程序封装成一个EventUtil 对象当中的跨浏览器方法。
```
//传入三个参数 要操作的元素、事件名称和事件处理程序函数
EventUtil.addHandler(btn, "click", handler);
EventUtil.removeHandler(btn, "click", handler);

var EventUtil = {
	// 先检查是否存在dom2级，不存在检查ie的attachEvent，最后才是0级事件
	addHandler: function(element, type, handler){
		if (element.addEventListener){
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent){
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	},
	// 同上
	removeHandler: function(element, type, handler){
		if (element.removeEventListener){
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent){
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = null;
		}
	}
};
```
## 4 跨浏览器的事件对象

在触发 DOM 上的某个事件时，会产生一个事件对象 event ，这个对象中包含着所有与事件有关的信息。例如事件类型`event.type`，事件的目标`event.target`，同样因为xx的ie需要考虑将之四个常用方法封装到EventUtil对象当中。
```
// 跨浏览器的事件对象
var EventUtil = {
	//跨浏览器获取event对象
	getEvent: function(event){ 
		return event ? event : window.event;
	},
	//跨浏览器获取作用对象
	getTarget: function(event){ 
		return event.target || event.srcElement;
	},
	// 跨浏览器取消事件的进一步行为
	preventDefault: function(event){ 
		if (event.preventDefault){
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},
	//跨浏览器阻止冒泡或者捕获
	stopPropagation: function(event){
		if (event.stopPropagation){
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	}
};
```
## 5 内存和性能

在 JavaScript 中，添加到页面上的事件处理程序数量将直接关系到页面的整体运行性能。原因是函数也是对象，因此占用了内存，此外DOM访问次数过多也是其中一个原因，而要优化的话还是有办法的。

1） 事件委托

事件委托可以解决事件太多的情况，例如同一个ul下的多个li都要绑定事件，这时候使用事件委托就减少了许多的内存占用，只需要为父元素绑定就行而不用每个li标签都绑定，此外还能解决新增加的子元素的绑定问题，如果不采用事件委托而是用循环的方法，那么新增加的li并不会绑定事件。

```
EventUtil.addHandler(list, "click", function(event){
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	switch(target.id){
		case "":  break;
			...
	}
});
```
以上代码为父元素添加一个事件，改处理程序先是获得跨浏览的事件对象，然后获取实际作用的目标，接着传入switch当中再去根据获取到的目标的id来具体的判断需要作出什么响应。对于少量的事件还不能体现优化性能的效果，但是当子元素很多的情况下就很明显了。

适用适用事件委托的事件有：click; mousedown; mouseuo; keydown; keyup; keypress;

2） 移除事件处理程序

除了事件委托外还能通过移除内存中那些过时不用的“空事件处理程序”来提高性能，每一个绑定的事件处理程序都是建立了一个连接，这也是造成 Web 应用程序内存与性能问题的主要原因。造成“空事件处理程序”的原因有例如通过dom操作直接移除原来绑定了事件处理程序的元素或者innerHTML替换内容，元素虽然被移除了，但是与之绑定的程序并没有得到释放。

因此，在移除带有事件的dom节点和替换的时候应当先移除事件,例如这样子移除事件。

```
btn.onclick = function(){
	// 移除事件处理程序放在替换代码之前
	btn.onclick = null; 
	document.getElementById("myDiv").innerHTML = "Processing...";
};
```