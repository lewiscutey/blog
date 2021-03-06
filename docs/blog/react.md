---
title: 一文速览React全栈
date: '2019/06/24 22:47:03'
type: post
tag: [react, redux, flux, react-redux]
meta:
  -
    name: description
    content: 本文简单介绍了react全栈
  -
    name: keywords
    content: react, redux
---
本文依次介绍 **组件、JSX、Virtual DOM、Flux架构、Redux、react-redux和性能优化。**
<!-- more -->
>React是Facebook推出的一个JavaScript库，它的口号就是“**用来创建用户界面的JavaScript库**”，所以它只是和用户的界面打交道，你可以把它看成MVC中的V（视图）这一层。现在前端领域各种框架和库层出不穷，那么是什么原因让React如此流行呢？简单来说，是它三大颠覆性的特点：**组件、JSX、Virtual DOM**。

## 1. 组件
>React的一切都是基于组件的。Web世界的构成是基于各种HTML标签的组合，这些标签天生就是语义化组件的表现，还有一些内容是这些标签的组合，比如说一组幻灯片、一个人物简介界面、一组侧边栏导航等，可以称之为自定义组件。React最重要的特性是基于组件的设计流程。使用React,你唯一要关心的就是构建组件。组件有着良好的封装性，组件让代码的复用、测试和分离都变得更加简单。各个组件都有各自的状态，当状态变更时，便会重新渲染整个组件。组件特性不仅仅是React的专利，也是未来Web的发展趋势。React顺应了时代发展的方向，所以它如此流行也就变得顺其自然。

`组件是React的基石，所有的React应用程序都是基于组件的。`

