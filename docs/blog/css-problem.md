---
title: CSS问题集合
date: '2018/12/10 20:30:56'
tag: CSS
meta:
  -
    name: description
    content: 记录一些CSS问题
  -
    name: keywords
    content: CSS
---
记录一些遇到的CSS问题。
<!-- more -->

## 1. background-position 属性不生效的问题
::: warning background-repeat 引起的问题
当设置了**background-repeat**为**repeat-x**时，**background-position-x**不生效;当设置了**background-repeat**为**repeat-y**时，**background-position-y**不生效;
:::
开发中经常会遇到一个背景图很大的情况，这是一般需要这样处理，裁切顶部为一张小图，裁切底部为一张小图，裁切中间一小部分进行垂直方向的repeat，为了避免出现中间图覆盖顶底部的图片（background-position不生效带来的问题），可以进行如下设置：
```css
.box {
  width: 100%;
  position: relative;
  background:
    url('top.png') center top no-repeat,
    url('bottom.png') center bottom no-repeat;
  background-size: 100%;
  z-index: 0;
}
.box::before {
  content: '';
  position: absolute;
  top: 20px;  // 顶部图片的高度
  bottom: 20px;  // 底部图片的高度
  left: 0;
  right: 0;
  margin: auto;
  background: url('middle.png') center repeat-y;
  background-size: 100%;
  z-index: -1;
}
```