<?php
/***
向客户端返回指定用户的抽奖统计情况，以JSON格式，形如：
{
	"user_name": "qiangdong",
	"total": 39,
	"used": 3,
	"left": 36
}
***/
header('Content-Type: application/json');
$output = [
	'user_name'=>null,
	'total'=>0,
	'used'=>0,
	'left'=>0
];

$uname = $_REQUEST['uname'];
$output['user_name'] = $uname;

$conn = mysqli_connect('127.0.0.1','root','','jd',3306);

$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

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