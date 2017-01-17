<?php
/***
获取客户端提交的摇奖结果，保存入数据库，返回已经摇奖信息，以JSON格式，形如：
{
	'user_name':'qiangdong',
	'total': 39,
	'used': 4,
	'left': 35,
	'lottery_id': 4
}
提示：先执行INSERT，再执行SELECT*2
***/
header('Content-Type: application/json');

$uname = $_REQUEST['uname'];
$level = $_REQUEST['level'];//所获奖项
$time = time()*1000;  //摇奖时间


$conn = mysqli_connect('127.0.0.1','root','','jd',3306);

$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

//先执行摇奖结果的保存
$sql = "INSERT INTO jd_lottery VALUES(NULL,'$uname','$time','$level')";
$result = mysqli_query($conn,$sql);

$output = [
	'user_name'=>$uname,
	'total'=>0,
	'used'=>0,
	'left'=>0,
	'lottery_id'=>mysqli_insert_id($conn)
];

//查询总的抽奖次数
$sql = "SELECT SUM(price) FROM jd_orders WHERE user_name='$uname'";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
$output['total'] = floor( floatval($row['SUM(price)'])/100); 

//查询已用的抽奖次数
$sql = "SELECT COUNT(id) FROM jd_lottery WHERE user_name='$uname'";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
$output['used'] = intval($row['COUNT(id)']);

//计算剩余抽奖次数
$output['left'] = $output['total']-$output['used'];

echo json_encode($output);