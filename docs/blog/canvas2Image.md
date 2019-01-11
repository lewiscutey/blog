---
title: H5页面中长按保存图片详解
date: '2018/09/27 21:12:03'
tag: html2canvas
meta:
  -
    name: description
    content: 本文详细介绍了如何在H5中实现长按保存图片的功能。
  -
    name: keywords
    content: html2canvas,canvas2Image
---
本文详细介绍了如何在H5中实现长按保存图片的功能。
<!-- more -->
>长按保存图片是现在一些宣传页H5中很常见的需求，但是js没有这样的能力，所以要么借助android或ios的原生能力,要么用canvas自己画一个（截屏），相比较原生成本太高，且必须依赖于app，相对于流传性很广且跨平台的H5来说不合时宜，所以canvas成为我们常用的手段。

## 下面是详细的步骤：
## 1. html2canvas截屏
:::warning 保存的图片节点最好是img标签：
想要截屏的节点最好是img标签的图片，经测试如果是background-image会有点模糊，需要特别注意下。

const dom = document.querySelector('img');
:::

```js
npm i html2canvas --save
import html2canvas from 'html2canvas';

// 想要保存的图片节点
const dom = document.querySelector('img');

// 创建一个新的canvas
const Canvas = document.createElement('canvas');
const width = document.body.offsetWidth;  // 可见屏幕的宽
const height = document.body.offsetHeight;  // 可见屏幕的高
const scale = window.devicePixelRadio;  // 设备的devicePixelRadio

// 将Canvas画布放大scale倍，然后放在小的屏幕里，解决模糊问题
Canvas.width = width * scale;
Canvas.height = height * scale;
Canvas.getContext('2d').scale(scale, scale);

html2canvas(dom, {
  canvas: Canvas,
  scale,
  useCORS: true,
  logging: true,
  width: width + 'px',
  hegiht: height + 'px',
}).then((canvas) => {
  const context = canvas.getContext('2d');
  // 关闭抗锯齿形
  context.mozImageSmoothingEnabled = false;
  context.webkitImageSmoothingEnabled = false;
  context.msImageSmoothingEnabled = false;
  context.imageSmoothingEnabled = false;
  // canvas转化为图片
  canvas2Image(canvas, canvas.width, canvas.height);
});
```

## 2. canvas2Image转化为图片
一般情况下转为jpeg格式就很不错了。
```js
canvas2Image(canvas, canvas.width, canvas.height) {
  const retCanvas = document.createElement('canvas');
  const retCtx = retCanvas.getContext('2d');
  retCanvas.width = width;
  retCanvas.height = height;
  retCtx.drawImage(canvas, 0, 0, width, height, 0, 0, width, height);
  const img = document.createElement('img');
  img.src = retCanvas.toDataURL('image/jpeg');  // 可以根据需要更改格式
  return img;
}
```

## 3. 长按保存图片
先实现一个长按的方法，长按之后把生成的图片append到body，透明浮在屏幕上。
```js
// 封装一个长按方法
longPress(fn) {
  let timeout = 0;
  const $this = this;
  for (let i = 0; i < $this.length; i++) {
    $this[i].addEventListener('touchstart', () => {
      timeout = setTimeout(fn, 800); // 长按时间超过800ms，则执行传入的方法 
    }, false);
    $this[i].addEventListener('touchend', () => {
      clearTimeout(timeout); // 长按时间少于800ms，不会执行传入的方法
    }, false);
  }
}
// 添加生成的图片到body
const img = canvas2Image(canvas, canvas.width, canvas.height);
document.body.appendChild(img);
img.style.cssText = "width:100%;height:100%;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;";
```
## 4. 完整代码如下
```js
$.fn.longPress = function(fn) {
  let timeout = 0;
  const $this = this;
  for (let i = 0; i < $this.length; i++) {
    $this[i].addEventListener('touchstart', () => {
      timeout = setTimeout(fn, 800); // 长按时间超过800ms，则执行传入的方法 
    }, false);
    $this[i].addEventListener('touchend', () => {
      clearTimeout(timeout); // 长按时间少于800ms，不会执行传入的方法
    }, false);
  }
};
$('img').longPress(() => {
  saveImg();
});
saveImg() {
  // 想要保存的图片节点
  const dom = document.querySelector('img');

  // 创建一个新的canvas
  const Canvas = document.createElement('canvas');
  const width = document.body.offsetWidth;  // 可见屏幕的宽
  const height = document.body.offsetHeight;  // 可见屏幕的高
  const scale = window.devicePixelRatio;  // 设备的devicePixelRatio

  // 将Canvas画布放大scale倍，然后放在小的屏幕里，解决模糊问题
  Canvas.width = width * scale;
  Canvas.height = height * scale;
  Canvas.getContext('2d').scale(scale, scale);

  html2canvas(dom, {
    canvas: Canvas,
    scale,
    useCORS: true,
    logging: true,
    width: width + 'px',
    hegiht: height + 'px',
  }).then((canvas) => {
    const context = canvas.getContext('2d');
    // 关闭抗锯齿形
    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;
    // canvas转化为图片
    const img = canvas2Image(canvas, canvas.width, canvas.height);
    document.body.appendChild(img);
    img.style.cssText = "width:100%;height:100%;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;";
  }
}
canvas2Image(canvas, width, height) {
  const retCanvas = document.createElement('canvas');
  const retCtx = retCanvas.getContext('2d');
  retCanvas.width = width;
  retCanvas.height = height;
  retCtx.drawImage(canvas, 0, 0, width, height, 0, 0, width, height);
  const img = document.createElement('img');
  img.src = retCanvas.toDataURL('image/jpeg');  // 可以根据需要更改格式
  return img;
}
```

刚开始做的时候也是网上一堆文章乱看，不断的试错，最后愉快的实现了长按保存图片的功能，做完才发现也很简单哈，这篇文章完整的介绍了整个流程，拿走不谢！