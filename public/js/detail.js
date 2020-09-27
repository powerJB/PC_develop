window.onload = function () {
    var para = window.location.href.split('?')[1].split('=')
    var evaluteslist = document.getElementById('evalutes-list');
    var consults_con = document.getElementById('consults');
    var imglist = document.getElementById('img-list');
    // 刚进入页面时需要渲染的数据
    function getData(p, i) {
        fetch('http://localhost:3000/detail?' + p + '=' + i).then(res => {
            return res.json()
        }).then(res1 => {
            // 渲染商品图片
            var gimgs = res1.data[0].goods_imgs.split(' ')
            for (var i = 0; i < gimgs.length; i++) {
                imglist.innerHTML += `<li><a href=""><img src="${gimgs[i]}" alt=""></a></li>`
            }
            $('#smallImg').attr('src', gimgs[0])
            // 鼠标悬停时切换图片
            $('#img-list li a').mouseover(function () {
                $(this).parents('li').css('borderColor', '#4c9605');
                $(this).parents('li').siblings().css('borderColor', '');
                $('#smallImg').attr('src', $(this).find('img').attr('src'));
            })
            // 各种文字
            $('#title').html(res1.data[0].subject);
            $('#feature').html(res1.data[0].presubject);
            $('#activity').html('此商品参与“' + res1.data[0].activity + '”活动')
            $('#newprice').html(res1.data[0].price.toFixed(2))
            $('#oldprice').html('￥' + res1.data[0].youhui_price.toFixed(2))
            $('#petc').html(parseInt(res1.data[0].youhui_price / 10));
            $('#sales').html(res1.data[0].sale)
            $('#evalute').html(res1.data[0].pingjia)
            $('#consult').html(res1.data[0].zixun)
            $('#tab-evalutes').html('评价' + res1.data[0].pingjia)
            $('#tab-consults').html('咨询' + res1.data[0].zixun)
            $('#unit').html(res1.data[0].unit);
            // 编号
            $('#goods-num').html('编号：' + res1.data[0].number)
            // 公告
            if (res1.data[0].notice) {
                $('#goods_notice').html(res1.data[0].notice)
            } else {
                $('#notice').css('display', 'none')
            }
            // 正品保证
            $('#quality').attr('src', res1.data[0].quality_img)
            // 详情
            $('#logo').attr('src', res1.data[0].detail_logo);
            $('#name').html(res1.data[0].detail_name);
            $('.img-detail').html(res1.data[0].detail_imgs);
            // 产品类别
            var typeid = res1.data[0].type_id;
            var sortid = res1.data[0].sort_id;
            getType(typeid, sortid);
            $('.onav .onav-type').mouseover(function () {
                $(this).find('.cont-sort').css('display', 'block')
            })
            $('.onav .onav-type').mouseout(function () {
                $(this).find('.cont-sort').css('display', 'none')
            })
            // 渲染该类别的热卖产品
            fetch(`http://localhost:3000/hot?sortid=${sortid}&typeid=${typeid}`).then(res => {
                return res.json()
            }).then(res1 => {
                var hstr = ''
                for (var i = 0; i < 6; i++) {
                    var harr = res1.data[i].goods_imgs.split(' ')
                    hstr += `
                    <li>
                    <div class="item-left">
                    <a href="">
                        <img src="${harr[0]}" alt="">
                    </a>
                    </div>
                    <div class="item-right">
                    <a href="">${res1.data[i].subject}</a>
                    <div class="price">￥${res1.data[i].youhui_price}</div>
                    </div>
                </li>
                    `
                    $('#hot-rank').html(hstr)
                }
            }).catch(err => {
                console.log(err)
            })
            // 产品规格
            var arr = res1.data[0].subject.split(' ')
            function getSpec(el, array) {
                el.css('display', 'block')
                el.append(`
                    <span class="txt">${array[0]}</span>
                `)
                var str = ''
                for (var i = 1; i < array.length; i++) {
                    if (arr[arr.length - 1].indexOf(array[i]) !== -1) {
                        str += `<a class="kg on">
                            <span class="con">${array[i]}</span>
                            <span class="span"></span>
                        </a>`
                    } else {
                        str += `<a class="kg">
                            <span class="con">${array[i]}</span>
                            <span class="span"></span>
                        </a>`
                    }
                }
                el.append(str)
            }
            // 型号
            if (res1.data[0].size) {
                var arr1 = res1.data[0].size.split(' ');
                getSpec($('#good-size'), arr1)
                // $('#good-size a').click(function() {
                //     $(this).addClass('on').siblings().removeClass('on')
                //     var arr2=arr[arr.length-1].split($('#good-style a.on .con').html())
                //     arr2[1]=$(this).find('.con').html()+'号'
                //     arr[arr.length-1]=arr2.join($('#good-style a.on .con').html())
                //     var title1=arr.join(' ')
                //     window.location.href="detail.html?title="+title1
                // })
            }
            // 款式
            if (res1.data[0].style) {
                var arr1 = res1.data[0].style.split(' ');
                getSpec($('#good-style'), arr1)
                // if ($('#good-size a').length>0) {
                //     $('#good-style a').click(function() {
                //         $(this).addClass('on').siblings().removeClass('on')
                //         var arr2=arr[arr.length-1].split($('#good-size a.on .con').html())
                //         arr2[0]=$(this).find('.con').html()
                //         arr[arr.length-1]=arr2.join($('#good-size a.on .con').html())
                //         var title1=arr.join(' ')
                //         window.location.href="detail.html?title="+title1
                //     })
                // }else {
                //     console.log(0)
            }

            // 商品评价
            getEvalutes(res1.data[0].id, 0)
            var evalutessort = document.getElementById('evalutes-sort');
            evalutessort.onclick = function (e) {
                var evalutesindex = e.target.dataset.i;
                evaluteslist.innerHTML = '';
                getEvalutes(res1.data[0].id, evalutesindex)
                for (var i = 0; i < evalutessort.children.length; i++) {
                    evalutessort.children[i].classList.remove('on')
                }
                e.target.classList.add('on');
            }

            // 全部咨询
            getConsults(res1.data[0].id, 'all')
            var arr1 = ['all', 'good', 'logistics', 'activity', 'sale', 'feed'];
            var consults_nav = document.getElementById('consult-nav');
            consults_nav.onclick = function (e) {
                var type = arr1[e.target.dataset.i];
                consults_con.innerHTML = '';
                getConsults(res1.data[0].id, type)
            }


            // 活动倒计时
            var time = new Date(res1.data[0].date);
            var timems = time.getTime();
            var timer = setInterval(function () {
                var current = new Date();
                var currentTime = current.getTime();
                var time = timems - currentTime;
                var d = parseInt(time / 1000 / 3600 / 24);
                var h = parseInt(time / 1000 / 3600) - d * 24;
                var m = parseInt((time - parseInt(time / 1000 / 3600) * 3600 * 1000) / 1000 / 60);
                var s = parseInt((time - parseInt(time / 1000 / 3600) * 3600 * 1000 - m * 1000 * 60) / 1000);
                if (h < 10) {
                    h = "0" + h
                }
                if (m < 10) {
                    m = "0" + m
                }
                if (s < 10) {
                    s = "0" + s
                }
                document.getElementById('day').innerHTML = "距结束仅剩" + d + "天";
                document.getElementById('hours').innerHTML = h;
                document.getElementById('minutes').innerHTML = m;
                document.getElementById('seconds').innerHTML = s;
                if (h == 0 && m == 0 && s == 0) {
                    clearInterval(timer)
                }
            }, 1000);
        }).catch(err => {
            console.log(err)
        })
    }
    getData(para[0], para[1])


    // type类型数据
    var typelist = document.querySelector('.onav-cont .typelist');
    var goodslist = document.querySelector('.onav-cont .goodslist');
    var typetxt = document.getElementById('typetxt');
    var sorttxt = document.getElementById('sorttxt');
    function getType(typeid, sortid) {
        fetch('http://localhost:3000/type').then(res => {
            return res.json()
        }).then(res1 => {
            for (var i = 0; i < res1.data.length; i++) {
                typelist.innerHTML += `
                <li><a href="" data-i="${res1.data[i].id}">${res1.data[i].type_name}</a></li>
                `
                if (typeid == res1.data[i].id) {
                    typetxt.innerHTML = res1.data[i].type_name
                }
            }
        }).catch(err => {
            console.log(err)
        })
        fetch('http://localhost:3000/tab_sort?type_id=' + typeid).then(res => {
            return res.json()
        }).then(res1 => {
            console.log(res1.data)
            for (var i = 0; i < res1.data.length; i++) {
                goodslist.innerHTML += `<li><a href="" data-i="${res1.data[i].id}">${res1.data[i].type_sort_name}</a></li>`
                if (sortid == res1.data[i].id) {
                    sorttxt.innerHTML = res1.data[i].type_sort_name
                }
            }
        }).catch(err => {
            console.log(err)
        })
    }

    // 商品评价
    function getEvalutes(id, img) {
        fetch('http://localhost:3000/evalutes?id=' + id + '&&img=' + img).then(res => {
            return res.json()
        }).then(res1 => {
            // var haveimg = 0;
            // $('#evalute').html('(' + res1.data.length + ')')
            // $('#tab-evalutes').html('评价(' + res1.data.length + ')')
            // $('#evalutes-sort1').html('全部评价(' + res1.data.length + ')')
            for (var i = 0; i < res1.data.length; i++) {
                // 有图评价数量
                // res1.data[i].reply_imgs ? haveimg++ : haveimg
                // $('#evalutes-sort2').html('有图评价(' + haveimg + ')')
                var arr = res1.data[i].date.split('T');
                var str = arr[0] + ' ' + arr[1].split('.')[0];
                evaluteslist.innerHTML += `
                <li class="item clearfix">
                <div class="userlf fl">
                <a href="">
                    <img id="evaluate-hphoto" src="${res1.data[i].hpicture}" alt="">
                </a>
                <div class="cover">
                    <div class="cover-t clearfix">
                    <a href="" class="himg fl"><img src="${res1.data[i].hpicture}" alt=""></a>
                    <div class="desc fl">
                        ${res1.data[i].pet_name}
                        </br>
                        <span class="red">小伙伴：</span>
                        0
                        <span class="line">|</span>
                        <span class="red">亲戚：</span>
                        0
                        <span class="line">|</span>
                        <span class="red">照片：</span>
                        0
                    </div>
                    <img class="badge fr" src="https://static.epetbar.com/skin/medal/lv2.gif" alt="">
                    </div>
                    <div class="cover-m">
                    <span class="fl">${res1.data[i].pet_name}最近买过</span>
                    </div>
                    <ul class="cover-list">
                    <li class="fl">
                        <a href="" class="img">
                        <img src="https://img2.epetbar.com/common/upload/commonfile/2020/03/25/0105045_289282.jpg@!100w-c" alt="">
                        </a>
                        <span class="price">￥569.00</span>
                    </li>
                    <li class="fl">
                        <a href="" class="img">
                        <img src="https://img2.epetbar.com/common/upload/commonfile/2020/03/25/0105045_289282.jpg@!100w-c" alt="">
                        </a>
                        <span class="price">￥569.00</span>
                    </li>
                    </ul>
                </div>
                </div>
                <div class="userrg fl">
                <div class="title clearfix">
                    <a href="" class="user-name">${res1.data[i].name}</a>
                    &nbsp;&nbsp;${res1.data[i].title}
                    <span class="star fr"></span>
                </div>
                <div class="desc">${res1.data[i].content ? res1.data[i].content : '系统默认好评'}</div>
                <ul class="list"></ul>
                <div class="cs-reply">${res1.data[i].reply ? res1.data[i].reply : ''}</div>
                <div class="time">
                    <a href="">
                    <img src="https://static.epetbar.com/www/images/epet/pj-ico_03.jpg" alt="">
                    &nbsp;回复：
                    <span class="num">0</span>
                    </a>
                    <a href="">
                    <img src="https://static.epetbar.com/www/images/epet/zan-ico_03.jpg" alt="">
                    &nbsp;赞：
                    </a>
                    <span class="reply_time fr">${str}</span>
                </div>
                </div>
            </li>
                `
                // 评价图片列表
                fetch('http://localhost:3000/evaimgs?id=' + res1.data[i].id).then(res => {
                    return res.json()
                }).then(res1 => {
                    var limgs = $('.reply .reply-list .item .userrg .list');
                    var str1 = '';
                    for (var i = 0; i < res1.data.length; i++) {
                        str1 += `
                        <li>
                        <img src="${res1.data[i].img}">
                        </li>
                        `
                        limgs[i].innerHTML = str1
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
            // 鼠标移入和移出时的样式改变
            $('.reply .reply-list .item .userlf > a').mouseover((e) => {
                var evacover = e.currentTarget.parentElement.children[1];
                evacover.style.display = "block";
                evacover.onmouseover = function () {
                    evacover.style.display = "block";
                }
                evacover.onmouseout = function () {
                    evacover.style.display = "none";
                }
            })
            $('.reply .reply-list .item .userlf > a').mouseout((e) => {
                e.currentTarget.parentElement.children[1].style.display = "none"
            })
        }).catch(err => {
            console.log(err)
        })
    }

    // 商品咨询
    function getConsults(id, type) {
        fetch('http://localhost:3000/consults?id=' + id + '&&type=' + type).then(res => {
            return res.json()
        }).then(res1 => {
            // var gnum = 0;
            // var lnum = 0;
            // var anum = 0;
            // var snum = 0;
            // var fnum = 0;
            // $('#consult').html('(' + res1.data.length + ')')
            // $('#tab-consults').html('咨询(' + res1.data.length + ')')
            // $('#all-consults').html('咨询(' + res1.data.length + ')')
            for (var i = 0; i < res1.data.length; i++) {
                // var txt = res1.data[i].type;
                // txt == 'good' ? gnum++ : txt == 'logistics' ? lnum++ : txt == 'activity' ? anum++ : txt == 'sale' ? snum++ : fnum++;
                // $('#g-consults').html('商品咨询(' + gnum + ')')
                // $('#l-consults').html('物流咨询(' + lnum + ')')
                // $('#a-consults').html('活动咨询(' + anum + ')')
                // $('#s-consults').html('售后咨询(' + snum + ')')
                // $('#f-consults').html('宠物喂养(' + fnum + ')')
                var arr = res1.data[i].date.split('T');
                var str = arr[0] + ' ' + arr[1].split('.')[0];
                consults_con.innerHTML += `
                <li class="item clearfix">
                <div class="hphoto fl">
                <a href="" class="head">
                    <img src="${res1.data[i].hpicture}" alt="">
                </a>
                <span class="name">${res1.data[i].name}</span>
                <div class="cover">
                    <div class="cover-t clearfix">
                    <a href="" class="himg fl"><img src="${res1.data[i].hpicture}" alt=""></a>
                    <div class="desc fl">
                    ${res1.data[i].name}
                        <span class="red">${res1.data[i].variety ? '(' + res1.data[i].variety + ')' : ''}</span>
                        </br>
                        <span class="red">小伙伴：</span>
                        0
                        <span class="line">|</span>
                        <span class="red">亲戚：</span>
                        0
                        <span class="line">|</span>
                        <span class="red">照片：</span>
                        0
                    </div>
                    <img class="badge fr" src="https://static.epetbar.com/skin/medal/lv2.gif" alt="">
                    </div>
                    <div class="cover-m">
                    <span class="fl">${res1.data[i].name}最近买过</span>
                    </div>
                    <ul class="cover-list">
                    <li class="fl">
                        <a href="" class="img">
                        <img src="https://img2.epetbar.com/common/upload/commonfile/2020/03/25/0105045_289282.jpg@!100w-c" alt="">
                        </a>
                        <span class="price">￥569.00</span>
                    </li>
                    <li class="fl">
                        <a href="" class="img">
                        <img src="https://img2.epetbar.com/common/upload/commonfile/2020/03/25/0105045_289282.jpg@!100w-c" alt="">
                        </a>
                        <span class="price">￥569.00</span>
                    </li>
                    </ul>
                </div>
                </div>
                <div class="hdesc fr">
                <p class="rephead">
                    <span class="line"></span>
                    <span class="time">发表于：${str}</span>
                </p>
                <div class="cont">
                    <p class="que">${res1.data[i].content}</p>
                    <div class="reply clearfix">
                    <div class="photo fl">
                        <img src="https://static.epetbar.com/www/kf_photo.png" alt="">
                    </div>
                    <div class="huifu fl">${res1.data[i].reply}</div>
                    </div>
                </div>
                </div> 
            </li>
            `
            }
            // 鼠标移入和移出时的样式改变
            $('.consult-con .list .item .hphoto .head').mouseover((e) => {
                var concover = e.currentTarget.parentElement.children[2]
                concover.style.display = "block";
                concover.onmouseover = function () {
                    concover.style.display = "block";
                }
                concover.onmouseout = function () {
                    concover.style.display = "none";
                }
            })
            $('.consult-con .list .item .hphoto .head').mouseout((e) => {
                e.currentTarget.parentElement.children[2].style.display = "none"
            })
        }).catch(err => {
            console.log(err)
        })
    }

    // 点击上一页 下一页图片列表往左移动一段距离
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');

    // 点击上一张或者下一张
    var index = 0;
    next.onclick = function () {
        index++;
        if (index > imglist.children.length - 4) {
            index = imglist.children.length - 4
        }
        imglist.style.left = -index * 84 + 'px';
    }
    prev.onclick = function () {
        index--;
        if (index < 0) {
            index = 0
        }
        imglist.style.left = -index * 84 + 'px';
    }
    // 放大镜
    var glass = document.getElementById('glass');
    var smallImg = document.getElementById('Img');
    var bigImg = document.getElementById('Bimg');
    var cover = document.getElementById('cover');
    var img = document.getElementById('BigImg');
    smallImg.onmouseover = function () {
        cover.style.display = 'block';
        $('#BigImg').attr('src', $('#smallImg').attr('src'))
        bigImg.style.display = 'block';
    }
    smallImg.onmouseout = function () {
        cover.style.display = 'none';
        bigImg.style.display = 'none';
    }
    smallImg.onmousemove = function (e) {
        var left = e.clientX - glass.offsetLeft - smallImg.offsetLeft - cover.offsetWidth / 2;
        var top = e.clientY - glass.offsetTop - smallImg.offsetTop - cover.offsetHeight / 2;
        var lgap = smallImg.offsetWidth - cover.offsetWidth;
        var tgap = smallImg.offsetHeight - cover.offsetHeight;
        if (left < 0) {
            left = 0;
        } else if (left > lgap) {
            left = lgap;
        }
        if (top < 0) {
            top = 0;
        } else if (top > tgap) {
            top = tgap;
        }
        var lrad = left / lgap;
        var trad = top / tgap;
        cover.style.left = left + 'px';
        cover.style.top = top + 'px';
        img.style.left = (bigImg.offsetWidth - img.offsetWidth) * lrad + 'px';
        img.style.top = (bigImg.offsetHeight - img.offsetHeight) * trad + 'px';
    }




    // const userbox = document.getElementById('userbox')
    // const cartbox = document.getElementById('cartbox')
    // const cartnum1 = document.getElementById('cart-num1')
    // const cartnum2 = document.getElementById('cart-num2')
    // const cartnum3 = document.getElementById('cart-num3')
    // let info

    // // 判断是否登录
    // function judeLogin() {
    //     // console.log(localStorage.userinfo)

    //     if (localStorage.userinfo !== undefined) {
    //         info = JSON.parse(localStorage.userinfo)
    //         let li1 = document.createElement('li')
    //         let li2 = document.createElement('li')
    //         li1.innerHTML = `<span>${info.tel.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}</span>`;
    //         li2.innerHTML = `<span class="dcc" id="exitbtn">[退出]</span>`;

    //         logininfo.replaceChild(li1, tologin)
    //         logininfo.replaceChild(li2, toregister)

    //         userbox.innerHTML = `<div class="bagp">
    //         <a href="#" class="hd">
    //             <img src="https://img2.epetbar.com/dogs/2.jpg" alt="ico">
    //         </a>
    //         <div class="baginfo">
    //             <span>${info.name}</span>
    //         </div>
    //         </div>
    //         <div class="epet-data">
    //         <a href="#">
    //             <img src="https://img2.epetbar.com/2016-01/09/22/255f31a872b759cca8ae513afc72fa88.jpg">
    //         </a>
    //         <div class="epet-name">
    //             <a href="#">完善宠物资料</a>
    //         </div>
    //         </div>`


    //         const exitbtn = document.getElementById('exitbtn')
    //         exitbtn.onclick = function () {
    //             localStorage.removeItem('userinfo')
    //             window.location.reload()
    //         }

    //         getCart(info.tel)

    //         // $('#buycart').click(function () {
    //         //         var pnum = JSON.parse(localStorage.getItem('userinfo'));
    //         //         fetch('http://localhost:3000/addcart?gid=' + para[1] + '&gnum=' + num + '&tel=' + pnum.tel).then(res => {
    //         //             return res.json()
    //         //         }).then(res1 => {
    //         //             console.log(res1.message)
    //         //             $('.wrapper-f').css('display', 'block')
    //         //             $('#continue').click(function () {
    //         //                 $('.wrapper-f').css('display', 'none')
    //         //             })
    //         //         }).catch(err => {
    //         //             console.log(err)
    //         //         })
                
    //         // })

    //     }
    // }
    // judeLogin()
    // // 添加购物车
    // $('#buycart').click(function () {
    //     if (localStorage.getItem('userinfo')) {
    //         var pnum = JSON.parse(localStorage.getItem('userinfo'));
    //         fetch('http://localhost:3000/addcart?gid=' + para[1] + '&gnum=' + num + '&tel=' + pnum.tel).then(res => {
    //             return res.json()
    //         }).then(res1 => {
    //             console.log(res1.message)
    //             $('.wrapper-f').css('display', 'block')
    //             $('#continue').click(function () {
    //                 $('.wrapper-f').css('display', 'none')
    //             })
    //         }).catch(err => {
    //             console.log(err)
    //         })
    //     }
    // })

    // // 获取购物车信息
    // function getCart(tel) {
    //     fetch('http://localhost:3000/cart?user_tel=' + tel)
    //         .then(response => {
    //             return response.json()
    //         })
    //         .then(res => {
    //             // console.log(res.data)
    //             $('#gnum').html(res.data.length)
    //             let str = ''
    //             let cartnum = 0

    //             if (res.data.length) {
    //                 let result = res.data
    //                 cartnum = result.length

    //                 let total = 0;
    //                 str = '<ul class="cart-list">'
    //                 for (let i = 0; i < result.length; i++) {
    //                     total += result[i].youhui_price * result[i].gnum;
    //                     $('#gprices').html(`${total}元`)
    //                     str += `
    //         <li class="cart-item">
    //             <div class="img">
    //             <img src="${result[i].imgurl}" alt="">
    //             </div>
    //             <div class="info">
    //             <p>
    //                 <a href="#">
    //                 ${result[i].subject}
    //                 <em>${result[i].formats ? result[i].formats : ''}</em>
    //                 </a>
    //             </p>
    //             <p>
    //                 <span style="color: red;">￥${result[i].youhui_price} × ${result[i].gnum}</span>
    //             </p>
    //             <div class="remove">
    //                 <span onclick="removeCart(${result[i].id})">[删除]</span>
    //             </div>
    //             </div>
    //         </li>`
    //                 }
    //                 str += `</ul>
    //         <div class="cart-btn">
    //         <div>共<span> ${cartnum} </span>件商品 合计：<span>￥${total}</span></div>
    //         <div><a class="btn btn_clear" onclick="clearAll(info.tel)">清空</a><a class="btn">去结算</a></div>
    //         </div>`
    //             } else {
    //                 str = `<div style="text-align: center; color: #000;margin-bottom: 20px; font-weight: 600; font-size: 14px;">您的购物车中暂无商品，赶快选择心爱的商品吧！</div>`
    //                 cartnum = 0
    //             }
    //             cartnum1.innerHTML = cartnum
    //             cartnum2.innerHTML = cartnum
    //             cartnum3.innerHTML = cartnum
    //             cartbox.innerHTML = str
    //         })
    // }

    // // 删除购物车列表
    // function removeCart(id) {
    //     fetch('http://localhost:3000/delcart?id=' + id)
    //         .then(response => {
    //             return response.json()
    //         })
    //         .then(res => {
    //             // console.log(res.message)
    //             if (res.message == '删除成功！') {
    //                 getCart(info.tel)
    //             }
    //         })
    // }

    // // 清空购物车
    // function clearAll(tel) {
    //     fetch('http://localhost:3000/clecart?tel=' + tel)
    //         .then(response => {
    //             return response.json()
    //         })
    //         .then(res => {
    //             // console.log(res.message)
    //             if (res.message == '删除成功！') {
    //                 getCart(info.tel)
    //             }
    //         })
    // }


    // tab切换
    $('#tabs .title').click(function () {
        $(this).addClass('on').siblings().removeClass('on');
        $('#tab-con .con').eq($(this).index()).css('display', 'block').siblings().css('display', 'none');
    })
    $('#tab .title').click(function () {
        var long = $(this).offset().top;
        $('html,body').animate({
            scrollTop: long
        }, 1000)
    })
    // $('body').css("transform", "translateY(0)")

    // 咨询tab切换
    $('.consult-nav .item').click(function () {
        $(this).addClass('on').siblings().removeClass('on')
    })


    // 城市联动
    $('#places-txt').mouseover(function () {
        $('#places').css('display', 'block')
        $('#places-arrow').css('backgroundPosition', '0 -46px')
        $('#places').mouseover(function () {
            $(this).css('display', 'block')
        })
        $('#places').mouseout(function () {
            $(this).css('display', 'none')
        })
    })
    $('#places-txt').mouseout(function () {
        $('#places').css('display', 'none')
        $('#places-arrow').css('backgroundPosition', '0 -31px')
    })
    // 渲染城市联动
    var areas = ['华北', '华东', '华南', '华中', '西南', '西北', '东北', '其他'];
    var placecity = document.getElementById('place-city');
    $('#place-city').html('')
    // 渲染一开始的每个地区显示
    for (var i = 0; i < areas.length; i++) {
        placecity.innerHTML += `<li class="pcon-item" id="pcon-item${i}"><span>${areas[i]} ：</span></li>`
        for (var j = 0; j < data.length; j++) {
            if (data[j].direction == areas[i]) {
                $(`#pcon-item${i}`).append(`<span class="pitem-con" data-i="${j}">${data[j].name}</span>`)
            }
        }
    }
    // 根据点击的地区渲染之后的省市级
    for (var i = 0; i < areas.length; i++) {
        $(`#pcon-item${i} .pitem-con`).click(function (e) {
            $('#province').html(e.currentTarget.innerHTML)
            $(this).css({
                'background': '#f60',
                'color': '#fff'
            }).siblings().css({
                'background': '',
                'color': ''
            })
            $(this).parent().siblings().find('.pitem-con').css({
                'background': '',
                'color': ''
            })
            $('#place-city').css('display', 'none')
            $('#place-city1').css('display', 'block')
            var t = e.currentTarget.dataset.i
            $('#place-city1').html('')
            if (data[t].city.length > 1) {
                for (var j = 0; j < data[t].city.length; j++) {
                    $('#place-city1').append(`<span class="pitem-con1" data-i="${j}">${data[t].city[j].name}</span>`)
                }
            } else {
                for (var j = 0; j < data[t].city[0].area.length; j++) {
                    $('#place-city1').append(`<span class="pitem-con1" data-i="${j}">${data[t].city[0].area[j]}</span>`)
                }
            }
            $('#place-city1 .pitem-con1').click(function (e) {
                $(this).css({
                    'background': '#f60',
                    'color': '#fff'
                }).siblings().css({
                    'background': '',
                    'color': ''
                })
                $('#city').html(e.currentTarget.innerHTML)
                if (data[t].city.length > 1) {
                    $('#area').css('display', 'block')
                    $('#place-city').css('display', 'none')
                    $('#place-city1').css('display', 'none')
                    $('#place-city2').css('display', 'block')
                    var t1 = e.currentTarget.dataset.i
                    $('#place-city2').html('')
                    if (data[t].city[t1].area.length > 0) {
                        for (var k = 0; k < data[t].city[t1].area.length; k++) {
                            $('#place-city2').append(`<span class="pitem-con2" data-i="${k}">${data[t].city[t1].area[k]}</span>`)
                        }
                    } else {
                        $('#place-city2').append(`<span class="pitem-con2">${data[t].city[t1].name}</span>`)
                    }
                    $('#place-city2 .pitem-con2').click(function (e) {
                        $(this).css({
                            'background': '#f60',
                            'color': '#fff'
                        }).siblings().css({
                            'background': '',
                            'color': ''
                        })
                        $('#area').html(e.currentTarget.innerHTML)
                        $('#places-txt').html('')
                        $('#places-txt').html(`${$('#province').html()} ${$('#city').html()} ${$('#area').html()}`)
                        $('#places').css('display', 'none')
                    })
                } else {
                    $('#places-txt').html('')
                    $('#places-txt').html(`${$('#province').html()} ${$('#city').html()}`)
                    $('#area').css('display', 'none')
                    $('#places').css('display', 'none')
                }
            })
        })
    }
    // 通过点击来控制它们的切换和隐藏
    $('#province').click(function () {
        $('#place-city').css('display', 'block')
        $('#place-city1').css('display', 'none')
        $('#area').css('display', 'none')
        $('#place-city2').css('display', 'none')
    })
    $('#city').click(function () {
        $('#place-city').css('display', 'none')
        $('#place-city2').css('display', 'none')
        $('#place-city1').css('display', 'block')
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
                        // console.log(str)

                        fetch('http://localhost:3000/register?tel=' + tel + '&psw=' + psw + '&name=' + str)
                            .then(response => {
                                return response.json()
                            })
                            .then(res => {
                                if (res.message == "注册成功！") {
                                    let info = {
                                        tel: tel,
                                        name: name
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