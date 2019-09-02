---
title: 一文彻底学以致用js数组之循环
date: '2019/06/19 20:20:10'
type: post
tag: [javascript, array]
meta:
  -
    name: description
    content: JavaScript数组中的循环
  -
    name: keywords
    content: javascript, array
---
本文志在彻底学以致用JavaScript数组之循环！
<!-- more -->
>最近做了一个新项目，闲暇review了下代码，发现自己用了很多for循环（简洁明了），再看下别人的代码几乎没有`for`，几乎全是`foreach`和`map`循环，难道是我写的太low了吗？其实在写码的时候有时候也有选择恐慌症，到底该用哪种循环，最后发现其他方法总是不能为我所用，最后总是选择了最简单的`for`，怎一个好用了得，也早想花点时间好好研究比较一下数组的这些循环方法，下面就开始正文啦😄！

# 1. 在ES5中常用的10种数组遍历方法:

1. for循环语句
2. Array.prototype.forEach
3. Array.prototype.map
4. Array.prototype.filter
5. Array.prototype.reduce
6. Array.prototype.some
7. Array.prototype.every
8. Array.prototype.indexOf
9. Array.prototype.lastIndexOf
10. for...in循环语句

### 1. for：简洁明了，通俗易懂，可能需要多写点代码，多定义几个变量，但是为我所用，为我所爱。
```js
「普通版」
let arr = [1, 2, 3, 4, 5];
for(let i = 0; i < arr.length; i++) {
    arr[i] = arr[i] * 2;
}
console.log(arr);  //[2, 4, 6, 8, 10]
 
「升级版」
let arr = [1, 2, 3, 4, 5];
for(let i = 0; len = arr.length,i < len; i++) {
    arr[i] = arr[i] * 2;
}
console.log(arr); //[2, 4, 6, 8, 10]
```
### 2. forEach：接收两个参数，第一个参数是在每一项上运行的函数（拥有三个参数），第二个参数「可选的」是运行该函数的作用域对象（影响this的值），return不能中断函数继续执行，所以没有返回值，不能改变原数组，使用方便一般用来代替for，但是没for性能高，而且有兼容性（IE6-8）。
```
let arr = [1, 2, 3, 4, 5];
arr.forEach((value, index, array) => {
    return value * 2;
});
console.log(arr);  //[1, 2, 3, 4, 5]
```
### 3. map：基本用法和foreach相同，不同的是可以return返回值,但是不改变原数组，一般用来修改数组的值从而映射为一个新数组。
```
let arr = [1, 2, 3, 4, 5];
let arrs = arr.map((value, index, array) => {
    return value * 2;
});
console.log(arrs); //[2, 4, 6, 8, 10]
```
### 4. filter：顾名思义是"过滤"，就是去掉不想要的值，`return true`为想要的值，`return false`则为去掉的值，一般用来过滤一个数组，不改变原来的数组。
```
let arr = [1, 2, 3, 4, 5];
let arrs = arr.filter((value, index, array) => {
    if (value > 2) {
        return true;
    } else {
        return false;
    }
});
console.log(arrs); //[3, 4, 5]
```
### 5. reduce：可以实现一个累加器的功能，将数组的每个值（从左到右）累加起来，不同的是有四个参数，prev表示前两个值的和（没有定义初始值时为第一个值），next为后一个值。
```
let arr = [1, 2, 3, 4, 5];
let arrs = arr.reduce((prev, next, index, array) => {
    console.log(prev);   // 1，3，6，10
    console.log(next);   // 2，3，4，5
    return prev + next;
});
console.log(arrs);  //15
```
### 6. some：类似于filter，不同的是返回值为`Boolean`,不是筛选一个新的数组，而是筛选有没符合条件的值，只要有一个值满足即立刻返回true，不再继续执行，否则返回false。
```
let arr = [1, 2, 3, 4, 5];
let arrs = arr.some((value, index, array) => {
    return value > 3;
});
console.log(arrs); // true
```
### 7. every：类似于some，不同的是找到符合条件的值会继续执行，如果每个值都满足条件才会返回true，否则就是false。
```
let arr = [1, 2, 3, 4, 5];
let arrs = arr.every((value, index, array) => {
    return value > 3;
});
console.log(arrs);  //false
 
let arr = [ 4, 5];
let arrs = arr.every((value, index, array) => {
    return value > 3;
});
console.log(arrs);  //true
```
### 8. indexOf：数组中的这个方法和字符串中的几乎一样，都是找到一个满足条件的值就不继续执行了，返回值是满足条件值的下标，否则返回-1。
```
let arr = [1, 2, 3, 4, 5];
let arrs = arr.indexOf(2);
console.log(arrs);  // 1
 
let arr = [1, 2, 3, 4, 5];
let arrs = arr.indexOf(6);
console.log(arrs); // -1
```
### 9. lastIndexOf：类似于indexOf，不同的是查找方向是从后向前。
```
let arr = [1, 2, 3, 4, 5, 1];
let arrs = arr.lastIndexOf(1);
console.log(arrs); // 5
 
let arr = [1, 2, 3, 4, 5, 1];
let arrs = arr.lastIndexOf(6);
console.log(arrs); // -1
```
### 10. for...in：主要用来遍历对象，其实数组的本质也是以key和value的键值对存在的，数组遍历的是下标，对象遍历的是key,一般用来遍历对象。
```
let arr = [1, 2, 3, 4, 5];
for(let i in arr) {
    console.log(i);  // 0, 1, 2, 3, 4
}
 
let arr = {name: "lewis", age: 25};
for(let i in arr) {
    console.log(i);  // name, age
}
```
# 2. 在ES6中常用的`for...of`数组遍历方法:
**for...of**:  `JavaScript`原有的`for...in`循环，只能获得对象的键名，不能直接获取键值。ES6 提供`for...of`循环，允许遍历获得键值，但是不能循环对象，一般用来循环数组。
```
let arr = [1, 2, 3, 4, 5];
for (let i in arr) {
  console.log(i);  // 0, 1, 2, 3, 4
}
 
for (let i of arr) {
  console.log(i);  // 1, 2, 3, 4, 5
}
```
**总结：**
**看到这里相信你已经把基本用法和示例弄的差不多了，接下来总结一下，一般的循环用`for`,`for...in`,`for...of`和`forEach`,需要映射为新数组的用`map`，需要筛选出想要的用`filter`，数值需要进行累加的用`reduce`，如果要找一些值用`some`和`every`，并且想知道值的具体位置的可以用`indexOf`和`lastIndexOf`，接下来就是对症下药，因地制宜了，相信你会熟练掌握并准确应用了。** 

