---
title: JavaScript常用的函数
date: "2019/02/26 15:16:36"
type: post
tag: [JavaScript, function]
meta:
  - name: description
    content: JavaScript常用的函数和方法
  - name: keywords
    content: JavaScript,function
---

本文总结一些 JavaScript 中常用的一些方法。

<!-- more -->

## 1. 防抖 `debounce`

指触发事件后在规定时间内回调函数只能执行一次，如果在规定时间内又触发了该事件，则会重新开始算规定时间。
::: warning 注意:

1. 非立即执行版:事件触发->延时->执行回调函数;如果在延时中,继续触发事件,则会重新进行延时.在延时结束后执行回调函数.常见例子:就是 input 搜索框,客户输完过一会就会自动搜索
2. 立即执行版:事件触发->执行回调函数->延时;如果在延时中,继续触发事件,则会重新进行延时.在延时结束后,并不会执行回调函数.常见例子:就是对于按钮防点击.例如点赞,心标,收藏等有立即反馈的按钮.
   :::

```js
function debounce(fun, delay = 5000, immediate = true) {
  let timer = null;
  return function(arg) {
    let that = this;
    let args = arg;
    if (timer) clearTimeout(timer);
    if (immediate) {
      if (!timer) fun.apply(that, args);
      timer = setTimeout(function() {
        timer = null;
      }, delay);
    } else {
      timer = setTimeout(function() {
        fun.apply(that, args);
      }, delay);
    }
  };
}
```

## 2. 节流 `throttle`

当持续触发事件时，在规定时间段内只能调用一次回调函数。如果在规定时间内又触发了该事件，则什么也不做,也不会重置定时器。
::: warning 与防抖比较:
防抖是将多次执行变为最后一次执行，节流是将多次执行变为在规定时间内只执行一次.一般不会重置定时器. 即不会`if (timer) clearTimeout(timer);`(时间戳+定时器版除外)

何为连续频繁地触发事件,就是事件触发的时间间隔至少是要比规定的时间要短.
:::

```js
function throttle(fun, delay) {
  let timer = null;
  let previous = 0;
  return function(arg) {
    let now = Date.now();
    let that = this;
    let args = arg;
    let leftTime = delay - (now - previous);
    clearTimeout(timer);
    if (leftTime <= 0) {
      fun.apply(that, args);
      previous = Date.now();
    } else {
      timer = setTimeout(fun, delay);
    }
  };
}
```

3. `new`

```js
function new() {
  var obj = new Object();
  cont = Array.prototype.slice.call(arguments, 1);
  obj.__proto__ = cont.prototype;
  var ret = cont.apply(obj, arguments);
  return ret instanceof Object ? ret : obj;
}
```

4. `bind`

```js
Function.prototype.bind = function(context){
  if (typeof this !== "function") {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }
  var args = Array.prototype.slice.call(arguments, 1),
  F = function(){},
  self = this,
  bound = function(){
      var innerArgs = Array.prototype.slice.call(arguments);
      var finalArgs = args.concat(innerArgs);
      return self.apply((this instanceof F ? this : context), finalArgs);
  };
  F.prototype = self.prototype;
  bound.prototype = new F();
  retrun bound;
}
```

5. `call`

```js
function call(context) {
  var context = context || window;
  context.fn = this;
  var args = Array.prototype.slice.call(arguments, 1);
  var result = context.fn(...args);
  delete context.fn;
  return result;
}
```

6. `apply`

```js
function apply(context) {
  var context = context || window;
  context.fn = this;
  var result;
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
}
```

7. `函数柯里化`

```js
function curry(fn, args) {
  var length = fn.length;
  var args = args || [];
  return function() {
    var newArgs = args.concat(Array.prototype.slice.call(arguments));
    if (newArgs.length < length) {
      return curry.call(this, fn, newArgs);
    } else {
      return fn.apply(this, newArgs);
    }
  };
}
```
