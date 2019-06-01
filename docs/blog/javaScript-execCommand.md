---
title: 浏览器里点击复制到剪贴板的方法
date: "2018/10/18 15:17:53"
type: post
tag: [JavaScript,execCommand]
meta:
  - name: description
    content: 浏览器里点击复制到剪贴板的方法，包括iOS
  - name: keywords
    content: execCommand
---

浏览器里点击复制到剪贴板的方法，包括 Android 和 iOS。

<!-- more -->

> 今天分享一个在浏览器里点击复制到剪贴板的小方法，经测试所有浏览器都没有兼容性问题，包括 Android 和 iOS，拿走不谢！

```js
const input = document.createElement("input");
input.readonly = true;
input.value = "想要复制的内容";
document.body.appendChild(input);
input.select();
input.setSelectionRange(0, 9999);
if (document.execCommand("Copy")) {
  document.execCommand("Copy");
  console.log("复制成功！");
} else {
  console.log("复制失败，请长按礼包码进行复制！");
}
input.style.display = "none";
document.body.removeChild(input);
```

::: warning 注意部分iOS手机会调起软键盘
ios 部分低版本手机在利用以上方法复制时会自动调起软键盘，为了解决这个问题可以使用以下方法(IOS9及以下不支持)：
:::

```js
if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
  // vue中特殊机制导致该方法运行两次，因剪贴板只有一次，所以可以提前清空选中内容
  window.getSelection().removeAllRanges();
  const copyDOM = document.querySelector("#code");
  const range = document.createRange();
  range.selectNode(copyDOM);
  window.getSelection().addRange(range);
  try {
    if (document.execCommand('Copy')) {
      const msg = document.execCommand('Copy');
      console.log("复制成功！");
    }
  } catch (err) {
    console.log("复制失败，请长按礼包码进行复制！");
  }
  window.getSelection().removeAllRanges();
}
```

还没两天呢，就被 QA 报了 bug,360 奇酷手机不支持这种方法复制，顿时被啪啪打脸，又实在不想动用原生的方法，所以最后只好妥协了增加长按进行复制的方法，只对该 dom 增加一个属性即可，**user-select:all;**

### *H5的道路任重而道远，相比于WX和RN落后太多了，且行且珍惜吧！*
