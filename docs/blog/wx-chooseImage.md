---
title: 一文彻底弄懂wx.chooseImage
date: '2019/06/07 10:32:06'
type: post
tag: [miniprogram, wx, chooseImage]
meta:
  -
    name: description
    content: 解决微信小程序中web-view里使用chooseImage
  -
    name: keywords
    content: web-view,小程序,chooseImage
---
这个需求做下来参考了不少文章，其实大多都是一知半解，每个人遇到的问题不同，这篇文章可以说彻底解决`wx.chooseImage`的各种疑难杂症，一步到位,因此趁着今天休息把整个过程记录下来，分享给之后有需要的各位同行！
<!-- more -->

>最近在做一个复杂的跨五端（PC、H5、小程序、iOS、android）的需求，历时将近两个多月，其中酸甜苦辣冷暖自知，近日终于可以封板上线，回忆整个开发过程，深坑不断，收获颇多，今天先分享一下在微信小程序的web-view里选取照片的功能，此文完整的记录整个开发过程，彻底解决各种疑难杂症。

## 深度调研
因为跨端所以最开始使用了`<input type="file" accept="image/*" capture="camera">`的方式，简单粗暴可使用，五端勉强都可以打个及格分，一直到联调结束PM检测时说体验太差了，趁着还有时间（其实我也看不下去），索性就按PM的要求来，开始计划调用原生的，因为客户端之前已经提供了这样的**bridge**，所以和客户端的头像调试轻松完成，剩下的小程序历经万千磨难，最终完美谢幕。

首先没有做过这方面的经验，两眼一抹黑，由于是把H5页面嵌套在小程序的**web-view**里，所以直接查看官方文档，小程序向web-view提供了三十多个API-[详情文档](https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html)。至此以为可以轻松搞定，于是开始了不断的趟坑。。。

