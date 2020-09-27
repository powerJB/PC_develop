const id = window.location.search.split('=')[1]
//图片渲染
$.get('http://localhost:3000/id?id=' + id, function (res) {
    $('.brander').append(`
 <div class="mbt" style="background-color: ${res.data[0].backgroundColor};">
 <div class="brand_header">
     <img src="${res.data[0].imgurl}" alt=""> 
 </div>
 <div class="mainner_two">
 <div class="brand_mainner">
    <img src="${res.data[0].imgurl1}" alt="">
 </div>
</div>
</div>
 `)
    $('.header').css('backgroundColor', `${res.data[0].backgroundColor}`)
    if (res.data[0].oldPrice !== '0.00') {
        if (res.data[0].count == 1) {
            $('.stance').append(`
  <div class="stance_abs" style="background-color: ${res.data[0].backgroundColor2};">
  <ul class="stance_list">
     <li class="stance_item" style="background-color: ${res.data[0].backgroundColor1};">${res.data[0].title1}</li>
     <li class="stance_item" style="background-color: ${res.data[0].backgroundColor1};">${res.data[0].title1}</li>
     <li class="stance_item" style="background-color: ${res.data[0].backgroundColor1};">${res.data[0].title3}</li>
 </ul>
 <div class="stance_model1">
     <a href="detail.html?id=${res.data[0].id}">
     <img src="${res.data[0].imgurl2}" alt="">
 </a>
 </div>
 <div class="stance_fl">
     <a href="detail.html?id=${res.data[0].id}">
        <div class="stance_title">${res.data[0].introduce}</div> 
        <p class="price">
        <del class="stance_oldPrice">¥${res.data[0].oldPrice}</del>
     </p>
     <p class=" ftc" style="color: ${res.data[0].backgroundColor2};">¥
         <span style="color: ${res.data[0].backgroundColor2};">${res.data[0].newPrice}</span>
     </p>
     <div class="stance_buy" style="background-color: ${res.data[0].backgroundColor2};">
         <img src="https://static.epetbar.com/static_sale/pc/mould/brandSale/images/carts.png" alt="">
         <span>立即购买</span>
     </div>
     <div class="ttt"></div>
     </a>
 </div>
 </div>
 `)
        }
        else {
            $('.stance').append(`
  <div class="stance_abs" style="background-color: ${res.data[0].backgroundColor2};">
  <div class="rela">
      <p class="rela_title">
          <span>${res.data[0].title1}</span>
          <span>${res.data[0].title2}</span>
          <span>${res.data[0].title3}</span>
      </p>
      <p class="rela_name"><a href="detail.html?id=${res.data[0].id}">
          ${res.data[0].introduce}
      </a></p>
      <p class="del"><del>¥${res.data[0].oldPrice}</del></p>
      <p class="sale"style="color: ${res.data[0].backgroundColor2};">¥<span style="color: ${res.data[0].backgroundColor2};">${res.data[0].newPrice}</span></p>
      <div class="buy stance_buy" style="background-color:#e7e7e7;">
          <img src="https://static.epetbar.com/static_sale/pc/mould/brandSale/images/carts.png" alt="">
          <span>立即购买</span>
      </div>
  </div>
  <div class="stance_model">
      <a href="detail.html?id=${res.data[0].id}">
      <img src="${res.data[0].imgurl2}" alt="">
      <span class="set_out">已抢光</span>
  </a>
  </div>
      <div class="fff ttt"></div>
      </a>
  </div>
</div>
  `)
        }
    }
})
//商品渲染
$.get('http://localhost:3000/type_one?id=' + id, function (res) {
    for (var j = 0; j < res.data.length; j++) {
        if (res.data[j].price !== '0.00') {
            $('#brand_goods').append(`
      <li class="goods-item">
      <a href="detail.html?id1=${res.data[j].id}">
          <img src="${res.data[j].imgurl}" alt="">
          <p class="goods-title">${res.data[j].subject}</p>
          <p class="goods-newPrice">
              <span class="ftc1">¥</span>${res.data[j].youhui_price}
          </p>
          <p class="goods-oldPrice">
              <del class="c9999">¥${res.data[j].price}</del>
          </p>
         <p id="goods_buy" style="background-color: ${res.data[j].color};">立即购买</p>
      </a>
  </li>
      `)
        }
    }
})

