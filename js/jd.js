/****1 页面加载完后，异步请求页头和页尾*****/
$(function(){
  $('#header').load('header.php');
  $('#footer').load('footer.php');
})


/****2 当用户点击“提交登录信息”时，进行服务器端验证****/
$('#bt-login').click(function(){
  //获得用户的所有输入——表单序列化
  var requestData = $('#login-form').serialize();
  /**将用户输入异步提交给服务器，进行用户名和密码的验证**/
  //$.post()  $.ajax()
  $.post('data/1_check_login.php',requestData, function(data){
    if(data.code!==1){ //登录失败
      $('.modal .alert').html(data.msg);
    }else{ //登录成功
      $('.modal').fadeOut(500);
      var uname = $('[name="uname"]').val();
      $('#welcome').html('欢迎回来：'+uname);
      //获取当前用户的订单(第1页)
      getMyOrders(uname, 1);
    }
  });
  
});


/****3 控制附加导航的切换****/
$(function(){
  $('.affix ul li a').click(function(e){
    e.preventDefault();
    /////切换affix中的active
    $(this).parent().addClass('active').siblings('.active').removeClass('active');
    /////切换主container中的active
    $($(this).attr('href')).addClass('active').siblings('.active').removeClass('active');
  });
});         


/****4 异步请求“我的订单”数据****/
function getMyOrders( uname, curPage ){
  //$.get  $.getJSON $.ajax
  $.getJSON('data/2_my_orders.php',{uname:uname, curPage:curPage}, function(pagerObject){
    console.log('开始处理订单数据...');
    console.log(pagerObject);
    //表格中显示出订单数据
    $.each(pagerObject.data, function(i,order){
      var html = `
        <tr>
          <td colspan="6">订单编号：${order.order_num} <a href="#">${order.shop_name}</a></td>
        </tr>
        <tr>
          <td>
      `;
      $.each(order.productList, function(i,p){
        html += `<img src="${p.product_img}" title="${p.product_name}">`;
      })     
      html+=`    
          </td>
          <td>${order.user_name}</td>
          <td>￥${order.price}<br>${order.payment_mode}</td>
          <td>${order.submit_time}</td>
          <td>${order.order_state}</td>
          <td>
            <a href="#">查看</a><br>
            <a href="#">评价晒单</a><br>
            <a href="#">还要买</a><br>
          </td>
        </tr>  
      `;
      $('#order-table tbody').append(html);
    });
    //把订单时间中的T替换为<br>
    $('#order-table tbody tr:nth-child(even) td:nth-child(4)').each(function(i,td){
      var t = td.innerHTML;
      t = t.replace('T', '<br>');
      td.innerHTML = t;
    });
    //根据服务器返回的分页对象显示分页条
    //判断某一页码是否存在，存在则显示
    //某个页码被点击，则调用getMyOrders
    $('.pager').append('<li><a href="#">当前页-2</a></li>');
    $('.pager').append('<li><a href="#">当前页-1</a></li>');
    $('.pager').append('<li><a href="#">当前页</a></li>');
    $('.pager').append('<li><a href="#">当前页+1</a></li>');
    $('.pager').append('<li><a href="#">当前页+2</a></li>');   
  });    
}


