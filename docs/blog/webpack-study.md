---
title: webpack学习笔记
date: '2019/03/04 21:38:07'
tag: webpack
meta:
  -
    name: description
    content: 记录一些webpack的学习笔记
  -
    name: keywords
    content: webpack
---
本文记录一些webpack的学习笔记。
<!-- more -->

## 1. tree-shaking
1. 尽量不写带有副作用的代码。诸如编写了立即执行函数，在函数里又使用了外部变量等。
2. 如果对ES6语义特性要求不是特别严格，可以开启babel的loose模式，这个要根据自身项目判断，如：是否真的要不可枚举class的属性。
3. 如果是开发JavaScript库，请使用rollup。并且提供ES6 module的版本，入口文件地址设置到package.json的module字段。
4. 如果JavaScript库开发中，难以避免的产生各种副作用代码，可以将功能函数或者组件，打包成单独的文件或目录，以便于用户可以通过目录去加载。如有条件，也可为自己的库开发单独的webpack-loader，便于用户按需加载。
5. 如果是工程项目开发，对于依赖的组件，只能看组件提供者是否有对应上述3、4点的优化。对于自身的代码，除1、2两点外，对于项目有极致要求的话，可以先进行打包，最终再进行编译。
6. 如果对项目非常有把握，可以通过uglify的一些编译配置，如：pure_getters: true，删除一些强制认为不会产生副作用的代码。

#### *更过详情可以查看[原文](https://segmentfault.com/a/1190000012794598).*