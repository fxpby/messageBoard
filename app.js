const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const moment = require('moment');
const path = require('path');

let app = express();

//注册模板引擎
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

//设置全局变量，服务器的整个生命周期都存在
let entries = [];//全局数组
app.locals.entries = entries;

//设置用户表单提交数据的接收中间件，所有提交的信息都会保留在req.body
app.use(bodyParser.urlencoded({extended:false}));

//启动服务器
app.get('/',(req,res)=>{
  res.render('index')//渲染视图index
  // res.end('aaaaa');
});

//渲染new页面
app.get('/new',(req,res)=>{
  res.render('new');
});

//数据提交
app.post('/new',(req, res)=>{
  console.log(req.body);
  if (!req.body.title || !req.body.content){
    res.status(400).send('请填写相关内容')
    return;
  }

  //保留用户留言
  entries.push({
    title: req.body.title,
    content: req.body.content,
    published: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  });

  console.log(entries);

  //回到主界面 重定向
  res.redirect('/')
});

//渲染404页面
app.use((req, res)=>{
  res.status(404).render('404')
});

app.listen(3000, ()=>{
  console.log('server start');
});