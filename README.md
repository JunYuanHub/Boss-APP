#一、项目介绍
**应用技术**：React全家桶，Node，Express，MongoDB，Antd，socket.io等

**项目背景**：实习期间接触的项目让我开始对全栈开发感兴趣，于是慕课网上找了相关课程学习，一边询问公司的师兄，在不断的版本冲突与无穷的bug修复间挣扎良久，最终完成了项目。不过SSR部分没有做，试过安装各种版本的babel-node至今无法在node编译es6，真希望有大佬能够拯救我。由于之前做的比较散，也留下了很多bug需要修复，最近在不断整理中。
	 
**项目实现功能**：
1.**用户登录注册** ：用户分为牛人（找工作的人）和BOSS（发布工作），根据类别注册登录，
 　显示不同的人群，方便交流
2.**个人信息完善 **：用户可注册姓名头像（头像内嵌在项目里，可自行更改），发布个人信息
 　或招聘信息等
3.**实时聊天**：实现实时聊天，可发送emoji表情，数据库保存用户信息记录，登录自动加载

【更新】19/8/27 异步请求加入await+async优化
【修复】19/8/21 修复打开emoji界面报错的bug
【修复】19/8/19 修复新建用户第一次发送信息头像获取失败的bug


#二、使用说明与截图

1.使用说明：安装好react，node，MongoDB等工具并连接，首先运行‘nodemon server/server.js’启动服务器，然后npm start，访问localhost：3000/login即可；服务器运行在9093端，客户端在3000端口

2.使用截图：

3000/login进入登录页面 　　　　　点击注册进入注册界面　　　　　　　信息完善界面
<figure class="third">
    <img src="https://raw.githubusercontent.com/JunYuanHub/img/master/boss-app/register.png" width=25%>　＝＞　<img src="https://raw.githubusercontent.com/JunYuanHub/img/master/boss-app/register.png" width=25%>　＝＞　<img src="https://raw.githubusercontent.com/JunYuanHub/img/master/boss-app/userinfo.png" width=26%>
</figure>
　登录后显示用户列表 　　　　　　　聊天消息界面　　　　　　　　　　个人中心界面
<figure class="third">
    <img src="https://raw.githubusercontent.com/JunYuanHub/img/master/boss-app/userlist.png" width=23%>　＝＞　<img src="https://raw.githubusercontent.com/JunYuanHub/img/master/boss-app/weidu.png" width=25%>　＝＞　<img src="https://raw.githubusercontent.com/JunYuanHub/img/master/boss-app/me.png" width=25%>
</figure>
#END
