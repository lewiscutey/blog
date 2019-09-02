---
title: Vue和React的一些区别
date: '2019/07/09 22:49:18'
type: post
tag: [Vue, React]
meta:
  -
    name: description
    content: Vue和React的一些区别
  -
    name: keywords
    content: Vue, React
---
本文总结一些亲身经历感知的Vue和React的不同。
<!-- more -->

## 1. 模版渲染

在表层上， 模板的语法不同，React 是通过JSX渲染模板，而Vue是通过一种拓展的HTML语法进行渲染，但其实这只是表面现象，毕竟React并不必须依赖JSX。

在深层上，模板的原理不同，这才是他们的本质区别：React是在组件JS代码中，通过原生JS实现模板中的常见语法（All in js），比如插值，条件，循环等，都是通过JS语法实现的Vue是在和组件JS代码分离的单独的模板中，通过指令来实现的，比如条件语句就需要 v-if 来实现对这一点，我个人比较喜欢React的做法，因为他更加纯粹更加原生，而Vue的做法显得有些独特，会把HTML弄得很乱。举个例子，说明React的好处：react中render函数是支持闭包特性的，所以我们import的组件在render中可以直接调用。但是在Vue中，由于模板中使用的数据都必须挂在 this 上进行一次中转，所以我们import 一个组件完了之后，还需要在 components 中再声明下，这样显然是很奇怪但又不得不这样的做法。


## 2. 数据监测
Vue 通过 getter/setter 以及一些函数的劫持，能精确知道数据变化，不需要特别的优化就能达到很好的性能;

React 默认是通过比较引用的方式进行的，如果不优化（PureComponent/shouldComponentUpdate）可能导致大量不必要的VDOM的重新渲染;


## 3. 组件通信

在Vue 中有三种方式可以实现组件通信：父组件通过 props 向子组件传递数据或者回调，虽然可以传递回调，但是我们一般只传数据，而通过 事件的机制来处理子组件向父组件的通信,子组件通过 事件 向父组件发送消息通过; V2.2.0 中新增的 provide/inject 来实现父组件向子组件注入数据，可以跨越多个层级。另外有一些比如访问 $parent/$children等比较dirty的方式这里就不讲了。

在 React 中，也有对应的三种方式：父组件通过 props 可以向子组件传递数据或者回调可以通过 context 进行跨层级的通信，这其实和 provide/inject 起到的作用差不多;可以看到，React 本身并不支持自定义事件，Vue中子组件向父组件传递消息有两种方式：事件和回调函数，而且Vue更倾向于使用事件。但是在 React 中我们都是使用回调函数的，这可能是他们二者最大的区别。


## 4. 数据流

大家都知道Vue中默认是支持双向绑定的。在Vue1.0中我们可以实现两种双向绑定：父子组件之间，props 可以双向绑定组件与DOM之间可以通过 v-model 双向绑定在 Vue2.x 中去掉了第一种，也就是父子组件之间不能双向绑定了（但是提供了一个语法糖自动帮你通过事件的方式修改），并且 Vue2.x 已经不鼓励组件对自己的 props 进行任何修改了。所以现在我们只有 组件 <--> DOM 之间的双向绑定这一种。然而 React 从诞生之初就不支持双向绑定，React一直提倡的是单向数据流，他称之为 onChange/setState()模式。不过由于我们一般都会用 Vuex 以及 Redux 等单向数据流的状态管理框架，因此很多时候我们感受不到这一点的区别了。

## 5. HoC 和 mixins

在 Vue 中我们组合不同功能的方式是通过 mixin，而在React中我们通过 HoC (高阶组件）。React 最早也是使用 mixins 的，不过后来他们觉得这种方式对组件侵入太强会导致很多问题，就弃用了 mixinx 转而使用 HoC，关于mixin究竟哪里不好，可以参考React官方的这篇文章 Mixins Considered Harmful而 Vue 一直是使用 mixin 来实现的。为什么 Vue 不采用 HoC 的方式来实现呢？高阶组件本质就是高阶函数，React 的组件是一个纯粹的函数，所以高阶函数对React来说非常简单。但是Vue就不行了，Vue中组件是一个被包装的函数，并不简单的就是我们定义组件的时候传入的对象或者函数。比如我们定义的模板怎么被编译的？比如声明的props怎么接收到的？这些都是vue创建组件实例的时候隐式干的事。由于vue默默帮我们做了这么多事，所以我们自己如果直接把组件的声明包装一下，返回一个高阶组件，那么这个被包装的组件就无法正常工作了。



## 6. Vuex和Redux

从表面上来说，store 注入和使用方式有一些区别。在 Vuex 中，$store 被直接注入到了组件实例中，因此可以比较灵活的使用：使用 dispatch 和 commit 提交更新通过 mapState 或者直接通过 this.$store 来读取数据在 Redux 中，我们每一个组件都需要显示的用 connect 把需要的 props 和 dispatch 连接起来。另外 Vuex 更加灵活一些，组件中既可以 dispatch action 也可以 commit updates，而 Redux 中只能进行 dispatch，并不能直接调用 reducer 进行修改。从实现原理上来说，最大的区别是两点：Redux 使用的是不可变数据，而Vuex的数据是可变的。Redux每次都是用新的state替换旧的state，而Vuex是直接修改Redux 在检测数据变化的时候，是通过 diff 的方式比较差异的，而Vuex其实和Vue的原理一样，是通过 getter/setter来比较的（如果看Vuex源码会知道，其实他内部直接创建一个Vue实例用来跟踪数据变化）而这两点的区别，其实也是因为 React 和 Vue的设计理念上的区别。React更偏向于构建稳定大型的应用，非常的科班化。相比之下，Vue更偏向于简单迅速的解决问题，更灵活，不那么严格遵循条条框框。因此也会给人一种大型项目用React，小型项目用 Vue 的感觉。


## 7.配套库及社区

截至目前为止，GitHub社区react的star数为135312，vue的star数为147225,vue作为后起之秀近两年大有可为，官方社区氛围也非常给力，配套库日渐完善，期待vue3.0的早日到来与react媲美，作为前端两大框架的深度用户，个人更喜欢vue多一点😄