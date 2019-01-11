---
title: Mac使用mysql注意事项
date: '2018/11/26 21:25:09'
tag: ['Mac', 'mysql']
meta:
  -
    name: description
    content: Mac使用mysql注意事项
  -
    name: keywords
    content: mac,mysql
---
本文记录一些Mac使用mysql的注意事项。。。
<!-- more -->

::: warning 推荐使用brew安装mysql
安装 **brew install mysql**

启动 **brew services start mysql**

停止 **brew services stop mysql**

重启 **brew services restart mysql**
:::

## 1. 常用命令
::: warning mysql命令后需要加分号
eg: **show databases;**
:::
登录mysql
```
mysql -u root -p
```
退出mysql
```
exit;
```
建库
```
create database database_name;
```
查库
```
show databases;
```
删库
```
drop database database_name;
```
选择一个数据库
```
use database_name;
```
建表
```
create table table_name(column_name column_type);
```
删表
```
drop table table_name;
```
表中内容的增加
```
insert into table_name ( field1, field2,...fieldN ) VALUES ( value1, value2,...valueN );
```
表中内容的删除
```
delete from table_name where [condition];
```
表中内容的修改（更新）
```
update table_name SET field1=new-value1, field2=new-value2 where [condition];
```
表中内容的查询
```
select * from table_name;
```

## 2. nodejs无法连接mysql
#### 初次使用也许会遇到下面报错信息：
```js
Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
```
#### 可以使用如下方法解决：
1. 修改host
```js
localhost => 127.0.0.1
```
2. 允许远程服务访问数据库
```js
ALTER USER root IDENTIFIED WITH mysql_native_password BY 'your password';
-- or
CREATE USER 'foo'@'%' IDENTIFIED WITH mysql_native_password BY 'bar';
-- then
FLUSH PRIVILEGES;
```

## 3. 时间问题
>如果不加任何条件，查询数据时得到的时间信息为2017-08-08T08:08:08.000Z,这是时区的问题；

如果你是使用 node 中的 mysql 模块连接数据库,在连接的选项中有个设置:
```js
let mysql = require('mysql');
let connection = mysql.createConnection({
  'connectionLimit': 10,
  'host': 'localhost',
  'user': 'root',
  'password': 'root',
  'database': 'node_site',
  'dateStrings': true  //将时间转换为字符串
})
module.exports = connection;
```