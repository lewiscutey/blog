---
title: Vue开发注意事项
date: '2018/11/26 20:34:13'
tag: Vue
meta:
  -
    name: description
    content: 总结一些Vue开发中的坑（注意事项)
  -
    name: keywords
    content: vue
---
本文总结一些Vue开发中的坑（注意事项)。。。
<!-- more -->

## 1. watch中不能使用箭头函数
::: warning 箭头函数慎用:
注意，**不应该使用箭头函数来定义 watcher 函数** (例如 searchQuery: newValue => this.updateAutocomplete(newValue))。理由是箭头函数绑定了父级作用域的上下文，所以 this 将不会按照期望指向 Vue 实例，this.updateAutocomplete 将是 undefined。 
:::
### 这些情况下不要使用箭头函数:
```js
不应该使用箭头函数来定义一个生命周期方法
不应该使用箭头函数来定义 method 函数
不应该使用箭头函数来定义计算属性函数
不应该对 data 属性使用箭头函数
不应该使用箭头函数来定义 watcher 函数
```