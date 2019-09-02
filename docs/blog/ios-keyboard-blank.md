---
title: 一文彻底解决iOS中键盘回落后留白问题
date: '2019/06/12 10:19:55'
type: post
tag: ios
meta:
  -
    name: description
    content: 解决iOS中键盘回落后留白问题
  -
    name: keywords
    content: ios,keyboard
---
文可以彻底解决iOS的H5页面卡顿以及键盘回落后留白问题😄
<!-- more -->
>最近做的一个H5刚开开心心提测就被QA一顿怼😭，当input输入完成后页面简直卡成翔💩，当我接过手机亲自测试时慌的一批😢，顿时开始怀疑人生😏，马上开始进入紧张的排查中😊，经过两天不断的调试优化😂，最终完美解决所有问题❤️，此文可以彻底解决iOS的H5页面卡顿以及键盘回落后留白问题😄。
## 1.定位问题
当QA和我反映页面卡顿只在iOS上出现时，第一反应肯定不是代码的问题，我也很纳闷iOS性能普遍要比android高啊，为啥会出现这么严重的卡顿，有点慌啊。于是开始了[一次惊心动魄的前端性能优化之旅](https://segmentfault.com/a/1190000005147979),在Google大概的看了几篇文章，感觉到应该是我在页面加了大量的动画造成了页面重排（**reflow**）导致的，初步定位问题是重排造成的😄

## 2.解决卡顿
把问题定位为重排造成的，于是就开始针对性的排查容易造成重排的隐患，发现有动画的元素都是`absolute`的，应该问题不大。最后给最外层的元素先后增加了以下属性：
```css
.wrap {
    -webkit-transform: translateZ(0);
    -moz-transform: translateZ(0);
    -ms-transform: translateZ(0);
    -o-transform: translateZ(0);
    transform: translateZ(0);
}
```
在浏览器中**用css开启硬件加速**，使`GPU (Graphics Processing Unit)`发挥功能，从而提升性能,如果要充分发挥浏览器的性能时，慎用`will-change: transform;`至于为什么请看[CSS will-change 属性](https://www.cnblogs.com/yuzhongwusan/p/4186405.html);排查了一番该定位的定位，反正要避免掉重排的坑，再加上开启了硬件加速于是就快速验证了一下，发现页面开始顺畅了起来，但是依旧有空白，经验证是input键盘收起后页面不进行绘制出现的空白，于是换了思路重新开始Google关于**iOS页面input空白的问题**，果然发现了[新大陆](https://blog.csdn.net/qq_42354773/article/details/80974941)，这是iOS12的大坑，在网上看了很多文章不断的试错，最终找到了一个比较稳妥的方法。

## 3.解决空白
在`input`上分别增加`focus`和`blur`的方法，基本可以解决**键盘回落后留白问题**；
```
handleFocus(event) {
    let e = event.currentTarget;
    setTimeout(() => {
        e.scrollIntoView({
            block: 'start',
            behavior: 'smooth'
        });
    }, 300);
}
handleblur() {
    let e = event.currentTarget;
    setTimeout(() => {
        e.scrollIntoView({
            block: 'end',
            behavior: 'smooth'
        });
    }, 300);
}
```
至此以为万事大吉了，没想到QA说iOS还会偶尔性的出现留白问题，我也是没脾气了，也许没有解决掉根源问题，只是暂时提高了页面的性能而已，再次开始了探索之旅，发现需要在input失去焦点时让页面的scrollTop为0即可正常回落，于是增加了以下代码：
```
handleblur() {
    let e = event.currentTarget;
    setTimeout(() => {
        e.scrollIntoView({
            block: 'start',
            behavior: 'smooth'
        });
    }, 300);
    window.scrollTo(0, 0);
}
```
就这样过了一天QA再也没有反馈过，感觉一下子轻松了许多，还没有轻松多久，QA又报了有个页面中有两个`input`进行填写时会弹跳造成的体验非常不好，我一看体验太差了，于是又开始了优化弹跳之旅。。。
## 4.优化弹跳
这次的定位很明确，就是失焦时的`scrollTop=0`造成的页面弹跳。本来iOS是做了这方面的优化，在软键盘弹出和收起时页面会`smooth`的平滑，由于我加了`scrollIntoView`破坏了原生的优化导致弹跳了。不断的google，尝试了很多种方法都无果，最后无奈之下只好向技术群的小伙伴求助，果然有高手，提供了下他之前做的思路，我一试果然了得，定时器大法终于派上用场了，以下是最终代码：
```
handleFocus(event) {
    clearTimeout(this.timer);
}
handleblur() {
    this.timer = setTimeout(() => {
        document.body.scrollTop = 0;
        window.pageXOffset = 0;
        document.documentElement.scrollTop = 0;
    }, 100);
}
```

至此终于完美解决了遇到的所有问题，QA也漏出了会心的微信😊两天下来脑细胞死了不少，今天分享出来，之后的同行可以一步到位，少走弯路了😄

## 总结
1. 写页面时避免掉造成重排的隐患；
2. 必要时谨慎开启硬件加速；
3. 精准定位问题，分析问题，收集问题；
4. 善于提问可以少走很多弯路；