# 3. 常用的一般数组循环for,for...in,for...of和forEach/map性能对比：
```
let arr = Array(100).fill(5);
 
console.time("for循环");
for(let i = 0; i < arr.length; i++) {
    arr[i] = arr[i] * 2;
}
console.timeEnd("for循环");  // for循环: 0.041ms
 
console.time("for...in循环");
for(let i in arr) {
    arr[i] = arr[i] * 2;
}
console.timeEnd("for...in循环"); // for...in循环: 0.126ms
 
console.time("for...of循环");
for(let i of arr) {
    arr[i] = arr[i] * 2;
}
console.timeEnd("for...of循环");  // for...of循环: 3532.695ms
 
console.time("forEach循环");
arr.forEach((value, index, arr) => {
    arr[index] = value * 2;
});
console.timeEnd("forEach循环");  // forEach循环: 0.103ms

console.time("map循环");
arr.map((value, index, arr) => {
    arr[index] = value * 2;
});
console.timeEnd("map循环"); //map循环: 0.086ms
```
 　　**哈哈，经过多次对比取平均值可以明显的看到`for`循环秒杀其他方法（这只是100个数，如果更多的数效果将会更明显），原来自己的方法一点都不low啊，只要在正确的场合应用正确的方法并简单有效才是最好的，以后一般的循环大家可以大胆的使用for循环啦！**

## 常用的检测数组的方法：

1. instanceof
2. Array.isArray()
3. Object.prototype.toString.call()  「推荐使用这个」
