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

## 3. `new`

```js
function new() {
  var obj = new Object();
  cont = Array.prototype.slice.call(arguments, 1);
  obj.__proto__ = cont.prototype;
  var ret = cont.apply(obj, arguments);
  return ret instanceof Object ? ret : obj;
}
```

## 4. `bind`

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

## 5. `call`

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

## 6. `apply`

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

## 7. `函数柯里化`

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

## 8. `数组去重`

```js
var arr = [1, 2, 3, 3, 3, 4, 5, 1];
// 简单API
arr.filter((item, index, array) => array.indexOf(item) === index);
// 利用对象key唯一
var obj = {};
var ret = [];
arr.forEach(item => {
  if (!obj[item]) {
    obj[item] = 1;
    ret.push(item);
  }
});
```

## 9. `数组扁平化`

```js
var arr = [1, 2, 3, [4, 5], [6, [7, [8]]]];
// 简单API
arr
  .join(",")
  .split(",")
  .map(item => Number(item));
// 递归
function flatten(arr, ret = []) {
  arr.forEach(item => {
    if (Array.isArray(item)) {
      flatten(item, ret);
    } else {
      ret.push(item);
    }
  });
  return ret;
}
// 队列
function flatten(arr) {
  const newArr = [...arr];
  const res = [];
  while (newArr.length) {
    const item = newArr.shift(); // 出队
    if (Array.isArray(item)) {
      newArr.unshift(...item); // 入队
    } else {
      res.push(item);
    }
  }
  return res;
}
```

## 10. `实现一个sleep函数`

```js
function sleep(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}
// ES5
function sleep(callback, time) {
  if (typeof callback === "function") {
    setTimeout(callback, time);
  }
}
function sleep(callback, wait) {
  let date = new Date().getTime();
  while (new Date().getTime() - date < wait) {
    continue;
  }
  callback();
}
```

## 11. `冒泡排序`

```js
function bubbleSort(arr) {
  const array = [...arr];
  for (let i = 0, len = array.length; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      if (array[i] > array[j]) {
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    }
  }
  return array;
}
// 优化版
function bubbleSort1(arr) {
  let i = arr.length - 1;
  while (i > 0) {
    let pos = 0;
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        pos = j;
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
    i = pos;
  }
  console.log(arr);
}
```

## 12. 实现简单的`Event模块的emit和on方法`

```js
function Events() {
  this.on = function(eventsName, callback) {
    if (!this.handle) {
      this.handle = {};
    }
    if (!this.handle[eventsName]) {
      this.handle[eventsName] = [];
    }
    this.handle[eventsName].push(callback);
  };
  this.emit = function(eventsName, obj) {
    if (this.handle[eventsName]) {
      for (let i = 0; i < this.handle[eventsName].length; i++) {
        this.handle[eventsName][i](obj);
      }
    }
  };
  return this;
}
var events = new Events();
events.on("say", function(name) {
  console.log("hello, " + name);
});
events.emit("say", "lewis");
```

## 13. 实现简单的`Promise`

```js
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function MyPromise(fn) {
  const that = this
  that.state = PENDING
  that.value = null
  that.resolvedCallbacks = []
  that.rejectedCallbacks = []
  resolve(value) {
    if (that.state === PENDING) {
      that.state = RESOLVED
      that.value = value
      that.resolvedCallbacks.map(cb => cb(that.value))
    }
  }

  reject(value) {
    if (that.state === PENDING) {
      that.state = REJECTED
      that.value = value
      that.rejectedCallbacks.map(cb => cb(that.value))
    }
  }

  try {
    fn(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
  const that = this
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : r => {
          throw r
        }
  if (that.state === PENDING) {
    that.resolvedCallbacks.push(onFulfilled)
    that.rejectedCallbacks.push(onRejected)
  }
  if (that.state === RESOLVED) {
    onFulfilled(that.value)
  }
  if (that.state === REJECTED) {
    onRejected(that.value)
  }
}
```

