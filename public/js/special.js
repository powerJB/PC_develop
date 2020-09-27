const express = require('express')
const app = express()
const port = 3000
const mysql=require('mysql')
app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
  next() 
})

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'epet'
})

connection.connect()

app.get('/title', (req, res) => {
  connection.query('select * from demo_e limit '+req.query.page*12+',12;', function (err, result) {
      const obj={
          status: 200,
          data: result
      }
      res.json(obj)
  })
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))