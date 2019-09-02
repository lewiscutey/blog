---
title: 一文速览Vue全栈
date: '2019/07/07 22:36:32'
type: post
tag: [vue, vuex]
meta:
  -
    name: description
    content: 本文简单介绍了vue全栈
  -
    name: keywords
    content: vue、vuex、vue-router
---

>Vue 是一套用于构建用户界面的**渐进式框架**。与其它大型框架不同的是，Vue 被设计为可以**自底向上逐层应用**，专注于**声明式渲染视图层**，结合**丰富的生态系统和核心插件**，致力于**简单灵活快速驱动SPA、MPA等大小型应用**。

本文依次介绍 **双向数据绑定**、**计算属性**、**组件**、**事件机制**、**插件机制**、**前端路由**、**状态管理**和**服务端渲染**等。

<!-- more -->

## 1. Vue实例与数据绑定

### 实例
**Vue.js应用**的创建很简单，通过构造函数 Vue 就可以创建一个 Vue 的根实例，并启动 Vue；
```
var app = new Vue({
    //选项
});
```

变量 app 就代表了这个 Vue 实例,事实上几乎所有的代码都是一个对象，用来写入 Vue 实例的选项内的。

首先，必不可少的一个选项就是el，el用于指定一个页面中己存在的DOM元素来挂载Vue 实例，它可以是 HTMLElement ，也可以是CSS选择器，比如:
```
<div id='app'></div>
var app =new Vue({
    el: document.getElementByld('app')  // 或者是'#app'
});
```
**一个 Vue 应用由一个通过 new Vue() 创建的根Vue实例，以及可选的嵌套的、可复用的组件树组成。**

### 数据绑定

当一个 Vue 实例被创建时，它将 data 对象中的所有的属性加入到 Vue 的响应式系统中。当这些属性的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。

建议所有会用到的数据都预先在data内声明，这样不至于将数据散落在业务逻辑中，难以维护。
Vue实例本身也代理了 data对象里的所有属性，所以可以这样访问:
```
var app = new Vue({
    el: '#app',
    data: {
        a: 2
    }
});
console.log(app.a);  // 2
```
除了显式地声明数据外，也可以指向一个己有的变量，并且它们之间默认建立了双向绑定，当修改其中任意一个时，另一个也会一起变化:
```
var myData = {
    a: 1
};
var app =new Vue({
    el: '#app',
    data: myData
});
console.log(app.a) ; // 1
//修改属性，原数据也会随之修改
app.a = 2;
console.log(myData.a); // 2
//反之，修改原数据， Vue属性也会修改
myData.a = 3;
console.log(app.a); // 3
```

### 生命周期
每个 Vue 实例创建时，都会经历一系列的初始化过程，同时也会调用相应的生命周期钩子， 我们可以利用这些钩子，在合适的时机执行我们的业务逻辑。

