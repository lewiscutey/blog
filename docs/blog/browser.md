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