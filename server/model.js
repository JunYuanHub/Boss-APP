//载入MongoDB数据库，模型概念
const mongoose=require('mongoose');
//链接MongoDB，并使用集合
const DB_URL = 'mongodb://localhost:27017/employer';
mongoose.connect(DB_URL,{useNewUrlParser:true}, function(err){
    if(err){
        console.log('Connection Error:' + err)
    }else{
        console.log('Connection success!') }
});


const models={
    user:{
        "user":{'type':String,require:true},
        "pwd":{'type':String,require:true},
        "type":{'type':String,require:true},

        "avatar":{'type':String},  //头像
        "desc":{'type':String},    //简介
        "title":{'type':String},   //职位
        //对于BOSS，还有公司和提供薪资
        "company":{'type':String},
        "salary":{'type':String}
    },
    chat:{
        "chatid":{"type":String,require:true},
        "from":{'type':String,require:true},
        "to":{'type':String,require:true},
        "read":{"type":Boolean,"default": false},
        "content":{"type":String,require:true},
        "create_time":{"type":Number,"default":new Date().getTime(),require:true}
    }
};

for(let m in models){
    mongoose.model(m,new mongoose.Schema(models[m]))
}

module.exports={
    getModel:function (name) {
        return mongoose.model(name)
    }
}