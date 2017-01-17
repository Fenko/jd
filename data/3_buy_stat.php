<?php
/***
向客户端返回指定用于过去1年中消费统计，
以JSON格式，形如：
[
  {"label":"1月","value":5000},
  {"label":"2月","value":5000},
  ...
]
***/
header('Content-Type: application/json');

$uname = $_REQUEST['uname'];

//此处应该连接数据库，执行查询操作
//假设查询完成
$output = [];  //保存所有的统计数据

$output[] = ['label'=>'1月','value'=>4000];
$output[] = ['label'=>'2月','value'=>3000];
$output[] = ['label'=>'3月','value'=>5000];
$output[] = ['label'=>'4月','value'=>3500];
$output[] = ['label'=>'5月','value'=>8000];
$output[] = ['label'=>'6月','value'=>7000];
$output[] = ['label'=>'7月','value'=>5000];
$output[] = ['label'=>'8月','value'=>0];
$output[] = ['label'=>'9月','value'=>6500];
$output[] = ['label'=>'10月','value'=>7000];
$output[] = ['label'=>'11月','value'=>3400];
$output[] = ['label'=>'12月','value'=>6500];


echo json_encode($output);

