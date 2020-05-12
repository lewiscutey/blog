---
title: Mac常用命令
date: '2018/09/10 20:31:59'
type: post
tag: Mac
meta:
  -
    name: Mac终端常用的一些命令
    content: null
  -
    name: keywords
    content: mac,命令
---
Mac终端常用的一些命令。
<!-- more -->
### 1. 关机重启睡眠

::: warning 这些命令需要管理员权限
**sudo shutdown [-h | -r | -s] [time]**
* -h ：关机（halt）
* -r ：重启（reboot）
* -s ：休眠（sleep）
* time ：执行操作的时间
***
* yymmddhhmm ：指定年月日时分，如 18100110 表示2018年10月1日10点
* now ：现在
* +n ：n分钟后
* hh:mm ：今天某时某分
:::

| 命令名称        | 功能描述       | 使用举例  |
| ------------- |:-------------:| ----- |
| sudo reboot   | 立刻重启 |  不需要参数，直接执行即可 |
| sudo halt     | 立刻关机 |  不需要参数，直接执行即可 |
| sudo shutdown -r | 重启 |  sudo shutdown -r now |
| sudo shutdown -h | 关机 |  sudo shutdown -h 18100110 |
| sudo shutdown -s | 睡眠 |  sudo shutdown -s 20:00 |
### 2. 目录操作
| 命令名称        | 功能描述       | 使用举例  |
| ------------- |:-------------:| ----- |
| mkdir | 创建一个目录 | mkdir dirname 
| rmdir | 删除一个目录 | rmdir dirname 
| mvdir | 移动或重命名一个目录 | mvdir dir1 dir2 
| cd | 改变当前目录 | cd dirname 
| pwd | 显示当前目录的路径名 | pwd 
| ls | 显示当前目录的内容 | ls -la 
| dircmp | 比较两个目录的内容 | dircmp dir1 dir2 

### 3. 文件操作
| 命令名称        | 功能描述       | 使用举例  |
| ------------- |:-------------:| ----- |
cat | 显示或连接文件 | cat filename 
pg | 分页格式化显示文件内容 | pg filename 
more | 分屏显示文件内容 | more filename 
od | 显示非文本文件的内容 | od -c filename 
cp | 复制文件或目录 | cp file1 file2 
rm | 删除文件或目录 | rm filename 
mv | 改变文件名或所在目录 | mv file1 file2 
ln | 联接文件 | ln -s file1 file2 
find | 使用匹配表达式查找文件 | find . -name "*.c" -print 
file | 显示文件类型 | file filename 
open | 使用默认的程序打开文件 | open filename
### 4. 选择操作
| 命令 | 功能描述       | 使用举例  |
| ------- |:-------------:| ----- |
head | 显示文件的最初几行 | head -20 filename 
tail | 显示文件的最后几行 | tail -15 filename 
cut | 显示文件每行中的某些域 | cut -f1,7 -d: /etc/passwd 
colrm | 从标准输入中删除若干列 | colrm 8 20 file2 
paste | 横向连接文件 | paste file1 file2 
diff | 比较并显示两个文件的差异 | diff file1 file2 
sed | 非交互方式流编辑器 | sed "s/red/green/g" filename 
grep | 在文件中按模式查找 | grep "^[a-zA-Z]" filename 
awk | 在文件中查找并处理模式 | awk '{print $1 $1}' filename 
sort | 排序或归并文件 | sort -d -f -u file1 
uniq | 去掉文件中的重复行 | uniq file1 file2 
comm | 显示两有序文件的公共和非公共行 | comm file1 file2 
wc | 统计文件的字符数、词数和行数 | wc filename 
nl | 给文件加上行号 | nl file1 >file2 
### 5. 安全操作
| 命令名称        | 功能描述       | 使用举例  |
| ------------- |:-------------:| ----- |
passwd | 修改用户密码 | passwd 
chmod | 改变文件或目录的权限 | chmod ug+x filename 
umask | 定义创建文件的权限掩码 | umask 027 
chown | 改变文件或目录的属主 | chown newowner filename 
chgrp | 改变文件或目录的所属组 | chgrp staff filename 
xlock | 给终端上锁 | xlock -remote 
### 6. 编程操作
| 命令名称        | 功能描述       | 使用举例  |
| ------------- |:-------------:| ----- |
make | 维护可执行程序的最新版本 | make 
touch | 更新文件的访问和修改时间 | touch -m 05202400 filename 
dbx | 命令行界面调试工具 | dbx a.out 
xde | 图形用户界面调试工具 | xde a.out 
### 7. 进程操作
| 命令名称        | 功能描述       | 使用举例  |
| ------------- |:-------------:| ----- |
ps | 显示进程当前状态 | ps u 
kill | 终止进程 | kill -9 30142 
nice | 改变待执行命令的优先级 | nice cc -c *.c 
renice | 改变已运行进程的优先级 | renice +20 32768 
### 8. 时间操作
| 命令名称        | 功能描述       | 使用举例  |
| ------------- |:-------------:| ----- |
date | 显示系统的当前日期和时间 | date 
cal | 显示日历 | cal 8 1996 
time | 统计程序的执行时间 | time a.out 
### 9. 网络与通信操作
| 命令       | 功能描述       | 使用举例  |
| ------------- |:-------------:| ----- |
telnet | 远程登录 | telnet hpc.sp.net.edu.cn 
rlogin | 远程登录 | rlogin hostname -l username 
rsh | 在远程主机执行指定命令 | rsh f01n03 date 
ftp | 在本地主机与远程主机之间传输文件 | ftp ftp.sp.net.edu.cn 
rcp | 在本地主机与远程主机 之间复制文件 | rcp file1 host1:file2 
ping | 给一个网络主机发送 回应请求 | ping hpc.sp.net.edu.cn 
mail | 阅读和发送电子邮件 | mail 
write | 给另一用户发送报文 | write username pts/1 
mesg | 允许或拒绝接收报文 | mesg n 
### 10. Korn Shell 命令
| 命令名称        | 功能描述       | 使用举例  |
| ------------- |:-------------:| ----- |
history | 列出最近执行过的 几条命令及编号 | history 
r | 重复执行最近执行过的 某条命令 | r -2 
alias | 给某个命令定义别名 | alias del=rm -i 
unalias | 取消对某个别名的定义 | unalias del 
### 11. 其他命令
| 命令名称        | 功能描述       | 使用举例  |
| ------------- |:-------------:| ----- |
uname | 显示操作系统的有关信息 | uname -a 
clear | 清除屏幕或窗口内容 | clear 
env | 显示当前所有设置过的环境变量 | env 
who | 列出当前登录的所有用户 | who 
whoami | 显示当前正进行操作的用户名 | whoami 
tty | 显示终端或伪终端的名称 | tty 
stty | 显示或重置控制键定义 | stty -a 
du | 查询磁盘使用情况 | du -k subdir 
df | 显示文件系统的总空间和可用空间 | df /tmp 
w | 显示当前系统活动的总信息 | w

