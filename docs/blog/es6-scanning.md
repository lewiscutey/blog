---
title: ES6的语言特性
date: '2019/06/22 23:27:34'
type: post
tag: ES6
meta:
  -
    name: description
    content: 简单介绍ES6的语言特性
  -
    name: keywords
    content: ES6
---
本文简介一些ES6的语言特性！
<!-- more -->
## 1. const、let关键字
众所周知，在**JavaScript**中，变量默认是全局性的，只存在函数级作用域，声明函数曾经是创造作用域的唯一方法。这点和其他编程语言存在差异，其他语言大多数都存在块级作用域。所以在ES6中，新提出的let关键字使这个缺陷得到了修复。
```
if (true) {
    let a = 'name';
}
console.1og (a);
// ReferenceError:a is not defined
```
同时还引入的概念是const,用来定义一个常量，一旦定义以后不可以修改，不过如果是引用类型的，那么可以改变它的属性。
```
const MYNAME = 'viking';
MYNAME = 'kitty';
// "CONSTANT" is read-only
const MYNAME = ({foo: 'viking'};
MYNAME.foo = 'kitty';
//可以正常运行
```
## 2. 函数
### 箭头函数
箭头函数是一种更简单的函数声明方式，可以把它看作是一种语法糖，箭头函数永远是匿名的。
```
let add = (a, b) => {
  return a + b;
}
//当后面是表达式(expression)的时候，还可以简写成
let add = (a, b) => a + b;
//等同于
let add = function (a, b) {
  return a + b;
}
//在回调函数中应用
let numbers = [1, 2, 3];
let doubleNumbers = numbers.map((number) => number * 2);
console.log(doubleNumbers);
//[2，4, 6]看起来很简便吧
```
### this在箭头函数中的使用
在工作中经常会遇到这样的问题，就是this在一个对象方法中嵌套函数。
```
var age = 2;
var kitty= {
  age: 1,
  grow: function() {
    setTimeout (function() {
      console.log(++this.age) ;
    }, 1000);
  }
};
kitty.grow();  // 3
```
在对象方法的嵌套函数中，this 会指向global对象，这被看作是JavaScript在设计上的一个重大缺陷，一般都会采用一些hack来解决它，如下:
```
let kitty = {
  age: 1,
  grow: function () {
    const self = this;
    setTimeout(function () {
      console.log(++self.age);
    }, 100);
  }
}
//或者
let kitty = {
  age: 1,
  grow: function () {
    setTimeout(function () {
      console.log(++this.age);
    }.bind(this), 100);
  }
}
```
现在有了箭头函数，可以很轻松地解决这个问题。
```
let kitty = {
  age: 1,
  grow: function () {
    setTimeout(() => {
      console.log(this.age);
    }, 100);
  }
}
```
### 函数默认参数
ES6没有出现之前，面对默认参数都会让人感到很痛苦，不得不采用各种hack,比如说: values = values[0]。现在一切都变得轻松很多。
```
function desc(name = ' Peter', age = 5) {
  return name + ' is ' + age + ' years old ';
}
desc();
//Peter is 5 years old
```
### Rest参数
当一个函数的最后一个参数有 “..."这样的前缀，它就会变成一个参数的数组。
```
function test(...args) {
  console.log(args);
}
test(1, 2, 3);
// [1, 2, 3]
function test2(name, ...args)(
  console.log(args);
}
test2('Peter', 2, 3);
//[2，3]
```
**它和arguments有如下区别:**

①Rest参数只是没有指定变量名称的参数数组，而arguments是所有参数的集合;

②arguments 对象不是一个真正的数组，而Rest参数是一个真正的数组，可以使用各种方法，比如sort、map 等。

