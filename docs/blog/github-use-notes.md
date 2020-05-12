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

## 落后于远程分支代码时rebase流程:

``` javascript
git branch -av
git remote add src ssh://git@
git branch -av
git fetch src
git rebase src/master
git push --force
git log 查看commit日志只保留一条
```

## git reset

```
git reset (–mixed) HEAD~1

回退一个版本,且会将暂存区的内容和本地已提交的内容全部恢复到未暂存的状态,不影响原来本地文件(未提交的也不受影响)回到add之前；

git reset –soft HEAD~1
回退一个版本,不清空暂存区,将已提交的内容恢复到暂存区,不影响原来本地的文件(未提交的也不受影响)回到commit前；

git reset –hard HEAD~1
回退一个版本,清空暂存区,将已提交的内容的版本恢复到本地,本地的文件也将被恢复的版本替换；彻底回滚到上一个版本；
```

## 个人Git工作原则
永远基于远程库的最新代码工作，尽量每一步操作（特别是add/commit/push）都通过git pull --rebase获取一下当前最新版本。

## 多人在同一分支开发
基于同一个远程分支开发的时候，如果想要顺利 push 又不自动生成 merge commit，建议在每次提交都按照如下顺序操作：
```
git stash

git pull --rebase

git push

git stash pop
```