	/**
	 * 播放语音方法
	 */
	function audioPlay(poker,type,max){
		switch(type){
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
			//判断王炸
			case 110:
				$('.audio').attr({src:'./audio/queen1.mp3'})
			break;
			case 911:
				$('.audio').attr({src:'./audio/boom.mp3'});
			break;

			//单张
			case 1:
				$('.play').attr({src:'./audio/play.mp3'})
				if(poker[0].num < 14){
					// switch(max){
					// 	//牌3
					// 	case 1:
					// 		$('.audio').attr({src:'./audio/3-1.mp3'});
					// 	break;
					// }
					// $('.audio').attr({src:'./audio/dan.mp3'});
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
				$('.play').attr({src:'./audio/play.mp3'})
				$('.audio').attr({src:'./audio/pairs.mp3'});
			break;

			//三张
			case 3:
				$('.play').attr({src:'./audio/play.mp3'})
				// alert('三张');
			break;

			//三带一
			case 4:
				$('.play').attr({src:'./audio/play.mp3'})
				$('.audio').attr({src:'./audio/3-1.mp3'});
			break;

			//三带二
			case 5:
				$('.play').attr({src:'./audio/play.mp3'})
				$('.audio').attr({src:'./audio/3-2.mp3'})
			break;

			//顺子
			case 6:
				$('.play').attr({src:'./audio/play.mp3'})
				$('.audio').attr({src:'./audio/straight.mp3'});
			break;

			//四带二
			case 7:
				$('.play').attr({src:'./audio/play.mp3'})
				$('.audio').attr({src:'./audio/4-2.mp3'});
			break;

			//连对
			case 8:
				$('.play').attr({src:'./audio/play.mp3'})
				$('.audio').attr({src:'./audio/pairs.mp3'});
			break;

			//飞机
			case 9:
				$('.play').attr({src:'./audio/play.mp3'})
				$('.audio').attr({src:'./audio/plane.mp3'});
			break;
				
			case 10:
				$('.play').attr({src:'./audio/play.mp3'})
				// alert('11111')
			break;
		}
		return 1000;
	}