### 12. ln 命令

- **功能**: 为某一个文件在另外一个位置建立一个同不的链接，这个命令最常用的参数是-s;
- **用法**: ln -s 源文件 目标文件
- **案例**: 项目中的某个node文件设置为全局命令使用
```js
cd /usr/local/bin

sudo ln -s /Users/lewis/Documents/work/**/bin/cli.js happy
```

> 当 我们需要在不同的目录，用到相同的文件时，我们不需要在每一个需要的目录下都放一个必须相同的文件，我们只要在某个固定的目录，放上该文件，然后在其它的 目录下用ln命令链接（link）它就可以，不必重复的占用磁盘空间。例如：ln -s /bin/less /usr/local/bin/less

> -s 是代号（symbolic）的意思。

> 这 里有两点要注意：第一，ln命令会保持每一处链接文件的同步性，也就是说，不论你改动了哪一处，其它的文件都会发生相同的变化；第二，ln的链接又软链接 和硬链接两种，软链接就是ln -s ** **,它只会在你选定的位置上生成一个文件的镜像，不会占用磁盘空间，硬链接ln ** **,没有参数-s, 它会在你选定的位置上生成一个和源文件大小相同的文件，无论是软链接还是硬链接，文件都保持同步变化。


不论是硬连结或软链结都不会将原本的档案复制一份，只会占用非常少量的磁盘空间。

* -f : 链结时先将与 dist 同档名的档案删除
* -d : 允许系统管理者硬链结自己的目录
* -i : 在删除与 dist 同档名的档案时先进行询问
* -n : 在进行软连结时，将 dist 视为一般的档案
* -s : 进行软链结(symbolic link)
* -v : 在连结之前显示其档名
* -b : 将在链结时会被覆写或删除的档案进行备份
* -S SUFFIX : 将备份的档案都加上 SUFFIX 的字尾
* -V METHOD : 指定备份的方式
* --help : 显示辅助说明
* --version : 显示版本

#### 【硬连接】
硬连接指通过索引节点来进行连接。在Linux的文件系统中，保存在磁盘分区中的文件不管是什么类型都给它分配一个编号，称为索引节点号(Inode Index)。在Linux中，多个文件名指向同一索引节点是存在的。一般这种连接就是硬连接。硬连接的作用是允许一个文件拥有多个有效路径名，这样用户就可以建立硬连接到重要文件，以防止“误删”的功能。其原因如上所述，因为对应该目录的索引节点有一个以上的连接。只删除一个连接并不影响索引节点本身和其它的连接，只有当最后一个连接被删除后，文件的数据块及目录的连接才会被释放。也就是说，文件真正删除的条件是与之相关的所有硬连接文件均被删除。

#### 【软连接】
另外一种连接称之为符号连接（Symbolic Link），也叫软连接。软链接文件有类似于Windows的快捷方式。它实际上是一个特殊的文件。在符号连接中，文件实际上是一个文本文件，其中包含的有另一文件的位置信息。