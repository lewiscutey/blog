---
title: mobile-hack
date: '2018/09/08 17:20:30'
tag: ['H5','mobile']
meta:
  -
    name: description
    content: 记录移动端的一些坑
  -
    name: keywords
    content: H5
---
这里总结记录一些移动端的坑！
<!-- more -->
## 1. flex兼容性

## 2. APP内嵌H5页面调试
#### 1、 Chrome模拟真机调试Android APP里的webview
```
1.通过修改代码，在APP内设置允许远程调试;

2.开启当前Android设备的USB调试;

3.在PC或MAC上安装chrome浏览器（版本>=32）和对应的Android设备驱动;

4.用USB线连接Android设备，在PC或MAC上的chrome地址栏输入 chrome://inspect 然后回车，或通过菜单图标→工具→检查设备，进入调试界面;

5.勾选界面中的 Discover USB devices ，直到搜索到你的Android设备;

6.在移动设备上弹出的是否允许远程调试上，选择“允许”;

7.在页面列表（将展示已在Android上的chrome中打开的页面），点击对应的 inspect 开始调试;

8.此时将在桌面版Chrome上弹出一个新的标签页，即为调试界面；如果很久都没用响应，请翻墙后再试;
```
#### 2、 eruda或vConsole调试
```javascript
1.eruda调试时，直接在页面中插入以下代码，页面中会有悬浮按钮，类似iOS上的辅助触控；

<script src="https://cdn.bootcss.com/eruda/1.4.2/eruda.min.js"></script>
<script>eruda.init();</script>

2.vConsole调试时，直接在页面中插入以下代码，页面中会有绿色的调试按钮；

<script src="https://cdn.bootcss.com/vConsole/3.2.0/vconsole.min.js"></script>
<script>var vConsole = new VConsole(option);</script>
// option可以传配置参数，也可以啥也不传
```

#### 3、调试iOS上的Safari
```
1.在iOS设备上打开允许调试：设置→Safari→高级→打开”web检查器“;

2.在MAC上打开Safari的开发菜单：顶部菜单栏“Safari”→偏好设置→高级→打开”在菜单栏中显示“开发”菜单;

3.在iOS设备上的Safari浏览器中打开要调试的页面，然后切换到MAC的Safari，在顶部菜单栏选择“开发”→找到你的iOS设备名称→右边二级菜单选择需要调试的对应标签页，即可开始远程调试;

4.如果没有iOS设备，也可以在Xcode中模拟一台，点击顶部“Xcode”→“Open Developer Tool”→“iOS Simulator”即可打开一个iOS设备的模拟器，并且模拟器里面Safari打开的页面，也是能通过上个步骤中MAC上的Safari调试;
```

#### 4、fiddler或charles代理转发
```
fiddler或charles都是利用相同的原理，同一局域网下保持手机设置代理到本机上，从线上代理到本地服务，这个难度是最大的，但是是最真实的调试，一般需要分别设置html、css、js、img的代理；

1.regex:https://www.baidu.com/index.html => https://XX.baidu.com/index.html

2.regex:https://www.baidu.com/js/(\w+\.js) => https://XX.baidu.com/js/$1

3.regex:https://www.baidu.com/css/([\w-]+\.css) => https://XX.baidu.com/css/$1

4.regex:https://www.baidu.com/img/(\w+\.png) => https://XX.baidu.com/img/$1
```

### *持续更新中。。。*