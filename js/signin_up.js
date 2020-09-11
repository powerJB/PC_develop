window.onload = function() {

  // 注册
  const registerbtn = document.getElementById('registerbtn');
  const regtel = document.getElementById('regtel');
  const regpsw = document.getElementById('regpsw');

  const arr = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m','0','1','2','3','4','5','6','7','8','9']

  regpsw.oninput = function() {
    let tel = regtel.value;
    let psw = regpsw.value;

    if(tel !== '' && psw.length > 5) {
      registerbtn.style.background = '#f03e3e';
      registerbtn.onclick = register
    }else {
      registerbtn.style.background = '#999'
      registerbtn.onclick = null
    }
  }

  function register () {
    let tel = regtel.value;
    let psw = regpsw.value;
    // console.log(tel, psw)

    // let str = '主人_';
    // for(let i = 0; i < 10; i++) {
    //   str += arr[parseInt(Math.random()*62)]+'';
    // }
    // let info = {
    //   tel: tel,
    //   name: str
    // }
    // sessionStorage.userinfo = JSON.stringify(info)
    // console.log(JSON.parse(a).tel)

    if(tel == '') {
      alert('请输入手机号！')
      return
    }else if(!tel.match(/^1(3|4|5|6|7|8|9)\d{9}$/) ) {
      alert('手机号格式错误！')
      return
    }else if(psw == '') {
      alert('请输入密码！')
      return
    }else if(!psw.match(/^[a-zA-Z][a-zA-Z0-9]{5,11}$/)) {
      alert('字母开头，6-12位数字和字母组合')
      return
    }else {
      fetch('http://localhost:8080/judge?tel=' + tel)
      .then(response => {
        return response.json()
      })
      .then(res => {
        let result = res.data;
        // console.log(result)
  
        if(result.length > 0) {
          alert('用户已注册！')
        }else {

          let str = '主人_';
          for(let i = 0; i < 10; i++) {
            str += arr[parseInt(Math.random()*62)]+'';
          }
          // console.log(str)

          fetch('http://localhost:8080/register?tel=' + tel + '&psw=' + psw + '&name=' + str)
          .then(response => {
            return response.json()
          })
          .then(res => {
            if(res.message == "注册成功！") {
              let info = {
                tel: tel,
                name: name
              }
              sessionStorage.userinfo = JSON.stringify(info)
              window.location.href = 'head.html'
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

  logpsw.oninput = function() {
    let tel = logtel.value;
    let psw = logpsw.value;

    if(tel !== '' && psw.length > 5) {
      loginbtn.style.background = '#f03e3e';
      loginbtn.onclick = login;
    }else {
      loginbtn.style.background = '#999'
      loginbtn.onclick = null
    }
  }

  // loginbtn.onclick = login;
  function login() {
    let tel = logtel.value;
    let psw = logpsw.value;
    // console.log(tel,psw)

    if(tel == '') {
      alert('请输入手机号！')
      return
    }else if(!tel.match(/^1(3|4|5|6|7|8|9)\d{9}$/) ) {
      alert('手机号格式错误！')
      return
    }else if(psw == '') {
      alert('请输入密码！')
      return
    }else if(!psw.match(/^[a-zA-Z][a-zA-Z0-9]{5,11}$/)) {
      alert('字母开头，6-12位数字和字母组合')
      return
    }else {
      fetch('http://localhost:8080/judge?tel=' + tel)
      .then(response => {
        return response.json();
      })
      .then(res => {
        let result = res.data
        // console.log(result)
        if(result.length == 0) {
          alert('用户不存在！')
        }else {
          if(result[0].password !== psw) {
            alert('密码错误！')
          }else {
            let info = {
              tel: result[0].tel,
              name: result[0].username
            }
            sessionStorage.userinfo = JSON.stringify(info)
            window.location.href = 'head.html'
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
    }

  }
}