## 按步开发
刚开始直接在H5里使用了`wx.chooseImage`,发现在开发者工具中不断的报错`the permission value is offline verifying`,慢慢开始搜索才发现在小程序的web-view里也必须使用**jweixin**,其实就是个公众号网页，接下来开始按[这套流程](https://qydev.weixin.qq.com/wiki/index.php?title=%E5%BE%AE%E4%BF%A1JS-SDK%E6%8E%A5%E5%8F%A3#.E6.AD.A5.E9.AA.A4.E4.B8.80.EF.BC.9A.E5.BC.95.E5.85.A5JS.E6.96.87.E4.BB.B6)走:

1. 引入JS文件
```
// 推荐使用1.3.2以上的版本，之前的版本很多坑😭
https://res.wx.qq.com/open/js/jweixin-1.3.2.js
// 我是直接用的npm包，目前基于1.4.0-test的版本
npm install weixin-js-sdk
```
2. 通过config接口注入权限验证配置
```javascript
wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: '', // 必填，微信公众号的唯一标识，此处填写公众号的appId
    timestamp: , // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '',// 必填，签名
    jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});
```
3. 通过ready接口处理成功验证
```
wx.ready(function(){
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
});
```
4. 通过error接口处理失败验证
```
wx.error(function(res){
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
});
```
5. 判断当前客户端版本是否支持指定JS接口
```
wx.checkJsApi({
    jsApiList: ['chooseImage'] // 需要检测的JS接口列表
    success: function(res) {
    // 以键值对的形式返回，可用的api值true，不可用为false
    // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
    },
    fail: function(err) {
    // checkJsApi接口调用失败
    }
});
```
6. 接口调用
```
wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
    }
});
```

**本部分要特别注意以下几点：**
* invalid url domain：当前页面所在域名与使用**appid**没有绑定（可在该公众号后台的应用可信域名中配置当前H5页面的域名）；
* invalid signature签名错误：建议按[如下顺序检查](https://qydev.weixin.qq.com/wiki/index.php?title=%E5%BE%AE%E4%BF%A1JS-SDK%E6%8E%A5%E5%8F%A3#.E9.99.84.E5.BD.956-.E5.B8.B8.E8.A7.81.E9.94.99.E8.AF.AF.E5.8F.8A.E8.A7.A3.E5.86.B3.E6.96.B9.E6.B3.95)，主要可能是域名一般带的参数，所以域名每次都不一样，必须在调用前通过域名来获取signature；
* 服务上线之后无法获取jsapi_ticket,一般是access_token调用次数过多被限制了，需要在服务端做缓存；
* permission denied：该公众号号没有权限使用这个JSAPI（部分接口需要认证之后才能使用）；

## 处理图片数据为base64
`wx.chooseImage`获取到的图片为一个临时路径，微信同时提供了`wx.getLocalImgData`方法可以把获取到的路径转为base64格式的数据，至此就可以轻松许多了，但是转出来的base64在android和iOS中稍有不同，需要特别注意一下：
```
wx.getLocalImgData({
    localId: req.localIds[0].toString(),
    success: function (res) {
        const localData = res.localData;
        let imageBase64 = '';
        if (localData.indexOf('data:image') == 0) {
            //苹果的直接赋值，默认生成'data:image/jpeg;base64,'的头部拼接
            imageBase64 = localData;
        } else {
            //此处是安卓中的唯一得坑！在拼接前需要对localData进行换行符的全局替换
            //此时一个正常的base64图片路径就完美生成赋值到img的src中了
            imageBase64 = 'data:image/jpeg;base64,' + localData.replace(/\n/g, '');
        }
    }
});
```

## 上传图片
>获取到图片的base64数据之后其实我们就可以为所欲为了，不需要使用`wx.uploadImage`和`wx.downloadImage`了，不仅需要麻烦的上传到微信服务器，还有三天的时间限制反而增加了成本，最好的方式就是直接上传至我们自己的服务器。

一般与服务端交互的这种文件类型一般采用**表单提交--multipart/form-data**的方式，这就要求我们熟悉传输[**form-data**](https://www.cnblogs.com/shanyou/archive/2013/06/07/3123155.html)的数据交互，所以需要把刚才获取到的base64转为可post的二进制数据，JavaScript提供了原生的`atob/btoa`用来对base64进行编码和解码；

```
base64ToBlob(dataurl) {
    let arr = dataurl.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}
```

ok,处理好可交互的数据就可以上传到自己的服务器了，之后相当于普通H5页面的图片交互了,可上传可下载😄
```
let param = new FormData();
param.append('headPic', imageData);
this.$http.post('/upload.json', {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    params: param,
}).then(res => {
    console.log('上传成功', res);
});
```
## 完整代码
终于。。。可以告一段落了，至此小程序的`web-view`里成功使用了`wx.chooseImage`,下面把完整代码贴出来，敬请参考😄

```
<template>
    <div class="card-avatar">
      <img
        :src="avatarUrl"
      >
      <div
        class="choose-image"
        @click="chooseImage"
      />
    </div>
</template>

<script>
import wx from 'weixin-js-sdk';
const imgUrl = require('../../common/assets/images/default-avatar.png')；

export default {
  name: 'Card',
  components: {
  },
  props: {
  },
  data() {
    return {
      avatarUrl: imgUrl,
    };
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this.getWxConfigDatas();
  },
  methods: {
    getWxConfigDatas() {
      const params = {
        checkCode: getUrlParams().checkCode,  // 从地址栏获取checkCode用于校验signature
      };
      this.$http.get('/signature.json', { params }).then(res => {
        if (res.content.data && res.content.data.signature) {
          this.registereWxApi(res.content.data.signature);
        }
      });
    },
    registereWxApi(data) {
      wx.config({
        // debug: true,
        jsApiList: ['chooseImage', 'getLocalImgData'],
        appId: data.appId,
        timestamp: data.timestamp,
        nonceStr: data.nonceStr,
        signature: data.signature,
      });
    },
    chooseImage() {
      let that = this;
      if (window.__wxjs_environment === 'miniprogram') {
        wx.miniProgram.getEnv(function(res) {
          if (res.miniprogram) {
            wx.checkJsApi({
              jsApiList: ['chooseImage', 'getLocalImgData'],
              success: function(res) {
                if (res.checkResult.chooseImage) {
                  wx.chooseImage({
                    count: 1,
                    sizeType: ['compressed'],
                    sourceType: ['album', 'camera'],
                    success: function(req) {
                      wx.getLocalImgData({
                        localId: req.localIds[0].toString(),
                        success: function (res) {
                          const localData = res.localData;
                          let imageBase64 = '';
                          if (localData.indexOf('data:image') == 0) {
                            //苹果的直接赋值，默认生成'data:image/jpeg;base64,'的头部拼接
                            imageBase64 = localData;
                          } else {
                            //此处是安卓中的唯一得坑！在拼接前需要对localData进行换行符的全局替换
                            //此时一个正常的base64图片路径就完美生成赋值到img的src中了
                            imageBase64 = 'data:image/jpeg;base64,' + localData.replace(/\n/g, '');
                          }
                          that.avatarUrl = imageBase64;
                          that.handleAvatar(that.dataURLtoBlob(imageBase64));
                        }
                      });
                    },
                    fail() {
                      that.$toast.show({
                        type: 'text',
                        text: '选择头像失败！',
                      });
                    }
                  });
                } else {
                  that.$toast.show({
                    type: 'text',
                    text: '暂不支持修改头像！',
                  });
                }
              },
              fail: function() {
                that.$toast.show({
                  type: 'text',
                  text: '暂不支持修改头像！',
                });
              },
            });
          } else {
            that.lgBridgeChooseImage();
          }
        });
      } else {
        that.lgBridgeChooseImage();
      }
    },
    handleAvatar(imageData) {
        let that = this;
        let param = new FormData();
        param.append('headPic', imageData);
        that.$http.post('/upload.json', {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        params: param,
        }).then(res => {
        if (parseInt(res.state, 10) === 1) {
            that.$toast.show({
                type: 'success',
                text: '上传成功！',
            });
          that.avatarUrl = res.content && res.content.data && res.content.data.url;
        }
      });
    },
    dataURLtoBlob(dataurl) {
      let arr = dataurl.split(',');
      let mime = arr[0].match(/:(.*?);/)[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    }
  }
};
</script>

<style lang="less" scoped>
.card-avatar {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 180px;
    height: 180px;
    border-radius: 100%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
    .choose-image, input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
}
</style>
```
这个需求做下来参考了不少文章，其实大多都是一知半解，每个人遇到的问题不同，这篇文章可以说彻底解决`wx.chooseImage`的各种疑难杂症，一步到位,因此趁着今天休息把整个过程记录下来，分享给之后有需要的各位同行！