---
title: vue源码学习笔记
date: '2018/10/06 14:56:31'
type: post
tag: [vue,source-code]
meta:
  -
    name: description
    content: 记录vue源码的学习笔记
  -
    name: keywords
    content: vue,source-code
---
终于有时间静下来学习一下vue源码了。
<!-- more -->

## 1. 生命周期
| 生命周期钩子        | 组件状态       | 最佳实践        |
| ------------- |:-------------:| -----|
| beforeCreate | 实例初始化之后，this指向创建的实例，不能访问到data、computed、watch、methods上的方法和数据 | 常用于初始化非响应式变量 |
| created | 实例创建完成，可以访问到data、computed、watch、methods上的方法和数据，未挂载DOM，不能访问$el,$ref属性内容为空数组 | 常用于简单的ajax请求，页面的初始化 |
| beforeMount | 实例挂载之前，找到对应的template编译为render函数 |  |
| mounted | 实例挂载到DOM上，可以获取到DOM节点，可以访问$ref属性 | 常用于操作DOM和ajax请求 |
| beforeupdate | 响应式数据更新前调用，发生在虚拟DOM打补丁之前 | 常用于在更新之前访问现有的DOM，比如手动移除已添加的事件监听器 |
| updated | 虚拟DOM重新渲染和打补丁之后调用，组件DOM已更新 | 可执行依赖与新DOM的操作，避免在这个钩子中操作数据，可能陷入死循环 |
| beforeDestroy | 实例销毁之前调用，这一阶段this仍可获取到实例 | 常用于销毁定时器，解绑全局事件，销毁插件对象等操作 |
| destroyed | 实例销毁后调用，调用后Vue实例的所有东西都会解绑，所有事件监听器都会被移除，所有的子组件会被销毁 |  |
| activated |  |  |
| deactivated |  |  |
| errorCaptured |  |  |

::: warning created阶段与mounted阶段ajax请求的区别：
前者页面视图未出现，如果请求信息过多，页面会长时间处于白屏状态；mounted 不会承诺所有的子组件也都一起被挂载，如果你希望等到整个视图都渲染完毕，可以用 **vm.$nextTick**
:::
## 2. 响应式原理
:::  warning computed 和 watch 的差异：
* computed 是计算一个新的属性，并将该属性挂载到 vm（Vue 实例）上，而 watch 是监听已经存在且已挂载到 vm 上的数据，所以用 watch 同样可以监听 computed 计算属性的变化（其它还有 data、props）;
* computed 本质是一个惰性求值的观察者，具有缓存性，只有当依赖变化后，第一次访问 computed 属性，才会计算新的值，而 watch 则是当数据发生变化便会调用执行函数;
* 从使用场景上说，computed 适用一个数据被多个数据影响，而 watch 适用一个数据影响多个数据；
:::

## 3. Vue选项合并
* 对于 el、propsData 选项使用默认的合并策略 defaultStrat。
* 对于 data 选项，使用 mergeDataOrFn 函数进行处理，最终结果是 data 选项将变成一个函数，且该函数的执行结果为真正的数据对象。
* 对于 生命周期钩子 选项，将合并成数组，使得父子选项中的钩子函数都能够被执行
* 对于 directives、filters 以及 components 等资源选项，父子选项将以原型链的形式被处理，正是因为这样我们才能够在任何地方都使用内置组件、指令等。
* 对于 watch 选项的合并处理，类似于生命周期钩子，如果父子选项都有相同的观测字段，将被合并为数组，这样观察者都将被执行。
* 对于 props、methods、inject、computed 选项，父选项始终可用，但是子选项会覆盖同名的父选项字段。
* 对于 provide 选项，其合并策略使用与 data 选项相同的 mergeDataOrFn 函数。
* 最后，以上没有提及到的选项都将使默认选项 defaultStrat。
* 最最后，默认合并策略函数 defaultStrat 的策略是：只要子选项不是 undefined 就使用子选项，否则使用父选项。