### props属性
现在新建一个组件，称为Profile.jsx;
一个组件的例子如下:
```
// Profile.jsx
import React from 'react' ;
export default Class Profile extends React.Component {
    // render 是这个组件渲染的Vitrual DOM结构
    render() {
        return (
            <div className-"profile-component">
                </*this.props就是传入的属性*/>
                <h1>my name is {this.props.name}</h1>
                <h2>my age is {this.props.age}</h2>
            </div>
        )
    }
}
```
用这种方式，就实现了一个React的组件，在其他的组件中，可以像HTML标签一样引用它。有了组件以后，可以使用React提供的另外一个库ReactDOM把这个组件挂载到DOM节点上。
```
// app.jsx
import  { render } from 'react-dom';
import Profile from './profile';
render(<Profile name="lewis" age=26 />, document.getElementById('app'));
// 或者可以使用...属性拓展
const props = {
    name: 'lewis',
    age: 26
};
render(<Profile {...props} />, document.getElementById('app'));
```
### state状态
state是组件内部的属性。组件本身是一个状态机，它可以在constructor中通过this.state直接定义它的值，然后根据这此值来渲染不同的UI。当state的值发生改变时，可以通过this.setState方法让组件再次调用render方法来渲染新的UI。
现在改造一下简单的组件，给它添加一个状态，一个“点赞”的按钮，每单击一次， 就给赞的次数加1。
```
//Profile.jsx
export default class Profile extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      liked: 0
    };
    this.likedCallback = this.likedCallback.bind(this);
  }
  likedCallback() {
    let liked = this.state.liked;
    liked++;
    this.setState({
      liked
    });
  }

  render() {
    return (
      <div>
        <h1>我的名字叫{this.props.name}</h1>
        <h2>我今年{this.props.age}</h2>
        <button onClick={this.likedCallback}>点赞</button>
        <h2>总点赞数：{this.state.liked}</h2>
      </div>
    )
  }
}
```
和上面描述的一样，在constructor中添加this.state的定义，每次单击按钮以后调用回调函数，给当前liked值加1,然后更新this.setState完成UI的重新渲染。因为在ES6 class 类型的component组件声明方式中，不会把一些自定义的callback函数绑定到实例上，所以需要手动在constructor里面绑定。
```
this.likedCallback = this.likedCallback.bind(this);
```
**React组件通过props和state的值，使用render方法生成一个组件的实例。**
### 生命周期
![](https://user-gold-cdn.xitu.io/2019/6/23/16b828bc4368a7c1?w=2000&h=924&f=jpeg&s=98236)
**1. 组件首次加载**
* **getDefaultProps** 只会在装载之前调用一次，在组件中赋值的数据会被设置到this.props中。
* **getInitialState** 只会在装载之前调用一次，这个函数的返回值会被设置到this.state中，需要注意的是，在ES6的写法中，只需写在constructor中即可，如下：
```
class MyComponent extends React.Component {
    constructor (props){
        super (props) ;
        //在这里声明state
        this.state = {count: 0} ;
    }
}
```
* **componentWillMount** 在render之前被调用，可以在渲染之前做一些准备工作。
* **render** 这个方法是组件的一个**必要方法**。 当这个方法被调用的时候，应该返回一个ReactElement对象，render是一个纯函数，它的意义就是在给定相同的条件时，它的返回结果应该每次都是完全一致的。不应该有任何修改组件state的代码或者是和浏览器交互的情况。
* **componentDidMount** 只会在装载完成之后调用一次，在render之后调用，从这里开始获取组件的DOM结构。如果想让组件加载完毕后做一些额外的操作(比如AJAX请求等)，可以在这个方法中添加相应的代码。

**2.组件props更新**

当组件接收到新的props的时候，会依次触发下列方法。
* **componentWillReceiveProps(nextProps)** 在组件接收到新的props的时候被触发，参数nextProps就是传入的新的props,你可以用它和this.props比较，来决定是否用this.setState实现UI重新消染;
* **shouldComponentUpdate** 在重新render之前被调用，可以返回一个布尔值来决定一个组件是否要更新，如果返回flse那么前面的流程都不会被触发，这个方法默认的返回值都是true。
* **componentWillUpdate** 在render之前被调用，可以在渲染之前做一些准备工作，和componentWillMount类似。
* **render** 和组件首次加载的方法相同。
* **componentDidUpdate**  重新渲染完成以后立即调用，和componentDidMount类似。

**3.组件卸载**
* **componentWillUnmount** 在组件被卸载和销毁之前调用的方法，可以在这里做一些清理的工作。

### 组合组件
React应用建立在各种组件基础上，那么自然的一个组件也可以包含多个其他的组件。

### 无状态函数式组件
无状态函数式组件没有内部state,不需要组件生命周期函数，那么可以把这类组件写成一个纯函数的形式，称为stateless functional component(无状态函数式组件)，它做的事情只是根据输入生成组件，没有其他副作用，而且简单明了。
```
// 用一个纯函数表示组件
function Hobby (props) {
    return <li>{props .hobby)</li>;
}
```
这种写法很简单，直接导出一个函数，它只有一个参数props,就是传入的属性。在实际的项目中，大部分的组件都是无状态函数式组件，所以这是React推荐的写法。

### state 设计原则
什么组件应该有state,而且应该遵循最小化state的准则?那就是尽量让大多数的组件都是无状态的。为了实现这样的结构，应该尽量把状态分离在一些特定的组件中，来降低组件的复杂程度。最常见的做法就是创建尽量多的无状态组件，这些组件唯一要关心的事情就是渲染数据。而在这些组件的外层，应该有一个包含state的父级别的组件。这个组件用于处理各种事件、交流逻辑、修改state,对应的子组件要关心的只是传入的属性而己。

state应该包含什么数据? **state中应该包含组件的事件回调函数可能引发UI更新的这类数据**。在实际的项目中，这些应该是轻量化的JSON数据，应该尽量把数据的表现设计到最小，而更多的数据可以在render方法中通过各种计算来得到。

### DOM操作
在大多数情况下，不需要通过操作DOM的方式去更新UI，应该使用setState来重新渲染UI，但是有一些情况确实需要访问一些DOM结构（例如表单的值），那么可以采用refs这种方式来获得DOM节点，它的做法就是在要应用的节点上面设置一个ref属性，然后通过this.refs.name来获得对应的DOM结构。
```
// Profile.jsx
render() {
  return (
    <div>
      <input type="text" ref="hobby" />>
      <button onClick={this.addHobbyCallback}>添加爱好</button>
    </div>
  )
}

addHobbyCallback() {
  //用this.refs.name来取得DOM节点
  let hobbyInput = this.refs.hobby;
  let val = hobbyInput.value;
  if (val) {
    let hobbies = this.state.hobbies;
    //添加值到数组
    hobbies = [...hobbies, val];
    //更新state,刷新UI
    this.setState({
      hobbies
    }, ()=>{
      hobbyInput.value = '';
    });
  }
}
```

**组件是react的核心，一个基于react的项目都是由各种各样不同的组件所构成的。**

## 2. JSX
>通过上面的例子可以看出，在render方法中有一种直接把HTML嵌套在JS中的写法，它被称为JSX。这是一种类似XML的写法，它可以定义类似HTML一样简的树状结构。这种语法结合了JavaScript和HTML的优点，既可以像平常一样使用HTML,也可以在里面嵌套JavaScript语法。这种友好的格式，让开发者易于阅读和开发。而且对于组件来说，直接使用类似HTML的格式，也是非常合理的。但是，需要注意的是。JSX和HTML完全不是一回事，JSX只是作为编译器，把类似HTML的结构编译成JavaScript。当然，在浏览器中不能直接使用这种格式，需要添加JSX编译器来完成这项工作。

#### 来历
下面这一段是官方文档中的引用，它可以解释JSX这种写法诞生的的初衷。

`We strongly believe that components are the right way to separate concerns rather than "templates" and "display logic." We things that markup and the code that generates it are intimately tied together. Additionally, display logic is often very complex and using template languages to express it becomes cumbersome.`

多年以来，在传统的开发中，把模板和功能分离看作是最佳事件的完美例子，翻阅形形色色的框架文档，总有一个模板文件夹里面放置了对应的模板文件，然后通过模板引擎处理这些字符串，来生成把数据和模板结合起来的字符。而React认为世界是基于组件的，组件自然而然和模板相连，把逻辑和模板分开放置是一种笨重的思路。所以，React 创造了一种名为JSX的语法格式来架起它们之间的桥梁。
#### 语法
- JSX不是必需的

JSX编译器把类似HTML的写法转换成原生的JavaScript方法，并且会将传入的属性转化为对应的对象。它就类似于一种语法糖,把标签类型的写法转换成React提供的一个用来创建ReactElement的方法。
```
const MyComponent ;
//input JSX, 在JS中直接写类似的内容。前所未有的感觉。其实它返回的是一个ReactElement
let app = <h1 title="my title">this is my title</h1>;
//JSX转换后的结果
let app = React.createElement('hl', {title: 'my title'}, 'this is my tit
le');
```
- HTML标签与React组件

React可以直接渲染HTML类型的标签，也可以渲染React的组件。

HTML类型的标签第一个字母用小写来表示。
```
import React from 'react';
//当一个标签里面为空的时候，可以直接使用自闭和标签
注意class是一个JavaScript保留字，所以如果要写class应该替换成classname
let divElement = <div className="foo" />;
//等同于
let divElement = React.createElement('div", {className: 'foo'});
```
React组件标签第一个字母用大写来表示。
```
import React from 'react';
class Headline extends React.component {
    render(){
        //直接returnJSX语法
        return (
            <hl>He1lo React</h1>
        )
    }
}
let headine = <Headline />;
//等同于
let headline = React.createElement(Headline);
```
JSX语法使用第一个字母大小写来区分是一个普通的HTML标签还是一个React组件。

注意: **因为JSX本身是JavaScript语法，所以一些JavaScript中的保留字要用其他的方式书写，比如第一个例子中class要写成className.**

- JavaScript表达式

在给组件传入属性的时候，有一大部分的情况是要传入一个JavaScript对象的，那么基本的规则就是当遇到{}这个表达式的情况下，里面的代码会被当作JavaScript代码处理。

属性表达式如下。
```
const MyComponent;
let isLoggedIn = true;
let app = <MyComponent name={isLoggedIn ? 'viking' : 'please login'}/>`
```
子组件表达式如下。
```
const MyComponent, LoginForm, Nav;
let isLoggedIn = true;
let app = <MyComponent>{isLoggedIn ? <Nav/> : <LoginForm/> }</MyComponent>
```
由上面两个例子可以得到一个基本规律。在JSX语法中，当遇到标签的时候就解释成组件或者HTML标签，当遇到{}包裹的时候就当成JavaScript代码来执行。布尔类型属性如下。

当省略一个属性的值的时候，JSX 会自动把它的值认为是true。
```
let myButton = <input type="button" disabled />;
//等同于
let myButton = <input type-"button" disabled={true}/>;
```
- 注释

要在JSX中使用注释，沿用JavaScript的方法，需要注意的是，在子组件位置需要用{}括起来。
```
let component = (
    <div>
        {/* 这里是一个注释! */}
        <Headline />
    </div>
);
```
- JSX属性扩散

假如一个组件有很多属性，当然可以如下这样做。
```
const Profile;
let name = 'viking', age = 10, gender = 'Male';
let component = <Profile name={name} age={age) gender={gender} />;
```
但是，当这样的属性特别多的时候，书写和格式看起来就会变得很复杂，所以JSX有一个很便利的功能--属性扩散。
```
const Profile;
let props = {
    name: 'viking',
    age: 10,
    gender: 'Male'
};
//用这种方式可以很方便地完成上一个例子里面的操作
let component = <Profile {...props) />;
```
你可以多次使用这种方法，还可以和别的属性组合在一起。需要注意的是，顺序是重要的，越往后的属性会覆盖前面的属性。
```
let component = <Profile {...props} name='viking2' />;
console.log (component.props.name) ;
//viking2
```
神奇的“..."到底是什么?“...”操作符(扩散操作符)在ES6的数组上已经获得了广泛的使用，对象的扩散操作符也会在ES7中得到实现，这里JSX直接实现了未来的JavaScript， 带来了更多的便利。
- 编译JSX

JSX不能直接在浏览器中使用，需要一种编译工具把它编译成React.createElement方法，现在一般用Babel提供的编译器来进行JSX代码的编译。

#### 小结
**JSX看起来就是HTML,每个前端开发者都可以很快地熟悉上手。但是，请记住它不是真正的HTML,也和DOM没有关系。它像是一种React.createElement写法的语法糖。是快速高效书写这个函数的方法，它返回的是ReactElement,一种JavaScript的数据结构。**


## 3. Virtual DOM
>在React的设计中，开发者不太需要操作真正的DOM节点，每个React组件都是用Virtual DOM渲染的，它是一种对于HTML   DOM节点的抽象描述，你可以把它看成是一种用JavaScript实现的结构，它不需要浏览器的DOM API支持，所以它在Node.js中也可以使用。它和DOM的一大区别就是它采用了更高效的渲染方式，组件的DOM结构映射到Virtual DOM上，当需要重新渲染组件时，React在Virtual DOM上实现了一个Diff算法，通过这个算法寻找需要变更的节点，再把里面的修改更新
到实际需要修改的DOM节点上，这样就避免了整个渲染DOM带来的巨大成本。

### DOM
在当今的Web程序中，由于SPA类型项目的出现，DOM tree 结构也越来越复杂，它的改变也变得越来越频繁，有可能有非常多的DOM操作，比如添加、删除或修改一些节点，还有许多的事件监听、事件回调、事件销毁需要处理，由于DOM tree结构的变化，会导致大量的reflow,从而影响性能。

### 虚拟元素
首先要说的是，Virtual DOM是独立React所存在的，只不过React在渲染的时候采用了这个技术来提高效率。前面已经介绍过DOM是笨重而庞大的，它包含非常多的API方法。DOM结构也不过是一些属性和方法的集合，那么可不可以用原JavaScript的方法来表述它呢?用轻量级的数据能完全代替庞杂的DOM结构来表述相同的内容吗?答案是肯定的。
```
/*一个DOM结构，可以用JavaScript这么来表示
结构如下
<div id="container">
    <h1>Hello world</h1>
</div>
*/
var element = {
  tagName: 'div',
  attr:{
    props: {
      id: 'container',
    },
    styles: {
      color: 'red',
    },
  },
  children: {
    tagName: 'h1',
    children: 'Hello world',
  }
}
//用构造函数来模拟一下
function Element(tagName, props, children) {
  this.tagName = tagName;
  this.props = props;
  this.children = children;
};

var headline = new Element('hi', null, 'Hello world');
var div = new Element('div', {
  props: {
    id: 'container',
  },
  styles: {
    color: 'red',
  },
}, headline);
```
这样就用个对象表述了一个类似DOM节点的结构，看起来有点眼熟，对吧?

从上面的例子可以看出，JSX是一种创造ReacElement的便捷写法，而ReactElement是什么呢?

ReactElement是一种轻量级的、 无状态的、不可改变的、DOM元素的虚拟表述。其实就是用一个JavaScript对象来表述DOM元素而已。我们自己创建的Element对象和ReactElement看起来是完全一致的。

将ReactElement插入真正的DOM中，可以调用ReacDOM的render方法。
```
import { render } from react-dom';
import App from './app';
render(<App />，document.getElementById('root');
```
render 这个方法大体可以这样写:创建DOM元素，用属性列表循环新建DOM元素的属性，可以用Element对象写一段伪代码。
```
function render(elemet, root) {
  var realDOM = document.createElement(elemet.tagName);
  //循环设置属性和样式，代码简化了解即可
  var props = elemet.attr.props;
  var styles = elemet.attr.styles;
  for (var i in props) {
    realDOM.setAttribute(i, props[i]);
  }
  for (var j in styles) {
    realDOM.styles[j] = styles[j];
  }
  //循环子节点，做同样的事情
  elemet.children.forEach(child => {
    if (child instanceof Element) {
      //如果是Element对象，递归该方法
      render(child, realDOM);
    } else {
      //如果是Element对象，递归该方法
      realDOM.appendChild(document.createTextNode(child));
    }
  });
  // 最后插入到真实的DOM中
  root.appendChild(realDOM);
  return realDOM;
}
```
注意上面的代码是伪代码，只是让大家了解一下render 的大体过程，并不能良好运行。

介绍到这里,感觉没什么稀奇的，Virtual DOM只不过就是DOM结构的JavaScript对象描述。那它比DOM更高效、速度更快体现在哪里呢?下面进行介绍。

### 比较差异
在了解了Virtual DOM的结构后，当发生任何更新的时候，这些变更都会发生在Virtual DOM上面，这样些修都是对JavaScript对象的操作，速度根快。当一系列更新完成的时候，就会产生一棵新的 Virtual DOM树。为了比较两棵树的异同，引入了一种Diff算法，该算法可以计算出新旧两棵树之间的差异。到目前为止，没有做任何的DOM操作，只是对JavaScript的计算和操作而已。最后，这个差异会作用到真正的DOM元素上，通过这种方法，让DOM操作最小化，做到效率最高。

由于这里的算法比较复杂，就不再深入讲解下去了，现在用伪代码的形式来总结一下 整个流程。
```
//1.构建Virtual DOM 树结构
var tree = new Element('div', {props: {id: 'test'}}, Hello there');
//2.将Virtual DOM 树插入到真正的DOM中
var root = render (tree, document.getElementById('container')) ;
//3. 变化后的新 Virtual DOM树
var newTree = new Element('div', {props: {id: 'test2'}},'Hello React');
//4.通过Diff算法计算出两棵树的不同
var patches = diff(tree, newTree) ;
//5.在DOM元素中使用变更，这里引入了patch方法，用来将计算出来的不同作用到DOM上
patch(root, patches) ;
```
通过这5个步骤，就完成了整个Virtual DOM的流程。

## 4. Flux架构
>FLux是Facebook官方提出的一套前端应用架构模式，它的核心概念就是单向数据流。它更像是一种软件开发模式，而不是具体的一个框架，所以基于Flux存在很多的实现方式。其实用FLux架构开发程序不需要引入很多代码，关键是它内在的思想。

### 单向数据流
单向数据流是Flux的核心。读者有可能接触过MVC这种软件架构，它的数据流动是双向的。controller是model和view之间交互的媒介，它要处理view的交互操作，通知model进行更新，同时在操作成功后通知view更新，这种双向的模式在model和view的对应关系变得越来越复杂的时候，就会遇到很多困难，难以维护和调试。针对MVC的这个弊端，Flux的单向数据流是怎么运作的呢？
![](https://user-gold-cdn.xitu.io/2019/6/23/16b8373674f07667?w=675&h=528&f=png&s=10856)
- View： 视图层
- Action（动作）：视图层发出的消息（比如mouseClick）
- Dispatcher（派发器）：用来接收Actions、执行回调函数
- Store（数据层）：用来存放应用的状态，一旦发生变动，就提醒Views要更新页面

### dispatcher

事件调度中心，Flux模型的中心枢纽，管理着Flux应用中的所有数据流。它本质上是Store的回调注册。每个Store注册它自己并提供一个回调函数。当Dispatcher响应Action时，通过已注册的回调函数，将Action提供的数据负载发送给应用中的所有Store。应用层级单例；

### store
负责封装应用的业务逻辑跟数据的交互;Store中包含应用所有的数据;Store是应用中唯一的数据发生变更的地方;Store中没有赋值接口--所有数据变更都是由dispatcher发送到store，新的数据随着Store触发的change事件传回view。Store对外只暴露getter，不允许提供setter,禁止在任何地方直接操作Store。

### view
controller-view 可以理解成MVC模型中的controller，它一般由应用的顶层容器充当，负责从store中获取数据并将数据传递到子组件中。简单的应用一般只有一个controller-view，复杂应用中也可以有多个。controller-view是应用中唯一可以操作state的地方(setState()),view(UI组件)职责单一只允许调用action触发事件，数据从由上层容器通过属性传递过来。

### 其他
action creators 作为dispatcher的辅助函数，通常可以认为是Flux中的第四部分。ActionCreators是相对独立的，它作为语法上的辅助函数以action的形式使得dispatcher传递数据更为便利。

### 大致流程

1. 用户访问 View
2. View 发出用户的 Action
3. Dispatcher 收到 Action，要求 Store 进行相应的更新
4. Store 更新后，发出一个"change"事件
5. View 收到"change"事件后，更新页面

## 5. Redux
>Redux是JavaScript的状态容器，它提供了可预测的状态管理。Redux可以运行在不同的环境下，不论是客户端、服务器端，还是原生应用都可以运行Redux。注意React和Redux之间并没有特别的关系，不管你使用的是什么框架，Redux都可以作为一个状态管理器应用到这些框架上。

### 三大定律
**1. 单一数据源**
整个应用的state存储在一个JavaScript对象中，Redux用一个称为store的对象来存储整个state。

**2. state 是只读的**
不能在state上面直接修改数据，改变state的唯一方法是触发action。action只是一个信息载体，一个普通的JavaScript 对象。
这样确保了其他操作都无法修改state 数据，整个修改都被集中处理，
而且严格
按顺序执行。

**3. 使用纯函数执行修改**
为了描述action怎样改变state,需要编写reducer来规定修改的规则。reducer是纯函数，接收先前的state和处理的action,返回新的state。 reducer可以根据应用的大小拆分成多个，分别操纵state的不同部分。纯函数的好处是它无副作用，仅仅依赖函数的输入，当输入确定时输出也一定保持一致。

### 组成
**1. action**

action是信息的载体，里面有action的名称和要传递的信息，然后可以被传递到store中去。传递的方法是利用store的dispatch方法，action是store的唯一信息来源。

和Flux中一样， action 只是普通的JavaScript Object, action 必须有一个属性值，它就像这个action的身份证一样， 来表示这action完成的功能。
type应该被定义成常量，因为它是唯一的，不能被修改的。当应用复杂程度上升的时候，可以把所有action 的type统到一个特定的模块下。

**action creator**其实就是一个函数， 用来创建不同的acion,这其实就是将一个函数改装了一下，返回的还是一个对象。
```
function createPost (data) {
    return {
        type: CREATE POST,
        data: data
    }
}
function deletePost (id) {
    return {
        type: DELETE POST,
        id: id
    }
}
function userLogin (data)
    return {
        type: USER LOGIN,
        data: data
    }
}
```
也许读者在这里会疑惑，为什么要用函数包装创建action的过程呢?看起来完全是多此一举。 在同步的应用中，看起来没有什么特殊之处，但是在异步的应用中，就可以看出action creator的作用。

**2. reducer**

action定义了要执行的操作，但是没有规定state怎样变化。reducer 的任务就是定义整个程序的state如何响应。

在Redux中，整个程序的所有数据存储在唯一一个Object中。这是Redux不同于Flux的一个重要特性。Flux 可以有多个store来处理不同类型的数据，而Redux整个应用程序的state都在一个单独的Object中。完全可以只写一个reducer来处理所有的action,但是，当数据和action变得越来越复杂的时候，这个唯一的reducer就会变得臃肿不堪，所以最好的方法是将复杂的reducer拆分然后合并。

**3. store**

在了解Redux之前，action和reducer听起来比较晦涩，其实它们没什么难懂的地方，action不过是一个特殊的object，它描述了一个特定的行为；而reducer就是一个函数，接受数据和action，返回唯一的值，它会根据这些不同的action更新对应的state值。

store就是这两者的黏合剂，它能完成以下这些任务。
* 保存整个程序的state。
* 可以通过getstate()方法访问state 的值。
* 可以通过dispatch()方法执行一个action。
* 还可以通过subscribe(listener)注册回调， 监听state的变化。

### 数据流

![](https://user-gold-cdn.xitu.io/2019/6/23/16b838a0d6411311?w=638&h=479&f=png&s=127163)

Redux是严格的单向数据流，类似Flux,可以让程序逻辑更加清晰、数据完全可控。应用中的数据变化都遵循相同的周期，这就是Redux的口号，**可以预测的JavaScript状态容器。**

根据上面的例子，可以总结出Redux的数据流分为这样几步:

* 调用store.dispatch(action)来执行一个action。
* store调用传入的reducer 函数，store 的来源就是reducer, const store
=createStore(rootReducer)。当前的state 和action 会传入到reducer这个函
数中。
* reducer处理action并且返回新的state。在reducer这个纯函数中，可以根据传入的action,来生成新的state并且返回。
* store保存reducer返回的完整state。可以根据store.getState()来取得当前的state,也可以通过store.subscribe(listener)来监听state的变化。

### middleware
middlear顾名思义，即中间件。如果你开发过基于Express/Koa的Web服务器，你很可能接触过这个概念。在Express/Koa这样的服务器端框架中，中间件扮演着对request/ response统进行特定处理行为的角色，它们可以接触到request/response以及触发下一个middleware继续处理的next方法。

Redux中mdeware的设计也较为相似，它们在action被dispatch时触发，并提供了调用最终reducer之前的打展能力midleware可以同时接触到action信息与store的getstate/dispatch方法。middleware可以在原有action 的基础上创建一个新的action和dispatch ( action转换，用于可异步action处理等)，也可以触发一些额外的行为(如日志记录)。最后，它也可以通过next触发后续的middleware与reducer本身的执行。

**简单版本的applyMiddleware方法:**
最后需要把middleware和store.dispatch方法结合起来，提供一个叫applyMiddleware的方法来完成这项任务。
```
//这不是Redux最终的实现，在这里只是写出了这个方法的工作原理
function applyMiddleware (store, middlewares){
    //读入middleware的函数数组
    middlewares = middlewares.slice();
    middlewares.reverse() ;
    
    //保存-份副本
    let dispatch = store.dispatch;
    //循环middleware,将其依次覆盖到dispatch方法中，还是一种类似滚雪球的方法
    middlewares.forEach (middleware =>  dispatch = middleware (store)(dispatch))
    
    //到这里dispatch这个函数已经拥有了多个middleware的魔力
    //返回一份store对象修改过的副本
    return object.assign({}， store, { dispatch }) ;
}
store = applyMiddleware (store, [logger, crashReporter]) ;
store.dispatch (addTodo('Use Redux'));
```
注意，这个方法不是Redux的最终实现，这里仅仅是写出了工作原理，使用applyMiddleware后返回的是一个增强型的store, store dispatch方法也将两个中间件融合了进去。

## 6. react-redux
react-redux是Redux官方提供的React绑定，用于辅助在React项目中使用Redux，其特点是性能优异且灵活强大。

它的API相当简单，包括一个 React Component(Provider)和一个高阶方法connect。

### 1. Provider
顾名思义，Provider的作用主要是“provide"。Provider的角色是store的提供者，一般情况下，把原有的组件树根节点包裹在Provider中，这样整个组件树上的节点都可以通过connect获取store。
```
ReactDOM.render (
    <Provider store={store}>
        <MyRootComponent />
    </ Provider>，
)
```
### 2. connect
connect是用来“连接”store与组件的方法，它常见的用法是如下这样的。
```
import { add } from ' actions';
function mapStateToProps (state) (
    return {
        num: state.num
    };
}
function mapDispatchToProps (dispatch)
    return {
        onBtnClick() {
            dispatch(add())
        }
    }
}

function Counter(props) {
    return (
        <p>
            {props.num}
            <button onClick={props.onBtnClick}>+1</button>
        </p>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```
在这个示例中，我们通过connect让组件Counter得以连接store，从store中取得num信息并在按钮单击的时候触发store上的add方法（这里的add是个action creator，执行结果是一个action）。

connet是一个高阶函数，接收3个参数mapStateToProps、mapDispatchToProps及mergeProps,并返回enhancer, enhancer的作用已经不必多说，它决定了被返回的容器组件的行为，而enhancer的行为又由connect方法决定。下面，首先简要说明下在connect被调用时，它的3个参数各自的作用。

**mapStateToProps**

mapStateToProps 要求是一个方法，接收参数state (即store getState()的结果)，返回一个普通的JavaScript对象，对象的内容会被合并到最终的展示组件上。简单地说，mapStateToProps就是从全局的状态数据中挑选、计算得到展示组件所需数据的过程，即从state到组件属性的映射，正如它的参数名所暗示的:“mapstatetoprops”。这个方法会在最初state发生改变时，被调用并计算出结果，结果会被作为展示控件属性影响其行为。这部分控件属性被称为stateProps。

**mapDispatchToProps**

mapDispatchToProps的命名风格与第一个参数类似，不难推断它的作用“map dispatch to props",即接收参数dispatch (正是store的dispatch方法)，并返回一个普通的JavaScript对象，对象的内容会被合并到最终的展示组件上。对应于mapStateToProps,一般用于生成数据属性，mapDispatchToProps一般用于于生成行为属性，即典型的onDoSth这样的回调，被称为dispatchProps.

### 展示组件与容器组件
首先要引入两个概念:展示组件(Presentational Component)与容器组件(Container Component)。所有的React组件都可以被被分为这两种组件，顾名思义，前者专注于界面的展示，而后者为前者提供容器。下面将借助这些特点来帮助我们更明确地区分这两个概念。

**展示组件**

* 关心应用的外观。
* 可能会包含展示组件或容器组件，除此之外常常还会包含属于组件自身的DOM节点与样式信息。
* 常常允许通过this.props.children 实现嵌套。
* 对应用的其余部分( 如Flux action及store)没有依赖。
* 不会指定数据如何加载或改变。
* 只通过props获取数据与行为(回调函数)。
* 极少会包含自身的状态(state),如果有，一定是界面状态而非数据。
* 一般都写成函数式组件( functional component)，除非需要包含状态、生命周期钩子或性能优化。
* 典型的例子: Page、Sidebar、Story、UserInfo、List。

**容器组件**

* 关心应用如何工作。
* 可能会包含展示组件或容器组件，但通常不会包含DOM节点(除包裹用的div外)，一定不会包含样式信息。
* 为展示组件或其他容器组件提供数据与行为(回调函数);
* 调用Flux action井将其作为提供给展示组件的回调函数。
* 往往是有状态的，扮演数据源的角色。
* 往往无须手工实现，而是通过高阶组件生成，如react-redux提供的connect()、Relay提供的createContainer()及 FluxUtils 提供的Container.create()等。
* 典型的例子: UserPage、FollowedUserList。

这么做有什么好处呢?

一来通过职责将组件明确地区分开了，应用的界面与逻辑都会变得更清晰。

二来这种区分帮助我们更好地复用组件:展示组件具有更好的复用性，它们可以通过包裹不同的数据源成为不同的容器组件。如Usrli可以被分别包装成为Followeduserist与FollowingUserList,只需要实现各自获取userList数据的逻辑即可。

最后，这让我们展示一个无逻辑的界面成为可能----只需要组装展示组件，然后给它们提供mock的数据，就足以完成界面的全貌。

经过以上的介绍，不难发现，这里的容器组件在基于react-redux的项目中正是那些通过connect的结果函数处理得到的组件，而展示组件是被作为参数传入或组成其他展示组件的那些组件。如何组织项目中的connetc行为这个问题，在这里等价于如何组织项目中的展示组件与容器组件。

### 组织不同类型的组件
下面介绍一下如何合理地组织展示组件与容器组件。

首先，尽可能通过纯展示组件(除根节点外)来完成应用的搭建，所有组件的数据与行为都通过props从其父节点获取。然后很快会遇到之前提到的问题:需要将很多内容逐层地传递下去，以便叶子节点使用。现在便是时候引入容器组件了。考察那些逐层传递属性的行为，对于一个中间组件，如果某些数据仅仅用来向下传递给它的子节点，则自己并不消费。每次它的子节点所需的数据发生变化，都要相应地修改它的props以适应变化，那么这些数据往往并不应该由它来提供给它的子节点。通过对子节点进行connect产生一个新的容器组件，由它直接从store中获取数据并提供给子节点，这样，中间组件就无须传递这些并不是它本身依赖的数据。这是一个不断迭代优化的过程，重复这样的步骤可以帮助我们找到一个个应该插入容器组件的地方，让应用结构变得越来越合理。

## 7. 性能优化

在开发Web应用的时候，性能一直是一个被关注很多的话题。对于React的项目，大部分时候不需要考虑性能问题，这正是React的Virtual DOM与Diff算法带来的好处。但是在应用较为复杂或数据流较大时，仅仅通过所以组件的render方法重新生成Vitrual DOM树并进行Diff，这一过程变得较为耗时，优化在所难免。

### 优化原则

1. 避免过早优化
2. 着眼瓶颈
3. 性能分析
4. 避免不必要的render
5. 合理拆分组件
6. 不可变数据
7. 合理使用state和props
8. 合理使用社区优秀产物



>本文整理于【React全栈】，如有错误，敬请雅正😄