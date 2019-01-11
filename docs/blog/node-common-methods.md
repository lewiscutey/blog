---
title: Node常用的方法命令
date: '2018/10/29 22:39:25'
tag: node
meta:
  -
    name: description
    content: node常用的方法命令
  -
    name: keywords
    content: node,methods
---
Node中常用的一些方法。
<!-- more -->

## 1. 查看内存
* 1. 查看进程的内存占用: **process.memoryUsage()**
```js
$ node
> process.memoryUsage()
{ rss: 23355392,        // 进程中的常驻内存
  heapTotal: 9682944,   // 堆中总共申请的内存
  heapUsed: 5911720,    // 目前堆中使用的内存
  external: 8840 }      // 代表V8管理的，绑定到Javascript的C++对象的内存使用情况
```

* 2. 查看系统的内存占用: **os.totalmem()**和**os.freemem()**
```js
$ node
> os.totalmem()      // 系统的总内存
8589934592
> os.freemem()       // 系统的闲置内存
209539072
```

## 2. curl
> 在Linux中curl是一个利用URL规则在命令行下工作的文件传输工具，可以说是一款很强大的http命令行工具。它支持文件的上传和下载，是综合传输工具，但按传统，习惯称url为下载工具。
* 1. 基本语法
```js
curl [option] [url]
```

* 2. 常见参数：
```js
-A/--user-agent <string>        // 设置用户代理发送给服务器
-b/--cookie <name=string/file>  // cookie字符串或文件读取位置
-c/--cookie-jar <file>          // 操作结束后把cookie写入到这个文件中
-C/--continue-at <offset>       // 断点续转
-D/--dump-header <file>         // 把header信息写入到该文件中
-e/--referer                    // 来源网址
-f/--fail                       // 连接失败时不显示http错误
-o/--output                     // 把输出写到该文件中
-O/--remote-name                // 把输出写到该文件中，保留远程文件的文件名
-r/--range <range>              // 检索来自HTTP/1.1或FTP服务器字节范围
-s/--silent                     // 静音模式。不输出任何东西
-T/--upload-file <file>         // 上传文件
-u/--user <user[:password]>     // 设置服务器的用户和密码
-w/--write-out [format]         // 什么输出完成后
-x/--proxy <host[:port]>        // 在给定的端口上使用HTTP代理
-#/--progress-bar               // 进度条显示当前的传送状态
```

## 3. npm包的淘宝源
```js
npm install express --registry=https://registry.npm.taobao.org
```