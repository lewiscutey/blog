---
title: H5移动端IOS/Android兼容性总结，持续更新中…
date: "2018/10/23 18:53:57"
tag: [H5, IOS, Android]
meta:
  - name: description
    content: H5移动端IOS/Android兼容性总结，持续更新中…
  - name: keywords
    content: H5,OS,Android
---

H5 移动端 IOS/Android 兼容性总结，持续更新中…

<!-- more -->

## 1. IOS 不识别日期（"2018-07-01 08:00:00"）

> new Date("2018-07-01 08:00:00")在Android下正常显示可以直接进行各种操作转化，而在IOS下为invalid date，获取到的时间戳为NaN,确实有点坑啊，只能识别new Date("2018/07/01 08:00:00")这种的，所以需要转化一下，解决方法为统一增加.replace(/-/g,'/')；

```js
new Date("2018-07-01 08:00:00".replace(/-/g,'/'));
```

## 2. IOS fixed元素抖动问题
> 在ios11以上的版本里，当快速滑动页面的时候，页面滚动期间，fixed定位的头部会随着页面的滑动滑上去，等到上滑动作执行完毕时，头部才又出现,这个问题在安卓及ios11以下的版本都是没有的。

下面这种布局方式相当于只是滑动中间部分，而非整个view，就可以很好的解决fixed抖动这个问题。

```css
// 布局如下：
<header><header>
<div class="wrapper"></div>
<footer></footer>

// 样式如下：
header {
  width: 100%;
  height: 30px;
  position: fixed;
  top: 0;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}
.wrapper {
  position: absolute;
  top: 30px;
  left: 0;
  right: 0;
  bottom: 30px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
footer {
  width: 100%;
  height: 30px;
  position: fixed;
  bottom: 0;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}
```