## 14. 实现二叉树

```js
function BinarySearchTree() {
  var Node = function(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  };
  var root = null;

  //插入节点
  this.insert = function(key) {
    var newNode = new Node(key);
    if (root === null) {
      root = newNode;
    } else {
      insertNode(root, newNode);
    }
  };
  var insertNode = function(node, newNode) {
    if (newNode.key <= node.key) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        insertNode(node.right, newNode);
      }
    }
  };

  //实现中序遍历
  this.inOrderTraverse = function() {
    inOrderTraverseNode(root);
  };
  var inOrderTraverseNode = function(node) {
    if (node !== null) {
      inOrderTraverseNode(node.left);
      console.log(node.key);
      inOrderTraverseNode(node.right);
    }
  };
  // 实现先序遍历
  this.preOrderTraverse = function() {
    preOrderTraverseNode(root);
  };
  var preOrderTraverseNode = function(node) {
    if (node !== null) {
      console.log(node.key);
      preOrderTraverseNode(node.left);
      preOrderTraverseNode(node.right);
    }
  };

  // 实现后序遍历
  this.postOrderTraverse = function() {
    postOrderTraverseNode(root);
  };
  var postOrderTraverseNode = function(node) {
    if (node !== null) {
      postOrderTraverseNode(node.left);
      postOrderTraverseNode(node.right);
      console.log(node.key);
    }
  };

  // 查找最小值
  this.findMin = function() {
    return minNode(root);
  };
  var minNode = function(node) {
    if (node) {
      while (node && node.left !== null) {
        node = node.left;
      }
      return node.key;
    }
    return null;
  };

  // 查找最大值
  this.findMax = function() {
    return maxNode(root);
  };
  var maxNode = function(node) {
    if (node) {
      while (node && node.right !== null) {
        node = node.right;
      }
      return node.key;
    }
    return null;
  };

  // 所搜特定值
  this.search = function(key) {
    return searchNode(root, key);
  };
  var searchNode = function(node, key) {
    if (node === null) {
      return false;
    }
    if (key < node.key) {
      return searchNode(node.left, key);
    } else if (key > node.key) {
      return searchNode(node.right, key);
    } else {
      return true;
    }
  };

  // 移除节点
  this.remove = function(key) {
    removeNode(root, key);
  };
  var removeNode = function(node, key) {
    if (node === null) {
      return null;
    }
    if (key < node.key) {
      node.left = removeNode(node.left, key);
      return node;
    } else if (key > node.key) {
      node.right = removeNode(node.right, key);
      return node;
    } else {
      //需要移除的节点是一个叶子节点
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }
      //需要移除的节点包含一个子节点
      if (node.letf === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }
      //需要移除的节点包含两个子节点
      var aux = findMinNode(node.right);
      node.key = aux.key;
      node.right = removeNode(node.right, axu.key);
      return node;
    }
  };
  var findMinNode = function(node) {
    if (node) {
      while (node && node.left !== null) {
        node = node.left;
      }
      return node;
    }
    return null;
  };
}
```

## 15. 利用 promise 解决任务调度问题

```js
class Scheduler {
  constructor() {
    this.list = []; //promise list
    this.cur = 0; //current position
    this.max = 2;
  }
  add(promiseCreator) {
    let temp = null;

    if (this.cur < this.max) {
      temp = promiseCreator();
    } else {
      let arr = this.list.slice(0, this.cur - 1);
      let all = Promise.all(arr);

      temp = Promise.race([all, this.list[this.cur - 1]]).then(() => {
        return promiseCreator();
      });
    }

    this.list.push(temp);
    this.cur++;
    return temp;
  }
}

const scdu = new Scheduler();

const timeout = time => {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
};

function addTask(time, order) {
  scdu.add(() => timeout(time)).then(() => console.log(order));
}

addTask(1000, 1);
addTask(500, 2);
addTask(300, 3);
addTask(400, 4);

// 2，3，1，4
```
