---
title: Node编码规范
date: "2018/11/08 22:08:46"
tag: ["node", "code"]
meta:
  - name: description
    content: 一些简单的Node编码规范
  - name: keywords
    content: node,code,standard
---

记录一些简单的 Node 编码规范（本文来源于深入浅出nodejs）。。。

<!-- more -->

> JavaScript 作为一门编程语言，在语法上可谓是最为灵活的语言了。有人喜欢它的灵活，也有人讨厌它的混乱。无论它的灵活也好，混乱也罢，都离不开其诞生的历史。早年的 JavaScript 编写十分混乱。它的灵活性和容忍度都非常高，使得开发者可以毫无顾忌地编码，最终导致它在一定程度上臭名昭著。尽管 JavaScript 规范已经相当成熟，利用 JSLint 能够解决大部分问题，但是随着 Node 的流行，带来了一些新的变化，这些需要引起我们注意。

## 1. 空格与格式

#### 1. 缩进

采用 2 个空格缩进，而不是 tab 缩进。 空格在编辑器中与字符是等宽的，而 tab 可能因编辑器的设置不同。2 个空格会让代码看起来更紧凑、明快。

#### 2. 变量声明

永远用 var 声明变量，不加 var 时会将其变成全局变量，这样可能会意外污染上下文，或是被意外污染。 在 ECMAScript 5 的 strict 模式下，未声明的变量将会直接抛出 ReferenceError 异常。

需要说明的是，每行声明都应该带上 var，而不是只有一个 var，示例代码如下：

```js
var assert = require("assert");
var fork = require("child_process").fork;
var net = require("net");
var EventEmitter = require("events").EventEmitter;
```

错误示例如下所示：

```js
var assert = require("assert"),
  fork = require("child_process").fork,
  net = require("net"),
  EventEmitter = require("events").EventEmitter;
```

#### 3. 空格

在操作符前后需要加空格，比如+、-、\*、%、=等操作符前后都应该存在一个空格，示例如下：

```js
var foo = "bar"+baz;
```

错误的示例如下所示：

```js
var foo = "bar" + baz;
```

此外，在小括号前后应该存在空格，如：

```js
if (true) {
  // some code
}
```

错误的示例如下所示：

```js
if(true){
  // some code
}
```

#### 4. 单双引号的使用

由于双引号在别的场景下使用较多，在 Node 中使用字符串时尽量使用单引号，这样无需转义，如：

```js
var html = '<a href="http://cnodejs.org">CNode</a>';
```

而在 JSON 中，严格的规范是要求字符串用双引号，内容中出现双引号时，需要转义。

#### 5. 大括号的位置

一般情况下，大括号无需另起一行，如

```js
if (true) {
  // some code
}
```

错误的示例如下：

```js
if (true)
{
  // some code
}
```

#### 6. 逗号

逗号用于变量声明的分隔或是元素的分隔。如果逗号不在行结尾，前面需要一个空格。此外，逗号不允许出现在行首，比如：

```js
var foo = "hello",
  bar = "world";
// 或是
var hello = { foo: "hello", bar: "world" };
// 或是
var world = ["hello", "world"];
```

错误示例如下：

```js
var foo = "hello"
, bar = "world";
// 或是
var hello = {
  foo: "hello"
  , bar: "world"
};
// 或是
var world = [
  "hello"
  , "world"
];
```

#### 7. 分号

给表达式结尾添加分号。尽管 JavaScript 编译器会自动给行尾添加分号，但还是会带来一些误解，示例如下：

```js
function add() {
  var a = 1,
    b = 2;
  return
    a + b
}
```

将会得到 undefined 的返回值。因为自动加入分号后会变成如下的样子：

```js
function add() {
  var a = 1,
    b = 2;
  return;
    a + b;
}
```

后续的 a + b 将不会执行。

而如下的代码：

```js
x = y
((function() {})(

));
```

执行时会得到：

