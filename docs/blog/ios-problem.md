---
title: IOS的一些问题
date: '2019/05/09 15:59:15'
type: post
tag: iOS
meta:
  -
    name: description
    content: 总结iOS独有的一些问题
  -
    name: keywords
    content: iOS
---
本文总结一些iOS独有的问题。。。
<!-- more -->
1. iOS的input圆角问题;
> 给需要处理的input添加如下样式:
```css
input {
  -webkit-appearance: none;
  border-radius: 0;
}
```

2. webkit上的input,button,及select的默认样式可以通过以下代码禁用，然后自定义;
```css
input, button, select {
  -webkit-appearance:none;
}
```

3. input标签，设置type=button属性，disabled设置true，会出现样式文字和背景异常问题;
```css
input['button'] {
  opacity: 1;
}
```