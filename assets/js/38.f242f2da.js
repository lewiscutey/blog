(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{175:function(t,a,s){"use strict";s.r(a);var e=s(2),r=Object(e.a)({},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("p",[t._v("GitHub常用的一些命令，方便随时查看。\n")]),t._v(" "),s("h2",{attrs:{id:"上传打包文件到github-pages流程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#上传打包文件到github-pages流程","aria-hidden":"true"}},[t._v("#")]),t._v(" 上传打包文件到GitHub pages流程:")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[t._v("npm run build\ncd dist\ngit init\ngit add "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("A")]),t._v("\ngit commit "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("m "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'deploy'")]),t._v("\ngit push "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("f git@github"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("com"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("lewiscutey"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("XX")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("git master"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("gh"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("pages\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 如果不在根目录下，注意设置publicPath = /XX/;因为webpack默认配置是绝对路径")]),t._v("\n")])])]),s("h2",{attrs:{id:"pr流程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#pr流程","aria-hidden":"true"}},[t._v("#")]),t._v(" PR流程:")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[t._v("fork 到自己的仓库\n\ngit clone 到本地\n\n上游建立连接\ngit remote add upstream 开源项目地址\n\n始终保持和原仓库代码最新时需要多以下两步操作\ngit fetch upstream  git merge upstream\n\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("创建开发分支")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("非必须"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\ngit checkout "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("b dev\n\n修改提交代码\ngit status git add "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v(" git commit "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("m git push origin branch\n\n同步代码三部曲\ngit fetch upstream git rebase upstream"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("master git push origin master\n\n提交pr\n去自己github仓库对应fork的项目下"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("pull")]),t._v(" request\n")])])]),s("h2",{attrs:{id:"落后于远程分支代码时rebase流程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#落后于远程分支代码时rebase流程","aria-hidden":"true"}},[t._v("#")]),t._v(" 落后于远程分支代码时rebase流程:")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[t._v("git branch "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("av\ngit remote add src ssh"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("git@\ngit branch "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("av\ngit fetch src\ngit rebase src"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("master\ngit push "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("force\ngit log 查看commit日志只保留一条\n")])])]),s("h2",{attrs:{id:"git-reset"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#git-reset","aria-hidden":"true"}},[t._v("#")]),t._v(" git reset")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("git reset (–mixed) HEAD~1\n\n回退一个版本,且会将暂存区的内容和本地已提交的内容全部恢复到未暂存的状态,不影响原来本地文件(未提交的也不受影响)回到add之前；\n\ngit reset –soft HEAD~1\n回退一个版本,不清空暂存区,将已提交的内容恢复到暂存区,不影响原来本地的文件(未提交的也不受影响)回到commit前；\n\ngit reset –hard HEAD~1\n回退一个版本,清空暂存区,将已提交的内容的版本恢复到本地,本地的文件也将被恢复的版本替换；彻底回滚到上一个版本；\n")])])]),s("h2",{attrs:{id:"个人git工作原则"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#个人git工作原则","aria-hidden":"true"}},[t._v("#")]),t._v(" 个人Git工作原则")]),t._v(" "),s("p",[t._v("永远基于远程库的最新代码工作，尽量每一步操作（特别是add/commit/push）都通过git pull --rebase获取一下当前最新版本。")]),t._v(" "),s("h2",{attrs:{id:"多人在同一分支开发"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#多人在同一分支开发","aria-hidden":"true"}},[t._v("#")]),t._v(" 多人在同一分支开发")]),t._v(" "),s("p",[t._v("基于同一个远程分支开发的时候，如果想要顺利 push 又不自动生成 merge commit，建议在每次提交都按照如下顺序操作：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("git stash\n\ngit pull --rebase\n\ngit push\n\ngit stash pop\n")])])])])},[],!1,null,null,null);a.default=r.exports}}]);