![](https://user-gold-cdn.xitu.io/2019/7/7/16bcbc821a6e2e73?w=1200&h=3039&f=png&s=50021)

Vue的生命周期大致分为四个阶段：

**beforeCreate**（此时date、method和el均没有初始化，可以在此加载loading）
**created**（此时date和method初始化完成，但是DOM节点并没有挂载，判断是否有el节点，如果有则编译template，如果没有则使用vm.$mount创建一个默认节点，此时可以在DOM渲染之前进行数据的初始化和method的自执行等）

**beforeMount**（编译模板，并且将此时在el上挂载一个虚拟的DOM节点）
**mounted**（编译模板，且将真实的DOM节点挂载在el上）

**beforeUpdate**（在数据有更新时，进入此钩子函数，虚拟DOM被重新创建）
**update**d（数据更新完成时，进入此钩子函数）

**beforeDestory**（组件销毁前调用，此时将组件上的watchers、子组件和事件都移除掉）
**destoryed**（组件销毁后调用）

**在创建时，父子组件的生命周期是：**
父组件beforeCreated -> 父组件created -> 父组件beforeMounted -> 子组件beforeCreated -> 子组件created -> 子组件beforeMounted -> 子组件mounted -> 父组件mounted。

**在销毁时，父子组件的生命周期是：**
父组件beforeDestory -> 子组件beforeDestoryed -> 子组件destoryed -> 父组件destoryed

总之记住，父子组件的生命周期遵循：**由外到内，再由内到外**。
```!
不要在选项属性或回调上使用箭头函数，vue会自动绑定this的上下文环境。
```

### 模版语法
Vue.js 使用了基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。所有 Vue.js 的模板都是合法的 HTML ，所以能被遵循规范的浏览器和 HTML 解析器解析。

在底层的实现上，Vue 将模板编译成虚拟 DOM 渲染函数。结合响应系统，Vue 能够智能地计算出最少需要重新渲染多少组件，并把 DOM 操作次数减到最少。

使用`双大括号(Mustache 语法)“{{}}”`是最基本的文本插值方法，它会自动将我们双向绑定的数据实时显示出来，
```
<span>Message: {{ msg }}</span>
```
如果想显示`{{}}`标签，而不进行替换，使用v-pre即可跳过这个元素和它的子元素的编译过程，例如 :
```
<span v-pre>{{这里的内容是不会被编译的}}</span>
```
在`{{}}`中，除了简单的绑定属性值外，还可以使用JavaScript表达式进行简单的运算、三元运算等，例如 :
```
<div id='app'>
    {{ number / 10 ))
    {{ isOK ? ’确定’ : ’取消’ }}
    {{ text.split(’,’).reverse().join(’,’) }}
</div>
```
通过使用 `v-once` 指令，你也能执行一次性地插值，当数据改变时，插值处的内容不会更新。但请留心这会影响到该节点上的其它数据绑定：
```
<span v-once>这个将不会改变: {{ msg }}</span>
```

如果你熟悉虚拟 DOM 并且偏爱 JavaScript 的原始力量，你也可以不用模板，直接写`渲染 (render) `函数，使用可选的 `JSX` 语法。

### 指令
**指令(Directives)** 是带有 `v-` 前缀的特殊特性。指令特性的值预期是单个 JavaScript 表达式 (v-for是例外情况)。指令的职责是当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。
常用的指令如下：

* **v-cloak**

**v-cloak**不需要表达式，它会在 Vue 实例结束编译时从绑定的 HTML 元素上移除 ，
经常和css的 **display: none**配合使用:
```
<div id='app' v-cloak> {{ message }}</div>
<style>
[v-cloak] {
    display: none;
}
</style>
```
当网速较慢 Vue.js 文件还没加载完时，在页面上会显示{ { message }}的字样，直到 Vue 创建实例、编译模板时， DOM 才会被替换，所以这个过程屏幕是有闪动的,只要加上**v-cloak**就可以避免了。在一般情况下， **v-cloak** 是一个解决初始化慢导致页面闪动的最佳实践，对于简单的项目很实用，但是在具有工程化的项目里，项目的HTML 结构只有一个空的 div元素，剩余的内容都是由路由去挂载不同组件完成的，所以不再需要 **v-cloak**；

* **v-once**

**v-once** 也是一个不需要表达式的指令，作用是定义它的元素或组件只渲染一次，包括元素或组件的所有子节点。首次渲染后，不再随数据的变化重新渲染，将被视为静态内容，例如:
```
<span v-once>{{ message }}</div>
```
**v-once**在业务中也很少使用，当你需要进一步优化性能时，可能会用到。
* **v-html**

为了输出真正的 HTML，需要使用 v-html 指令;
```
var contenthtml = `<span>哈哈大笑😄</span>`;
<span v-html="contenthtml"></span>
```
```!
你的站点上动态渲染的任意 HTML 可能会非常危险，因为它很容易导致 XSS 攻击。请只对可信内容使用 HTML 插值，绝不要对用户提供的内容使用插值,必要时在服务端进行提前过滤转义。
```
* **v-if**

用于条件性地渲染一块内容，该指令是惰性的，当初始值为false时dom节点不会进行渲染，是针对dom节点的移除和添加，例如 :
```
<div id='app'>
    <span v-if='false'>{{ message }}</span>
</div>
// 会被渲染为以下节点：
<div id='app'></div>
```

* **v-show**

**v-show**的用法与**v-if**基本一致，只不过**v-show**是改变元素的**css属性display**。当v-show 表达式的值为 false 时， 元素会隐藏，查看 DOM 结构会看到元素上加载了内联样式 display: none; 例如 :
```
<div id='app'>
    <span v-show='false'>{{ message }}</span>
</div>
// 会被渲染为以下节点
<div id='app'>
    <span style="display: none;”>哈哈大笑😄</span>
</div>
```
```!
v-show不能在<template>上使用。相比之下， v-if更适合条件不经常改变的场景，因为它切换开销相对较大，而 v-show 适用于频繁切换条件。
```
* **v-else**

**v-else** 元素必须紧跟在带 **v-if** 或者 **v-else-if**的元素的后面，否则它将不会被识别。例如 :
```
<span v-if='show'>{{ message.a }}</span>
<span v-else>{{ message.b }}</span>
```
* **v-for**

当需要将一个数组遍历或枚举一个对象循环显示时，就会用到列表渲染指令 **v-for**。它的表达式需结合 in来使用，类似 item in items 的形式，看下面的示例 :
```
<ul>
    <li v-for=”book in books” :key="book.id">{{ book.name }}</li>
</ul>
```
当 Vue 正在更新使用 v-for 渲染的元素列表时，它默认使用“就地更新”的策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是就地更新每个元素，并且确保它们在每个索引位置正确渲染,所以需要为每个元素设置唯一的**key**。

* **v-bind**

**v-bind**用于动态更新 HTML 元素上的属性，比如 id、class等；
```
<div id=”app”>
    <a v-bind:href=”url”〉链接</a>
    <img v-bind:src=”imgUrl”>
</div>
```
以上是 **v-bind** 最基本的用法，它在 Vue.js 组件中还有着极其重要的作用，可以简写为`：`；

* **v-on**

**v-on**在事件绑定上，类似原生 JavaScript 的 onclick等写法，也是在 HTML 上进行监昕的,例如：
```
<button v-on:click=”counter++”>+ 1</button>
```
**v-on:click**的表达式可以直接使用 JavaScript 语句，也可以是一个在 Vue实例中 methods选项内的函数名,例如：
```
<button v-on:click=”handleAdd(1)”>+ 1</button>

methods: {
    handleAdd: function(count) {
        this.counter += count;
    }
}
```
v-on:click调用的方法名后可以不跟括号“()” ;

Vue 提供了 一个特殊变量$event，用于访问原生DOM事件，例如下面的实例可以阻止链接打开；
```
<a href=”http://www.apple.com” @click="handleClick ('禁止打开'，$event)">
打开链接 </a>

methods: {
    handleClick: function(message, event) {
        event.preventDefault();
    }
}
```
**v-on**可以简写为`@`。
* **v-model**

**v-model**用于表单，进行双向数据绑定。例如：
```
<input type=”text” id="name" v-model="fullname" />
<p>你好，{{fullname}} !</p>
```
### 过滤器

Vue.js 允许你自定义过滤器，可被用于一些常见的文本格式化。过滤器可以用在两个地方：**双花括号插值**和 **v-bind 表达式**。过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示：
```
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>
```
你可以在一个组件的选项中定义本地的过滤器：
```
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}

// 或者在创建 Vue 实例之前全局定义过滤器：
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
```
过滤器可以串联：
```
{{ message | filterA | filterB }}
```
过滤器是 JavaScript 函数，因此可以接收参数：
```
{{ message | filterA('arg1', arg2) }}
```
这里，filterA 被定义为接收三个参数的过滤器函数。其中**message 的值**作为第一个参数，**普通字符串 'arg1'** 作为第二个参数，**表达式 arg2 的值**作为第三个参数。
## 2. 计算属性与响应式依赖

>在一个计算属性里可以完成各种复杂的逻辑，包括运算、函数调用等，只要最终返回 一个结果就可以。计算属性还可以依赖多个Vue实例的数据，只要其中任一数据变化，计算属性就会重新执行，视图也会更新。
```
<span>{{fullName}}</span>
computed: {
    fullName: {
        get: function() {
            return this.firstName + ' ' + this.lastName;
        },
        set: function(newValue) {
            var names= newValue.split (' ') ;
            this.firstName = names[O);
            this.lastName = names[names.length - 1];
        }
    }
}
```
我们可以通过在表达式中调用方法来达到同样的效果:
```
<span>{{getName()}}</span>
methods: {
    getName: function() {
        return this.firstName + ' ' + this.lastName;
    }
}
```
我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。然而，不同的是**计算属性**是基于它们的**响应式依赖进行缓存的**。只在相关响应式依赖发生改变时它们才会重新求值。

虽然**计算属性**在大多数情况下更合适，但有时也需要一个自定义的**侦听器**。这就是为什么 Vue 通过 **watch**选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。
```
watch: {
    message(newvalue, oldValue) {
        newvalue && this.getNewMessage();
    }
}
```

## 3. 组件

组件是可复用的 Vue 实例，通常一个应用会以一棵嵌套的组件树的形式来组织：

![](https://user-gold-cdn.xitu.io/2019/7/7/16bcc204e4428c24?w=1406&h=544&f=png&s=6202)

[组件](https://cn.vuejs.org/v2/guide/components.html) ( Component)是 Vue 最核心的功能，也是整个框架设计最精彩的地方，当然也是最难 掌握的。组件需要注册后才可以使用，注册有全局注册和局部注册两种方式。全局注册后， 任何 Vue 实例都可以使用。

全局注册示例代码如下 :
```
Vue.component(’my-component’, {
    //选项
})
```
在 Vue 实例中，使用 components选项可以局部注册组件，注册后的组件只有在该实例作用域下有效。组件中也可以使用components选项来注册组件，使组件可以嵌套。示例代码如下:
```
<div id=”app”>
    <my-component></my-component>
</div>
<script>
var Child = {
    template: '<div>局部注册组件的内容</div>'
};
components: {
    ’my-component’: Child
}
</script>
```
Vue 组件的模板在某些情况下会受到HTML的限制，比如`<table>`内规定只允许是`<tr>`、`<td>`、`<th>`等这些表格元素，所以在`<table>`内直接使用组件是无效的。这种情况下可以使用特殊的is属性来挂载组件，示例代码如下 :
```
<div id=”app”>
    <table>
        <tbody is=”my-component”></tbody>
    </table>
</div>
<script>
var Child = {
    template: '<div>局部注册组件的内容</div>'
};
components: {
    ’my-component’: Child
}
</script>
```
```!
常见的限制元素还有<ul>、<ol>、<select>；如果使用字符串模板是不受限制的；
```
除了 template选项外，组件中还可以像 Vue实例那样使用其他的选项，比如 **data**、 **computed**、 **methods** 等。但是在使用 **data** 时和实例稍有区别， **data** 必须是函数，然后将数据 return 出去， 例如:
```
Vue.component('my-component', {
    template: '<div>{{ message }}</div>',
    data: function() {
        return {
            message: 'aaa'
        }
    }
});
```
**props传递数据、 events触发事件和slot内容分发就构成了Vue组件的3个API来源，再复 杂的组件也是由这 3 部分构成的。**
* props

    >组件不仅仅是要把模板的内容进行复用，更重要的是组件间要进行通信。通常父组件的模板 中包含子组件，父组件要正向地向子组件传递数据或参数，子组件接收到后根据参数的不同来渲染不同的内容或执行操作。这个正向传递数据的过程就是通过 **props** 来实现的。
    
在组件中，使用选项 props 来声明需要从父级接收的数据， props 的值可以是两种， 一种是字符串数组，一种是对象:
```
// 字符串数组
Vue.component ('my-component', {
    props: [ ’ message ’ ] ,
    template: ’<div>{{ message }}</div>’
});
// 对象形式
Vue.component ('my-component', {
    props: {
        //必须是数字类型
        propA : Number,
        //必须是字符串或数字类型
        propB : [String , Number],
        //布尔值，如果没有定义，默认值就是 true
        propC: {
            type: Boolean,
            default: true
        },
        //数字，而且是必传
        propD: {
            type: Number,
            required: true
        },
        //如果是数组或对象，默认值必须是一个函数来返回
        propE: {
            type: Array,
            default: function() {
                return [];
            }
        }
    } ,
    template: ’<div>{{ message }}</div>’
});
```

* events

用集中式的事件中间件可以做到简单的数据传递，这会让组件之间的通信非常顺利，即使是兄弟组件。因为 Vue 通过事件发射器接口执行实例，实际上你可以使用一个空的 Vue 实例，通过单独的事件中心管理组件间的通信：
```
var eventHub = new Vue();
```
然后在组件中，可以使用 `$emit`, `$on`, `$off` 分别来分发、监听、取消监听事件：
```
eventHub.$emit('delete', id);
eventHub.$on('delete', this.delete);
eventHub.$off('delete', this.delete)
```
* slot

Vue 实现了一套内容分发的 API，这套 API 的设计灵感源自 Web Components 规范草案，将 `<slot>` 元素作为承载分发内容的出口。

  -**普通插槽**：
 
```
// 父组件
<submit-button>save</submit-button>
// 子组件
<button type="submit">
  <slot>Submit</slot>
</button>

// 最终渲染
<button type="submit">
  Save
</button>
```
  -**具名插槽**：
  
 ```
// 父组件
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <template v-slot:default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template v-slot:footer>
    <p>Heres some contact info</p>
  </template>
</base-layout>
// 子组件
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>

// 最终渲染
<div class="container">
  <header>
    <h1>Here might be a page title</h1>
  </header>
  <main>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </main>
  <footer>
    <p>Heres some contact info</p>
  </footer>
</div>
```
  -**作用域插槽**：

```
// 父组件
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>
</current-user>

// 子组件
<span>
  <slot v-bind:user="user">
    {{ user.lastName }}
  </slot>
</span>
```
插槽对于组件意义非凡，可以自定义拓展实现很多复杂的业务场景，且低耦合；

* 通信方式

  -**props/$emit**

父子组件进行通信最常用这种方式：
```
// 父组件
<template>
    <child :updateTitle='updateTitle'></child>
</template>
<script>
export {
    data: {
        return {
            title: '我是父组件'
        }
    },
    methods: {
        updateTitle(value) {
            this.title = value;
        }
    }
}
</script>
// 子组件
<template>
  <header>
    <h1 @click="changeTitle">{{title}}</h1>
  </header>
</template>
<script>
export {
    props: {
        title: {
            type: String,
            default: '我是父组件'
        }
    }，
    methods: {
        changeTitle() {
            this.$emit('updateTitle', '我是子组件');
        }
    }
}
</script>
```
  -**eventBus**
  
父子、兄弟组件之间都可以使用这种方式：
```
var Event=new Vue();
Event.$emit(事件名,数据);
Event.$on(事件名,data => {});
```
`$emit`负责分发事件，$on负责监听了自定义事件，因为有时不确定何时会触发事件，一般会在 mounted 或 created 钩子中来监听。

  -**vuex**

Vuex 实现了一个单向数据流，在全局拥有一个 State 存放数据，当组件要更改 State 中的数据时，必须通过 Mutation 进行，Mutation 同时提供了订阅者模式供外部插件调用获取 State 数据的更新。而当所有异步操作(常见于调用后端接口异步获取更新数据)或批量的同步操作需要走 Action，但 Action 也是无法直接修改 State 的，还是需要通过 Mutation 来修改 State 的数据。最后，根据 State 的变化，渲染到视图上。

一般用于比较复杂的大中型应用，一个应用只有一个store，通过插件的机制注入应用本身，下面的全部组件都可以访问到store中的数据，便于数据的管理和追踪变化；

  -**`$attrs`/$listeners**
  
`$attrs`包含了父作用域中不被 prop 所识别 (且获取) 的特性绑定 (class 和 style 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind="$attrs" 传入内部组件。通常配合 interitAttrs 选项一起使用。

`$listeners`包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件。

```
// 父组件
<template>
    <child :foo="foo" :boo="boo"  title="天道酬勤Lewis"></child>
</template>
// 子组件
<template>
    <p>boo: {{ boo }}</p>
    <p>child: {{ $attrs }}</p>
</template>
```
```!
Vue2.4 提供了$attrs,$listeners来传递数据与事件，跨级组件之间的通讯变得更简单。
简单来说：$attrs与$listeners 是两个对象，$attrs 里存放的是父组件中绑定的非 Props 属性，$listeners里存放的是父组件中绑定的非原生事件。
```

  -**provide/inject**

Vue2.2.0 新增 API,这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，在上下游关系成立的时间里始终生效。一言而蔽之：**祖先组件中通过 provider 来提供变量，然后在子孙组件中通过 inject来注入变量**。

**provide / inject** API 主要解决了跨级组件间的通信问题，不过它的使用场景，主要是子组件获取上级组件的状态，跨级组件间建立了一种主动提供与依赖注入的关系。
```
// 父组件
export default {
  provide: {
    name: '天道酬勤Lewis'
  }
}
// 子组件
export default {
  inject: ['name'],
  mounted () {
    console.log(this.name);  // 天道酬勤Lewis
  }
}
```
```!
provide 和 inject 绑定并不是可响应的,这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的属性还是可响应的。
```
## 4. 事件机制
Vue定义了四种添加事件监听的方法：

![](https://user-gold-cdn.xitu.io/2019/7/7/16bcc7db75abb919?w=675&h=348&f=png&s=17087)

* $on

```
Vue.prototype.$on = function (event, fn) {
    var this$1 = this;
    var vm = this;
    //如果传参event是数组，递归调用$on
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // 这里在注册事件的时候标记bool值也就是个标志位来表明存在钩子，而不需要通过哈希表的方法来查找是否有钩子，这样做可以减少不必要的开销，优化性能。
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
};
```
* $once

```
Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      //在第一次执行的时候将该事件销毁
      vm.$off(event, on);
      //执行注册的方法
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
};
```
* $emit

```
  Vue.prototype.$emit = function (event) {
    var vm = this;
    {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      //将类数组的对象转换成数组
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          //触发当前实例上的事件，附加参数都会传给监听器回调。
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
};
```
* $off

```
  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;
    var vm = this;
    // 如果没有参数，关闭全部事件监听器
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // 关闭数组中的事件监听器
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm
    }
    // 具体的某个事件
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    //  fn回调函数不存在，将事件监听器变为null，返回vm
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // 回调函数存在
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          // 移除 fn 这个事件监听器
          cbs.splice(i$1, 1);
          break
        }
      }
    }
    return vm
};
```
* 事件修饰符

```
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即元素自身触发的事件先在此处处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
```

## 5. 插件机制
Vue提供了插件机制，可以在全局添加一些功能。它们可以简单到几个方法、属性，也可以 很复杂，比如一整套组件库。
注册插件需要一个公开的方法 install，它的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象,示例代码如下:
```
MyPlugin.install = function (Vue, options) {
    //全局注册组件(指令等功能资源类似〉
    Vue.component ('component-name'，{
        //组件内容
    }),
    //添加实例方法
    Vue.prototype.$Notice = function() {
        //逻辑 ...
    },
    //添加全局方法或属性
    Vue.globalMethod = function() {
        //逻辑 ...
    },
    //添加全局混合
    Vue.mixin ({
        mounted: function() {
            //逻辑 ...
        }
    })，
    //添加全局过滤器
    Vue.directive('my-directive', {
        bind (el, binding, vnode, oldVnode) {
            // 逻辑...
        }
    }
  })
};
// 通过 Vue.use()来使用插件:
Vue.use(MyPlugin);
// 或 
Vue.use(MyPlugin, {
    // 参数选项
});
```
绝大多数情况下，开发插件主要是通过NPM发布后给别人使用的，在自己的项目中可以直接在入口调用以上方法 ，无须多一步注册和使用的步骤 。

## 6. 前端路由Vue-router
>**Vue Router** 是 Vue.js 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。

包含的功能有：

* 嵌套的路由/视图表
* 模块化的、基于组件的路由配置
* 路由参数、查询、通配符
* 基于 Vue.js 过渡系统的视图过渡效果
* 细粒度的导航控制
* 带有自动激活的 CSS class 的链接
* HTML5 历史模式或 hash 模式，在 IE9 中自动降级
* 自定义的滚动条行为
```
// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)

// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  router
}).$mount('#app')
```

**vue-router** 默认 **hash** 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载,这种模式利用监听**onhashchange**事件，来实现页面的跳转；如果不想要很丑的 hash，我们可以用路由的 **history** 模式，这种模式充分利用 **history.pushState** API 来完成 URL 跳转而无须重新加载页面。
```
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```
当你使用 history 模式时，URL 就像正常的 url，例如     `http://yoursite.com/user/id`，也好看！

不过这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 `http://oursite.com/user/id` 就会返回 404，这就不好看了。

所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。

## 7. 状态管理Vuex
>Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

以下是一个完整的vuex理念的简单示意：
![](https://user-gold-cdn.xitu.io/2019/7/7/16bcca170bba2f2a?w=701&h=551&f=png&s=8112)
* state，驱动应用的数据源；
* view，以声明方式将 state 映射到视图；
* actions，响应在 view 上的用户输入导致的状态变化;
* mutations, 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation;

一般为了逻辑清晰，会按页面对store进行module的区分，一个完整的module-store如下：
```
const moduleA = {
    state: { ... },
    mutations: { . . . },
    actions: { ... ),
    getters: { ... )
};
```
```!
使用Vuex进行数据管理是有一定难度的，如果您不打算开发大型单页应用，使用 Vuex 可能是繁琐冗余的。确实是如此——如果您的应用够简单，您最好不要使用 Vuex。一个简单的 global event bus就足够您所需了。但是，如果您需要构建是一个中大型单页应用，您很可能会考虑如何更好地在组件外部管理状态，Vuex 将会成为自然而然的选择。
```

## 8. 服务端渲染Nuxt.js
>Vue.js 是构建客户端应用程序的框架。默认情况下，可以在浏览器中输出 Vue 组件，进行生成 DOM 和操作 DOM。然而，也可以将同一个组件渲染为服务器端的 HTML 字符串，将它们直接发送到浏览器，最后将这些静态标记"激活"为客户端上完全可交互的应用程序。

与传统 **SPA** (单页应用程序 (Single-Page Application)) 相比，服务器端渲染 (**SSR**) 的优势主要在于：

1. 更好的 SEO，由于搜索引擎爬虫抓取工具可以直接查看完全渲染的页面。
2. 更快的内容到达时间 (time-to-content)，特别是对于缓慢的网络情况或运行缓慢的设备。

**Nuxt.js**十分简单易用,天然为Vue而生(**Next.js**为**React**而生);Nuxt.js 是一个基于 Vue.js 的通用应用框架，预设了利用Vue.js开发服务端渲染的应用所需要的各种配置。一个简单的项目只需将 nuxt 添加为依赖组件即可，更多细节[请戳这里](https://zh.nuxtjs.org/guide);
