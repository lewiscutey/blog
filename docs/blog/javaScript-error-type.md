---
title: javaScript常见的错误类型
date: "2018/10/16 16:56:27"
type: post
tag: [JavaScript,error]
meta:
  - name: description
    content: JavaScript中常见的错误类型
  - name: keywords
    content: JavaScript,error
---

JavaScript 中常见的错误类型。

<!-- more -->

::: warning ECMA-262 定义了 7 种错误类型：

1. Error

2. EvalError

3. RangeError

4. ReferenceError

5. SyntaxError

6. TypeError

7. URIError

> 其中，Error 是基类型(其他六种类型的父类型)，其他类型继承自它。Error 类型很少见，一般由浏览器抛出的。这个基类型主要用于开发人员抛出自定义错误。

:::

## 1. SyntaxError (语法错误)：

1.1 变量名不符合规范

```js
var 1 // Uncaught SyntaxError: Unexpected number
var 1a // Uncaught SyntaxError: Invalid or unexpected token
```

1.2 给关键字赋值

```js
function = 5 // Uncaught SyntaxError: Unexpected token =
```

## 2. Uncaught ReferenceError（引用错误）：

> 引用一个不存在的变量时发生的错误。将一个值分配给无法分配的对象，比如对函数的运行结果或者函数赋值。

2.1 引用了不存在的变量

```js
a(); // Uncaught ReferenceError: a is not defined
console.log(b); // Uncaught ReferenceError: b is not defined
```

2.2 给一个无法被赋值的对象赋值

```js
console.log("abc") = 1 // Uncaught ReferenceError: Invalid left-hand side in assignment
```

## 3. RangeError（范围错误）：

> RangeError 是当一个只超出有效范围时发生的错误。主要的有几种情况，第一是数组长度为负数，第二是 Number 对象的方法参数超出范围，以及函数堆栈超过最大值。

3.1 数组长度为负数

```js
[].length = -5; // Uncaught RangeError: Invalid array length
```

3.2 Number 对象的方法参数超出范围

```js
var num = new Number(12.34);
console.log(num.toFixed(-1)); // Uncaught RangeError: toFixed() digits argument must be between 0 and 20 at Number.toFixed
// 说明: toFixed方法的作用是将数字四舍五入为指定小数位数的数字,参数是小数点后的位数,范围为0-20.
```

## 4. TypeError（类型错误）：

> 变量或参数不是预期类型时发生的错误。比如使用 new 字符串、布尔值等原始类型和调用对象不存在的方法就会抛出这种错误，因为 new 命令的参数应该是一个构造函数。

4.1 调用不存在的方法

```js
123(); // Uncaught TypeError: 123 is not a function
var o = {};
o.run(); // Uncaught TypeError: o.run is not a function
```

4.2 new 关键字后接基本类型

```js
var p = new 456(); // Uncaught TypeError: 456 is not a constructor
```

## 5. URIError（URL 错误）：

> 主要是相关函数的参数不正确。

```js
decodeURI("%"); // Uncaught URIError: URI malformed at decodeURI
```

::: tip 提醒：
URI 相关参数不正确时抛出的错误，主要涉及 encodeURI、decodeURI()、encodeURIComponent()、decodeURIComponent()、escape()和 unescape(）六个函数。
:::

## 6. EvalError eval()（函数执行错误）：

> 在 ES5 以下的 JavaScript 中，当 eval()函数没有被正确执行时，会抛出 evalError 错误。例如下面的情况：

```js
var myEval = eval;
myEval("alert('call eval')");
需要注意的是：ES5以上的JavaScript中已经不再抛出该错误，但依然可以通过new关键字来自定义该类型的错误提示。
```

::: warning 善用 try-catch
在明明知道某个地方会产生错误，可以通过修改代码来解决的地方，是不适合用 try-catch 的。或者是那种不同浏览器兼容性错误导致错误的也不太适合，因为可以通过判断浏览器或者判断这款浏览器是否存在此属性和方法来解决。
:::

```js
new Error("出错了！");
new RangeError("出错了，变量超出有效范围！");
new TypeError("出错了，变量类型无效！");
```

上面代码表示新建错误对象的实例，实质就是手动抛出错误。可以看到，错误对象的构造函数接受一个参数，代表错误提示信息（message）。

### _熟知这些基本的错误类型，在发生错误时可以快速定位解决问题。_
