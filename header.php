<?php
header('Content-Type: text/html');
?>
<!--页面顶部! -->
<header id="top">
	<div id="top_box">
		<img src="Images/star.jpg" />
		<a href="#">收藏京东</a>
		<div class="rt">   
			<ul>
				<li><span id="welcome">您好，欢迎来到京东！</span><a href="#" >[登录]</a> <a href="#" >[免费注册]</a></li> 
				<li><b></b><a href="#" >我的订单</a></li> 
				<li class="vip"><b></b><a href="#" >会员俱乐部</a></li> 
				<li class="dakehu"><b></b><a href="#" >企业频道</a></li> 
				<li class="app_jd"><b></b><a href="#" >手机京东</a></li> 
				<li class="service">
					<b></b><a> 客户服务</a>
					<ul id="service_items">
						<li><a href="#">帮助中心</a></li>
						<li><a href="#">售后服务</a></li>
						<li><a href="#">在线客服</a></li>
						<li><a href="#">投诉中心</a></li>
						<li><a href="#">客服邮箱</a></li>
					</ul>
				</li> 
				<li><b></b><a >网站导航</a></li> 
			</ul> 
		</div>
	</div>
</header>
<!--LOGO和搜索框! -->
<div id="top_main">
	<a href="#" class="lf"><img src="images/logo-201305.png" alt="LOGO" /></a>
	<div id="search_box" class="lf">
		<div class="search">
			<input id="txtSearch" type="text" class="text" />
			<input class="button" name="" type="button" value="搜索" />
		</div>
		<div class="hot_words">
			<span>热门搜索：</span> <a href="#">家纺11月大促</a> <a href="#">彩虹电热毯</a> <a href="#">博洋家纺</a>
			<a href="#">霞珍</a> <a href="#">床垫床褥</a> <a href="#">九洲鹿被子</a> <a href="#">南极人家纺</a>
		</div>
	</div>
	<div id="my_jd" class="lf">我的京东<b></b></div>
	<div id="settle_up" class="lf">去购物车结算<b></b></div>
</div>
<!--主导航 -->
<nav id="nav">
	<div id="category">
		<a href="#">全部商品分类</a>
		<b></b>
	</div>
	<ul id="nav_items">
		<li><a href="#">首页</a></li>
		<li><a href="#">服装城</a></li>
		<li><a href="#">食品</a></li>
		<li><a href="#">团购</a></li>
		<li><a href="#">夺宝岛</a></li>
		<li><a href="#">闪购</a></li>
		<li><a href="#">金融</a></li>
	</ul>
</nav>
<!--banner部分-->
<article id="banner">
	<ul id="cate_box">
		<li>
			<h3>
				<a href="#">图书</a>、<a href="#">音像</a>、<a href="#">数字商品</a>
			</h3>
			<div class="sub_cate_box">
				<div class="sub_cate_items">
					<div>
						<a href="#">电子书</a>
						<p>
							<a href="#">免费</a>
							<a href="#">小说</a>
							<a href="#">励志与成功</a>
							<a href="#">婚恋/两性</a>
							<a href="#">文学</a>
							<a href="#">经营</a>
							<a href="#">畅读VIP</a>
						</p>
					</div>
					<div>
						<a href="#">数字音乐</a>
						<p>
							<a href="#">通俗流行</a>
							<a href="#">古典音乐</a>
							<a href="#">摇滚说唱</a>
							<a href="#">爵士蓝调</a>
							<a href="#">乡村民谣</a>
							<a href="#">有声读物</a>
						</p>
					</div>
					<div>
						<a href="#">音像</a>
						<p>
							<a href="#">音乐</a>
							<a href="#">影视</a>
							<a href="#">教育音像</a>
							<a href="#">游戏</a>
						</p>
					</div>
					<div>
						<a href="#">文艺</a>
						<p>
							<a href="#">小说</a>
							<a href="#">文学</a>
							<a href="#">青春文学</a>
							<a href="#">传记</a>
							<a href="#">艺术</a>
						</p>
					</div> 
				</div>
				<div class="sub_cate_banner">
					<div><img src="Images/cate_banner_01.jpg" /></div>
					<div><img src="Images/cate_banner_02.jpg" /></div>
					<div>
						<h4>推荐品牌出版商/书店</h4>
						<ul>
							<li><a href="#">中华书局</a></li>
							<li><a href="#">人民邮电出版社</a></li>
							<li><a href="#">上海世纪出版股份有限公司</a></li>
							<li><a href="#">电子工业出版社</a></li>
							<li><a href="#">三联书店</a></li>
							<li><a href="#">浙江少年儿童出版社</a></li>
						</ul>
					</div>
				</div>
				<div class="close">×</div>
			</div>
		</li>
		<li>
			<h3>
				<a href="#">家用电器</a>
			</h3>
		</li>
	</ul>
</article>
