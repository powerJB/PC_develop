//楼层导航
var slider=document.querySelector('.slider-banner')
var bottom_list=document.querySelector('.bottom_list')
var lists=document.querySelectorAll('.list_item')
var mainner=document.querySelectorAll('.mainner')
var list=document.querySelector('.list1')
console.log(mainner)
window.onscroll=function(){
    var  top =document.documentElement.scrollTop;
    if(top>slider.offsetTop+slider.clientHeight-103){
    bottom_list.style.position='fixed'
    bottom_list.style.top='28px'
    }
    if(top<=slider.offsetTop+slider.clientHeight-103){
    bottom_list.style.position='absolute'
    bottom_list.style.top=427+'px'
    }
    for(var i=0;i<lists.length;i++){
        if(top>=mainner[i].offsetTop-103&&top<mainner[i].offsetTop-103+mainner[i].clientHeight){
            lists[i].classList.add('active')
        }
        else{
            lists[i].classList.remove('active')
        }
        if(top<mainner[0].offsetTop){
            lists[0].classList.add('active')
        }
     }
}
$('.list_item').click(function(e){
    var index=$(this).index()
 window.scrollTo({
     top:mainner[index].offsetTop-103,
     behavior:'smooth'
 })
})
$.get('http://localhost:3000/index_one',function(res){
//倒计时
var time=new Date()
var time1=new Date(2020,08,29,12,00)
var times1=time.getTime()
var times2=time1.getTime()
var times=times2-times1
var hour=Math.ceil(times/60/60/1000)
if(hour<0){
    hour=0
}
  for(var i=0;i<res.data.length;i++){
      $('.points-item').eq(i).append(`
      <a href="./brand_one.html?id=${res.data[i].id}">
                <img src="${res.data[i].img}" alt="" class="imglist"> 
               <div class="points-img">
                <img src="https://static.epetbar.com/static_www/brandsale/images/textbg3.png" alt="">
                <span>仅剩${hour}小时</span>
            </div>
           </a>
      `)
  }
})