```js
x = y((function() {})());
```
::: warning 注意⚠️
由于自动添加分号可能带来未预期的结果，**所以添加上分号有助于避免误会。**
:::

## 2. 命名规范
>在编码过程中，命名是重头戏。好的命名可以令代码赏心悦目，带来愉悦的阅读享受，令代码具有良好的可维护性。命令的主要范畴有变量、常量、方法、类、文件、包等。
#### 1. 变量命名
变量名都采用小驼峰式命名，即除了第一个单词的首字母不大写外，每个单词的首字母都大写，词与词之间没有任何符号，如：
```js
var adminUser = {};
```
错误的示例如下：
```js
var admin_user = {};
```
#### 2. 方法命名

方法命名与变量命名一样，采用小驼峰式命名。与变量不同的是，方法名尽量采用动词或判断性词汇，如：
```js
var getUser = function () {};
var isAdmin = function () {};
User.prototype.getInfo = function () {};
```
错误示例如下：
```js
var get_user = function () {};
var is_admin = function () {};
User.prototype.get_info = function () {};
```
#### 3. 类命名

类名采用大驼峰式命名，即所有单词的首字母都大写，如：
```js
function User {

}
```
#### 4. 常量命名

作为常量时，单词的所有字母都大写，并用下划线分割，如：
```js
var PINK_COLOR = "pink";
```
#### 5. 文件命名

命名文件时，请尽量采用下划线分割单词，比如child_process.js和string_decode.js。如果你不想将文件暴露给其他用户，可以约定以下划线开头，如_linklist.js。

#### 6. 包名

也许你有贡献模块并将其打包发布到NPM上。在包名中，尽量不要包含js或node的字样，它是重复的。包名应当适当短且有意义的，如：
```js
var express = require('express');
```

## 3. 比较操作
在比较操作中，如果是无容忍的场景，请尽量使用===代替==，否则你会遇到下面这样不符合逻辑的结果：
```js
'0' == 0; // true
'' == 0 // true
'0' === '' // false
```
此外，当判断容忍假值时，可以无需使用===或==。在下面的代码中，当foo是0、undefined、null、false、''时，都会进入分支：
```js
if (!foo) {
  // some code
}
```
## 4. 字面量
请尽量使用{}、[]代替new Object()、new Array()，不要使用string、bool、number对象类型，即不要调用new String、new Boolean和new Number。

## 5. 作用域
在JavaScript中，需要注意一个关键字和一个方法，它们是with和eval()，容易引起作用域混乱。

#### 1. 慎用with

示例代码如下：
```js
with (obj) {
  foo = bar;
}
```
它的结果有可能是如下四种之一：
```js
obj.foo = obj.bar;
obj.foo = bar;
foo = bar;
foo = obj.bar;
```
这些结果取决于它的作用域。如果作用域链上没有导致冲突的变量存在，使用它则是安全的。但在多人合作的项目中，这并不容易保证，所以要慎用with。

#### 2. 慎用eval()

慎用eval()的原因与with相同。如果不影响作用域上已存在的变量，用它是安全的。另外，利用eval()的这个特性，也可以玩出一些好玩的特性来，比如wind.js利用它实现了流程控制，详见第4章。在大多数情况下，基本上轮不到eval()来完成特殊使命。示例代码如下：
```js
var obj = {
  foo: 'hello',
  bar: 'world'
};
var key = (Math.round(Math.random() * 100) % 2 === 0) ? 'foo' : 'bar';
var value = eval('(obj.' + key + ')');
```
上述代码多出现在新手中，实际只要如下一行代码即可完成：
```js
var value = obj[key];
```

## 6. 数组与对象
在JavaScript中，数组其实也是对象，但是两者在使用时有些细节需要注意。

#### 1. 字面量格式

