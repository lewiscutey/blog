---
title: iframe中的onload事件深藏功与名
date: "2019/04/27 11:05:09"
tag: iframe
meta:
  - name: description
    content: iframe中的onload事件注意事项
  - name: keywords
    content: iframe,onload
---

动态创建的 display 为 none 的 iframe 元素，onload 事件不会执行 😭！

<!-- more -->

> 昨天业务需求中碰到一个关于 iframe 不能正常跳转的棘手问题，一直猜测是 onload 事件引起的，虽然最后用 **promise** 暂时解决了，但是考虑到一些老版本的浏览器还需要 **polyfill** 去兼容一下，不必要的引入了 js 增加开销，所以今天研究了一上午终于发现了 iframe 的 onload 秘密。

::: warning 定义:
onload 事件会在页面或图像加载完成后立即发生,iframe 中的 onload 事件会在整个文档加载完成后执行。
:::

### 1. 正常的 iframe 无论什么顺序都会触发 onload 事件

```js
// 一般我们习惯这样按顺序写：
var iframe = document.createElement("iframe");
iframe.src = "https://www.baidu.com";
if (iframe.attachEvent) {
  iframe.attachEvent("onload", function() {
    console.log("Local iframe is now loaded.");
  });
} else {
  iframe.onload = function() {
    console.log("Local iframe is now loaded."); // "Local iframe is now loaded."
  };
}
document.body.appendChild(iframe);

// 为了代码结构更加整洁也可以这样写：
var iframe = document.createElement("iframe");
iframe.src = "https://www.baidu.com";
document.body.appendChild(iframe);
if (iframe.attachEvent) {
  iframe.attachEvent("onload", function() {
    console.log("Local iframe is now loaded.");
  });
} else {
  iframe.onload = function() {
    console.log("Local iframe is now loaded."); // "Local iframe is now loaded."
  };
}
```

这两种方式都是 OK 的，都会触发 onload 事件的正常执行；

### 2. display 为 none 的 iframe 中的 onload 事件正常顺序注册

```js
var iframe = document.createElement("iframe");
iframe.style.display = "none";
iframe.src = "https://www.baidu.com";
if (iframe.attachEvent) {
  iframe.attachEvent("onload", function() {
    console.log("Local iframe is now loaded.");
  });
} else {
  iframe.onload = function() {
    console.log("Local iframe is now loaded."); // "Local iframe is now loaded."
  };
}
document.body.appendChild(iframe);
```

这样写也 OK，onload 事件提前注册了，所以会在加载完成之后立即执行；

### 3. display 为 none 的 iframe 中的 onload 事件最后注册

```js
var iframe = document.createElement("iframe");
iframe.style.display = "none";
iframe.src = "https://www.baidu.com";
document.body.appendChild(iframe);
if (iframe.attachEvent) {
  iframe.attachEvent("onload", function() {
    console.log("Local iframe is now loaded.");
  });
} else {
  iframe.onload = function() {
    console.log("Local iframe is now loaded.");
  };
}
```
这样写就出问题了，由于 display 为 none，文档加载完成不会触发 onload 事件的执行，问题也就出在了这里，`强烈推荐使用第二种写法处理iframe`；

### 4. promise 可以保证 onload 事件的执行
```js
var iframePromise = new Promise((resolve, reject) => {
  var iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = "http://wwww.baidu.com";
  if (iframe.attachEvent) {
    iframe.attachEvent("onload", function() {
      resolve("success");
    });
  } else {
    iframe.onload = function() {
      resolve("success");
    };
  }
  document.body.appendChild(iframe);
});
iframePromise.then(
  () => {
    console.log("Local iframe is now loaded."); // "Local iframe is now loaded."
  },
  error => {
    console.log(error);
  }
);
```
如果项目本身有了**polyfill**，推荐使用**promise**，在js的eventloop中microtasks还是有很多益处的。

*iframe作为老古董，虽然坑多，但有时候确实可以简单粗暴的解决一些实际问题，且用且珍惜吧！*