有了这两个理由，是时候告别arguments,拥抱可爱的Rest参数了。
## 3. 展开操作符
刚才在函数中讲到了使用“...”操作符来实现函数参数的数组，其实这个操作符的魔力不仅仅如此。它被称为展开操作符，允许一个表达式在某处展开，在存在多个参数(用于函数调用)、多个元素(用于数组字面量)或者多个变量(用于解构赋值)的地方就会出现这种情况。
### 用于函数调用
如果在之前的JavaScript中，想让函数把一个数组依次作为参数进行调用，一般会如下这样做。
```
function test(x, y, z) { };
var args = [1, 2, 3],
test.apply (null, args);
```
有了ES6的展开运算符，可以简化这个过程。
```
function test(x, y, z) { };
let args = [0，1, 2]
test(...args) ;
```
### 用于数组字面量
在之前的版本中，如果想创建含有某些元素的新数组，常常会用到splice、concat、push等方法，如下。
```
var arrl = [1, 2, 3];
var arr2 = [4, 5, 6];
var arr3 = arr1.concat(arr2) ;
console.log(arr3);
// 1.2.3.4.5,6
```
使用展开运算符以后就简便了很多，如下：
```
let arr1 = (1, 2, 3);
let arr2 = [4，5, 6];
let arr3 = [...arr1, ...arr2];
console.log(arr3);
// 1,2,3,4.5,6
```
### 对象的展开运算符
数组的展开运算符简单易用，那么对象有没有这个特性?
```
let mike = {name: 'mike', age: 50};
mlke = {...mike, sex: 'male');
console.log (mike);
/*
[object object] {
    age: 50，
    name: "mike" ，
    sex: "male"
}
*/
```
对象的展开运算符其实已经被提上日程，只不过它是ES7的提案之一，它可以让你以更简洁的形式将一个对象可枚举的属性复制到另外一个对象上。这一特性可以借助后面介绍的**Babel**和它的插件来实现。
## 4.模板字符串
在ES6之前的时代，字符串的拼接总是一件令人不爽的事情，但是在ES6来临的时代，这个痛处也要被治愈了。
```
//之前总会做这些事情
var name = 'viking';
var a = 'My name is ' + name + '|';
//多行字符串
var longStory = 'This is a long story,'
+ 'this is a long story',
+ 'this is a long story.';
// 有了ES6现在可以这样做
// 注意这里不是引号而是这个符号
let name = 'viking';
let a = `My name is ${name} !`;
let longStory = `This is a long story,
this is a long story
this is a long story~`;
//非常方便，对吧
```
## 5. 解构赋值
解构语法可以快速从数组或者对象中提取变量，可以用一个表达式读取整个结构。
### 解构数组
```
let foo = ['one', 'two', 'three'];
let [one, two, three] = foo;
console.log(${one}, ${two}, ${three});
//one, two, three
```
### 解构对象
```
let person = {name: 'viking', age: 20};
let {name, age} = person;
console, log(${name}, ${age});
//viking, 20
```
解构赋值可以看作一种语法糖，它受Python语言的启发，可以提高效率。
## 6. 类
众所周知，在**JavaScript**的世界里是没有传统类的概念的，它使用原型链的方式来完成继承，但是声明的方式看起来总是怪怪的，所以ES6提供了**class**这个语法糖，让开发者可以模仿其他语言类的声明方式，看起来更加明确清晰。需要注意的是,**class**并没有带来新的结构，而只是原来原型链方式的一种语法糖。
```
class Animal {
  //构造函数
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  shout() {
    return `My name is ${this.name}, age is ${this.age}`;
  }
  //静态方法
  static foo() {
    return 'Here is a static method';
  }
}

const cow = new Animal('betty', 2);
cow.shout();
// My name is betty, age is 2
Animal.foo();
//Here is a static method
class Dog extends Animal {
  constructor(name, age = 2, color = 'black') {
    //在构造函数中可以直接调用super方法
    super(name, age);
    this.color = color;
  }
  shout() {
    //在非构造函数中不能直接使用super方法
    //但是可以采用super(). +方法名宇调用父类方法
    return super.shout() + `，color is ${this.color}.`;
  }
}
const jackTheDog = new Dog('jack');
jackTheDog.shout();
//"My name is jack, age is 2，color is black"
```
## 7. 模块
**JavaScirpt**模块化代码是一个古老的话题，从前端开发这个职业诞生到现在一直都在不断地进化，它的发展也从外一个侧面反映了前端项目越来越复杂、越来越工程化。

在ES6之前，**JavaScript**并没有对模块做出任何定义，于是先驱者们创造了各种各样的规范来完成这个任务。伴随着**Require.js**的流行，它所推崇的**AMD**格式也成了开发者的首选。在这之后，**Node.js**诞生了，随之而来的是**CommonJS**格式，再之后**browserify**的诞生，让浏览器端的开发也能使用这种格式。直到ES6的出现，模块这个观念才真正有了语言特性的支持，现在来看看它是如何被定义的。
```
//hello.js文件
//定义一个命名为hello的函数
function hello() {
    console.log('Hello ES6');
}
//使用export导出这个模块
export hello;
//main.js
//使用import加载这个模块
import { hello } from ' ./hello';
hello();
//Hello ES6
```
上面的代码就完成了模块的一个最简单的例子，使用**import**和**export**关键字完成模块的导入和导出。当然也可以完成一个模块的多个导出，请看下面的例子。
```
//hello.js
export const PI = 3.14;
export function hello() {
    console.log('Hello ES6');
}
export let person = {name: 'viking');
//main.js
//使用对象解构赋值加载这3个变量
import {PI, hello, person} from './hello';
//也可以将这个模块全部导出
import * as util from './hello';
console.log (util.PI);
//3.14
```
还可以使用**default**关键字来实现模块的默认导出；
```
//hello.js
export default function () (
    console.log('Hello ES6');
}
//main.js
import hello from './hello';
hello();
//Hello ES6
```
模块的官方定义对于**JavaScript**来说是具有划时代意义的，它让各种关于**JavaScript**模块化标准的争斗落下帷幕，开发者不用再为选择什么样的模块标准而苦恼，每个人都可以开心地使用ES6的模块标准。

*以上就是ES6中比较重要的一些语言特性啦！*