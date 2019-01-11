---
title: Node学习笔记
date: '2018/10/31 23:28:24'
tag: node
meta:
  -
    name: description
    content: Node学习笔记
  -
    name: keywords
    content: node
---
总结一些 Node 的学习笔记。。。
<!-- more -->

## 1. 请求头中Content-Type的常用类型
> 在http协议消息头中，使用Content-Type来表示具体请求中的媒体类型信息。

### 常见的媒体格式类型如下：
* text/html  ( HTML格式)
* text/plain  (纯文本格式  )    
* text/xml  (  XML格式)
* image/gif  (gif图片格式)    
* image/jpeg  (jpg图片格式) 
* image/png (png图片格式)

### 以application开头的媒体格式类型：
* application/xhtml+xml      (XHTML格式)
* application/xml            (XML数据格式)
* application/atom+xml       (Atom XML聚合格式)
* application/json           (JSON数据格式)
* application/pdf            (pdf格式)
* application/msword         (Word文档格式)
* application/octet-stream   （二进制流数据如常见的文件下载）
* application/x-www-form-urlencoded  （表单默认的提交数据的格式）

### 另外一种常见的媒体格式是上传文件之时使用的：
* multipart/form-data  (需要在表单中进行文件上传时，就需要使用该格式)

## 2. 创建子进程的方法
> child_process模块给予node可以随意创建子进程的能力，它提供了四个方法用于创建子进程。

* spawn() : 启动一个子进程来执行命令；
* exec() : 启动一个子进程来执行命令，与spawn不同的是其接口不同，它有一个回调函数获取子进程的状况；
* execFile() : 启动一个子进程来执行可执行文件；
* fork() : 与spawn类似，不同点在于它创建的子进程只需要指定要执行的JavaScript文件模块即可；
```js
var cp = require('child_process');
cp.spawn('node', ['work.js']);
cp.exec('node work.js', function(err, stdout, stderr) {
  // doSomeThing
});
cp.execFile('work.js' function(err, stdout, stderr) {
  // doSomeThing
});
cp.fork('./work.js');
```
::: warning 差异：
spawn与exec/execFile不同的是，后两者创建时可以指定timeout属性设置超时时间，一旦创建的进程运行超过设定时间将会被杀死；

exec与execFile不同的是，exec适合执行已有的指令，execFile适合执行文件；

这里的可执行文件是指可以直接执行的文件，如果是JavaScript文件通过execFile()运行时，它的首行内容必须添加如下代码：
**#!/usr/bin/env node**
:::

| 类型 | 回调 | 进程类型 | 执行类型 | 可设置超时 |
| :-------: | :-------: | :-------: | :-------: | :-------: |
| spawn | ❌ | 任意 | 命令 | ❌ |
| exec | ✅ | 任意 | 命令 | ✅ |
| execFile | ✅ | 任意 | 可执行文件 | ✅ |
| spawn | ❌ | Node | JavaScript文件 | ❌ |

## 3. 写入文件
> fs.writeFile(file, data[, options], callback)

参数说明：

* file - 文件名或文件描述符
* data - 要写入文件的数据，可以是 String(字符串) 或 Buffer(流) 对象
* options - 该参数是一个对象，包含 {encoding, mode, flag}。默认编码为 utf8, 模式为 0666 ， flag 为 'w'，*如果是一个字符串，则它指定了字符编码
* callback - 回调函数
* 以追加模式往README.me写入字符串Hello Node.js

```js
fs.writeFile('README.md', 'Hello Node.js', {flag: 'a+'}, (err) => {
  if (err) throw err
  console.log('It\'s saved!')
})
```
这里我们介绍下flags ：
| Flag | 描述 |
| :-------: | :-------: |
| r	| 以读取模式打开文件。如果文件不存在抛出异常。|
| r+ | 以读写模式打开文件。如果文件不存在抛出异常。|
| rs | 以同步的方式读取文件。|
| rs+ | 以同步的方式读取和写入文件。|
| w |	以写入模式打开文件，如果文件不存在则创建。|
| wx |	类似 'w'，但是如果文件路径存在，则文件写入失败。|
| w+ |	以读写模式打开文件，如果文件不存在则创建。|
| wx+ |	类似 'w+'， 但是如果文件路径存在，则文件读写失败。|
| a |	以追加模式打开文件，如果文件不存在则创建。|
| ax |	类似 'a'， 但是如果文件路径存在，则文件追加失败。|
| a+ |	以读取追加模式打开文件，如果文件不存在则创建。|
| ax+ |	类似 'a+'， 但是如果文件路径存在，则文件读取追加失败。|