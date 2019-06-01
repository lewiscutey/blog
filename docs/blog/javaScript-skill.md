---
title: JavaScript高级技巧
date: "2018/10/20 17:24:39"
type: post
tag: [JavaScript, skill]
meta:
  - name: description
    content: 介绍了一些JavaScript常用的高级技巧
  - name: keywords
    content: JavaScript,skill
---

本文简单介绍了一些 JavaScript 常用的高级技巧。

<!-- more -->

## 1. 高级函数

> 函数是 JavaScript 最有趣的部分之一，是 JavaScript 的一等公民。

1.1 安全的类型检查

```js
function isObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}
function isArray(value) {
  return Object.prototype.toString.call(value) === "[object Array]";
}
function isFunction(value) {
  return Object.prototype.toString.call(value) === "[object Function]";
}
function isRegExp(value) {
  return Object.prototype.toString.call(value) === "[object RegExp]";
}
```

1.2 作用域的安全的构造函数

```js
function Person(name, age) {
  if (this instanceof Person) {
    this.name = name;
    this.age = age;
  } else {
    return new Person(name, age);
  }
}
var person1 = new Person("lucy", 18);
console.log(window.name); // ''
console.log(person1.name); // 'lucy'
```

1.3 惰性载入函数

```js
function addEvent(element, type, handler) {
  if (element.addEventListener) {
    element.addEventListener(type, handler, false);
  } else if (element.attachEvent) {
    element.attachEvent("on" + type, handler);
  } else {
    element["on" + type] = handler;
  }
}
```

1.4 函数绑定

```js
var btn = document.querySelector("#btn");
function bind(fn, context) {
  return function() {
    fn.apply(context, arguments);
  };
}
btn.addEventListener("click", bind(handler.handleClick, handler), false);
```

1.5 函数柯里化

```js
Function.prototype.bind = function(context) {
  var _this = this,
    _args = Array.prototype.slice.call(arguments, 1);
  return function() {
    return _this.apply(
      context,
      _args.concat(Array.prototype.slice.call(arguments))
    );
  };
};
```

## 2. 防篡改对象

> JavaScript 共享的本质一直是开发人员心头的痛。

2.1 不可拓展对象 **Object.preventExtensions()**

```js
var person = { name: "lucy" };
Object.preventExtensions(person);
person.age = 20;
console.log(person.age); // undefined
delete person.name;
console.log(person.name); // undefined
person.name = "lewis";
console.log(person.name); // undefined
```

2.2 密封对象 **Object.seal()**

```js
var person = { name: "lucy" };
Object.seal(person);
person.age = 20;
console.log(person.age); // undefined
delete person.name;
console.log(person.name); // 'lucy'
person.name = "lewis";
console.log(person.name); // 'lewis'
```

2.3 冻结的对象 **Object.freeze()**

```js
var person = { name: "lucy" };
Object.freeze(person);
person.age = 20;
console.log(person.age); // undefined
delete person.name;
console.log(person.name); // 'lucy'
person.name = 20;
console.log(person.name); // 'lucy'
```

## 3. 高级定时器

> 在 JavaScript 中没有代码是立刻执行的。

3.1 重复的定时器

```js
setTimeout(function() {
  // doSomething
  setTimeout(arguments.callee, interval);
}, interval);
```

3.2 Yielding Process

```js
function chunk(array, process, context) {
  setTimeout(function() {
    var item = array.shift();
    process.call(context, item);
    if (array.length > 0) {
      setTimeout(arguments.callee, 100);
    }
  }, 100);
}
```

3.3 函数节流

```js
function throttle(method, context) {
  clearTimeout(methos.timeId);
  method.timeId = setTimeout(function() {
    method.call(context);
  }, 100);
}
```

## 4. 自定义事件

> 事件是一种叫做观察者的设计模式，这是一种创建松散耦合代码的技术。

```js
function handleMessage(event) {
  console.log("Message received: " + event.message);
}
// 创建一个新对象
var target = new EventTarget();
// 添加一个事件处理程序
target.addHandler("message", handleMessage);
// 触发事件
target.fire({ type: "message", message: "Hello world!" });
// 删除事件处理程序
target.removeHandler("message", handleMessage);
// 再次，应该没有处理程序
target.fire({ type: "message", message: "Hello world!" });
```

## 5. 拖放

> 拖放是一种非常流行的用户界面模式。

```js
var div = document.getElementById("div");
div.onmousedown = function(e){
  var event = e || event;

  var distanceX = event.clientX - div.offsetLeft;
  var distanceY = event.clientY - div.offsetTop;

  document.onmousemove = function(e){
  　　var event = e || event;
  　　div.style.left = event.clientX - distanceX + 'px';
  　　div.style.top = event.clientY - distanceY + 'px';
  };

  document.onmouseup = function(){
  　　document.onmousemove = null;
  　　document.onmouseup = null;
  };
};
```

### *JavaScript中的函数非常强大，因为它们是第一类对象，使用必包和函数环境切换，还可以有很多种强大的方法。可以创建作用域安全的构造函数，确保在缺少new操作符时调用构造函数不会改变错误的环境对象。*