# 居中详解

说到布局除了浮动以及定位外还有一个不得不提的点，那就是居中，居中问题我们在网页布局当中经常遇到，那么以下就是分为两部分来讲，一部分是传统的居中，另一种则是flex居中，每个部分又通过分为水平垂直居中来讲。

## 1.传统居中方式
### 1.1水平居中
#### 1.1.1 inline
```
text-align: center;
```
适用于 ```inline, inline-block, inline-table, inline-flex```
#### 1.1.2 block
```
margin: 0 auto;
```
#### 1.1.3 more-block：
多个块级直接居中同单个块级居中一样，但是如果要在单行内居中，需要先将块级元素转化为行内元素再按照行内元素的居中方式居中
```
.parent div {
  display: inline-block;
  text-align: center;
}
```
### 1.2垂直居中
#### 1.2.1 inline
单行情况下,可以为文字父元素设置相同的上下padding实现居中
```
padding-top: 30px;
padding-bottom: 30px;
```
也可以设置行高等于父元素高度实现居中
```
height: 30px;
line-height: 30px;
```
而对于多行文字同样可以使用填充padding，但是如果是表格，则是使用vertical-align实现居中
```
vertical-align: middle;
```
#### 1.2.2 block
要居中的元素高度固定的情况下，可以使用position来定位，设置top为50%，但是因为top是盒子上边界的定位距离，所以还要通过负值的margin-top往回拉宽度的一半。
```
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  height: 100px;
  margin-top: -50px; 
}
```
但是如果高度不固定的话则可替换margin负值达到动态高度的一半
```
transform: translateY(-50%);
```
### 1.3水平垂直都居中
#### 1.3.1 固定宽高
```
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%; 
  margin: -70px 0 0 -170px;
}
```

此为还有一种方法也可以实现已知宽高时候的居中
```
//此处如果是不定宽高的话就会铺满整个父元素
.child {
  position: absolute;
  top:0;
  buttom:0;
  left:0;
  right:0;
  margin:auto;
}
```
#### 1.3.2 不固定宽高
```
// 其余省略代码同上面定宽高一样
transform: translate(-50%, -50%);
```
方法同定宽高，区别是替换margin负值为上述代码实现居中。

## 2.Flex居中方式
Flex的出现解决了传统居中方式难以实现的麻烦，仅需要几行代码就可以实现居中，Flex布局不仅能用于居中，在其他布局当中也相当的有效，详细的Flex可以看之前的笔记。想要启动Flex只要在父元素设置`display： flex`,内联元素的话则是`display: inline-flex`.
### 2.1 水平居中
```
.parent {
  display: flex;
  justify-content: center;
}
```
### 2.2 垂直居中
```
.parent {
  display: flex;
  align-items: center;
}
```
### 2.3 水平垂直居中
```
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### 参考

[学习CSS布局](http://zh.learnlayout.com/toc.html)

[视觉格式化模型](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Visual_formatting_model)

[css-tricks:居中详解](https://css-tricks.com/centering-css-complete-guide/)