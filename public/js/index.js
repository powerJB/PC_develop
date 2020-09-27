window.onload = function () {
  var port = document.getElementsByClassName("port")[0]
  var ports = document.getElementsByClassName("ports")[0]
  var port1 = document.getElementsByClassName("port1")[0]
  var port2 = document.getElementsByClassName("port2")[0]
  var port3 = document.getElementsByClassName("port3")[0]



  // 轮播
  var index = 0;

  function get() {
    timer = setInterval(function () {
      index++;
      if (index == $('.sper-pic').length) {
        index = 0;
      }
      $(".ricle li").eq(index).addClass("ricle_s").siblings().removeClass("ricle_s")
      $(".sper-pic").eq(index).addClass("sper_ate").siblings().removeClass("sper_ate")
      $(".wr .lb").eq(index).addClass("sper_ate").siblings().removeClass("sper_ate")
    }, 2000)
  }
  get()

  //点击
  $(".ricle li").mouseover(function (e) {
    clearInterval(timer)
    // console.log(e.target.dataset.i)
    var num = e.target.dataset.i
    $(".ricle li").eq(num).addClass("ricle_s").siblings().removeClass("ricle_s")
    $(".sper-pic").eq(num).addClass("sper_ate").siblings().removeClass("sper_ate")
    $(".wr .lb").eq(num).addClass("sper_ate").siblings().removeClass("sper_ate")
  })
  $(".ricle li").mouseout(function () {
    get()
  })

  

  //封装请求
  fetch("http://localhost:3000/index").then(response => {
    return response.json()
  }).then(res => {
    show = res.data
  }).catch(error => {
    console.log(error)
  })

  $(".dian").mouseover(function (e) {
    if (e.target.localName == "li") {
      var num = (e.target.dataset.i) * 1
      var num1 = num
      port.innerHTML = ""
      for (var i = 0; i < show.length; i++) {
        if (num1 == show[i].tab) {
          port.innerHTML += `
            <li class="fl fl-list">
              <a target="_blank" href="view/detail.html?id=${show[i].id}">
                <div class="shop">
                  <img src="${show[i].imgurl}">
                </div>
                  <h1>${show[i].subject}</h1>
                  <span>￥${show[i].price}</span>
              </a>
            </li>
            `
        }
      }
      $(".dian li").eq(num).addClass("byh").siblings().removeClass("byh")
      $(".by-right").eq(num).css("display", "block").siblings().css("display", "none")
    }
  })
  $(".dian1").mouseover(function (e) {
    if (e.target.localName == "li") {
      var num = (e.target.dataset.i) * 1
      var num1 = 3 + num
      ports.innerHTML = ""
      for (var i = 0; i < show.length; i++) {
        if (num1 == show[i].tab) {
          ports.innerHTML += `
          <li class="fl fl-list">
            <a target="_blank" href="view/detail.html?id"+${show[i].id}>
              <div class="shop">
                <img src="${show[i].imgurl}">
              </div>
                <h1>${show[i].subject}</h1>
                <span>￥${show[i].price}</span>
            </a>
          </li>
          `
        }
      }
      $(".dian1 li").eq(num).addClass("byh").siblings().removeClass("byh")
      $(".by-right2").eq(num).css("display", "block").siblings().css("display", "none")
    }
  })
  $(".dian2").mouseover(function (e) {
    if (e.target.localName == "li") {
      var num = (e.target.dataset.i) * 1
      var num1 = 6 + num
      port1.innerHTML = ""
      for (var i = 0; i < show.length; i++) {
        if (num1 == show[i].tab) {
          port1.innerHTML += `
          <li class="fl fl-list">
            <a target="_blank" href="view/detail.html?id"+${show[i].id}>
              <div class="shop">
                <img src="${show[i].imgurl}">
              </div>
                <h1>${show[i].subject}</h1>
                <span>￥${show[i].price}</span>
            </a>
          </li>
          `
        }
      }
      $(".dian2 li").eq(num).addClass("byh").siblings().removeClass("byh")
      $(".by-right3").eq(num).css("display", "block").siblings().css("display", "none")
    }
  })
  $(".dian3").mouseover(function (e) {
    if (e.target.localName == "li") {
      var num = (e.target.dataset.i) * 1
      console.log(num);
      var num1 = 9 + num
      port2.innerHTML = ""
      for (var i = 0; i < show.length; i++) {
        if (num1 == show[i].tab) {
          port2.innerHTML += `
          <li class="fl fl-list">
            <a target="_blank" href="view/detail.html?id"+${show[i].id}>
              <div class="shop">
                <img src="${show[i].imgurl}">
              </div>
                <h1>${show[i].subject}</h1>
                <span>￥${show[i].price}</span>
            </a>
          </li>
          `
        }
      }
      $(".dian3 li").eq(num).addClass("byh").siblings().removeClass("byh")
      $(".by-right4").eq(num).css("display", "block").siblings().css("display", "none")
    }
  })
  $(".dian4").mouseover(function (e) {
    if (e.target.localName == "li") {
      var num = (e.target.dataset.i) * 1
      console.log(num);
      var num1 = 12 + num
      port3.innerHTML = ""
      for (var i = 0; i < show.length; i++) {
        if (num1 == show[i].tab) {
          port3.innerHTML += `
          <li class="fl fl-list">
            <a target="_blank" href="view/detail.html?id"+${show[i].id}>
              <div class="shop">
                <img src="${show[i].imgurl}">
              </div>
                <h1>${show[i].subject}</h1>
                <span>￥${show[i].price}</span>
            </a>
          </li>
          `
        }
      }
      $(".dian4 li").eq(num).addClass("byh").siblings().removeClass("byh")
      $(".by-right5").eq(num).css("display", "block").siblings().css("display", "none")
    }
  })

  var list_foot = document.getElementsByClassName("list-foot")[0]
  var list_foot1 = document.getElementsByClassName("list-foot1")[0]
  var list_foot2 = document.getElementsByClassName("list-foot2")[0]
  var list_foot3 = document.getElementsByClassName("list-foot3")[0]
  var list_foot4 = document.getElementsByClassName("list-foot4")[0]
  fetch("http://localhost:3000/foot").then(response => {
    return response.json()
  }).then(res => {
    // console.log(res.data);
    for (var i = 0; i < 8; i++) {
      list_foot.innerHTML += `
      <li>
      <a href="${res.data[i].href}">
        <img src="${res.data[i].imgurl}"
          alt="">
      </a>
    </li>
      `
    }
    for (var i = 8; i < 16; i++) {
      list_foot1.innerHTML += `
      <li>
      <a href="${res.data[i].href}">
        <img src="${res.data[i].imgurl}"
          alt="">
      </a>
    </li>
      `
    }
    for (var i = 16; i < 24; i++) {
      list_foot2.innerHTML += `
      <li>
      <a href="${res.data[i].href}">
        <img src="${res.data[i].imgurl}"
          alt="">
      </a>
    </li>
      `
    }
    for (var i = 24; i < 32; i++) {
      list_foot3.innerHTML += `
      <li>
      <a href="${res.data[i].href}">
        <img src="${res.data[i].imgurl}"
          alt="">
      </a>
    </li>
      `
    }
    for (var i = 32; i < 40; i++) {
      list_foot4.innerHTML += `
      <li>
      <a href="${res.data[i].href}">
        <img src="${res.data[i].imgurl}"
          alt="">
      </a>
    </li>
      `
    }
  }).catch(error => {
    console.log(error)
  })

  //标签
  var c_content = document.getElementsByClassName("c-content")[0]
  var c_content1 = document.getElementsByClassName("c-content1")[0]
  var c_content2 = document.getElementsByClassName("c-content2")[0]
  var c_content3 = document.getElementsByClassName("c-content3")[0]
  var c_content4 = document.getElementsByClassName("c-content4")[0]
  fetch("http://localhost:3000/label").then(response => {
    return response.json()
  }).then(res => {
    console.log(res.data);
    for (var i = 0; i < 9; i++) {
      c_content.innerHTML += `
      <li><a href="" target="_blank">${res.data[i].title}</a></li>
      `
    }
    for (var i = 9; i < 18; i++) {
      c_content1.innerHTML += `
      <li><a href="" target="_blank">${res.data[i].title}</a></li>
      `
    }
    for (var i = 18; i < 27; i++) {
      c_content2.innerHTML += `
      <li><a href="" target="_blank">${res.data[i].title}</a></li>
      `
    }
    for (var i = 27; i < 36; i++) {
      c_content3.innerHTML += `
      <li><a href="" target="_blank">${res.data[i].title}</a></li>
      `
    }
    for (var i = 36; i < 45; i++) {
      c_content4.innerHTML += `
      <li><a href="" target="_blank">${res.data[i].title}</a></li>
      `
    }
  }).catch(error => {
    console.log(error)
  })










  // 注册
  const registerbtn = document.getElementById('registerbtn');
  const regtel = document.getElementById('regtel');
  const regpsw = document.getElementById('regpsw');

  const arr = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

  regpsw.oninput = function () {
    let tel = regtel.value;
    let psw = regpsw.value;

    if (tel !== '' && psw.length > 5) {
      registerbtn.style.background = '#f03e3e';
      registerbtn.onclick = register
    } else {
      registerbtn.style.background = '#999'
      registerbtn.onclick = null
    }
  }

  function register() {
    let tel = regtel.value;
    let psw = regpsw.value;
    // console.log(tel, psw)

    if (tel == '') {
      alert('请输入手机号！')
      return
    } else if (!tel.match(/^1(3|4|5|6|7|8|9)\d{9}$/)) {
      alert('手机号格式错误！')
      return
    } else if (psw == '') {
      alert('请输入密码！')
      return
    } else if (!psw.match(/^[a-zA-Z][a-zA-Z0-9]{5,11}$/)) {
      alert('字母开头，6-12位数字和字母组合')
      return
    } else {
      fetch('http://localhost:3000/judge?tel=' + tel)
        .then(response => {
          return response.json()
        })
        .then(res => {
          let result = res.data;
          // console.log(result)

          if (result.length > 0) {
            alert('用户已注册！')
          } else {

            let str = '主人_';
            for (let i = 0; i < 10; i++) {
              str += arr[parseInt(Math.random() * 62)] + '';
            }
            console.log(str)

            fetch('http://localhost:3000/register?tel=' + tel + '&psw=' + psw + '&name=' + str)
              .then(response => {
                return response.json()
              })
              .then(res => {
                if (res.message == "注册成功！") {
                  let info = {
                    tel: tel,
                    name: str
                  }
                  localStorage.userinfo = JSON.stringify(info)
                  window.location.reload()
                }
              })
              .catch(err => {
                console.log(err)
              })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }

  }


  // 登录
  const loginbtn = document.getElementById('loginbtn');
  const logtel = document.getElementById('logtel');
  const logpsw = document.getElementById('logpsw');

  logpsw.oninput = function () {
    let tel = logtel.value;
    let psw = logpsw.value;

    if (tel !== '' && psw.length > 5) {
      loginbtn.style.background = '#f03e3e';
      loginbtn.onclick = login;
    } else {
      loginbtn.style.background = '#999'
      loginbtn.onclick = null
    }
  }

  // loginbtn.onclick = login;
  function login() {
    let tel = logtel.value;
    let psw = logpsw.value;
    // console.log(tel,psw)

    if (tel == '') {
      alert('请输入手机号！')
      return
    } else if (!tel.match(/^1(3|4|5|6|7|8|9)\d{9}$/)) {
      alert('手机号格式错误！')
      return
    } else if (psw == '') {
      alert('请输入密码！')
      return
    } else if (!psw.match(/^[a-zA-Z][a-zA-Z0-9]{5,11}$/)) {
      alert('字母开头，6-12位数字和字母组合')
      return
    } else {
      fetch('http://localhost:3000/judge?tel=' + tel)
        .then(response => {
          return response.json();
        })
        .then(res => {
          let result = res.data
          // console.log(result)
          if (result.length == 0) {
            alert('用户不存在！')
          } else {
            if (result[0].password !== psw) {
              alert('密码错误！')
            } else {
              let info = {
                tel: result[0].tel,
                name: result[0].username
              }
              localStorage.userinfo = JSON.stringify(info)
              window.location.reload()
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    }

  }
}
