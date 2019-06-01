---
title: github使用笔记
date: '2018/08/17 21:48:53'
type: post
tag: ['github', 'git']
meta:
  -
    name: description
    content: github使用笔记
  -
    name: keywords
    content: github,git
---
GitHub常用的一些命令，方便随时查看。
<!-- more -->
## 上传打包文件到GitHub pages流程:
``` javascript
npm run build
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:lewiscutey/XX.git master:gh-pages

// 如果不在根目录下，注意设置publicPath = /XX/;因为webpack默认配置是绝对路径
```


## PR流程:

``` javascript
fork 到自己的仓库

git clone 到本地

上游建立连接
git remote add upstream 开源项目地址

始终保持和原仓库代码最新时需要多以下两步操作
git fetch upstream  git merge upstream

创建开发分支 (非必须)
git checkout -b dev

修改提交代码
git status git add . git commit -m git push origin branch

同步代码三部曲
git fetch upstream git rebase upstream/master git push origin master

提交pr
去自己github仓库对应fork的项目下new pull request
```