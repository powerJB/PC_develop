const express = require('express');
const mysql = require('mysql')
const app = express();
const port = 3000;

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
  // console.log(req.query.tel,req.query.psw,req.query.name)
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


app.get('/index', (req, res) => {
  connection.query('select * from two_page;', function (err, result) {
      const obj={
          status: 200,
          data: result
      }
      res.json(obj)
  })
});
app.get('/detail', (req, res) => {
  connection.query('select * from two_page where id='+req.query.id, function (err, result) {
      const obj={
          status: 200,
          data: result
      }
      res.json(obj)
  })
});
app.get('/foot', (req, res) => {
  connection.query('select * from foot_img;', function (err, result) {
      const obj={
          status: 200,
          data: result
      }
      res.json(obj)
  })
});
app.get('/label', (req, res) => {
  connection.query('select * from label;', function (err, result) {
      const obj={
          status: 200,
          data: result
      }
      res.json(obj)
  })
});

// 潮品视频
app.get('/popular',(req,res)=>{
  connection.query('select * from popular', function (err, result) {
      const obj={
          status: 200,
          data: result
      }
      res.json(obj)
  })
})
// 小剧场
app.get('/theatre',(req,res)=>{
  connection.query('select * from theatre', function (err, result) {
      const obj={
          status: 200,
          data: result
      }
      res.json(obj)
  })
})

// 清仓
app.get('/title', (req, res) => {
  connection.query('select * from demo_e limit '+req.query.page*12+',12;', function (err, result) {
      const obj={
          status: 200,
          data: result
      }
      res.json(obj)
  })
})


// 特卖
app.get('/index_one',(req,res)=>{
  connection.query('select * from b_img order by id asc',function(err,result){
      const obj={
          status:200,
          data:result
      }
      res.json(obj)
  })
})
app.get('/id',(req,res)=>{
  // console.log(req.query.id)
  connection.query('select * from b_img where id='+req.query.id,function(err,result){
      const obj={
          status:200,
          data:result
      }
      res.json(obj)
  })
})
app.get('/type_one',(req,res)=>{
  // console.log(req.query.id)
  connection.query('select * from two_page1 where tab='+req.query.id,function(err,result){
      const obj={
          status:200,
          data:result
      }
      res.json(obj)
  })
})


// 产品详情
app.get('/detail', (req, res) => {
  if (req.query.id) {
      connection.query('select * from two_page where id=' + req.query.id, function (err, result) {
          const obj = {
              status: 200,
              data: result
          }
          res.json(obj)
      })
  } else if (req.query.title) {
      connection.query("select * from two_page where subject='" + req.query.title + "'", function (err, result) {
          const obj = {
              status: 200,
              data: result
          }
          res.json(obj)
      })
  }

})
// 产品热卖排行
app.get('/hot', (req, res) => {
  connection.query(`select * from two_page where sort_id=${req.query.sortid} and type_id=${req.query.typeid} order by sale desc;`, function (err, result) {
      const obj = {
          status: 200,
          data: result
      }
      res.json(obj)
  })
})
// 产品类别
app.get('/type', (req, res) => {
  connection.query('select * from type;', function (err, result) {
      const obj = {
          status: 200,
          data: result
      }
      res.json(obj)
  })
})
// 产品种类
// app.get('/sort', (req, res) => {
//   connection.query('select * from sort where type_id=' + req.query.type_id, function (err, result) {
//       const obj = {
//           status: 200,
//           data: result
//       }
//       res.json(obj)
//   })
// })
// 产品评价
app.get('/evalutes', (req, res) => {
  if (req.query.img == 1) {
      connection.query('select * from evalutes where reply_imgs=1 and goods_id=' + req.query.id, function (err, result) {
          const obj = {
              status: 200,
              data: result
          }
          res.json(obj)
      })
  } else {
      connection.query('select * from evalutes where goods_id=' + req.query.id, function (err, result) {
          const obj = {
              status: 200,
              data: result
          }
          res.json(obj)
      })
  }
})
// 产品评价图片
app.get('/evaimgs', (req, res) => {
  connection.query('select * from evalutes_imgs where evalutes_id=' + req.query.id, function (err, result) {
      const obj = {
          status: 200,
          data: result
      }
      res.json(obj)
  })
})
// 产品咨询
app.get('/consults', (req, res) => {
  if (req.query.type == 'all') {
      connection.query('select * from consults where goods_id=' + req.query.id, function (err, result) {
          const obj = {
              status: 200,
              data: result
          }
          res.json(obj)
      })
  } else {
      connection.query("select * from consults where goods_id=" + req.query.id + " and type='" + req.query.type + "'", function (err, result) {
          const obj = {
              status: 200,
              data: result
          }
          res.json(obj)
      })
  }
})

