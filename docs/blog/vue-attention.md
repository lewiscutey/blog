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

## 2. 覆盖子组件样式时失效-请使用深度选择器
> 一般我们习惯在独立的组件 `<style>` 中加 `scoped` 属性来避免影响全局样式，当这样做时，它的 CSS 只作用于当前组件中的元素。这类似于 Shadow DOM 中的样式封装。它有一些注意事项，但不需要任何 polyfill。

::: warning 1.混用本地和全局样式:
可以在一个组件中同时使用有 scoped 和非 scoped 样式：
:::
```html
<style>
/* 全局样式 */
</style>

<style scoped>
/* 本地样式 */
</style>
```
::: warning 2.子组件的根元素:
使用 `scoped` 后，父组件的样式将不会渗透到子组件中。不过一个子组件的根节点会同时受其父组件的 scoped CSS 和子组件的 scoped CSS 的影响。这样设计是为了让父组件可以从布局的角度出发，调整其子组件根元素的样式。
:::
```html
<template>
  <div id="app">
    <el-input  class="text-box" v-model="text"></el-input>
  </div>
</template>
<style lang="less" scoped>
#app {
  width: 100%;
  .text-box {
    width: 50%;
    /deep/ input {
      width: 166px;
      text-align: center;
    }
  }
}
</style>
```

::: warning 3.深度作用选择器:
如果你希望 scoped 样式中的一个选择器能够作用得“更深”，例如影响子组件，你可以使用 >>> 操作符,有些像 Sass/less 之类的预处理器无法正确解析 >>>,这种情况下你可以使用 /deep/ 操作符取而代之——这是一个 >>> 的别名，同样可以正常工作(此方式从 vue-loader 11.2.0 开始支持)。
:::
```html
<style scoped>
.a >>> .b { /* ... */ }
</style>

<style lang="less" scoped>
.a /deep/ .b  { /* ... */ }
</style>
```
将会编译为：
```css
.a[data-v-f3f3eg9] .b { /* ... */ }
```

::: warning 4.动态生成的内容:
通过 `v-html` 创建的 DOM 内容不受 `scoped` 样式影响，但是你仍然可以通过深度作用选择器来为他们设置样式。
:::
