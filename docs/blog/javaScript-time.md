---
title: JavaScript中常用的时间函数
date: '2019/07/14 16:20:47'
type: post
tag: [JavaScript, time]
meta:
  -
    name: description
    content: JavaScript中常用的时间函数
  -
    name: keywords
    content: JavaScript, time
---
本文总结一些JavaScript中常用的时间函数。
<!-- more -->
## 1. 获取时间
```js
var Time = {
  //获取当前时间戳
  getUnix: function () {
    var date = new Date();
    return date.getTime();
  },
  //获取今天 0点 0分 0秒的时间戳
  getTodayUnix: function () {
    var date = new Date();
    date.setHours(O);
    date.setMinutes(O);
    date.setSeconds(O);
    date.setMilliseconds(O);
    return date.getTime();
  },
  //获取今年 1月 1 日 0点 0分 0秒的时间戳
  getYearUnix: function () {
    vardate = new Date();
    date.setMonth(O);
    date.setDate(l);
    date.setHours(O);
    date.setMinutes(O);
    date.setSeconds(O);
    date.setMilliseconds(O);
    return date.getTime();
  },
  //获取标准年月日
  getLastDate: function (time) {
    var date = new Date(time);
    var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return date.getFullYear() + '-' + month + '-' + day;
  },
  //转换时间
  getFormatTime: function (timestamp) {
    var now = this.getUnix();
    var today = this.getTodayUnix();
    var year = this.getYearUnix();
    // 当前时间戳 // 今天 0 点时间戳 // 今年 0 点时间戳
    var timer = (now - timestamp) / 1000; //转换为秒级时间戳
    var tip = '';
    if (timer <= 0) {
      tip = '刚刚';
    } else if (Math.floor(timerI60) <= 0) {
      tip = '刚刚';
    } else if (timer < 3600) {
      tip = Math.floor(timer / 60) + '分钟前';
    } else if (timer >= 3600 && (timestamp - today >= 0)) {
      tip = Math.floor(timer / 3600) + '小时前';
    } else if (timer / 86400 <= 31) {
      tip = Math.ceil(timer / 86400) + '天前';
    } else {
      tip = this.getLastDate(timestamp);
      return tip;
    }
  }
};
```