/****5 绘制消费统计图表(原生版)****/
//当点击“消费统计”菜单项时触发
$('[href="#buy-stat-container"]').click(function(){
  //异步请求消费统计数据 $.get  $.getJSON  $.ajax
  $.get('data/3_buy_stat.php',{uname:'qiangdong'},function(arr){
    //console.log('开始处理消费统计数据');
    //console.log(arr);
    
    /***绘制统计图需要的变量****/
    var canvasWidth = 800;
    var canvasHeight = 500;
    var bgColor = '#f2f2f2';  //画布的背景色
    var padding = 80;  //绘图内容到边界的距离
    var dataCount = arr.length; //数据的数量
    var origin = {x:padding, y:canvasHeight-padding}; //原点坐标
    var xEnd = {x:canvasWidth-padding, y:canvasHeight-padding};  //X轴端点
    var yEnd = {x:padding, y:padding};  //X轴端点
    var fontSize = 14;  
    /****************************/

    var canvas = $('#canvas-buy-stat')[0];
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    var ctx = canvas.getContext('2d');
    ctx.textBaseline = 'bottom';
    ctx.font = fontSize+'px SimHei';
    
    ///////绘制背景色
    ctx.fillStyle = bgColor;
    ctx.fillRect(0,0,canvasWidth,canvasHeight);

    ///////绘制X轴(带小箭头)，绘制坐标点
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(xEnd.x, xEnd.y);
    ctx.lineTo(xEnd.x-10, xEnd.y-5);
    ctx.moveTo(xEnd.x, xEnd.y);
    ctx.lineTo(xEnd.x-10, xEnd.y+5);

    var barWidth = (canvasWidth-2*padding)/(2*dataCount+1);//柱状图中柱宽
    ctx.fillStyle = '#000';
    console.log('DATACOUNT:'+dataCount);
    for(var i=0; i<dataCount; i++){
      var x = (2*i+1)*barWidth+origin.x; //X轴上坐标点
      var y = origin.y; //X轴上坐标点
      ctx.moveTo(x,y);
      ctx.lineTo(x,y-5);

      //绘制X轴提示文字
      var txt = arr[i].label;
      var w = ctx.measureText(txt).width;
      ctx.fillText(txt,x-w/2,y+fontSize+2);
    }

    /////绘制Y轴(带小箭头)，绘制坐标点
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(yEnd.x, yEnd.y);
    ctx.lineTo(yEnd.x-5, yEnd.y+10);
    ctx.moveTo(yEnd.x, yEnd.y);
    ctx.lineTo(yEnd.x+5, yEnd.y+10);
    
    var yPointCount = 6; //Y轴上坐标点数量
    var yPointSpace = (canvasHeight-2*padding)/yPointCount; //Y轴上两个坐标点间距
    var maxValue = arr[0].value;//最大值
    for(var i=1; i<arr.length; i++){
      if(arr[i].value>maxValue){
        maxValue = arr[i].value;
      }
    }
    var valueSpace = parseInt(maxValue/yPointCount); //Y轴两个坐标点表示的值的间距
    for(var i=0; i<yPointCount-1; i++){
      var x = origin.x;
      var y = origin.y-(i+1)*yPointSpace;
      ctx.moveTo(x,y);
      ctx.lineTo(x+5,y);

      var txt = (i+1)*valueSpace;
      var w = ctx.measureText(txt).width;
      ctx.fillText(txt,x-w-2,y+fontSize/2);
    }

    //////绘制统计折线图
    for(var i=0; i<dataCount; i++){
      var value = arr[i].value; //金额值
      var barHeight = (canvasHeight-2*padding)*(value)/(maxValue); //每个柱的高度
      var x = origin.x+(2*i+1)*barWidth; //数值点坐标
      var y = origin.y-barHeight; //数值点坐标
      
      //创建折线图
      if(i===0){
        ctx.moveTo(x,y);
      }else{
        ctx.lineTo(x,y);
      }
      //绘制柱状图
      ctx.strokeRect(x,y,barWidth,barHeight);
      /**
      var g = ctx.createLinearGradient(x,y,x,origin.y)
      g.addColorStop(0, rc());
      g.addColorStop(1, '#fff');
      **/
      ctx.fillStyle = rc();
      ctx.fillRect(x,y,barWidth,barHeight);
      //绘制消费金额    17:24~17:35
      ctx.fillText(value, x, y);
    }
    ctx.stroke();

  })
});

function rc(){
  var r = Math.floor(Math.random()*256);
  var g = Math.floor(Math.random()*256);
  var b = Math.floor(Math.random()*256);
  return 'rgb('+r+','+g+','+b+')';
}
//模拟用户点击了指定的按钮
//$('[href="#buy-stat-container"]').trigger('click');
$('[href="#buy-stat-container"]').click();

/*
a.onclick = f1;
a.onclick = f2;
a.addEventListener('click',f3,false)
a.addEventListener('click',f4,false)
*/


/***当点击“消费统计(FC版)”异步请求消费统计数据，使用FC绘制统计图****/
$('[href="#buy-stat-container-fc"]').click(function(){
  $.get('data/3_buy_stat.php',{uname:'qiangdong'},function(arr){
    //调用FusionCharts进行绘图
    new FusionCharts({
      //column3d pie2d pie3d line doughnut2d doughnut3d ....
      type: 'column2d',  //图表的类型
      renderAt: 'buy-stat-container-fc',
      width: '800',
      height: '500',
      dataFormat: 'json', //数据格式
      dataSource: {   //数据源
        data: arr
      }
    }).render();//渲染图表
  });
});