创建对象或者数组时，注意在结尾用逗号分隔。如果分行，一行只能一个元素，示例代码如下：
```js
var foo = ['hello', 'world'];
var bar = {
  hello: 'world',
  pretty: 'code'
};
```
错误示例如下所示：
```js
var foo = ['hello',
'world'];
var bar = {
  hello: 'world', pretty: 'code'
};
```
#### 2. for in循环

使用for in循环时，请对对象使用，不要对数组使用，示例代码如下：
```js
var foo = [];
foo[100] = 100;
for (var i in foo) {
  console.log(i);
}

for (var i = 0; i < foo.length; i++) {
  console.log(i);
}
```
在上述代码中，第一个循环只打印一次，而第二个循环则打印0~100，这并不满足预期值。

#### 3. 不要把数组当做对象使用

尽管在JavaScript内部实现中可以把数组当做对象来使用，如下所示：
```js
var foo = [1, 2, 3];
foo['hello'] = 'world';
```
这在for in迭代时，会得到所有值：
```js
for (var i in foo) {
  console.log(foo[i]);
}
```
也许你只是想得到hello而已。

## 7. 异步
在Node中，异步使用非常广泛并且在实践过程中形成了一些约定，这是以往不曾在意的点。

#### 1. 异步回调函数的第一个参数应该是错误指示

并不是所有回调函数都需要将第一个参数设计为错误对象。但是一旦涉及异步，将会导致try catch无法捕获到异步回调期的异常。将第一个参数设计为错误对象，告知调用方是一个不错的约定。示例代码如下：
```js
function (err, data) {

};
```
这个约定被很多流程控制库所采用。遵循这个约定，可以享受社区流程控制库带来的业务编写便利。

#### 2. 执行传入的回调函数

在异步方法中一旦有回调函数传入，就一定要执行它，且不能多次执行。如果不执行，可能造成调用一直等待不结束，多次执行也可能会造成未期望的结果。

## 8. 类与模块
关于如何在JavaScript中实现继承，有各种各样的方式，但在Node中我们只推荐一种，那就是类继承的方式。另外，在Node中，如果要将一个类作为一个模块，就需要在意它的导出 方式。

#### 1. 类继承

一般情况下，我们采用Node推荐的类继承方式，示例代码如下：
```js
function Socket(options) {
  // ...
  stream.Stream.call(this);
  // ...
}
util.inherits(Socket, stream.Stream);
```
#### 2. 导出

所有供外部调用的方法或变量均需挂载在exports变量上。当需要将文件当做一个类导出时，需要通过如下的方式挂载：
```js
module.exprots = Class;
```
而不是通过
```js
exports = Class;
```
私有方法无需因为测试等原因导出给外部，所以无须挂载。
## 9. 注解规范
一般情况下，我们会对每个方法编写注释，这里采用dox的推荐注释，示例如下：
```js
/**

* Queries some records

* Examples:

* ```

* query('SELECT * FROM table', function (err, data) {
* // some code
* });
* ```
* @param {String} sql Queries
* @param {Function} callback Callback
*/

exports.query = function (sql, callback) {
  // ...
};
```
dox的注释规范源自于JSDoc。可以通过注释生成对应的API文档。

#### *细致的编码规范有很多，有争议的也少，但这并不阻碍我们找到更好的方式来写好代码，也可以给编辑器设置检测工具，或者在版本控制中的hook中设置钩子，如在precommit这样的钩子脚本中，通过在提交时实现代码质量的检查。如果质量不达标，将停止提交。*

#### *代码质量关乎产品的质量，最容易改进的地方即是编码规范，收效也是最高的，它远比单元测试要容易付诸实践。一旦团队制定了编码规范，就应该严格执行，严格杜绝团队中编码规范拖后腿的现象。*

#### *如果你还采用非编译式JavaScript来编写你的应用，请记住这些编码规范。尽管因为历史原因无法一步到位改进这些缺点，但是既然知晓何为优秀，何为糟粕，就应该将优秀当做一种习惯。*

