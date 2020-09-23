const express = require('express');
const mysql = require('mysql')
const app = express();
const port = 8080;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'epet'
})
connection.connect()

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});


app.get('/judge', (req, res) => {
  connection.query('select * from userinfo where tel='+ req.query.tel+';', function (err, result) {
    const obj = {
      status: 200,
      message: '查询成功！',
      data: result,
    }
    res.json(obj);
  })
})
app.get('/register', (req, res) => {
  console.log(req.query.tel,req.query.psw,req.query.name)
  connection.query('insert into userinfo (tel,password,username) values ("'+req.query.tel+'","'+ req.query.psw +'","'+ req.query.name +'");', function (err, result) {
    if (err) console.log(err);
    const obj = {
      status: 200,
      message: '注册成功！',
    }
    res.json(obj);
  })
})

// 搜索框
app.get('/search', (req, res) => {
  connection.query('select * from two_page where subject like "%'+req.query.keyword+'%" limit 10;', function (err, result) {
    const obj = {
      status: 200,
      message: '查询成功！',
      data: result,
    }
    res.json(obj);
  })
})

// 购物车
app.get('/cart', (req, res) => {
  connection.query(`select two_page.imgurl,two_page.subject,two_page.youhui_price,two_page.formats,cart.id,cart.gnum from two_page,cart where two_page.id=cart.gid and cart.utel=${req.query.user_tel};`, function (err, result) {
    const obj = {
      status: 200,
      message: '查询成功！',
      data: result,
    }
    res.json(obj);
  })
})

// 删除购物车列表
app.get('/delcart', (req, res) => {
  connection.query(`delete from cart where id=${req.query.id};`, function (err, result) {
    const obj = {
      status: 200,
      message: '删除成功！',
    }
    res.json(obj);
  })
})

// 清空购物车
app.get('/clecart', (req, res) => {
  connection.query(`delete from cart where utel=${req.query.tel};`, function (err, result) {
    const obj = {
      status: 200,
      message: '删除成功！',
    }
    res.json(obj);
  })
})



app.listen(port, () => console.log(`HTTP server start on ${port}`));