/*****6.幸运抽奖******/
$('[href="#luck-lottery-container"]').click(function(){
  //异步请求抽奖统计信息
  $.getJSON('data/4_lottery_stat.php',{uname:'qiangdong'},function(data){
    //console.log(data);
    //根据抽奖统计数据修改“抽奖”按钮状态
    if(data.left===0){
      $('#bt-lottery').html('无法继续抽奖(总抽奖次数：'+data.total+' 剩余次数：0)');
      return; //退出当前函数
    }
    $('#bt-lottery').html('开始抽奖(总抽奖次数：'+data.total+' 剩余次数：'+data.left+')').attr('disabled', false);
    
    //若剩余抽奖次数大于0，则在canvas上绘制抽奖圆盘和指针
    //注意：必须等待两张图片加载完成!
    var progress = 0;
    var imgPan = new Image();
    imgPan.src = 'img/pan.png';
    imgPan.onload = function(){
      progress += 80;
      if(progress>=100){
        drawLottery();
      }
    }
    var imgPin = new Image();
    imgPin.src = 'img/pin.png';
    imgPin.onload = function(){
      progress += 20;
      if(progress>=100){
        drawLottery();
      }
    }
    //绘制抽奖圆盘和指针
    function drawLottery(){
      var canvas = $('#canvas-lottery')[0]; //jQuery=>DOM
      canvas.width = imgPan.width;
      canvas.height = imgPan.height;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(imgPan,0,0);
      ctx.drawImage(imgPin, canvas.width/2-imgPin.width/2, canvas.height/2-imgPin.height/2);

      //为“抽奖”按钮绑定事件监听
      $('#bt-lottery').click(function(){
        //按钮变为禁用状态
        $(this).attr('disabled', true);
       
        //圆盘开始旋转——定时器
        ctx.translate(canvas.width/2,canvas.height/2);//平移原点到画布中央
        
        var deg = 0;  //已经旋转的角度
        var duration = Math.random()*3000+5000;//旋转的总持续时间
        var last = 0;//当前已旋转的时长
        
        var timer = setInterval(function(){
          //顺时针旋转
          ctx.rotate(deg*Math.PI/180);
          ctx.drawImage(imgPan,-canvas.width/2, -canvas.height/2);
          //逆时针旋转
          ctx.rotate(-deg*Math.PI/180);
          //deg += 5;
          deg += speedFn(duration,last);
          deg %= 360;

          ctx.drawImage(imgPin,-imgPin.width/2, -imgPin.height/2);

          //计算旋转的时长
          last += 42;
          if(last>=duration){ //旋转时间到了
            clearInterval(timer);
            saveLotteryResult(deg);//保存摇奖结果
            ctx.translate(-canvas.width/2,-canvas.height/2)//将画笔定位原点恢复到左上角
          }
        },42);
      });
    }
  })
})
//根据旋转角度，判定所得奖项，异步提交给服务器
function saveLotteryResult(deg){
  var result = null; //所获奖项
  var responseData = null; //服务器返回的响应消息数据
  if( (deg>=0&&deg<30) || (deg>=210&&deg<240)){
    result = '二等奖';
  }else if((deg>=30&&deg<60)||(deg>=90&&deg<120)||(deg>=150&&deg<180)||(deg>=300&&deg<330)){
    result = '三等奖';
  }else if(deg>=270&&deg<300){
    result = '一等奖';
  }else {
    result = '幸运奖';
  }
  alert('恭喜！您摇中了：'+result);
  //异步提交所获奖项
  $.post('data/5_lottery_save.php',{uname:'qiangdong','level':result},function(data){
    //console.log('服务器已经接收了提交的摇奖结果数据');
    //修改“抽奖”按钮的文字和状态
    if(data.left>0){
      $('#bt-lottery').html('继续抽奖(总抽奖次数：'+data.total+' 剩余次数：'+data.left+')').attr('disabled', false);
    }else {
      $('#bt-lottery').html('无法继续抽奖(总抽奖次数：'+data.total+' 剩余次数：0)');
    }
  });

}
//旋转速度函数：根据总持续时间和当前已旋转的时间，获取对应的旋转速度
function speedFn(duration, last){
  var deg = 0;
  deg = -60*last*last/(duration*duration)+60*last/duration;
  return deg; 
}

$('[href="#luck-lottery-container"]').click();
