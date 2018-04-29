## 浮动以及清除浮动

### 浮动

说浮动就必须提及一下文档流，HTML当中的元素按照从左到右，从上到下的顺序进行排列称之为文档流，也就是正常排列。

而浮动是什么呢？浮动会让元素脱离文档流，假如A元素浮动了，原本排在该元素之后的元素发现A元素不在这个文档流了，就会无视它往上接到A元素前面的元素之后(PS:但是文字并不会无视它，还会环绕A元素，也就是A元素没有脱离文字流，使用position的绝对定位会连文字流也脱离。)

浮动的好处当然是布局了，例如通过浮动来形成三列布局，文字环绕等等。但是浮动也有一个问题，那就是会导致高度的塌陷。

```
// html
<div class="box">
	<div class="content"></div>
</div>

// css
.box {
  border: 1px solid red;
}
.content {
    float:left;
    width: 100px;
	height: 100px;
	background: #333;
}
```

上面代码你会发现，content已经不再box里面了，他浮动了，导致高度塌陷，而因此收影响的还有整个页面的布局。清除浮动就是消除对布局的影响。

### 清除浮动

#### BFC 

什么是BFC？BFC是Block Formatting Context的缩写，也就是块级格式化上下文，在为父元素设置overflow的非visible的值的时候会创建BFC，BFC的特性就是包裹浮动的元素。按照我的理解，当你创建BFC之后改元素就会把里面的东西视为自己的东西，包括浮动元素，然后创建一个私有领域给包裹进来。此外BFC还有还有如下特性。

1.让外边距的叠加无效。

2.创建BFC的元素将不会围绕浮动元素。

还有以下几种方式也可以创建BFC：

position:absolute、position:fixed、display:inline-block、display:table-cell、display:table-caption，其中table-cell和table-caption是表格相关元素对应默认CSS值，所以当你创建表格时，每个表格的单元格都会自动创建BFC

### 清除浮动的方法

清除浮动方法大致有两类，一类是clear:both | left | right ,另一类则是设定overflow非visible的值。

#### 第一类：添加clear:both | left | right 

1.通过在浮动元素末尾添加一个空的标签例如```<div style=”clear:both”></div>```，其他标签br等亦可。

优点：简单。

缺点：增加了额外的标签，并且很显然这并不符合语义化。

2.使用 br标签和其自身的 html属性，br 有 ```clear=all | left | right | none；```的属性。

优点：简单代码量少，比空标签语义化稍好。

缺点：同上。

3.使用```::after```伪元素(万金油方法)

ps:由于IE6-7不支持```:after```，使用``` zoom:1```触发```hasLayout```。其实是通过 content 在元素的后面生成了内容为空的块级元素

代码如下

```
.clearfix:after {
    content:"";
    display:block;
    height:0;
    visibility:hidden;//这一条可以省略，证明请看原文精益求精部分
    clear:both; 
}
.clearfix {
    zoom:1;
}
```

优点：结构和语义化完全正确,代码量居中。

缺点：复用方式不当会造成代码量增加。

伪元素还有一种写法

```
.clearfix:before, .clearfix:after {
 	content:"";
 	display:table;
}
.clearfix:after{
 	clear:both;
 	overflow:hidden;
}
.clearfix{
	zoom:1; 
} 

<!-- 用display:table 是为了避免外边距margin重叠导致的margin塌陷, 内部元素默认会成为 table-cell 单元格的形式 -->

```

#### 第二类：父元素设置```overflow，display:table```

4.父元素设置 ```overflow：hidden```

PS:在IE6中还需要触发 hasLayout ，例如 ```zoom:1```

优点：不存在结构和语义化问题，代码量极少。

缺点：由于hidden的原因，当内容增多时候容易造成不会自动换行导致内容被隐藏掉，无法显示需要溢出的元素，还会导致中键失效（鼠标中键）。

5.父元素设置 ```overflow：auto``` 属性

优点：同上

缺点：多个嵌套后，会有bug，详情看原文。

6.父元素也浮动

优点：代码少

缺点：总不能一直浮动到body吧。

7.父元素设置```display:table```

优点：结构语义化完全正确，代码量极少。

缺点：会造成盒模型的改变。

### 参考

[那些年我们一起清除过的浮动](http://www.iyunlu.com/view/css-xhtml/55.html)

[关于Block Formatting Context－－BFC和IE的hasLayout](http://www.cnblogs.com/pigtail/archive/2013/01/23/2871627.html)

[理解CSS布局和BFC](https://mp.weixin.qq.com/s?__biz=MjM5NzE0MjQ2Mw==&mid=2652493490&idx=1&sn=8015c7e1eafb5b4920124d9bdeeeebea&chksm=bd33fc628a447574e547ca35bf832f9a096f9e35ffdef62a6374140f2711bb3639b300804202&mpshare=1&scene=23&srcid=0316bCgK2ZqaVHBMtUTikw6D#rd)