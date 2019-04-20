---
title: 如何写出优雅的JS代码
date: '2018/08/29 21:00:24'
tag: code
meta:
  -
    name: description
    content: 如何写出优雅的js代码
  -
    name: keywords
    content: code
---
代码怎么写？怎样才能写出更优雅的代码？
<!-- more -->
最近领导review了下我的代码，顿时觉得自己写的代码简直就是一坨翔，因此总结一些好的写码方式，以此共勉！
## 1. 函数优化（函数是js的一等公民）

1. 善用**纯函数**
::: warning 概念：
一个函数的返回结果只依赖于它的参数，并且在执行过程里面没有副作用，我们就把这个函数叫做纯函数。
:::
2. 尽量减少**参数**

保持函数的单一性，避免副作用，可以使用高阶函数。

## 2. 多用配置结构
json具有天然的key-value配置属性，比if-else的性能要高，比switch更优雅（性能相近）。
```js
var dateMethods = {
  Y: 'FullYear',
  M: 'Month',
  D: 'Date',
  h: 'Hours',
  m: 'Minutes',
  s: 'Seconds'
};

// Object map
function parseExpires1(str) {
  var expires = new Date();
  var lastCh = str.charAt(str.length - 1);
  var value = parseInt(str, 10);
  var method = dateMethods[lastCh];

  if (method) {
    expires['set' + method](expires['get' + method]() + value);
  } else {
    expires = new Date(str);
  }

  return expires;
}

// Switch style
function parseExpires2(str) {
  var expires = new Date();
  var lastCh = str.charAt(str.length - 1);
  var value = parseInt(str, 10);
  
  switch (lastCh) {
    case 'Y': expires.setFullYear(expires.getFullYear() + value); break;
    case 'M': expires.setMonth(expires.getMonth() + value); break;
    case 'D': expires.setDate(expires.getDate() + value); break;
    case 'h': expires.setHours(expires.getHours() + value); break;
    case 'm': expires.setMinutes(expires.getMinutes() + value); break;
    case 's': expires.setSeconds(expires.getSeconds() + value); break;
    default: expires = new Date(str)
  }

  return expires;
}

console.time('switch');
parseExpires2('ss');
console.timeEnd('switch');   // switch: 0.119873046875ms

console.time('map');
parseExpires1('ss');
console.timeEnd('map');  // map: 0.0927734375ms
```

## 3. 抽象方法
一个方法尽量只干一件事，把具有共同特征的逻辑抽离出来写一个方法，可以通过参数进行重载，做到灵活可复用。

## 4. 多用return
1. 逆向思维可以很好的进行return，逻辑条理，避免执行无用代码。
``` javascript
if (loading) return
```
2. 避免超长代码
``` javascript
[].concat(arr).sort().forEach(fn)...
[].concat(arr)
  .sort()
  .forEach(fn)...
```

## 5. 合理注释
尤其是复杂的逻辑之前要加合理注释，提高可读性和可维护性。

## 6. 慎用if else
结合return考虑，写的多了看到if-else总是感觉不爽，可以想办法重构掉,例如三元表达式。

## 7. 命名即思维
代码中的命名应该做到见名知意，好的命名可以事半功倍，阅读代码和维护代码都很方便。
``` js
// 方法名以动词开头，比如 
var getName = function(){}
// 布尔值以is开头
var isEven = function(x){return x % 2 == 0}
// 驼峰大小写和下划线不要混用，比如
whatTheHell和what_the_hell
// 下划线只有在私有对象属性时使用
// 方法内部变量尽可能短
// eslint现已规定必须使用驼峰来命名变量
```

## 8. 去除重复代码
重复代码在 Bad Smell 中排在第一位，所以，竭尽你的全力去避免重复代码。因为它意味着当你需要修改一些逻辑时会有多个地方需要修改。重复代码通常是因为两个或多个稍微不同的东西，它们共享大部分，但是它们的不同之处迫使你使用两个或更多独立的函数来处理大部分相同的东西。移除重复代码意味着创建一个可以处理这些不同之处的抽象的函数/模块/类。

## 9. 善用Babel和ESLint
ESLint可以很好的规范代码，强制遵守一些规范，有了Babel，可以大胆的使用ES6，让代码变得更简洁。

## 10. 善用 try{} catch {}
eg:服务端经常会返回一些数据需要JSON.parse()处理一下，我们最终想要json格式的数据。
```js
JSON.parse(null);  // null
JSON.parse({});    // Uncaught SyntaxError: Unexpected token o in JSON at position 1
JSON.parse('');    // Uncaught SyntaxError: Unexpected end of JSON input
JSON.parse('{}');  // {}

// 对于不确定的数据最好利用try...catch来处理，一旦报错，就会影响之后的代码执行，后果严重；
try {
	JSON.parse({});
} catch (err) {
	console.log(err);
} 
// SyntaxError: Unexpected token o in JSON at position 1
// at JSON.parse (<anonymous>)
// at <anonymous>:2:7
```

## 10. Code Review
找领导同事帮你Code Review，这是学习经验、共同提高最快的办法。

## 11. 强烈建议看一下《代码大全》、《JavaScript设计模式》 等书
学习前人留下的经验，可以使自己少走弯路，进步更快。

### `有经验的可以分享下，欢迎评论！`