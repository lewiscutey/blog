(window.webpackJsonp=window.webpackJsonp||[]).push([[68],{195:function(a,t,n){"use strict";n.r(t);var e=n(2),s=Object(e.a)({},function(){var a=this,t=a.$createElement,n=a._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[n("p",[a._v("这个需求做下来参考了不少文章，其实大多都是一知半解，每个人遇到的问题不同，这篇文章可以说彻底解决"),n("code",[a._v("wx.chooseImage")]),a._v("的各种疑难杂症，一步到位,因此趁着今天休息把整个过程记录下来，分享给之后有需要的各位同行！\n")]),a._v(" "),n("blockquote",[n("p",[a._v("最近在做一个复杂的跨五端（PC、H5、小程序、iOS、android）的需求，历时将近两个多月，其中酸甜苦辣冷暖自知，近日终于可以封板上线，回忆整个开发过程，深坑不断，收获颇多，今天先分享一下在微信小程序的web-view里选取照片的功能，此文完整的记录整个开发过程，彻底解决各种疑难杂症。")])]),a._v(" "),n("h2",{attrs:{id:"深度调研"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#深度调研","aria-hidden":"true"}},[a._v("#")]),a._v(" 深度调研")]),a._v(" "),n("p",[a._v("因为跨端所以最开始使用了"),n("code",[a._v('<input type="file" accept="image/*" capture="camera">')]),a._v("的方式，简单粗暴可使用，五端勉强都可以打个及格分，一直到联调结束PM检测时说体验太差了，趁着还有时间（其实我也看不下去），索性就按PM的要求来，开始计划调用原生的，因为客户端之前已经提供了这样的"),n("strong",[a._v("bridge")]),a._v("，所以和客户端的头像调试轻松完成，剩下的小程序历经万千磨难，最终完美谢幕。")]),a._v(" "),n("p",[a._v("首先没有做过这方面的经验，两眼一抹黑，由于是把H5页面嵌套在小程序的"),n("strong",[a._v("web-view")]),a._v("里，所以直接查看官方文档，小程序向web-view提供了三十多个API-"),n("a",{attrs:{href:"https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html",target:"_blank",rel:"noopener noreferrer"}},[a._v("详情文档"),n("OutboundLink")],1),a._v("。至此以为可以轻松搞定，于是开始了不断的趟坑。。。")]),a._v(" "),n("h2",{attrs:{id:"按步开发"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#按步开发","aria-hidden":"true"}},[a._v("#")]),a._v(" 按步开发")]),a._v(" "),n("p",[a._v("刚开始直接在H5里使用了"),n("code",[a._v("wx.chooseImage")]),a._v(",发现在开发者工具中不断的报错"),n("code",[a._v("the permission value is offline verifying")]),a._v(",慢慢开始搜索才发现在小程序的web-view里也必须使用"),n("strong",[a._v("jweixin")]),a._v(",其实就是个公众号网页，接下来开始按"),n("a",{attrs:{href:"https://qydev.weixin.qq.com/wiki/index.php?title=%E5%BE%AE%E4%BF%A1JS-SDK%E6%8E%A5%E5%8F%A3#.E6.AD.A5.E9.AA.A4.E4.B8.80.EF.BC.9A.E5.BC.95.E5.85.A5JS.E6.96.87.E4.BB.B6",target:"_blank",rel:"noopener noreferrer"}},[a._v("这套流程"),n("OutboundLink")],1),a._v("走:")]),a._v(" "),n("ol",[n("li",[a._v("引入JS文件")])]),a._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[a._v("// 推荐使用1.3.2以上的版本，之前的版本很多坑😭\nhttps://res.wx.qq.com/open/js/jweixin-1.3.2.js\n// 我是直接用的npm包，目前基于1.4.0-test的版本\nnpm install weixin-js-sdk\n")])])]),n("ol",{attrs:{start:"2"}},[n("li",[a._v("通过config接口注入权限验证配置")])]),a._v(" "),n("div",{staticClass:"language-javascript extra-class"},[n("pre",{pre:!0,attrs:{class:"language-javascript"}},[n("code",[a._v("wx"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[a._v("config")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n    debug"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("true")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。")]),a._v("\n    appId"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[a._v("''")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 必填，微信公众号的唯一标识，此处填写公众号的appId")]),a._v("\n    timestamp"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 必填，生成签名的时间戳")]),a._v("\n    nonceStr"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[a._v("''")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 必填，生成签名的随机串")]),a._v("\n    signature"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[a._v("''")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),n("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 必填，签名")]),a._v("\n    jsApiList"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 必填，需要使用的JS接口列表，所有JS接口列表见附录2")]),a._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])])]),n("ol",{attrs:{start:"3"}},[n("li",[a._v("通过ready接口处理成功验证")])]),a._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[a._v("wx.ready(function(){\n    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。\n});\n")])])]),n("ol",{attrs:{start:"4"}},[n("li",[a._v("通过error接口处理失败验证")])]),a._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[a._v("wx.error(function(res){\n    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。\n});\n")])])]),n("ol",{attrs:{start:"5"}},[n("li",[a._v("判断当前客户端版本是否支持指定JS接口")])]),a._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[a._v('wx.checkJsApi({\n    jsApiList: [\'chooseImage\'] // 需要检测的JS接口列表\n    success: function(res) {\n    // 以键值对的形式返回，可用的api值true，不可用为false\n    // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}\n    },\n    fail: function(err) {\n    // checkJsApi接口调用失败\n    }\n});\n')])])]),n("ol",{attrs:{start:"6"}},[n("li",[a._v("接口调用")])]),a._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[a._v("wx.chooseImage({\n    count: 1, // 默认9\n    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有\n    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有\n    success: function (res) {\n        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片\n    }\n});\n")])])]),n("p",[n("strong",[a._v("本部分要特别注意以下几点：")])]),a._v(" "),n("ul",[n("li",[a._v("invalid url domain：当前页面所在域名与使用"),n("strong",[a._v("appid")]),a._v("没有绑定（可在该公众号后台的应用可信域名中配置当前H5页面的域名）；")]),a._v(" "),n("li",[a._v("invalid signature签名错误：建议按"),n("a",{attrs:{href:"https://qydev.weixin.qq.com/wiki/index.php?title=%E5%BE%AE%E4%BF%A1JS-SDK%E6%8E%A5%E5%8F%A3#.E9.99.84.E5.BD.956-.E5.B8.B8.E8.A7.81.E9.94.99.E8.AF.AF.E5.8F.8A.E8.A7.A3.E5.86.B3.E6.96.B9.E6.B3.95",target:"_blank",rel:"noopener noreferrer"}},[a._v("如下顺序检查"),n("OutboundLink")],1),a._v("，主要可能是域名一般带的参数，所以域名每次都不一样，必须在调用前通过域名来获取signature；")]),a._v(" "),n("li",[a._v("服务上线之后无法获取jsapi_ticket,一般是access_token调用次数过多被限制了，需要在服务端做缓存；")]),a._v(" "),n("li",[a._v("permission denied：该公众号号没有权限使用这个JSAPI（部分接口需要认证之后才能使用）；")])]),a._v(" "),n("h2",{attrs:{id:"处理图片数据为base64"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#处理图片数据为base64","aria-hidden":"true"}},[a._v("#")]),a._v(" 处理图片数据为base64")]),a._v(" "),n("p",[n("code",[a._v("wx.chooseImage")]),a._v("获取到的图片为一个临时路径，微信同时提供了"),n("code",[a._v("wx.getLocalImgData")]),a._v("方法可以把获取到的路径转为base64格式的数据，至此就可以轻松许多了，但是转出来的base64在android和iOS中稍有不同，需要特别注意一下：")]),a._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[a._v("wx.getLocalImgData({\n    localId: req.localIds[0].toString(),\n    success: function (res) {\n        const localData = res.localData;\n        let imageBase64 = '';\n        if (localData.indexOf('data:image') == 0) {\n            //苹果的直接赋值，默认生成'data:image/jpeg;base64,'的头部拼接\n            imageBase64 = localData;\n        } else {\n            //此处是安卓中的唯一得坑！在拼接前需要对localData进行换行符的全局替换\n            //此时一个正常的base64图片路径就完美生成赋值到img的src中了\n            imageBase64 = 'data:image/jpeg;base64,' + localData.replace(/\\n/g, '');\n        }\n    }\n});\n")])])]),n("h2",{attrs:{id:"上传图片"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#上传图片","aria-hidden":"true"}},[a._v("#")]),a._v(" 上传图片")]),a._v(" "),n("blockquote",[n("p",[a._v("获取到图片的base64数据之后其实我们就可以为所欲为了，不需要使用"),n("code",[a._v("wx.uploadImage")]),a._v("和"),n("code",[a._v("wx.downloadImage")]),a._v("了，不仅需要麻烦的上传到微信服务器，还有三天的时间限制反而增加了成本，最好的方式就是直接上传至我们自己的服务器。")])]),a._v(" "),n("p",[a._v("一般与服务端交互的这种文件类型一般采用"),n("strong",[a._v("表单提交--multipart/form-data")]),a._v("的方式，这就要求我们熟悉传输"),n("a",{attrs:{href:"https://www.cnblogs.com/shanyou/archive/2013/06/07/3123155.html",target:"_blank",rel:"noopener noreferrer"}},[n("strong",[a._v("form-data")]),n("OutboundLink")],1),a._v("的数据交互，所以需要把刚才获取到的base64转为可post的二进制数据，JavaScript提供了原生的"),n("code",[a._v("atob/btoa")]),a._v("用来对base64进行编码和解码；")]),a._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[a._v("base64ToBlob(dataurl) {\n    let arr = dataurl.split(',');\n    let mime = arr[0].match(/:(.*?);/)[1];\n    let bstr = atob(arr[1]);\n    let n = bstr.length;\n    let u8arr = new Uint8Array(n);\n    while (n--) {\n        u8arr[n] = bstr.charCodeAt(n);\n    }\n    return new Blob([u8arr], { type: mime });\n}\n")])])]),n("p",[a._v("ok,处理好可交互的数据就可以上传到自己的服务器了，之后相当于普通H5页面的图片交互了,可上传可下载😄")]),a._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[a._v("let param = new FormData();\nparam.append('headPic', imageData);\nthis.$http.post('/upload.json', {\n    headers: {\n        'Content-Type': 'multipart/form-data',\n    },\n    params: param,\n}).then(res => {\n    console.log('上传成功', res);\n});\n")])])]),n("h2",{attrs:{id:"完整代码"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#完整代码","aria-hidden":"true"}},[a._v("#")]),a._v(" 完整代码")]),a._v(" "),n("p",[a._v("终于。。。可以告一段落了，至此小程序的"),n("code",[a._v("web-view")]),a._v("里成功使用了"),n("code",[a._v("wx.chooseImage")]),a._v(",下面把完整代码贴出来，敬请参考😄")]),a._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[a._v("<template>\n    <div class=\"card-avatar\">\n      <img\n        :src=\"avatarUrl\"\n      >\n      <div\n        class=\"choose-image\"\n        @click=\"chooseImage\"\n      />\n    </div>\n</template>\n\n<script>\nimport wx from 'weixin-js-sdk';\nconst imgUrl = require('../../common/assets/images/default-avatar.png')；\n\nexport default {\n  name: 'Card',\n  components: {\n  },\n  props: {\n  },\n  data() {\n    return {\n      avatarUrl: imgUrl,\n    };\n  },\n  computed: {\n  },\n  watch: {\n  },\n  mounted() {\n    this.getWxConfigDatas();\n  },\n  methods: {\n    getWxConfigDatas() {\n      const params = {\n        checkCode: getUrlParams().checkCode,  // 从地址栏获取checkCode用于校验signature\n      };\n      this.$http.get('/signature.json', { params }).then(res => {\n        if (res.content.data && res.content.data.signature) {\n          this.registereWxApi(res.content.data.signature);\n        }\n      });\n    },\n    registereWxApi(data) {\n      wx.config({\n        // debug: true,\n        jsApiList: ['chooseImage', 'getLocalImgData'],\n        appId: data.appId,\n        timestamp: data.timestamp,\n        nonceStr: data.nonceStr,\n        signature: data.signature,\n      });\n    },\n    chooseImage() {\n      let that = this;\n      if (window.__wxjs_environment === 'miniprogram') {\n        wx.miniProgram.getEnv(function(res) {\n          if (res.miniprogram) {\n            wx.checkJsApi({\n              jsApiList: ['chooseImage', 'getLocalImgData'],\n              success: function(res) {\n                if (res.checkResult.chooseImage) {\n                  wx.chooseImage({\n                    count: 1,\n                    sizeType: ['compressed'],\n                    sourceType: ['album', 'camera'],\n                    success: function(req) {\n                      wx.getLocalImgData({\n                        localId: req.localIds[0].toString(),\n                        success: function (res) {\n                          const localData = res.localData;\n                          let imageBase64 = '';\n                          if (localData.indexOf('data:image') == 0) {\n                            //苹果的直接赋值，默认生成'data:image/jpeg;base64,'的头部拼接\n                            imageBase64 = localData;\n                          } else {\n                            //此处是安卓中的唯一得坑！在拼接前需要对localData进行换行符的全局替换\n                            //此时一个正常的base64图片路径就完美生成赋值到img的src中了\n                            imageBase64 = 'data:image/jpeg;base64,' + localData.replace(/\\n/g, '');\n                          }\n                          that.avatarUrl = imageBase64;\n                          that.handleAvatar(that.dataURLtoBlob(imageBase64));\n                        }\n                      });\n                    },\n                    fail() {\n                      that.$toast.show({\n                        type: 'text',\n                        text: '选择头像失败！',\n                      });\n                    }\n                  });\n                } else {\n                  that.$toast.show({\n                    type: 'text',\n                    text: '暂不支持修改头像！',\n                  });\n                }\n              },\n              fail: function() {\n                that.$toast.show({\n                  type: 'text',\n                  text: '暂不支持修改头像！',\n                });\n              },\n            });\n          } else {\n            that.lgBridgeChooseImage();\n          }\n        });\n      } else {\n        that.lgBridgeChooseImage();\n      }\n    },\n    handleAvatar(imageData) {\n        let that = this;\n        let param = new FormData();\n        param.append('headPic', imageData);\n        that.$http.post('/upload.json', {\n            headers: {\n                'Content-Type': 'multipart/form-data',\n            },\n        params: param,\n        }).then(res => {\n        if (parseInt(res.state, 10) === 1) {\n            that.$toast.show({\n                type: 'success',\n                text: '上传成功！',\n            });\n          that.avatarUrl = res.content && res.content.data && res.content.data.url;\n        }\n      });\n    },\n    dataURLtoBlob(dataurl) {\n      let arr = dataurl.split(',');\n      let mime = arr[0].match(/:(.*?);/)[1];\n      let bstr = atob(arr[1]);\n      let n = bstr.length;\n      let u8arr = new Uint8Array(n);\n      while (n--) {\n        u8arr[n] = bstr.charCodeAt(n);\n      }\n      return new Blob([u8arr], { type: mime });\n    }\n  }\n};\n<\/script>\n\n<style lang=\"less\" scoped>\n.card-avatar {\n    position: absolute;\n    top: 0;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    width: 180px;\n    height: 180px;\n    border-radius: 100%;\n    overflow: hidden;\n    img {\n      width: 100%;\n      height: 100%;\n    }\n    .choose-image, input {\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      opacity: 0;\n    }\n}\n</style>\n")])])]),n("p",[a._v("这个需求做下来参考了不少文章，其实大多都是一知半解，每个人遇到的问题不同，这篇文章可以说彻底解决"),n("code",[a._v("wx.chooseImage")]),a._v("的各种疑难杂症，一步到位,因此趁着今天休息把整个过程记录下来，分享给之后有需要的各位同行！")])])},[],!1,null,null,null);t.default=s.exports}}]);