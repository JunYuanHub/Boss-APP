const express = require('express');
const util=require('utility');    //md5用于密码加密
const Router = express.Router();
const Models = require('./model');
const User = Models.getModel('user');
const Chat = Models.getModel('chat');
const _filter = {pwd:0,_v:0};    //保护用户信息，隐藏pwd和版本信息,filter作用于查询后的doc



function md5pwd(pwd){
    const salt='OnceALife';
    return util.md5(util.md5(pwd+salt))
}
//列出所有注册用户
Router.get('/list',function(req,res){
    const {type}=req.query;         //参数查询
    // User.remove({},function(e,d){});
    User.find({type},function (err,doc) {
        if (err) { return console.log(err) }
        else return res.json({code:0,data:doc});
    })
});
//注册接口
Router.post('/register',function(req,res){
    const {user,pwd,type}=req.body;
    //userId是存入数据库后产生的id,
    User.findOne({user},function (err,doc) {
        if(doc){
            return res.json({code:1,msg:"用户名重复"})
        }
        const userModel=new User({user,type,pwd:md5pwd(pwd)});
        userModel.save(function(e,d){
            if (e){
                return res.json({code:1,msg:"后端出错，无法注册"})
            }
            const {user,type,_id}=d;
            res.cookie('userId',_id);
            return res.json({code:0,data:{user,type,_id}})
        })

        // User.create({user,pwd:md5pwd(pwd),type},function(err,doc){
        //     if (err){
        //         return res.json({code:1,msg:"后端出错，无法注册"})
        //     }
        //     return res.json({code:0})
        // })
    })
});
//登录接口
Router.post('/login',function(req,res){
    const {user,pwd}=req.body;

    User.findOne({user,pwd:md5pwd(pwd)},_filter,function (err,doc) {
        if(!doc){
            return res.json({code:1,msg:"用户名或密码错误"})
        }
        res.cookie('userId',doc._id);
        return res.json({code:0,data:doc})
        })
    });
//检测cookie
Router.get('/info',function (req,res) {
    const {userId}=req.cookies;
    if(!userId){
        return res.json({code:1})
    }
    User.findOne({_id:userId},_filter,function(err,doc){
        if(err){
            return res.json({code:1,msg:'后端错误'})
        }
        return res.json({code:0,userData:doc})
    })

});
//更新用户数据
Router.post('/update',function (req,res){
    const userId=req.cookies.userId;
    if(!userId){
        return json.dumps({code:1})
    }
    const body=req.body;
    User.findByIdAndUpdate(userId,body,function (err,doc) {
        const data = Object.assign({},{
            user:doc.user,
            type:doc.type
        },body);
        return res.json({code:0,data})
    })
});
//获取聊天记录接口
Router.get('/getmsglist',function (req,res) {
    const {userId} = req.cookies;

    User.find({},function(err,doc){
        let users={};
        doc.forEach(v=>{
            users[v._id]={name:v.user,avatar:v.avatar}
        });
        Chat.find({"$or":[{from:userId},{to:userId}] },function (err,doc) {
            if(!err){
                console.log(doc);
                return res.json({code:0,users:users,msglist:doc})
            }
        })
    });
});
//更新已读—未读消息
Router.post('/readmsg',function (req,res) {
    const userId = req.cookies.userId;
    const {from} = req.body;
    Chat.update(
        {from,to:userId},     //查询条件
        {'$set':{read:true}}, //修改设置
        {'multi':true},       //默认修改第一个找到的，改为修改所有
        function (err,doc) {
            if(!err){
                return res.json({code:0,num:doc.nModified})
            }
            return res.json({code:1,msg:"修改失败"})
        }
    )
})
module.exports= Router;