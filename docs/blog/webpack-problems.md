---
title: webpcak爬坑总结
date: '2019/04/24 19:53:40'
tag: webpack
meta:
  -
    name: description
    content: webpcak遇到的问题总结
  -
    name: keywords
    content: webpack
---
关于webpack遇到的一些问题总结。
<!-- more -->

### 1. webpack-dev-server配合vue-router使用history模式，一刷新页面内容就会丢失问题；
> 直接使用[connect-history-api-fallback](https://github.com/bripkens/connect-history-api-fallback)这个插件，就可以完美解决；
```js
// dev-server.js
app.use(require('connect-history-api-fallback')({
  index: 'demo/index.html', //  替换为当前开发的目录即可，
}));


// demo/router.js
export default new VueRouter({
  mode: 'history',
  base: 'demo',
  routes,
})
```

### 2. webpack本地开发没问题，服务器上编译报错如下：
```js
if(_this.profile) {
^

TypeError: Cannot read property 'profile' of null
···
```
找了半天发现原来是一张图片名称写成大写字母了😳，这里推荐阮老师写的一篇文章[为什么文件名要小写？](http://www.ruanyifeng.com/blog/2017/02/filename-should-be-lowercase.html);


*持续更新中。。。*