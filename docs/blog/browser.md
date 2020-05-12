---
title: 浏览器的点点滴滴
date: '2019/07/13 19:07:32'
type: post
tag: browser
meta:
  -
    name: description
    content: 总结一些浏览器的知识点
  -
    name: keywords
    content: browser
---
本文总结一些浏览器的知识点。。。
<!-- more -->

## 1. 浏览器缓存

### 1. 强缓存（Expires和Cache-Control）

### 2. 协商缓存（Last-Modified/If-Modified-Since和Etag/If-None-Match)）

### 缓存的优先级
在缓存策略上: **强缓存>协商缓存>启发式缓存**

进一步分析可得出,以下优先级：

**Cache-Control > Expires > ETag > Last-Modified**

## 2. 浏览器渲染机制

### 1. 如果没有声明<!DOCTYPE html>会造成什么影响？
会默认设置为怪异模式。

### 2. 浏览器如何处理自定义的标签，如写一个<data></data>？
在blink的源码里面，不认识的标签默认会被实例化成一个HTMLUnknownElement，这个类对外提供了一个create函数，这和HTMLSpanElement是一样的，只有一个create函数，并且大家都是继承于HTMLElement。并且创建span标签的时候和unknown一样，并没有做特殊处理，直接调的create。所以从本质上来说，可以把自定义的标签当作一个span看待。然后你可以再设置display: block改成块级元素之类的。

### 3. 查DOM的过程是怎么样的？

* **ID选择器**：TreeScope存储了一个m_map的哈希map，这个map以标签id字符串作为key值，Element为value值； 这个m_map把页面所有有id的标签都存了进来。由于map的查找时间复杂度为O(1)，所以使用ID选择器可以说是最快的。

* **类选择器**：先判断当前节点有没有子元素，如果有的话返回它的第一个子元素，如果当前节点没有子元素，并且这个节点就是开始找的根元素（用document.getElement*，则为document），则说明没有下一个元素了，直接返回0/null。如果这个节点不是根元素了（例如已经到了子元素这一层），那么看它有没有相邻元素，如果有则返回下一个相邻元素，如果相邻无素也没有了，由于它是一个叶子结点（没有子元素），说明它已经到了最深的一层，并且是当前层的最后一个叶子结点，那么就返回它的父元素的下一个相邻节点，如果这个也没有了，则返回null，查找结束。可以看出这是一个深度优先的查找。

* **querySelector**： 
  - **ID**：先把输入的selector字符串序列化成一个selectorQuery，然后再queryFirst，可以发现，它最后会调的TreeScope的getElementById；
  - **class**：会从document开始遍历，表面上看是for循环，其实不然，它是重载++操作符；不一样的是match条件判断是：有className，并且className列表里面包含这个class；

## 3. 浏览器加载CSS

### 1. CSS的色值使用16位的数字会优于使用rgb的表示，如果是rgb，它将变成一个函数类型的token，这个函数需要再计算一下。

### 2. 不提倡把选择器写得太长，特别是用sass/less写的时候，新手很容易写嵌套很多层，这样会增加查找匹配的负担。因为它需要对下一个父代选器启动一个新的递归的过程，而递归是一种比较耗时的操作。建议一般是不要超过三层。