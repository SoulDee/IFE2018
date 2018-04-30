(两篇，一篇float，position和双飞翼，圣杯布局，另一篇flex布局)

## 定位、浮动与圣杯、双飞翼布局

### 一些注意点

#### position的注意点

1.relative相对定位是相对于原来的位置进行偏移，但是原来的位置还是会占用空间，偏移后的盒子也会覆盖其他元素。

2.绝对定位不仅会脱离文档流而且会脱离文字流，也就是文字不会环绕。并且会让不是块级元素的也变成块级元素，可以设置宽高。

3.position默认值是static，也就是正常流定位。

4.position还有一个值是sticky，粘性定位。（有点像是条件语句啊），满足什么条件的时候是另一种定位，例如设定 top：10px;当你滚动到该元素距离浏览器10px的时候就会保持这个定位。用来做导航栏很有用啊！

#### float的注意点

1.浮动会导致父元素高度塌陷，影响布局，详细的可以看我5-6天的笔记【浮动与清除浮动】。

2.浮动有清除空格的作用哦，如果你使用display: inline-block,会发现盒子之间是有空隙的，**可以使用font-size: 0;来去除**。而浮动就没有空隙啦！

### 圣杯布局与双飞翼布局

两者都是实现一种三列布局，在html层面主内容在前，但是布局方面是主内容放在中间自适应，左右侧固定宽度，这样做是可以让主内容优先渲染。而两种布局的区别在于实现方法与思想不同。
```
<div class="hd">这是页头</div>
<div class="contain">
    <div class="main">主要内容</div>
    <div class="left">左侧栏</div>
    <div class="right">右侧栏</div>
</div>
<div class="ft">这是页脚</div>
```
#### 双飞翼布局实现
1.三个盒子左浮动。

2.中间宽度百分百，左右固定宽度。

3.左栏使用margin-left：-100%;移动到主内容左侧，右栏同样负值，大小为自身宽度。这时候就形成了中间为主要内容，左右栏定位。

4.但是这样子左右栏目会覆盖主要内容，于是在父容器contain中使用padding内填充，主内容显示正确，然后再通过相对定位将左右两个栏目移出来，这就实现了双飞翼布局。

```
// 为了节省篇幅，只写核心代码
.contain {
  padding: 0 100px;
}
.main,.left,.right {
  float: left;
}
.main {
  width: 100%;
}
.left {
  width: 100px;
  margin-left: -100%;
  position: relative;
  left: -100px;
}
.right {
  width: 100px;
  margin-left: -100px;
  position: relative;
  right: -100px;
}
```

#### 圣杯布局实现
圣杯布局在原来的dom结构上增加了一个标签
```
<div class="main column">
    <div class="main-content">主要内容</div>
</div>
```
前三步同双飞翼布局一样，浮动，负边距，区别只在于第四步，通过main-content来限定主内容的显示区域，不用添加padding，并且一个相对定位都不用使用到。
```
.main-content {
    margin: 0 100px;
}
```

### 参考

[双飞翼布局介绍-始于淘宝UED](http://www.imooc.com/wenda/detail/254035)

## Flex布局

Flex布局解决了一些传统布局方式上的难点，例如垂直居中比较难实现的问题。任何的容器都可以指定Flex布局，只需要为盒子增加一行`diapaly: flex`,行内元素则是使用`display：inline-flex`。

PS(设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效。)

### Flex基本属性
#### 容器属性
```
// 容器中项目的主轴排列方向
flex-direction: row(默) | row-reverse | column | column-reverse;

// 如果一条轴线排不下，如何换行，默认项目同一行
flex-wrap: nowrap(默) | wrap | wrap-reverse;

// flex-direction属性和flex-wrap属性的简写形式
flex-flow: <flex-direction> || <flex-wrap>;

// 项目在主轴上的对齐方式
justify-content: flex-start(默) | flex-end | center | space-between | space-around;

// 项目在交叉轴上的对齐方式，未设置高度或设为auto，将占满整个容器的高度。
align-items: flex-start | flex-end | center | baseline | stretch(默);

// 多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
align-content: flex-start | flex-end | center | space-between | space-around | stretch(默);
```
#### 项目属性
```
// 排列顺序，越小越前，默认0，允许负值
order: <integer>;
// 放大比例，默认0，有空间也不放大，都为1时等分空间
flex-grow: <number>;
// 缩小比例，默认为1，空间不足，该项目将缩小，都为1等比缩小，其中一个为0，则该项目不缩小
flex-shrink: <number>;
// 分配多余空间之前，项目占据的主轴空间，默认值auto，原本大小
flex-basis: <length> | auto;
// 简写，默认值为0 1 auto,后两个可选,flex:1;会自填充剩下空间
flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ];
// 允许单个项目不一样的对齐方式，可覆盖align-items。默认值auto
align-self: auto | flex-start | flex-end | center | baseline | stretch;
```
### Flex应用场景
以下只说核心实现，完整代码请看参考博客

#### 1.基本网格等分布局
为每个项目设定flex: 1;
#### 2.百分比网格布局
为每个项目设定flex: 1;然后再为想要设定百分比的项目设定flex: 0 0 %;
#### 3.圣杯布局
你需要做的仅仅是为左侧栏设定order: -1;来调整顺序。
#### 4.输入框的布局
实现输入框前方添加提示，后方添加按钮，为输入框添加flex: 1;就行了。
#### 5.悬挂式布局
交叉轴设定align-items: flex-start;使得左对齐，然后为文字设定flex: 1;
#### 6.固定的底栏
更换主轴方向，设定最小高度，然后中间内容flex: 1;
#### 7.流式布局
设定换行，再设定flex: 0 0 %;控制每行数量。

### 参考
[Flex 布局教程：语法篇——阮一峰](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

[Flex 布局教程：实例篇——阮一峰](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)
