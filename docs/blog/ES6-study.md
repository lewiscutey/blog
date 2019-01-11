---
title: ES6学习笔记
date: "2018/09/08 09:54:54"
tag: ES6
meta:
  - name: description
    content: 一篇自己的ES6学习笔记
  - name: keywords
    content: ES6
---

总结一些 ES6 的学习心得体会。。。

<!-- more -->

## 1. 箭头函数(=>)

JS的箭头函数大概就像python中的lambda(python定义匿名函数的关键字)和ruby中的blocks(类似于闭包)一样。

这些匿名函数都有他们特殊的语法：首先接收一定数目的参数，然后在定义它们的函数的作用域或就近作用域中执行。

::: warning 注意：
箭头函数中 this 的使用跟普通函数也不一样，在 JavaScript 的普通函数中，都会有一个自己的 this 值，而箭头函数没有。
:::

### 普通函数

1. 函数作为全局函数被调用时，this 指向全局对象;
2. 函数作为对象中的方法被调用时，this 指向该对象;
3. 函数作为构造函数的时候，this 指向构造函数 new 出来的新对象;
4. 可以通过 call，apply，bind 改变 this 的指向新的对象;

### 箭头函数

1. 箭头函数没有 this，函数内部的 this 来自于父级最近的非箭头函数，并且不能改变 this 的指向;
2. 箭头函数没有 super;
3. 箭头函数没有 arguments,可以使用 rest 代替;
4. 箭头函数没有 new.target 绑定;
5. 不能使用 new;
6. 没有原型;
7. 不支持重复的命名参数;

``` javascript
const arr = [1,2,3,4,5];
const sum = arr.reduce((prev, now) => prev + now);
console.log(sum); // 15
```

### 不应该使用箭头函数的情景
#### 1. 对象中的方法:
曾经流行一种趋势，用class类的语法和箭头函数，为其自动绑定方法。比如:事件方法可以使用，但是仍然绑定在class类中。

看起来就像下面的例子:
```js
class Counter {
  counter = 0;
  handleClick = () => {
    this.counter++;
  }
}
```
在这种方法中,如果被一个点击事件函数调用了，它虽然不是Counter的上下文中，它仍旧可以访问实例的数据，这种方式的缺点不言而喻。

用这种方式的确提供了一种绑定函数的快捷方式，但是函数的表达形式多种多样，相当不直观。如果你尝试在原型使用这种对象，这将不利于测试，同时也会产生很多问题。

相反，推荐用一种常规的绑定方式，如有必要可以绑定在实例的构造函数中:
```js
class Counter {
  counter = 0;
  handleClick() {
    this.counter++;
  }
  constructor() {
    this.handleClick = this.handleClick.bind(this);
  }
}
```
#### 2. 深层调用:
另一种使用箭头函数会让你头疼的地方，就是你去用很多函数的组合调用，尤其是函数的深层调用。

简单的理由跟匿名函数一样，堆栈的追踪很复杂。

如果你的函数仅仅在一层之下，而不是深层的迭代，这倒不是什么问题。但是如果你将函数定义为箭头函数，并且在他们之间来回调用，当你调试bug的时候你将被代码困惑，甚至得到如下的错误信息：
```js
{anonymous}()
{anonymous}()
{anonymous}()
{anonymous}()
{anonymous}()
//anonymous 匿名
```
#### 3. 有动态上下文的函数:
还有最有一种箭头函数会让你困惑的情形，就是this是动态绑定的时候。

如果你在以下情形使用箭头函数，那么this的动态绑定不会如期工作，并且你也会困惑这些代码为什么不像预期那样工作，也会给你之后工作的人造成麻烦。

一些典型的例子：

* 事件的调用函数，this指向当前的目标属性
* 在jquery中，大多数时候this指向的是当前被选择的元素

在vue中，methods和computed中的this指向的是vue的组件。

当然你也可以在上面的情形之下谨慎的使用箭头函数。但特别是在jquery和vue的情况下, 这通常会干扰正常功能, 并使您感到困惑：为什么看起来跟别人代码一样的代码就是不工作。


## 2. 解构
解构赋值语法是一个 Javascript 表达式，这使得可以将值从数组或属性从对象提取到不同的变量中。

::: warning 注意：
解构是一种打破数据结构，将其拆分为更小部分的过程。本质上这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。
:::

### 1.数组解构:
从数组中提取值，按照对应位置，对变量赋值。
```js
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [ , , third] = ["foo", "bar", "baz"];
third // "baz"

let [x, , y] = [1, 2, 3];
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined  如果解构不成功，变量的值就等于undefined。
z // []
```
解构赋值允许指定默认值。
```js
let [foo = true] = [];
foo // true

let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
```
如果等号的右边不是数组（或者严格地说，不是可遍历的结构），那么将会报错。
```js
// 报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
// 注意，ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。
let [x = 1] = [undefined];
x // 1

let [x = 1] = [null];
x // null
```
### 2.对象解构:
对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
```js
let { bar, foo } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: "aaa", bar: "bbb" };
baz // undefined

let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'
```
::: warning 注意：
对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。
:::
```js
let { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };

let { foo: baz } = { foo: "aaa", bar: "bbb" };
baz // "aaa"
foo // error: foo is not defined

// 以上代码中foo是匹配的模式，baz才是变量。真正被赋值的是变量baz，而不是模式foo。
```
对象的解构也可以指定默认值。
```js
var {x = 3} = {};
x // 3

var {x, y = 5} = {x: 1};
x // 1
y // 5

var {x: y = 3} = {};
y // 3

var {x: y = 3} = {x: 5};
y // 5

// 默认值生效的条件是，对象的属性值严格等于undefined。
var {x = 3} = {x: undefined};
x // 3

var {x = 3} = {x: null};
x // null  属性x等于null，因为null与undefined不严格相等，所以是个有效的赋值，导致默认值3不会生效.
let {foo} = {bar: 'baz'};
foo // undefined 解构失败，变量的值等于undefined。
```

### 3.参数解构:
函数的参数也可以使用解构赋值, 并且用的也最多。
```js
function add([x, y]){
  return x + y;
}
add([1, 2]); // 3

[[1, 2], [3, 4]].map(([a, b]) => a + b);
// [ 3, 7 ]
```
函数参数的解构也可以使用默认值。
```js
function move({x = 0, y = 0} = {}) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]
// 下面代码是为函数move的参数指定默认值，而不是为变量x和y指定默认值，所以会得到与前一种写法不同的结果。
function move({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]
```
undefined就会触发函数参数的默认值。
```js
[1, undefined, 3].map((x = 'yes') => x);
// [ 1, 'yes', 3 ]
```

### 4.字符串的解构:
字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。
```js
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```
类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。
```js
let {length : len} = 'hello';
len // 5
```

### 5.数值和布尔值的解构:
解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
```js
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true
```
上面代码中，数值和布尔值的包装对象都有toString属性，因此变量s都能取到值。
:::warning 注意
解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。
:::
```js
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```

## 3. 函数的扩展

## 4. 数组的扩展

## 5. 对象的扩展