// 添加购物车
app.get('/addcart', (req, res) => {
  connection.query(`insert into cart(gid,gnum,utel) values (${req.query.gid},${req.query.gnum},'${req.query.tel}');`, function (err, result) {
      const obj = {
          status: 200,
          message: '添加成功！',
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

app.get('/tab', (req, res) => {  //请求一级列表
  connection.query("select * from type", function (err, result) {
    const obj = {
      status: 200,
      data: result,
      text: '请求成功'
    }
    res.json(obj)
  })
})
app.get('/tab_sort', (req, res) => {  //请求二级列表
  connection.query("select * from type_sort where type_id=" + req.query.type_id, function (err, result) {
    const obj = {
      status: 200,
      data: result,
      text: '请求成功'
    }
    res.json(obj)
  })
})

app.get('/sort', (req, res) => {  // type_id 请求分类品牌 关键字等
  connection.query("select * from sort where type_id=" + req.query.type_id, function (err, result) {
    const obj = {
      status: 200,
      data: result,
      text: '请求成功'
    }
    res.json(obj)
  })
})

app.get('/sortsm', (req, res) => {  // type_sort_id 请求分类品牌 关键字等
  connection.query("select * from sort where type_sort_id=" + req.query.type_sort_id, function (err, result) {
    const obj = {
      status: 200,
      data: result,
      text: '请求成功'
    }
    res.json(obj)
  })
})



app.get('/del', (req, res) => {  // type_id 请求商品
  connection.query("select * from goods where type_id=" + req.query.type_id, function (err, result) {
    var data = []
    for (var i = 0; i < result.length; i++) {
      var c = result.filter(val => {
        return val.abc == i
      })
      if (c.length > 0) {
        // console.log(c)
        data.push(c)
      }
    }
    var page = req.query.page
    var num =data.length
    data=data.slice((page - 1) * 8, page * 8)
    result = data

    const obj = {
      status: 200,
      data: result,
      num: num,
      text: '请求成功'
    }
    res.json(obj)
  })
})


app.get('/sortdel', (req, res) => {  // type_sort_id 请求商品
  connection.query("select * from goods where type_sort_id=" + req.query.type_sort_id, function (err, result) {

    var data = []
    for (var i = 0; i < result.length; i++) {
      var c = result.filter(val => {
        return val.abc == i
      })
      if (c.length > 0) {
        // console.log(c)
        data.push(c)
      }
    }
    var page = req.query.page
    var num =data.length
    data=data.slice((page - 1) * 8, page * 8)
    result = data

    const obj = {
      status: 200,
      data: result,
      num:num,
      text: '请求成功'
    }
    res.json(obj)
  })
})


app.get('/lab', (req, res) => {  // 关键字查询
  connection.query("select * from goods where title like '%" + req.query.lab + "%'", function (err, result) {

    var data = []
    for (var i = 0; i < result.length; i++) {
      var c = result.filter(val => {
        return val.abc == i
      })
      if (c.length > 0) {
        data.push(c)
      }
    }
    result = data
    var page = req.query.page
    var num =data.length
    data=data.slice((page - 1) * 8, page * 8)
    const obj = {
      status: 200,
      data: result,
      num,num,
      text: '请求成功'
    }
    res.json(obj)
  })
})

app.listen(port, () => console.log(`HTTP server start on ${port}`));




