<?php
/***
向客户端返回当前登录用户所有的订单，以JSON格式，形如：
{						
	totalRecord: 22,  //总的记录数量
	pageSize: 5,	   //页面大小/每页显示的记录数
	pageCount: 5,	   //页面的数量
	curPage: 3,	   //当前要显示的页号
	data: [{},{},{},{},{}]  //当前页对应的记录内容
}

***/
header('Content-Type: application/json');

$uname = $_REQUEST['uname'];
$curPage = $_REQUEST['curPage'];

//要输出给客户端对象
$output = [
	'totalRecord'=>0,
	'pageSize'=>5,
	'pageCount'=>0,
	'curPage'=> intval($curPage),//字符串解析为整数
	'data'=>[]
];

$conn = mysqli_connect('127.0.0.1','root','','jd',3306);

//1.设置后续的SQL语句的编码方式
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

//2.获取满足条件的总记录数
$sql = "SELECT COUNT(*) FROM jd_orders WHERE user_name='$uname'";
$result = mysqli_query($conn,$sql); //此结果集中只有一行一列的数据
$row = mysqli_fetch_assoc($result);
$output['totalRecord'] = intval($row['COUNT(*)']); //总记录数
$output['pageCount'] = ceil($output['totalRecord']/$output['pageSize']); //总页数

//3.获取指定页码上的记录   17:10~17:15
$start = ($output['curPage']-1)*$output['pageSize'];
$count = $output['pageSize'];
$sql = "SELECT * FROM jd_orders WHERE user_name='$uname' LIMIT $start,$count";
$result = mysqli_query($conn,$sql);

$orderList = [];
while( ($order=mysqli_fetch_assoc($result))!==NULL ){
	//4 查找当前订单购买了哪些商品
	$order['productList'] = [];//为订单添加“产品列表”属性
	$oid = $order['order_id']; //订单编号
	$sql = "SELECT * FROM jd_products WHERE product_id IN ( SELECT product_id FROM jd_order_product_detail WHERE order_id=$oid )";
	$pResult = mysqli_query($conn,$sql);
	while(($p=mysqli_fetch_assoc($pResult))!==NULL){
		//向当前订单的商品列表中加新商品
		$order['productList'][] = $p;
	}
	$orderList[] = $order;
}

$output['data'] = $orderList;
echo json_encode($output); //五维数组


