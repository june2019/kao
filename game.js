$(function(){
alert('123');
	//提示变量
	let help = 0;

	// 零、初始化系统中必要的数据
	let all_poker = [];		 // 代表总牌组的数据
	// let player[0] = {name:'小明', integral:1000, poker:[], role: 0};		// 玩家1数据
	// let player[1] = {name:'小红', integral:1000, poker:[], role: 0};		// 玩家2数据
	// let player[2] = {name:'小军', integral:1000, poker:[], role: 0};		// 玩家3数据
	let player = [
		{name:'小明', integral:1000, poker:[], role: 0},
		{name:'小红', integral:1000, poker:[], role: 0},
		{name:'小军', integral:1000, poker:[], role: 0},
	];

	let tmp = {tpoker:[],type:0,max:0}

	// 用于保存当前游戏具体情况的数据
	let game = {
		boss:null,		// 当前游戏的地主角色
		select_poker:{
			poker:[],		// 选中牌组的具体数组数据
			type:0,			// 选中牌组的牌型
			max: 0 			// 牌型中的对比值
		},	// 当前玩家选择中选择牌组数据
		desktop_poker:{
			poker:[],		// 桌面牌组的具体数组数据
			type:0,			// 桌面牌组的牌型
			max: 0 			// 牌型中的对比值
		},	// 当前桌面上的牌组数据

	}

	// 一、1.1生成初始牌堆页面元素
	let poker_str = '';
	
	for(let i=0; i<54; i++){
		poker_str += '<li class="back" style="top:-'+i+'px;"></li>';
	}
	$('.all_poker').append(poker_str);
	
	// 1.2初始化牌堆数据
	// [{num:1,color:0}, {num:1, color:1}]
	
	for(let i=1; i<=13; i++){
		for(let j=0; j<4; j++){
			all_poker.push({num:i, color:j});
		}
	}
	all_poker.push({num:14, color:0});
	all_poker.push({num:14, color:1});
	// console.log(all_poker);
	
	// 绑定洗牌跟发牌事件
	let click = 0;		// 用于保存点击牌的次数
	// $('.all_poker li').click(function(){
	

	//洗牌，发牌
	$('.fapai').click(function(){
		if(click==0){
			clearPoker();
			$('.baby').show();
			setTimeout(function(){
				$('.baby').hide();
			},10000);
			click=2;
			setTimeout(function(){
				click=1;
			},12000)
		}else if(click==1){
			deal();
			$('.fapai').hide();
		}
	})


	// 为了防止绑定事件的失效，我们需要使用监听事件绑定
	/*$('body').on('click', '.all_poker li', function(){
		if(click == 0){
			// alert('洗牌');
			clearPoker();			// 调用洗牌函数
			// console.log(all_poker);
		}else if(click == 1){
			// alert('发牌')
			deal();					// 调用发牌函数 
		}
	});*/

	// 封装洗牌函数
	function clearPoker(){
		// 0 把牌组数据进行打乱
		for(let i=0; i<3; i++){
			all_poker.sort(function(x, y){
				return Math.random()-0.5;
			});
		}
		

		// 开始洗牌
		// 1.1、保存原牌组
		let $all = $('.all_poker');
		// 1.2、删除原牌组
		// $('.all_poker').remove();

		// 2、生成三个新的临时牌堆用于洗牌动画
		/*let temp_html = '';
		for(let i=0; i<3; i++){
			temp_html +='<ul class="all_poker" style="top:-'+i*275+'px">';
			for(let j=0; j<18; j++){
				temp_html +='<li class="back" style="top:-'+j+'px;"></li>';
			}
			temp_html +='</ul>';
		}
		$('.mid_top').append(temp_html);

		// 3、开始动画
		for(let i=0; i<3; i++){
			$('.all_poker').eq(0).animate({left:'-500px'}, 200).animate({left:'0px'},200);
			$('.all_poker').eq(1).animate({left:'500px'}, 200).animate({left:'0px'},200);
		}

		setTimeout(function(){
			//4、删除三组临时牌堆
			$('.all_poker').remove();

			// 5、恢复原来牌组
			$('.mid_top').html($all);
		},1300);*/

		//洗牌动画
		for (let i = 0; i < 54; i++) {
			if (i % 2 == 0) {
				setTimeout(function () {
					$('.all_poker li').eq(i).animate({left: '-500px'}, 100).css({ 'transform':  '   rotateZ(1080deg) translateX(200px) rotateX(360deg)   translateY(600px) ','transition': 'linear 2s'})
				}, 120 * i);
				setTimeout(function () {
					$('.all_poker li').eq(i).animate({left: '0px'}, 200).css({  'transform':  '  rotateZ(-180deg) translateX(0px) rotateX(180deg)   translateY(0px) ','transition': 'linear 4s'})
				}, 7000 + i * 100)
					}else{
				setTimeout(function () {
					$('.all_poker li').eq(i).animate({left: '500px'}, 100).css({ 'transform':  '   rotateZ(-1080deg) translateX(-200px) rotateX(360deg)   translateY(600px)','transition': 'linear 2s'})
				}, 120 * i)
				setTimeout(function () {
					$('.all_poker li').eq(i).animate({left: '0px'}, 200).css({'transform': '  rotateZ(	180deg) translateX(0px) rotateX(180deg)   translateY(0px) ','transition':'linear 4s'})
				}, 7000 + i * 100)
			}
		}

		click++;
		$('.fapai').html('发牌');
	}


	// 封装发牌函数 
	function deal(num){
		
		num = num || 0;
		let poker_html = '';
		if(num < 17){
			
			$('.play').attr({src:'./audio/play.mp3'})
			/*$('.all_poker li:last').animate({left:'-500px', top:'300px'}, 20);
			setTimeout(function(){
				player[0].poker.push(all_poker.pop());	// 把总牌组数据中的最后个元素添加到玩家1，并且删除
				$('.all_poker li:last').remove();
			},22);*/

			// 发牌给左边玩家
			$('.all_poker li:last').animate({left:'-500px',top:'300px'},20);
			setTimeout(function(){
				player[0].poker.push(all_poker.pop());//1.2发牌到player[0]玩家
				poker1_html = makePoker(player[0].poker[player[0].poker.length-1]);//1.2
				$('.play_1').append(poker1_html);
				$('.play_1 li:last').css({top:num*25+'px'});
				$('.all_poker li:last').remove();//删除牌组

				//显示头像
				setTimeout(function(){
					$('.head_pic').show();
				},1000)
				
			},40);

			// 发牌给中间玩家
			setTimeout(function(){
				$('.all_poker li:last').animate({ top:'600px'}, 40);
				setTimeout(function(){
					player[1].poker.push(all_poker.pop());	// 把总牌组数据中的最后个元素添加到玩家2，并且删除
					poker_html = makePoker(player[1].poker[player[1].poker.length-1]);
					// console.log(poker_html);
					$('.play_2').append(poker_html);
					$('.play_2 li:last').css({left:num*25+'px'});
					$('.play_2').css({left:-10*num+'px'});
					$('.all_poker li:last').remove();

					//显示头像
					
					setTimeout(function(){
						$('.head_pic').show();
					},1000)
				}, 41);
			}, 48);

			//发牌给右边玩家
			setTimeout(function(){
				$('.all_poker li:last').animate({left:'500px',top:'300px'},40);
				setTimeout(function(){
					player[2].poker.push(all_poker.pop());//1.2发牌到player[2]玩家
					poker3_html = makePoker(player[2].poker[player[2].poker.length-1]);//1.2
					$('.play_3').append(poker3_html);
					$('.play_3 li:last').css({top:num*25+'px'});
					$('.all_poker li:last').remove();
					deal(num+1);

					//显示头像
					setTimeout(function(){
						$('.head_pic').show();
					},1000)
					
				},40);
			},160)
		}else{
			setTimeout(function(){
				// 调用所有玩家排序的方法
				all_play_sort();
			}, 200);
		}
		// time();
	}

	/**
	 * 生成牌面HTML代码的函数
	 * @param  Object poker_data 单张牌的数据。例子：{num:4, color:0}
	 * @return String       返回的是一个li带该牌数据的牌面HTML代码
	 */
	function makePoker(poker_data){
		let color_arr = [
			[-17, -225],		// 方块花色的坐标
			[-17, -5],			// 梅花花色的坐标
			[-160, -5],			// 红桃花色的坐标
			[-160, -225]		// 黑桃花色的坐标
		];

		let x,y;
		// 判断是否为大小王
		if(poker_data.num < 14){
			// 生成本牌花色坐标
			x = color_arr[poker_data.color][0];
			y = color_arr[poker_data.color][1];
		}else {
			if(poker_data.color == 0){
				x = -160;
				y = -5;
			}else{
				x = -17;
				y = -5;
			}
		}

		poker_html = '<li style="width: 125px; height: 175px; background: url(./images/'+poker_data.num+'.png) '+x+'px '+y+'px;" data-num="'+poker_data.num+'" data-color="'+poker_data.color+'"></li>';
		return poker_html;
	}

	// 发牌完成后所有玩家的牌进行排序
	function all_play_sort(){
		// 调用牌组排序方法让玩家的手牌数据进行排序
		pokerSort(player[0].poker);
		pokerSort(player[1].poker);
		pokerSort(player[2].poker);

		//1.2使用动画过渡,显示牌的背面
		$('.play_2 li').remove();
		$('.play_1 li').remove();
		$('.play_3 li').remove();

		// 使用动画效果让牌组看起进行了自动排序
		$('.play_2 li').remove();
		for(let i=0; i<17; i++){
			/*$('.play_2').append('<li class="back"></li>');
			$('.play_2 li:last').css({left:20*i+'px'});*/

			$('.play_2').append('<li class="back"></li>');
			$('.play_2 li:last').css({left:i*25+'px'});
			$('.play_1').append('<li class="back"></li>');
			$('.play_1 li:last').css({top:i*25+'px'});
			$('.play_3').append('<li class="back"></li>');
			$('.play_3 li:last').css({top:i*25+'px'});
		}


		//1.2显示排序完牌的正面
		let poker2_h = '';
		let poker1_h = '';
		let poker3_h = '';
		setTimeout(function(){
			$('.play_2 li').remove();
			$('.play_1 li').remove();
			$('.play_3 li').remove();
			for(let i=0;i<17;i++){
				poker2_h = makePoker(player[1].poker[i]);
				$('.play_2').append(poker2_h);
				$('.play_2 li:last').css({left:25*i+'px'});
				poker1_h = makePoker(player[0].poker[i]);
				$('.play_1').append(poker1_h);
				$('.play_1 li:last').css({top:25*i+'px'});
				poker3_h = makePoker(player[2].poker[i]);
				$('.play_3').append(poker3_h);
				$('.play_3 li:last').css({top:25*i+'px'});
			}

			// 调用抢地主函数
			getBoss();
		}, 500);
	}

	// 对牌组数据进行排序的方法
	function pokerSort(poker_arr){
		poker_arr.sort(function(x, y){
			if(x.num != y.num){
				return x.num - y.num;
			}else {
				return x.color - y.color;
			}
		});
	}

	// 抢地主函数
	function getBoss(get_play, cancelNum){

		// cancelNum = cancelNum || 0 ;
		if(cancelNum === undefined){
			cancelNum = 0;
		}
		// console.log(cancelNum);

		// get_play = get_play || Math.floor(Math.random()*3)
		if(get_play === undefined){
			get_play = Math.floor(Math.random()*3)
		}
		// console.log(get_play);
		// 把对应的玩家抢地主的按钮显示
		// $('.play_btn').eq(get_play).css({'display':'block'});
		//把对应的玩家抢地主的按钮显示
		$('.play_btn').eq(get_play).show();
		// console.log('get_play=='+get_play);

		//定时器显示
		// $('.time1').eq(get_play).show();
		if(cancelNum==3){
			clearInterval(ti);
		}else{
			timmer(get_play);
		}
		

		$('.message').hide();

		// 绑定抢地主事件
		$('.play_btn').eq(get_play).on('click', '.get', function(){

			//显示抢地主
			$('.message').show().find('.msg').html('抢地主');
			$('.audio').attr({src:'./audio/qiang.wav'})
			//
			dizhu = get_play;

			setTimeout(function(){

				//抢地主把定时器清除
				clearInterval(ti);
				count = 16;

				$('.head_pic').eq(get_play).find('img').attr({
					src:'./images/dizhu.jpg'
				})

				// 隐藏当前的按钮组
				$('.play_btn').css({'display':'none'});

				// alert('抢地主');
				player[get_play].role = 1;		// 设置玩家为地主角色

				// 地主牌开牌动画
				
				poker_html = '';
				$('.all_poker li').remove();

				// 把最后三张牌的数据发给主地角色玩家
				for(let i=0;i<all_poker.length;i++){
					poker_html = makePoker(all_poker[i]);
					$('.all_poker').append(poker_html);

					//三张牌插入到地主牌中
					$('.play').eq(get_play).append(poker_html);

					// 分两种情况
					if(get_play == 1){
						$('.play').eq(get_play).find('li:last').css({left:(17+i)*25+'px'})
					}else{
						$('.play').eq(get_play).find('li:last').css({top:(17+i)*25+'px'})
					}
					//数据上最后三张牌添加到地主玩家数据中，
					player[get_play].poker.push(all_poker[i]);
				}

				//三张牌打开向上
				$('.all_poker li').eq(0).animate({left:'0px'},500).animate({top:'-120px'},200);
				$('.all_poker li').eq(1).animate({left:'-130px'},500).animate({top:'-120px'},200);
				$('.all_poker li').eq(2).animate({left:'130px'},500).animate({top:'-120px'},200);

				// 地主牌重新排序
				setTimeout(function(){
					//删除原牌组
					$('.play').eq(get_play).find('li').remove();

					//显示背面牌组
					for(let i=0;i<20;i++){
						$('.play').eq(get_play).append('<li class="back"></li>');
						//两种情况，中间玩家和两边玩家
						if(get_play == 1){
							$('.play').eq(get_play).find('li:last').css({left:25*i+'px'});
							$('.play').eq(get_play).css({left:-10*i+'px'});
						}
						else{
							$('.play').eq(get_play).find('li:last').css({top:25*i+'px'});
						}
					}
					//删除背面牌组,重新排序地主牌
					setTimeout(function(){
						// 地主牌重新排序
						pokerSort(player[get_play].poker);
						//删除
						$('.play').eq(get_play).find('li').remove();
						let poker_html = '';
						for(let i=0;i<player[get_play].poker.length;i++){
							poker_html = makePoker(player[get_play].poker[i]);
							//生成页面牌
							$('.play').eq(get_play).append(poker_html);
							//分两种情况
							if(get_play==1){
								$('.play').eq(get_play).find('li:last').css({left:25*i+'px'});
								$('.play').eq(get_play).css({left:-10*i+'px'});
							}else{
								$('.play').eq(get_play).find('li:last').css({top:25*i+'px'});
							}
						}
						//1.3出牌阶段,两个参数，当前为get_play,即地主玩家，0表示第一次不能取消
						playPoker(get_play,0);
					},200)
				},500)
			},900)
		});

		// 绑定不抢地主事件
		$('.play_btn').eq(get_play).on('click', '.cancel', function(){

			// alert('不抢地主');
			$('.message').show().find('.msg').html('不抢');
			if(cancelNum==3){
				$('.audio').attr({src:''})
			}else{
				$('.audio').attr({src:'./audio/buq.wav'})
			}

			setTimeout(function(){

				//不抢地主把定时器清除，重置
				clearInterval(ti);
				count = 16;

				cancelNum++;
				// console.log(cancelNum);
				if(cancelNum == 3){
					// alert('没有玩家抢地主，本局流局！');
					setTimeout(function(){
						$('.play_btn').find('.get').hide();
						$('.play_btn').find('.cancel').hide();
						$('.play_btn').find('.time1').hide();
						$('.audio').attr({src:'./audio/default.mp3'});
						$('.nobody').show();
						$('.nobody').on('click','.chongx',function(){
							window.location.href = window.location.href;
						});
					},1500)
				}
				// 隐藏当前的按钮组
				$('.play_btn').css({'display':'none'});

				// 移除本按钮组绑定的事件，防止重复绑定
				$('.play_btn').eq(get_play).find('.get').off('click');
				$('.play_btn').eq(get_play).find('.cancel').off('click');

				get_play = ++get_play > 2? 0: get_play;
				getBoss(get_play, cancelNum);
			},900)
			
		});
	}


	// 出牌阶段
	function playPoker(index, cancelNum){

		// 0、初始化所有页面元素与事件
		$('.play_btn2').css({'display':'none'});

		// 解绑选牌事件
		$('.play').off('click','li');

		// 解绑出牌事件
		$('.play_btn2').off('click', '.play_out');

		// 解绑过牌事件
		$('.play_btn2').off('click', '.pass');

		// 1、先让出牌玩家对应的按钮组显示
		$('.play_btn2').eq(index).css({'display':'block'});

		//定时器2
		$('.time2').eq(index).show();
		timmer2(index);

		//抢地主隐藏
		$('.message').hide();

		// console.log('diyici jinyong=='+game.desktop_poker.poker.length)

		//第一次出牌不能过牌
		if(game.desktop_poker.poker.length == 0){
			$('.pass').attr('disabled',true).css({color:'#ccc'});
		}else{
			$('.pass').attr('disabled',false).css({color:'aqua'});
		}

		// console.log('diyici jinyong=='+game.desktop_poker.poker.length)

		// 2、绑定选牌事件
		$('.play').eq(index).on('click', 'li', function(){
			let poker = {};
			poker.num = $(this).attr('data-num');
			poker.color = $(this).attr('data-color');

			if(index==1){
				if($(this).attr('class')=='select'){
					$(this).removeClass('select');
					delSelect(poker);
				}else{
					game.select_poker.poker.push(poker);
					$(this).addClass('select');
				}
			}else if(index==0){
				if($(this).attr('class')=='select'){
					$(this).removeClass('select');
					delSelect(poker);
				}else{
					game.select_poker.poker.push(poker);
					$(this).addClass('select');
				}
			}else{
				if($(this).attr('class')=='select'){
					$(this).removeClass('select');
					delSelect(poker);
				}else{
					game.select_poker.poker.push(poker);
					$(this).addClass('select');
				}
			}

		});

		// 3、绑定出牌事件
		$('.play_btn2').eq(index).on('click', '.play_out', function(){
			// alert('出牌');
			cancelNum=0;

			//清除定时器2，重置
			clearInterval(ti2);
			count2 = 26;

			// 调用检查牌型方法
			checkPoker(game.select_poker);

			//检查结果
			/*console.log('game.select_poker='+game.select_poker.poker);
			console.log('game.select_poker.type=='+game.select_poker.type);
			console.log('game.select_poker.max=='+game.select_poker.max);*/

			if(game.select_poker.type == 0){
				// alert('对不起，你出的牌不符合规则！');

				$('.message').show().find('.msg').html('不符合规则').css({fontSize:20+'px'});
				timmer2(index);
				setTimeout(function(){
					$('.message').hide();
				},1200)
				// count2 = count2;
			}
			else{
				// 调用选中牌与桌面牌组进行对比的函数
				if(vsPoker()){
					
					//选中的牌添加到桌面数据
					game.desktop_poker.type = game.select_poker.type;
					game.desktop_poker.max = game.select_poker.max;
					game.desktop_poker.poker = game.select_poker.poker;

					// 1、删除玩家手牌的数据,数据已删
					delPlayerPoker(index);

					//调用动画
					animate();

					//手牌删除
					$('.play').eq(index).find('li').remove();
					let s_html = '';
					for(let i=0;i<player[index].poker.length;i++){
						s_html = makePoker(player[index].poker[i]);
						$('.play').eq(index).append(s_html);
						if(index==1){
							$('.play').eq(index).find('li:last').css({left:25*i+'px'});
							$('.play').eq(index).css({left:-10*i+'px'});
						}else{
							$('.play').eq(index).find('li:last').css({top:25*i+'px'});
						}
					}

					// console.log('game.desktop_poker.poker1='+game.desktop_poker.poker);

					//每次出牌前把桌面牌清空
					$('.desk li').remove();

					//存入桌面牌数据
					// game.desktop_poker.poker.push(game.select_poker.poker);

					/*console.log('game.select_poker.poker.type=='+game.select_poker.type);
					console.log('game.select_poker.poker.max=='+game.select_poker.max);

					console.log('game.desktop_poker.type='+game.desktop_poker.type)
					console.log('game.desktop_poker.max='+game.desktop_poker.max)
					console.log('game.desktop_poker.poker='+game.desktop_poker.poker)*/

					// 执行对应的桌面效果，桌面出现新牌，玩家手牌消失

					//把牌生成桌面牌
					let strw = '';
					for(let i=0;i<game.select_poker.poker.length;i++){
						strw = makePoker(game.select_poker.poker[i]);
						$('.desk').append(strw);
						$('.desk li:last').css({left:i*25+'px'});
						$('.desk').css({left:i*-10+'px'});
					}

					//把选中的牌数组删除
					// game.select_poker.poker.splice(0,game.select_poker.poker.length);
					game.select_poker.poker = [];
					game.select_poker.type = 0;
					game.select_poker.max = 0;
					
					/*console.log('game.select_poker.poker='+game.select_poker.poker);
					console.log('-------')*/
					// game.select_poker.poker.push(poker);

					//把game.select_poker.poker数据删除
					//把桌面牌数据插入到desktop数据中；
					// delPlayerPoker()

					// 2、先判断是否已经胜出
					if(player[index].poker.length == 0){
						let i = 0;
						// alert('你赢了！');
						if(index==dizhu){
							i = '地主';
						}else{
							i = '农民';
						}
						$('.message').show().find('.msg').html(i+'玩家获胜');
						setTimeout(function(){
							$('.message').hide();
						},1500)

						//显示积分板
						setTimeout(function(){
							let html = '';
							if(i=='地主'){
								html += '<h1>你赢了！地主获胜</h1>';
								html += '<p>地主3000+1000:'+4000+'</p>';
								html += '<p>农民2000-500：'+2500+'</p>';
								html += '<p>农民2000-500：'+2500+'</p>';
								html += '<input class="again" type="button" value="再来一局" />'
							}else{
								html += '<h1>你输了！农民获胜</h1>';
								html += '<p>地主3000-1000:'+2000+'</p>';
								html += '<p>农民3000+500:'+3500+'</p>';
								html += '<p>农民3000+500'+3500+'</p>';
								html += '<input class="again" type="button" value="再来一局" />';
							}
							$('.score').show().html(html);
						},1550)


						let endbg=$('<div> /');
						endbg.css({width:'1920px',height:'1080px','background':'url(../images/end.png)'});
						$('body').append(endbg);
						setTimeout(function(){
							$(endbg).css({'display':'none'});
							},4000)


						//语音,语音默认地主为当前操作人
						if(i=='地主'){
							$('.audio').attr({src:'./audio/win.mp3'});
						}else{
							$('.audio').attr({src:'./audio/default.mp3'});
						}

					}else{
						// 3、准备让下一个玩家出牌
						index = ++index > 2? 0: index;

						// 调用出牌特效，并且返回特效的时长
						let a = game.desktop_poker.poker;
						let b = game.desktop_poker.type;
						let c = game.desktop_poker.max;
						let timeout = audioPlay(a,b,c);

						// 根据特效时长， 延时执行下一个玩家出牌
						setTimeout(function(){
							playPoker(index, cancelNum);
						}, timeout);
					}
				}
				else{
					// alert('不能出');
					timmer2(index);
					$('.message').show().find('.msg').html('不能出');
					setTimeout(function(){
						$('.message').hide();
					},1200)
				}
			}
		});

		//提示出牌
		// console.log('game.desktop_poker.poker.length=='+game.desktop_poker.poker.length);
		// console.log('index==='+index)
		$('.play_btn2').eq(index).on('click', '.tips', function(){
			tiShi(index);
		});

		// 3、绑定过牌事件
		$('.play_btn2').eq(index).on('click', '.pass', function(){

			// alert('过');
			$('.message').show().find('.msg').html('过');
			$('.audio').attr({src:'audio/pass.mp3'})

			setTimeout(function(){
				//清除定时器2，重置
				clearInterval(ti2);
				count2 = 26;

				//过牌取消class,并且删除数据
				delSelect(game.select_poker.poker);
				$('.play').eq(index).find('li').removeClass('select');

				index = ++index > 2? 0: index;
				console.log('index=='+index)

				cancelNum++;
				
				console.log('canselNum=='+ cancelNum)

				if(cancelNum == 2){
					// 1、清空桌面牌型数据
					game.desktop_poker.type = 0;
					game.desktop_poker.max = 0;
					game.desktop_poker.poker = [];

					//过两次删除桌面牌
					$('.desk li').remove();
					
					// 2、重置过牌次数
					cancelNum = 0;

					if(game.desktop_poker.poker.length==0){
						$('.pass').attr({disabled:true}).css({color:'#ccc'});
					}
				}
				// 执行出牌动
				// let timeout = videoPlay(game.select_poker);

				// setTimeout(function(){
					playPoker(index, cancelNum);
				// }, timeout);
			},900);
		});
	}

	//再来一局，刷新页面，积分重置
	$('.score').on('click','.again',function(){
		window.location.href = window.location.href;
		//再来一局，重新发牌
		click = 1;
		$('.body').find('.fapai').trigger('click');
	})

	// 删除选中牌组中的指定牌方法
	function delSelect(poker){
		let index = null;
		for(let i=0; i<game.select_poker.length; i++){
			if(game.select_poker[i].num == poker.num && game.select_poker[i].color == poker.color){
				index = i;
				// break;
			}
		}
		game.select_poker.poker.splice(index, 1);
		// console.log('game.select_poker:'+game.select_poker);
	}

	/**
	 * 玩家出牌成功后，删除对应玩家手牌数据
	 */
	function delPlayerPoker(index){
		let select_poker = game.select_poker.poker;
		let player_poker = player[index].poker;

		for(let i=0; i<select_poker.length; i++){
			for(let j=0; j<player_poker.length; j++){
				if(select_poker[i].num == player_poker[j].num && select_poker[i].color == player_poker[j].color){
					player_poker.splice(j, 1);
				}
			}
		}
	}

	
	/*
		为了更好的配合页面设计，很多时候我们都可以自己重写一些弹出框方法
		以下是一个简单的例子

	 	*/
		/*function alertMsg(msg){
			let $bg = $('<div />');
			$bg.css({width:'100%', height:'100%', 'background':'#000','opacity':'0.5', 'position':'absolute'});
			let msg_div = '<div style="width:200px; height:200px; background:#ccc;">'+msg+'</div>';
			$bg.append(msg_div);
			$('body').append($bg);
		}*/

	// alertMsg('小明好帅');
	
	/**
	 * 检查牌型的方法
	 * @param  object poker_data 需要检查牌型的数据对象
	 * @return {[type]}            [description]
	 *
	 * 牌型代号：
	 * 0：无效
	 * 1：单张
	 * 2：对子
	 * 3：三张
	 * 4：三带一
	 * 5：三带二
	 * 7：四带二
	 * 6: 顺子
	 * 8：连对
	 * 9: 飞机（飞机带两对）
	 * 10：
	 * 911：普通炸弹
	 * 110：王炸
	 */
	function checkPoker(poker_data){

		//poker_data==game.select_poker
		// 初始化牌型与判断值
		poker_data.type = 0;
		poker_data.max = 0;

		let poker = poker_data.poker;
		// 1、 为了方便牌型的判断，需要先把选中的牌进行排序
		pokerSort(poker_data.poker);

		// 2、通过牌的张数来行各牌的判断
		switch(poker.length){

			// 判断1张牌的情况
			case 1:
				poker_data.type = 1;		// 设置牌型为单张

				// 判断普通单张的判断值
				if(poker[0].num < 14){
					poker_data.max = poker[0].num;
				}else{
					// 判断大小王
					if(poker[0].color == 0){
						poker_data.max = 14;	// 小王的判断值
					}else{
						poker_data.max = 15;	// 大王的判断值
					}
				}
			break;
			// 判断两张牌的情况
			case 2:
				// 判断两张牌的点数是否一样
				if(poker[0].num == poker[1].num){
					// 是否是普通对子还是王炸
					if(poker[0].num < 14){
						poker_data.type = 2;		// 设置牌型为对子
						poker_data.max = poker[0].num;
					}else{
						poker_data.type = 110;		// 设置牌型为王炸
						poker_data.max = poker[0].num;
					}
				}
			break;
			// 判断三张牌的情况
			case 3:
				// 判断三张牌的点数是否相等
				if(poker[0].num == poker[2].num){
					poker_data.type = 3;		// 设置牌型为王炸
					poker_data.max = poker[0].num;	// 判断值
				}
			break;
			// 判断四张牌的情况
			case 4:
				// 判断四张牌的点数是否相等
				if(poker[0].num == poker[3].num){
					poker_data.type = 911;		// 设置牌型为普通炸弹
					poker_data.max = poker[0].num;	// 判断值
				}else if(poker[0].num == poker[2].num || poker[1].num == poker[3].num ){
					poker_data.type = 4;		// 设置牌型为三带一
					poker_data.max = poker[1].num;	// 判断值
				}
			break;
			// 判断五张牌的情况
			case 5:
				// 判断三带二
				if(poker[0].num == poker[2].num && poker[3].num == poker[4].num || poker[0].num == poker[1].num && poker[2].num == poker[4].num){
					poker_data.type = 5;		// 设置牌型为三带二
					poker_data.max = poker[2].num;	// 判断值
				}
				else if(checkStraight(poker)){		// 判断顺子
					poker_data.type = 6;		// 设置牌型顺子
					poker_data.max = poker[poker.length-1].num;	// 判断值
				}
			break;
			// 判断六张牌的情况
			case 6:
				if(checkStraight(poker)){		// 判断顺子
					poker_data.type = 6;		// 设置牌型顺子
					poker_data.max = poker[poker.length-1].num;	// 判断值
				}else if(checkStraightPairs(poker)){		// 判断连对
					poker_data.type = 8;		// 设置牌型连对
					poker_data.max = poker[poker.length-1].num;	// 判断值
				}else if(poker[0].num == poker[3].num || poker[1].num == poker[4].num || poker[2].num == poker[5].num){		// 判断四带二
					poker_data.type = 7;		// 设置牌型连对
					poker_data.max = poker[4].num;	// 判断值
				}
			break;

			// 判断七张牌的情况
			case 7:
				if(checkStraight(poker)){		// 判断顺子
					poker_data.type = 6;		// 设置牌型顺子
					poker_data.max = poker[poker.length-1].num;	// 判断值
				}
			break;

			// 判断八张牌的情况
			// case 8:
			// 	if(checkStraight(poker)){		// 判断顺子
			// 		poker_data.type = 6;		// 设置牌型顺子
			// 		poker_data.max = poker[poker.length-1].num;	// 判断值
			// 	}else if(checkStraightPairs(poker)){		// 判断连对
			// 		poker_data.type = 8;		// 设置牌型连对
			// 		poker_data.max = poker[poker.length-1].num;	// 判断值
			// 	}
			// break;

			// 判断八张牌的情况
			case 8:
					if(checkStraight(poker)){		
					poker_data.type = 6;		
					poker_data.max = poker[poker.length-1].num;	
				}else if(checkStraightPairs(poker)){		
					poker_data.type = 8;		
					poker_data.max = poker[poker.length-1].num;	
			    }else if(poker[0].num == poker[2].num && poker[3].num == poker[5].num && (poker[2].num*1)+1 == poker[3].num ){
					poker_data.type = 9;//飞机   
					poker_data.max = poker[5].num;
			    }else if(poker[1].num == poker[3].num && poker[4].num == poker[6].num && (poker[3].num*1)+1 == poker[4].num){
                    poker_data.type = 9;//飞机    
					poker_data.max = poker[6].num;
			    }else if(poker[2].num == poker[4].num && poker[5].num == poker[7].num && (poker[4].num*1)+1 == poker[5].num){			   	      
			   	    poker_data.type = 9;//飞机    
					poker_data.max = poker[7].num; 
           	}
			break;

			//判断九张牌
			case 9:
				if(checkStraight(poker)){		
					poker_data.type = 6;//顺子		
					poker_data.max = poker[poker.length-1].num;	
				}
			break;

			//十张牌
			case 10:
			if(checkStraight(poker)){		
					poker_data.type = 6;		
					poker_data.max = poker[poker.length-1].num;	
				}

			    else if(poker[0].num == poker[2].num && poker[3].num == poker[5].num && (poker[2].num*1)+1 == poker[3].num && 
			   		poker[6].num == poker[7].num && poker[8].num == poker[9].num ){			   	    
			   	    poker_data.type = 9;//飞机带两对   
					poker_data.max = poker[5].num; 
				//3344455566
			    }else if(poker[2].num == poker[4].num && poker[5].num == poker[7].num && (poker[4].num*1)+1 == poker[5].num && 
			   	    poker[0].num == poker[1].num && poker[8].num == poker[9].num){			   	       
	                poker_data.type = 9;//飞机带两对    
					poker_data.max = poker[7].num;

				//
                }else if(poker[4].num == poker[6].num && poker[7].num == poker[9].num && (poker[6].num*1)+1 == poker[7].num && 
			   	    poker[0].num == poker[1].num && poker[2].num == poker[3].num ){ 	   	        
			   	    poker_data.type = 9;//飞机带两对
					poker_data.max = poker[9].num;
                }
                else if(checkStraightPairs(poker)){		
					poker_data.type = 8;//连对	
					poker_data.max = poker[poker.length-1].num;

				//5556667788
			    }
            break;

            //十一张牌
            case 11:
				if(checkStraight(poker)){		
					poker_data.type = 6;		
					poker_data.max = poker[poker.length-1].num;	
				}
			break;

			//十二张牌
			case 12:
			if(checkStraight(poker)){		
				poker_data.type = 6;	
				poker_data.max = poker[poker.length-1].num;	
			}else if(checkStraightPairs(poker)){		
				poker_data.type = 8;//连对		
				poker_data.max = poker[poker.length-1].num;	
			}else if(poker[0].num == poker[2].num && poker[3].num == poker[5].num && poker[6].num == poker[8].num && 
				(poker[2].num*1)+1 == poker[3].num && (poker[5].num*1)+1 == poker[6].num){
			    poker_data.type = 9;//两四张带两对   
				poker_data.max = poker[8].num;
			}else if(poker[1].num == poker[3].num && poker[4].num == poker[6].num && poker[7].num == poker[9].num &&
				(poker[3].num*1)+1 == poker[4].num && (poker[6].num*1)+1 == poker[7].num){
			    poker_data.type = 9;  //两四张带两对    
				poker_data.max = poker[9].num;
			}else if(poker[2].num == poker[4].num && poker[5].num == poker[7].num && poker[8].num == poker[10].num &&
				(poker[4].num*1)+1 == poker[5].num && (poker[7].num*1)+1 == poker[8].num){
			    poker_data.type = 9;    //两四张带两对  
				poker_data.max = poker[10].num;
			}else if(poker[3].num == poker[5].num && poker[6].num == poker[8].num && poker[9].num == poker[11].num &&
				(poker[5].num*1)+1 == poker[6].num && (poker[8].num*1)+1 == poker[9].num){        			   	  
				poker_data.type = 9;    //两四张带两对  
				poker_data.max = poker[11].num;
            }
			break;

			//十四张牌
			case 14:
               	if(checkStraightPairs(poker)){		
					poker_data.type = 8;		
					poker_data.max = poker[poker.length-1].num;	
                }
            break;

            //十五张牌
            case 15:
		        if(poker[0].num == poker[2].num && poker[3].num == poker[5].num && poker[6].num == poker[8].num && 
			   	    (poker[2].num*1)+1 == poker[3].num && (poker[5].num*1)+1 == poker[6].num &&
			   	    poker[9].num == poker[10].num  && poker[11].num == poker[12].num && poker[13].num == poker[14].num){			   	       
                    poker_data.type = 9;    
					poker_data.max = poker[8].num; 
			    }else if(poker[2].num == poker[4].num && poker[5].num == poker[7].num && poker[8].num == poker[10].num &&
			   	    (poker[4].num*1)+1 == poker[5].num && (poker[7].num*1)+1 == poker[8].num &&
			   	    poker[0].num == poker[1].num  && poker[11].num == poker[12].num && poker[13].num == poker[14].num){
			   	    poker_data.type = 9;    
					poker_data.max = poker[10].num;
			    }else if(poker[4].num == poker[6].num && poker[7].num == poker[9].num && poker[10].num == poker[12].num &&
			   	   	(poker[6].num*1)+1 == poker[7].num && (poker[9].num*1)+1 == poker[10].num &&
			   	    poker[0].num == poker[1].num  && poker[2].num == poker[3].num && poker[13].num == poker[14].num){
			   	    poker_data.type = 9;    
					poker_data.max = poker[12].num; 
			    }else if(poker[6].num == poker[8].num && poker[9].num == poker[11].num && poker[12].num == poker[14].num &&
			   	    (poker[8].num*1)+1 == poker[9].num && (poker[10].num*1)+1 == poker[11].num &&
			   	    poker[0].num == poker[1].num  && poker[2].num == poker[3].num && poker[4].num == poker[5].num){
		   	        poker_data.type = 9;    
					poker_data.max = poker[14].num; 
                }
			break;

			//十六张牌
			case 16:
			    if(checkStraightPairs(poker)){		
					poker_data.type = 8;		
					poker_data.max = poker[poker.length-1].num;	
                }else if(poker[0].num == poker[2].num && poker[3].num == poker[5].num && poker[6].num == poker[8].num && poker[9].num == poker[11].num && 
			   	    (poker[2].num*1)+1 == poker[3].num && (poker[5].num*1)+1 == poker[6].num && (poker[8].num*1)+1 == poker[9].num){
                    poker_data.type = 9;    
					poker_data.max = poker[11].num;
			    }else if(poker[1].num == poker[3].num && poker[4].num == poker[6].num && poker[7].num == poker[9].num && poker[10].num == poker[12].num && 
			   	    (poker[3].num*1)+1 == poker[4].num && (poker[6].num*1)+1 == poker[7].num && (poker[9].num*1)+1 == poker[10].num){
                    poker_data.type = 9;    
					poker_data.max = poker[12].num;
			    }else if(poker[2].num == poker[4].num && poker[5].num == poker[7].num && poker[8].num == poker[10].num && poker[11].num == poker[13].num &&
			   	    (poker[4].num*1)+1 == poker[5].num && (poker[7].num*1)+1 == poker[8].num && (poker[10].num*1)+1 == poker[11].num){
                    poker_data.type = 9;    
					poker_data.max = poker[13].num;
			    }else if(poker[3].num == poker[5].num && poker[6].num == poker[8].num && poker[9].num == poker[11].num && poker[12].num == poker[14].num &&
			   	    (poker[5].num*1)+1 == poker[6].num && (poker[8].num*1)+1 == poker[9].num && (poker[11].num*1)+1 == poker[12].num){
			   	    poker_data.type = 9;    
					poker_data.max = poker[14].num;
			    }else if(poker[4].num == poker[6].num && poker[7].num == poker[9].num && poker[10].num == poker[12].num && poker[13].num == poker[15].num &&
			   	    (poker[5].num*1)+1 == poker[6].num && (poker[8].num*1)+1 == poker[9].num && (poker[12].num*1)+1 == poker[13].num){        			   	  
			   	    poker_data.type = 9;    
					poker_data.max = poker[15].num;
           	    }
			break;

			case 18:
               if(checkStraightPairs(poker)){		
					poker_data.type = 8;		
					poker_data.max = poker[poker.length-1].num;	
               }
            break;

            case 20:
            if(checkStraightPairs(poker)){		
				poker_data.type = 8;		
				poker_data.max = poker[poker.length-1].num;	
            }else if(poker[0].num == poker[2].num && poker[3].num == poker[5].num && poker[6].num == poker[8].num && 
               	poker[9].num == poker[11].num && poker[12].num == poker[14].num &&
			   	(poker[2].num*1)+1 == poker[3].num && (poker[5].num*1)+1 == poker[6].num && 
			   	(poker[8].num*1)+1 == poker[9].num && (poker[11].num*1)+1 ==poker[12]){
                poker_data.type = 9;    
				poker_data.max = poker[14].num;
			}else if(poker[1].num == poker[3].num && poker[4].num == poker[6].num && poker[7].num == poker[9].num && 
			   	poker[10].num == poker[12].num && poker[13].num == poker[15].num &&
			   	(poker[3].num*1)+1 == poker[4].num && (poker[6].num*1)+1 == poker[7].num && 
			   	(poker[9].num*1)+1 == poker[10].num && (poker[12].num*1)+1 ==poker[13].num){
                poker_data.type = 9;    
				poker_data.max = poker[15].num;
			}else if(poker[2].num == poker[4].num && poker[5].num == poker[7].num && poker[8].num == poker[10].num && 
			   	poker[11].num == poker[13].num && poker[14].num == poker[16].num &&
			   	(poker[4].num*1)+1 == poker[5].num && (poker[7].num*1)+1 == poker[8].num && 
			   	(poker[10].num*1)+1 == poker[11].num && (poker[13].num*1)+1 ==poker[14].num){
                poker_data.type = 9;    
				poker_data.max = poker[16].num;
			}else if(poker[3].num == poker[5].num && poker[6].num == poker[8].num && poker[9].num == poker[11].num && 
			   	poker[12].num == poker[14].num && poker[15].num == poker[17].num &&
			   	(poker[5].num*1)+1 == poker[6].num && (poker[8].num*1)+1 == poker[9].num && 
			   	(poker[11].num*1)+1 == poker[12].num && (poker[14].num*1)+1 ==poker[15].num){
			   	poker_data.type = 9;    
				poker_data.max = poker[17].num;
			}else if(poker[4].num == poker[6].num && poker[7].num == poker[9].num && poker[10].num == poker[12].num && 
			   	poker[13].num == poker[15].num && poker[16].num == poker[18].num &&
			   	(poker[5].num*1)+1 == poker[6].num && (poker[8].num*1)+1 == poker[9].num && 
			   	(poker[12].num*1)+1 == poker[13].num && (poker[15].num*1)+1 ==poker[16].num){        			   	  
			   	poker_data.type = 9;    
				poker_data.max = poker[18].num;
            }else if(poker[5].num == poker[7].num && poker[8].num == poker[10].num && poker[11].num == poker[13].num && 
			   	poker[14].num == poker[16].num && poker[17].num == poker[19].num &&
			   	(poker[5].num*1)+1 == poker[6].num && (poker[8].num*1)+1 == poker[9].num && 
			   	(poker[12].num*1)+1 == poker[13].num && (poker[16].num*1)+1 ==poker[17].num){        			   	  
			   	poker_data.type = 9;    
				poker_data.max = poker[19].num;


            }else if(poker[0].num == poker[2].num && poker[3].num == poker[5].num && poker[6].num == poker[8].num && poker[9].num == poker[11].num && 
			   	(poker[2].num*1)+1 == poker[3].num && (poker[5].num*1)+1 == poker[6].num && (poker[8].num*1)+1 == poker[9].num &&
			   	poker[12].num == poker[13].num && poker[14].num == poker[15].num && poker[16].num == poker[17].num && poker[18].num ==poker[19].num){
                poker_data.type = 9;    
				poker_data.max = poker[11].num;
			}else if(poker[2].num == poker[4].num && poker[5].num == poker[7].num && poker[8].num == poker[10].num && poker[11].num == poker[13].num && 
			   	(poker[4].num*1)+1 == poker[5].num && (poker[7].num*1)+1 == poker[8].num && (poker[10].num*1)+1 == poker[11].num &&
			   	poker[0].num == poker[1].num && poker[14].num == poker[15].num && poker[16].num == poker[17].num && poker[18].num ==poker[19].num){
                poker_data.type = 9;    
				poker_data.max = poker[13].num;
			}else if(poker[4].num == poker[6].num && poker[7].num == poker[9].num && poker[10].num == poker[12].num && poker[13].num == poker[15].num &&
			   	(poker[6].num*1)+1 == poker[7].num && (poker[9].num*1)+1 == poker[10].num && (poker[12].num*1)+1 == poker[13].num &&
			   	poker[0].num == poker[1].num && poker[2].num == poker[3].num && poker[16].num == poker[17].num && poker[18].num ==poker[19].num){
                poker_data.type = 9;    
				poker_data.max = poker[15].num;
			}else if(poker[6].num == poker[8].num && poker[9].num == poker[11].num && poker[12].num == poker[14].num && poker[15].num == poker[17].num &&
			   	(poker[8].num*1)+1 == poker[9].num && (poker[11].num*1)+1 == poker[12].num && (poker[14].num*1)+1 == poker[15].num &&
			   	poker[0].num == poker[1].num && poker[2].num == poker[3].num && poker[4].num == poker[5].num && poker[18].num ==poker[19].num){
			   	poker_data.type = 9;    
				poker_data.max = poker[17].num;
			}else if(poker[8].num == poker[10].num && poker[11].num == poker[13].num && poker[14].num == poker[16].num && poker[17].num == poker[19].num &&
			   	(poker[10].num*1)+1 == poker[11].num && (poker[13].num*1)+1 == poker[14].num && (poker[16].num*1)+1 == poker[17].num &&
			   	poker[0].num == poker[1].num && poker[2].num == poker[3].num && poker[4].num == poker[5].num && poker[6].num ==poker[7].num){        			   	  
			   	poker_data.type = 9;    
				poker_data.max = poker[19].num;
           	}
           	break;
		}
	}

	/**
	 * 判断牌型是否为顺子
	 * break	用于跳出当前循环（语句）
	 * continue 用于跳过当前循环（语句）
	 * return 直接返回出当前函数的结果，也可以认为是结束函数。如果写在函数外部，可以认为结束程序
	 * 
	 * @param Array poker 牌组的具体数据，用于判断是不是顺子
	 * @return boolean 如果检查的数据是顺子，返回true,否则返回false
	 */
	function checkStraight(poker){
		for(let i=0; i<poker.length-1; i++){
			if((poker[i].num*1) + 1 != poker[i+1].num || (poker[poker.length-1].num)*1 > 12){
				return false;
			}
		}
		return true;
	}

	/**
	 * 检查牌型是否为连对
	 * @param  Array poker 牌组的具体数据
	 * @return Boolean      如果检查的数据是连对，返回true,否则返回false
	 */
	function checkStraightPairs(poker){
		// 3344556677
		for(let i=0; i<poker.length-3; i+=2){
			if( poker[i].num*1 + 1 != poker[i+3].num || poker[i+1].num*1 + 1 != poker[i+2].num || (poker[poker.length-1].num)*1 > 12){ //3344455566 ?
				return false;
			}
			return true;
		}
	}

	/**
	 * 用于对比选中的牌型与桌面牌型
	 * @return Boolean  如果选中牌型大于桌面牌型，返回true,否则返回false
	 */
	function vsPoker(){

		// 判断桌面没牌肯定可以打出去
		if(game.desktop_poker.poker.length == 0){
			return true;
		}

		// 判断打出去的是王炸
		if(game.select_poker.type == 110){
			return true;
		}

		// 判断桌面上的牌是王炸
		if(game.desktop_poker.type == 110){
			return false;
		}

		// 判断如果桌面上的不是炸弹，选中是炸弹
		if(game.select_poker.type == 911 && game.desktop_poker.type != 911){
			return true;
		}

		// 判断普通牌型
		if(game.select_poker.type == game.desktop_poker.type && 
			game.desktop_poker.poker.length == game.select_poker.poker.length &&
			game.select_poker.max*1 > game.desktop_poker.max*1
			){
			return true;
		}
		return false;
	}

	//定时器1函数
	let  count = 16;
	function timmer(index){
		
		ti = setInterval(function(){
			count--;
			$('.play_btn').eq(index).find('.time1').html(count);
			// console.log('count='+count);
			if(count==0){
				clearInterval(ti);
				$('.play_btn').eq(index).find('.cancel').trigger('click');
				count = 16;
				return;
			}
		},1000)
	}

	//定时器2函数
	let  count2 = 26;
	function timmer2(index){
		
		ti2 = setInterval(function(){
			count2--;
			$('.play_btn2').eq(index).find('.time2').html(count2);
			// console.log('count2='+count2);
			if(count2==0){
				clearInterval(ti2);
				$('.play_btn2').eq(index).find('.pass').trigger('click');
				count2 = 26;
				return;
			}
		},1000)
	}

	/**
		* 出牌类型的动画方法
		* 牌型代号：
		* 4：三带一
		* 5：三带二
		* 7：四带二
		* 6: 顺子
		* 8：连对
		* 911：普通炸弹
		* 110：王炸
	*/
	/*function animate(){
		let Cartoon = $('<div />');
		Cartoon.css({width:'250px', height:'200px', 'position':'absolute','opacity':'1',top:'70%',left:'0%'});
		console.log(Cartoon);
		$('body').append(Cartoon);
		  
		if (game.desktop_poker.type == 6){
			setTimeout(function(){	
				Cartoon.css({background:'url(./images/shunzi.png)'});
				$(Cartoon).animate({left:'50%',top:'40%'});
				setTimeout(function(){
					Cartoon.css({'display':'none'});
				},3000);
			},1000);
		
		}
		else if(game.select_poker.type == 7){
			setTimeout(function(){	
				Cartoon.css({'background':'url(./images/4-2.png)'});
				$(Cartoon).animate({left:'50%',top:'50%'});
				setTimeout(function(){
					Cartoon.css({'display':'none'});
				},3000);
			},1000);
		}
		else if (game.select_poker.type == 9 || game.select_poker.type == 10) {
			setTimeout(function(){	
				Cartoon.css({'background':'url(./images/plane.png)'});
				$(Cartoon).animate({left:'50%',top:'50%'});
				setTimeout(function(){
					Cartoon.css({'display':'none'});
				},3000);
			},1000);
		}
		else if (game.select_poker.type == 8) {
			setTimeout(function(){	
				Cartoon.css({'background':'url(./images/liandui.png)'});
				$(Cartoon).animate({left:'45%',top:'40%'});
				setTimeout(function(){
					Cartoon.css({'display':'none'});
				},3000);
			},1000);
		}
		else if (game.select_poker.type == 911) {
			setTimeout(function(){	
				Cartoon.css({'background':'url(./images/boom.png)'});
				$(Cartoon).animate({left:'45%',top:'40%'});
				setTimeout(function(){
					Cartoon.css({'display':'none'});
				},3000);
			},1000);
		}
		else if (game.select_poker.type == 110) {
			setTimeout(function(){	
				Cartoon.css({'background':'url(./images/bigBoom.jpg)'});
				$(Cartoon).animate({left:'45%',top:'40%'});
				setTimeout(function(){
					Cartoon.css({'display':'none'});
				},3000);
			},1000);
		}
	}*/




	function animate(){
		let Cartoon = $('<div />');
		Cartoon.css({width:'250px', height:'200px', 'position':'absolute','opacity':'1',top:'70%',left:'0%'});
		console.log(Cartoon);
		$('body').append(Cartoon);
	
		 if (game.select_poker.type == 4) {
			Cartoon.css({'background':'url(./images/san1.png)'});
				$(Cartoon).animate({left:'40%',top:'40%'},200);
			setTimeout(function(){	
				$(Cartoon).animate({left:'90%',top:'70%'},250);
				setTimeout(function(){
					Cartoon.css({'display':'none'});
				},500);
			},2000);
		
		
		}
		 else if (game.select_poker.type == 5) {
			Cartoon.css({'background':'url(./images/sand.gif)'});
				$(Cartoon).css({width:'500', height:'281px', 'position':'absolute','opacity':'1',top:'30%',left:'40%'}).animate({left:'40%',top:'40%'},200);
			setTimeout(function(){	
				// $(Cartoon).animate({left:'90%',top:'70%'},250);
				setTimeout(function(){
					Cartoon.css({'display':'none'});
				},500);
			},3000);
		
		
		}
		else if (game.desktop_poker.type == 6){
			setTimeout(function(){	
				Cartoon.css({background:'url(./images/顺子.gif)'});
				$(Cartoon).animate({width:'600', height:'338px',left:'40%',top:'40%'});
				setTimeout(function(){
					Cartoon.css({'display':'none'});
				},3000);
			},1000);
		
		}
		else if(game.select_poker.type == 7){
			setTimeout(function(){	
				Cartoon.css({'background':'url(./images/4-2.png)'});
				$(Cartoon).animate({left:'50%',top:'50%'});
				setTimeout(function(){
					Cartoon.css({'display':'none'});
				},3000);
			},1000);
		}
		else if (game.select_poker.type == 9 || game.select_poker.type == 10) {
			setTimeout(function(){	
				Cartoon.css({width:'500px', height:'336px','background':'url(./images/timg.png)'});
				$(Cartoon).animate({left:'65%',top:'40%'});
				setTimeout(function(){
					Cartoon.css({'display':'none'});
				},3000);
			},1000);
		}
		else if (game.select_poker.type == 8) {
			setTimeout(function(){	
				Cartoon.css({'background':'url(./images/liandui.png)'});
				$(Cartoon).animate({left:'45%',top:'40%'});
				setTimeout(function(){
					Cartoon.css({'display':'none'});
				},3000);
			},1000);
		}
		else if (game.select_poker.type == 911) {
			Cartoon.css({width:'350px', height:'300px','background':'url(./images/ren.png)'});
				$(Cartoon).animate({left:'35%',top:'40%'},100);
			setTimeout(function(){	
				$(Cartoon).animate({left:'90%',top:'70%'},300);
				setTimeout(function(){
					Cartoon.css({'display':'none'});
				},500);
			},2000);
			bomb();
		
		}
		else if (game.select_poker.type == 110) {
			setTimeout(function(){	
				Cartoon.css({width:'560px', height:'315px','background':'url(./images/炸弹.gif)'});
				$(Cartoon).animate({left:'40%',top:'25%'});
				setTimeout(function(){
					Cartoon.css({'display':'none'});
				},4000);
			},1000);
		}
	}

	//普通炸弹动画
	function bomb(){
		let bombshell = $('<div />');
		bombshell.css({width:'350px', height:'300px', 'position':'absolute','opacity':'1',left:'45%',top:'15%'});
		// console.log(bombshell);
		$('body').append(bombshell);
		if (game.select_poker.type ==911) {
			setTimeout(function(){


		bombshell.css({'background':'url(./images/huo.png)'});
		// setTimeout(function(){
		// 	$(bombshell).animate({left:'90%'},250);
		
		setTimeout(function(){
			bombshell.css({'display':'none'});
		// },1000);
		},500);
	},500);	
		}}




	//提示函数
	//提示函数
	function tiShi(index){
	
		//手牌长度
		let help_length = $('.play').eq(index).find('li').length;

		if(game.desktop_poker.type == 0){
			if(help >0){
				$('.play').eq(index).find('li').eq(help-1).trigger('click');
			}
			$('.play').eq(index).find('li').eq(help).trigger('click');

			help =  help++ > $('.play').eq(index).find('li').length ?  0:help ;
		}

		if(game.desktop_poker.poker.length == 1){				
			for(let j = 0;j< help_length;j++){

				$('.play').eq(index).find('li').eq(j).trigger('click');
				checkPoker(game.select_poker);
				if(vsPoker()){
					break;
				}else{
					$('.play').eq(index).find('li').eq(j).trigger('click');
				}
			}		
		}

		if(game.desktop_poker.poker.length == 2){
			for(let j = 0;j< 20-1;j++){
				$('.play').eq(index).find('li').eq(j).trigger('click');
				$('.play').eq(index).find('li').eq(j+1).trigger('click');
				checkPoker(game.select_poker);
				if(vsPoker()){
					break;
				}else{
					$('.play').eq(index).find('li').eq(j).trigger('click');
					$('.play').eq(index).find('li').eq(j+1).trigger('click');
				}
			}
		}

		if(game.desktop_poker.poker.length == 3){
			for(let j = 0;j< 20-2;j++){
				$('.play').eq(index).find('li').eq(j).trigger('click');
				$('.play').eq(index).find('li').eq(j+1).trigger('click');
				$('.play').eq(index).find('li').eq(j+2).trigger('click');
				checkPoker(game.select_poker);
				if(vsPoker()){
					break;
				}else{
					$('.play').eq(index).find('li').eq(j).trigger('click');
					$('.play').eq(index).find('li').eq(j+1).trigger('click');
					$('.play').eq(index).find('li').eq(j+2).trigger('click');
				}	
			}
		}
		if(game.desktop_poker.poker.length == 4){
			if(game.desktop_poker.type==911){
				for(let j = 0;j< 20-3;j++){
					$('.play').eq(index).find('li').eq(j).trigger('click');
					$('.play').eq(index).find('li').eq(j+1).trigger('click');
					$('.play').eq(index).find('li').eq(j+2).trigger('click');
					$('.play').eq(index).find('li').eq(j+3).trigger('click');
					checkPoker(game.select_poker);
					if(vsPoker()){
						break;
					}else{
						$('.play').eq(index).find('li').eq(j).trigger('click');
						$('.play').eq(index).find('li').eq(j+1).trigger('click');
						$('.play').eq(index).find('li').eq(j+2).trigger('click');
						$('.play').eq(index).find('li').eq(j+3).trigger('click');
					}	
				}
			}else{
				for(let j = 0;j< 20-3;j++){
					$('.play').eq(index).find('li').eq(0).trigger('click');
					$('.play').eq(index).find('li').eq(j+1).trigger('click');
					$('.play').eq(index).find('li').eq(j+2).trigger('click');
					$('.play').eq(index).find('li').eq(j+3).trigger('click');
					checkPoker(game.select_poker);
					if(vsPoker()){
						break;
					}else{
						$('.play').eq(index).find('li').eq(0).trigger('click');
						$('.play').eq(index).find('li').eq(j+1).trigger('click');
						$('.play').eq(index).find('li').eq(j+2).trigger('click');
						$('.play').eq(index).find('li').eq(j+3).trigger('click');
					}	
				}
			}
		}

	}
	if(game.desktop_poker.poker.length == 5){
			for(let j = 0;j< 20-4;j++){
				$('.play').eq(index).find('li').eq(j).trigger('click');
				$('.play').eq(index).find('li').eq(j+1).trigger('click');
				$('.play').eq(index).find('li').eq(j+2).trigger('click');
				$('.play').eq(index).find('li').eq(j+3).trigger('click');
				$('.play').eq(index).find('li').eq(j+4).trigger('click');
				checkPoker(game.select_poker);
				if(vsPoker()){
					break;
				}else{
					$('.play').eq(index).find('li').eq(j).trigger('click');
					$('.play').eq(index).find('li').eq(j+1).trigger('click');
					$('.play').eq(index).find('li').eq(j+2).trigger('click');
					$('.play').eq(index).find('li').eq(j+3).trigger('click');
					$('.play').eq(index).find('li').eq(j+4).trigger('click');
				}	
			}
		}
	timmer3();
	let tiao = 31;
	function timmer3(){
		ti3 = setInterval(function(){
			tiao--;
			$('.tiaoguo').html('跳过'+tiao+'s')
			if(tiao==0){
				clearInterval(ti3);
			}
		},1000)
	}

	//跳过
	$('.tiaoguo').click(function(){
		$('.kaic').css('display','none');
		$('.img').hide();
		$(this).hide();
		let video = document.getElementById('myvideo');
		video.muted = true;
	})

	//视频播放
	setTimeout(function(){
		$('.kaic').hide();
	},30000)

	//开场
	setTimeout(function(){
		kaimu();
		setTimeout(function(){
			$('.img').hide();
		},2000)
	},30100)
	setTimeout(function(){
		$('.tiaoguo').hide();
	},31100)

	function kaimu(){
		$('.dragon1').animate({left:'-500px',top:'-500px'},2000);
		$('.dragon2').animate({left:'-300px',top:'-700px'},2000);
		$('.dragon3').animate({left:'-100px',top:'-700px'},2000);
		$('.dragon4').animate({left:'100px',top:'-700px'},2000);
		$('.dragon5').animate({left:'300px',top:'-700px'},2000);
		$('.dragon6').animate({left:'500px',top:'-500px'},2000);
		$('.dragon7').animate({left:'-500px',bottom:'-500px'},2000);
		$('.dragon8').animate({left:'-300px',bottom:'-500px'},2000);
		$('.dragon9').animate({left:'-100px',bottom:'-500px'},2000);
		$('.dragon10').animate({left:'100px',bottom:'-500px'},2000);
		$('.dragon11').animate({left:'300px',bottom:'-500px'},2000);
		$('.dragon12').animate({left:'500px',bottom:'-500px'},2000);
	}
	/**
	 * 播放语音方法
	 */
		/*
		* 牌型代号：
		* 0：无效
		* 1：单张
		* 2：对子
		* 3：三张
		* 4：三带一
		* 5：三带二
		* 7：四带二
		* 6: 顺子
		* 8：连对
		* 9：飞机
		* 911：普通炸弹
		* 110：王炸
		*/ 
	/*function audioPlay(poker,type,max){
		switch(type){
			
			//判断王炸
			case 110:
				$('.audio').attr({src:'./audio/queen1.mp3'})
			break;
			case 911:
				$('.audio').attr({src:'./audio/boom.mp3'});
			break;

			//单张
			case 1:
				if(poker[0].num < 14){
					// switch(max){
					// 	//牌3
					// 	case 1:
					// 		$('.audio').attr({src:'./audio/3-1.mp3'});
					// 	break;
					// }
					$('.audio').attr({src:'./audio/dan.mp3'});
				}else{
					if(poker[0].color==0){
						$('.audio').attr({src:'./audio/queen1.mp3'})//小王
					}else if(poker[0].color==1){
						$('.audio').attr({src:'./audio/queen1.mp3'})//大王
					}
				}
			break;

			//对子
			case 2:
				$('.audio').attr({src:'./audio/pairs.mp3'});
			break;

			//三张
			case 3:
				alert('三张');
			break;

			//三带一
			case 4:
				$('.audio').attr({src:'./audio/3-1.mp3'});
			break;

			//三带二
			case 5:
				$('.audio').attr({src:'./audio/3-2.mp3'})
			break;

			//顺子
			case 6:
				$('.audio').attr({src:'./audio/straight.mp3'});
			break;

			//四带二
			case 7:
				$('.audio').attr({src:'./audio/4-2.mp3'});
			break;

			//连对
			case 8:
				$('.audio').attr({src:'./audio/pairs.mp3'});
			break;

			//飞机
			case 9:
				alert('飞机');
			break;

			case 10:
				$('.audio').attr({src:'./audio/plane.mp3'});
			break;
		}
		return 1000;
	}*/
});