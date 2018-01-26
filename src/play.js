/**
 * xiwang (14998518@qq.com)
 */
var interFace = ( function(){

	if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
           
    } else if (/(Android)/i.test(navigator.userAgent)) {
            // window.Android.clearRomCache()
    } else {
        //    window.location.href="https://www.baidu.com";
    };

    var Browser = Laya.Browser,
        Sprite  = Laya.Sprite,
        Handler = Laya.Handler,
        Texture = Laya.Texture,
        Loader  = Laya.Loader,
        Event   = Laya.Event,
        SoundManager = Laya.SoundManager,
        Dialog  = Laya.Dialog,
        Button  = Laya.Button,
        Image   = Laya.Image,
        Text    = Laya.Text,
        HttpRequest    = Laya.HttpRequest;
    // 浏览器宽高
    var ww = Browser.clientWidth,
        wh = Browser.clientHeight;
        
    // 爪子一系列图
    var imgUrl  = '../laya/assets/comp/', 
        img1Url = imgUrl+'dz.png',
        img2Url = imgUrl+'z.png',
        img3Url = imgUrl+'zline.png',
        gobtnimg = imgUrl+'gobtn.png',
        yuanbtn5 = imgUrl+'5yuan.png',
        yuanbtn10 = imgUrl+'10yuan.png',
        yuanbtn15 = imgUrl+'15yuan.png';
        

    // 春节背景图替换
    var bgimg = imgUrl+'anewyearimg/bgimg.png',
        gobtnimg2 = imgUrl+'anewyearimg/gobtn2.png',
        yuan2btn5 = imgUrl+'anewyearimg/5yuanafter.png',
        yuan2btn10 = imgUrl+'anewyearimg/10yuanafter.png',
        yuan2btn15 = imgUrl+'anewyearimg/15yuanafter.png',
        bgm = imgUrl+"anewyearimg/bgm.mp3",
        hintbg = imgUrl+'anewyearimg/hintbg.png';

       
    // 爪子一系列配套
    var hookzX = ww / 2 - 24,   //  爪子底座X轴
        hookX  = ww / 2 - 41,   //  爪子X轴
        hookY  = 30,            //  爪子Y轴
        hookArr,                //  爪子一系列坐标数组
        hookChassis,            //  爪子底座
        hook,                   //  爪子
        hookLine,               //  爪子线
        hookSpeed = 2;          //  爪子移动速度
    var toyArr = new Array(),   //  玩具数组
        toyY = wh-210,          //  玩具Y轴
        toyObjArr = [],         //  玩具实例数组
        toyXYArr = [],          //  玩具坐标数组
        toySpacing = 100,        //  玩具之间的间隔距离
        isNum = /^\d+$/,        //  验证数字正则
        toySpeed = 1000,        //  玩具随机移动速度
        classNum = 1,           //  切换类型（Number）
        classData = 5,          //  类型Data (Number)
        hitNum = 0;             //  命中次数
    var gid,soundStatus;
     // GO 按钮
    var goBtn ,classBtn1 ,classBtn2, classBtn3;
    var btnArr = [];
    ( function (){
        Laya.init(ww,wh);
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.scaleMode = 'showall';
        Laya.stage.screenMode = 'vertical';
        Laya.stage.bgColor = '#ccc';
        
        Laya.loader.load([img1Url,img2Url,img3Url,gobtnimg,gobtnimg2,bgimg,yuanbtn5,yuanbtn10,yuanbtn15,yuan2btn5,yuan2btn10,yuan2btn15],Handler.create(this,onloaded));
    })();
    
    function onloaded(){
        
        var bg = new Sprite();
        bg.graphics.drawTexture(Loader.getRes(bgimg),0,0,ww,wh);
        Laya.stage.addChild(bg);

        //  爪子一系列坐标数组
        hookArr = [
            { x : hookzX , y : 0 ,width : 61 , height : 27 , objImg: Loader.getRes(img1Url) , name : 'hookChassis' },
            { x : hookX , y : hookY ,width : 82 , height : 94 , objImg: Loader.getRes(img2Url) , name : 'hook' },
            { x : hookX , y : 0 ,width : 82 , height : 30 , objImg: Loader.getRes(img3Url) , name : 'hookLine' },
        ];

         toyArr = [
            { img:imgUrl+'dog/g1.png',x : 0 , y : toyY , data : '谢谢参与' , w : 91 , h : 90 },
            { img:imgUrl+'dog/g2.png',x : 0 , y : toyY , data : '10元' , w : 91 , h : 90 },
            { img:imgUrl+'dog/g3.png',x : 0 , y : toyY , data : '20元' , w : 91 , h : 90 },
            { img:imgUrl+'dog/g4.png',x : 0 , y : toyY , data : '30元' , w : 91 , h : 90 },
            { img:imgUrl+'dog/g5.png',x : 0 , y : toyY , data : '40元' , w : 91 , h : 90 },
         ];
        
        
        
        // 创建爪子
        hookChassis = new Sprite();
        hook        = new Sprite();
        hookLine    = new Sprite();
        // GO 按钮
        goBtn   = new Sprite();
        classBtn1   = new Sprite();
        classBtn2   = new Sprite();
        classBtn3   = new Sprite();
        btnArr = [
            { x : ww-100 , y : wh-100 , width : 75 , height : 78 , objImg : Loader.getRes(gobtnimg) , name : 'gobtn'},
            { x : 20 , y : wh-75 , width : 40 , height : 43 , objImg : Loader.getRes(yuanbtn5) , data : 5 , name : '5yuanbtn'},
            { x : 80 , y : wh-75 , width : 40 , height : 43 , objImg : Loader.getRes(yuanbtn10) , data : 10 , name : '10yuanbtn'},
            { x : 140 , y : wh-75 , width : 40 , height : 43 , objImg : Loader.getRes(yuanbtn15) , data : 15 , name : '15yuanbtn'},
            { x : 20 , y : wh-75 , width : 40 , height : 43 , objImg : Loader.getRes(yuan2btn5) , data : 5 , name : '5yuanbtn2'},
            { x : 80 , y : wh-75 , width : 40 , height : 43 , objImg : Loader.getRes(yuan2btn10) , data : 10 , name : '10yuanbtn2'},
            { x : 140 , y : wh-75 , width : 40 , height : 43 , objImg : Loader.getRes(yuan2btn15) , data : 15 , name : '15yuanbtn2'},
        ]
        // 绘制 GO 按钮
        goBtn.graphics.drawTexture( btnArr[0].objImg ,0 , 0 , btnArr[0].width , btnArr[0].height);
        goBtn.size(btnArr[0].width , btnArr[0].height);
        goBtn.pos(btnArr[0].x , btnArr[0].y);
        goBtn.on( Event.CLICK ,this, GoClickFun);
        // GO 按钮按下
        goBtn.on( Event.MOUSE_DOWN , this ,function(){
            goBtn.graphics.clear();
            btnArr[0].objImg = Loader.getRes(gobtnimg2);
            goBtn.graphics.drawTexture( btnArr[0].objImg ,0 , 0 , btnArr[0].width , btnArr[0].height);
        } )
        // GO 按钮弹起
        goBtn.on( Event.MOUSE_UP , this ,function(){
            goBtn.graphics.clear();
            btnArr[0].objImg = Loader.getRes(gobtnimg);
            goBtn.graphics.drawTexture( btnArr[0].objImg ,0 , 0, btnArr[0].width , btnArr[0].height);
        } )

        // 绘制选择类型按钮
        classBtn1.graphics.drawTexture( btnArr[4].objImg ,0 , 0 , btnArr[4].width , btnArr[4].height);
        classBtn1.size(btnArr[1].width , btnArr[1].height);
        classBtn1.pos(btnArr[1].x , btnArr[1].y);
        classBtn1.on(Event.CLICK , this , optClass ,[1,btnArr]);
        // classBtn1 按钮按下
        classBtn1.on( Event.MOUSE_DOWN , this ,classFun ,[1,btnArr])
        // classBtn2 按钮按下
        classBtn2.on( Event.MOUSE_DOWN , this ,classFun ,[2,btnArr])
        // classBtn3 按钮按下
        classBtn3.on( Event.MOUSE_DOWN , this ,classFun ,[3,btnArr])

        classBtn2.graphics.drawTexture( btnArr[2].objImg ,0 , 0 , btnArr[2].width , btnArr[2].height);
        classBtn2.size(btnArr[2].width , btnArr[2].height);
        classBtn2.pos(btnArr[2].x , btnArr[2].y);
        classBtn2.on(Event.CLICK , this , optClass ,[2,btnArr]);

        classBtn3.graphics.drawTexture( btnArr[3].objImg ,0 , 0 , btnArr[3].width , btnArr[3].height);
        classBtn3.size(btnArr[3].width , btnArr[3].height);
        classBtn3.pos(btnArr[3].x , btnArr[3].y);
        classBtn3.on(Event.CLICK , this , optClass ,[3,btnArr]);

        // 绘制爪子套装
        drawHook(hookArr);

        Laya.stage.addChild(classBtn1);
        Laya.stage.addChild(classBtn2);
        Laya.stage.addChild(classBtn3);
        Laya.stage.addChild(hookLine);
        Laya.stage.addChild(hookChassis);
        Laya.stage.addChild(hook);
        Laya.stage.addChild(goBtn);

        // 绘制玩具
        for( var i in toyArr){
            toyObjArr.push('toy'+i);
            toyObjArr[i] = new Sprite();
            toyObjArr[i].loadImage(toyArr[i].img , 0 , 0 , toyArr[i].w , toyArr[i].h);
            toyArr[i].x = 0-(toyArr[i].w + toySpacing)*i;
            toyXYArr.push(toyArr[i].x);
            toyObjArr[i].pos( toyArr[i].x , toyArr[i].y );
            Laya.stage.addChild(toyObjArr[i]);
        }

        
        toyMoveClass();
        // 背景音乐按钮
        bgmSoundALL();
        //  背景音乐
        playBgm();
    }
    function classFun(num,btnArr){
        if( num == 1){
            classBtn1.graphics.clear();
            classBtn2.graphics.clear();
            classBtn3.graphics.clear();
            classBtn1.graphics.drawTexture( btnArr[4].objImg ,0 , 0 , btnArr[4].width , btnArr[4].height);
            classBtn2.graphics.drawTexture( btnArr[2].objImg ,0 , 0 , btnArr[2].width , btnArr[2].height);
            classBtn3.graphics.drawTexture( btnArr[3].objImg ,0 , 0 , btnArr[3].width , btnArr[3].height);
        }else if( num == 2){
            classBtn1.graphics.clear();
            classBtn2.graphics.clear();
            classBtn3.graphics.clear();
            classBtn1.graphics.drawTexture( btnArr[1].objImg ,0 , 0 , btnArr[1].width , btnArr[1].height);
            classBtn2.graphics.drawTexture( btnArr[5].objImg ,0 , 0 , btnArr[5].width , btnArr[5].height);
            classBtn3.graphics.drawTexture( btnArr[3].objImg ,0 , 0 , btnArr[3].width , btnArr[3].height);
        }else if( num == 3){
            classBtn1.graphics.clear();
            classBtn2.graphics.clear();
            classBtn3.graphics.clear();
            classBtn1.graphics.drawTexture( btnArr[1].objImg ,0 , 0 , btnArr[1].width , btnArr[1].height);
            classBtn2.graphics.drawTexture( btnArr[2].objImg ,0 , 0 , btnArr[2].width , btnArr[2].height);
            classBtn3.graphics.drawTexture( btnArr[6].objImg ,0 , 0 , btnArr[6].width , btnArr[6].height);
        }
    }
    // 切换类型
    function optClass(c,bArr){
        classNum = c;
        // console.log(c)
        classData = bArr[c].data;
        //  玩具移动方案2
         Laya.timer.clear(this,moveToy);
         var t = c*2;
         Laya.timer.frameLoop( t, this,moveToy)
    }
    // 玩具动画随机
    function toyPlay(){
        Laya.timer.clear(this,moveToy);
        var t = 0;
        if(classNum == 1){
            t =  randomNum( 3 , 6);
        }else if(classNum == 2){
            t =  randomNum( 5 , 7);
        }else if(classNum == 3){
            t =  randomNum( 6 , 8);
        }
        console.log(t)
        // 玩具移动动画
        Laya.timer.frameLoop( t, this,moveToy)
    }
    // 产生随机数 
    function randomNum( n , m){
        var num = m-n+1;
        return Math.floor(Math.random()*num + n);
    }

    function toyMoveClass(){
        // 方案1
        // 玩具移动随机动画
        //Laya.timer.loop( toySpeed , this,toyPlay);
        // 方案2
        // 玩具移动动画
        Laya.timer.frameLoop( classNum*2, this,moveToy);
    }

    //  爪子一系列绘制
    function drawHook(objArr){
        hookChassis.graphics.clear();
        hook.graphics.clear();
        hookLine.graphics.clear();
        hookChassis.graphics.drawTexture( objArr[0].objImg , objArr[0].x , objArr[0].y , objArr[0].width , objArr[0].height);
        hook.graphics.drawTexture( objArr[1].objImg , objArr[1].x , objArr[1].y, objArr[1].width , objArr[1].height);
        hookLine.graphics.drawTexture( objArr[2].objImg , objArr[2].x , 0 , objArr[2].width , objArr[2].height);
    };
    //  移动爪子
    function moveHook(){
        if( hookArr[1].y+hookArr[1].height > toyY+50 ){
            
            // 清除爪子移动定时器
            Laya.timer.clear(this, moveHook);
            var hit = [
                { x : hookArr[1].x+hookArr[1].width/12, y : hookArr[1].y+hookArr[1].height },
                { x : hookArr[1].x+ hookArr[1].width-hookArr[1].width/12, y : hookArr[1].y+hookArr[1].height }
            ];
            var num1 = fnS(toyArr,hit[0]),
                num2 = fnS(toyArr,hit[1]);
            	var ran ;
            if( isNum.test(num1) && isNum.test(num2) ){
                // 命中后 根据 已经命中次数随机
            	if( hitNum/1 == 0 ){
            		ran = 1;
            	}else{
                    ran = randomNum(0,hitNum/1+1)
            		// ran = randomNum(0,3)
            	}

                // 不参假情况
                ran = 1;

            	console.log('ran:'+ran)
            	console.log('hitNum:'+hitNum)
            	if( ran == 1){
	                // 清除所有定时器
	                Laya.timer.clearAll(this);
	                // 命中之后的定时器
	                Laya.timer.frameLoop( 5, this,hitfun,[num1,true]);

	                console.log(toyArr[num1].data)
            	}else{
            		num1 = 'sorry...';
            	}
            }
            if(isNum.test(num1) || isNum.test(num2)){
            	console.log('num1:'+num1)
                // 未命中之后的定时器
                if( ran != 1){
	                var t = '差一点就抓到了~ 继续努力';
	                Laya.timer.frameLoop( 2, this,hitfun,[t,!true]);
	                console.log(t)
                }
            }else{
                // 未命中之后的定时器
                var t = '没有抓到~ 继续努力';
                Laya.timer.frameLoop( 2, this,hitfun,[t,!true]);
                console.log(t)
            }
            
            return;
        }
        hookArr[2].height += 5; 
        hookArr[1].y += 5; 
        drawHook(hookArr);
        
    };
    // 玩具移动
    function moveToy(){
        
        for( var i in toyArr){
            // 移动出屏幕之外的情况
            if(toyArr[i].x > ww ){
                if( i == 0){
                    toyArr[i].x = toyXYArr[toyXYArr.length-1]-(toyArr[i].w + toySpacing) ;
                 }else{
                    toyArr[i].x = toyXYArr[i-1]-(toyArr[i].w + toySpacing) ;
                }
                
            }
            toyArr[i].x += 5;
            toyXYArr[i] = toyArr[i].x;
            // console.log(toyXYArr)
            toyObjArr[i].graphics.clear();
            toyObjArr[i].loadImage(toyArr[i].img , 0 , 0 , toyArr[i].w , toyArr[i].h);
            // console.log(toyArr[i].x)
            toyObjArr[i].pos( toyArr[i].x , toyArr[i].y );
           
        }  
    }
    // 爪子上升 bool==true 为命中情况
    function hitfun(n,bool){
        // 上升时爪子一系列重绘
        hookArr[2].height -= 5; 
        hookArr[1].y -= 5; 
        drawHook(hookArr);
        if(bool == true){
            // 命中时玩具上升重绘
            toyArr[n].y -= 5;
            toyObjArr[n].graphics.clear();
            toyObjArr[n].loadImage(toyArr[n].img , 0 , 0 , toyArr[n].w , toyArr[n].h);
            // console.log(toyArr[i].x)
            toyObjArr[n].pos( toyArr[n].x , toyArr[n].y );
        }
        // 爪子上升停止位置的判断
        if( hookArr[1].y < hookY && hookArr[1].x == hookX){
            // 重新绑定点击事件
            goBtn.on( Event.CLICK ,this, GoClickFun);
            // classBtn1  , classBtn2, classBtn3 按钮按下
            classBtn1.on( Event.MOUSE_DOWN , this ,classFun ,[1,btnArr])
            classBtn2.on( Event.MOUSE_DOWN , this ,classFun ,[2,btnArr])
            classBtn3.on( Event.MOUSE_DOWN , this ,classFun ,[3,btnArr])
            // classBtn1  , classBtn2, classBtn3 按钮点击事件
            classBtn1.on(Event.CLICK , this , optClass ,[1,btnArr]);
            classBtn2.on(Event.CLICK , this , optClass ,[2,btnArr]);
            classBtn3.on(Event.CLICK , this , optClass ,[3,btnArr]);
            // 暂停音效
            stopMusic();
            if(bool == true){
                // 命中并回到起点
                playHitSound();                      // 命中时音效
                // console.log(n)
                // alert(toyArr[n].data);
                openDialog(toyArr[n].data,true);     // 命中时弹出消息框
                
                toyArr[n].y = toyY;                  // 玩具Y轴回到原始值
            }else{
                playMissSound();                     //  未命中时音效
                openDialog(n,false);                 //  弹出消息框
                // alert(n);
            }
            
            Laya.timer.clear(this,hitfun);
           
           // 玩具移动方案
           toyMoveClass();
        }
        
    }

    // Go按钮点击事件
    function GoClickFun(){
        goBtn.off(Event.CLICK,this,GoClickFun);
        classBtn1.offAll();
        classBtn2.offAll();
        classBtn3.offAll();

        hitNum = 0;
        playHookSound();
        Laya.timer.frameLoop(hookSpeed, this, moveHook);
        /*
        var moneyhr = new HttpRequest();
        moneyhr.once(Event.COMPLETE,this,function(d){
            var reData = JSON.parse(d);
            if(reData.code == 1002){
                gid = reData.data.glid;
                hitNum = reData.data.num;
                playHookSound();
                Laya.timer.frameLoop(hookSpeed, this, moveHook);
            }else if(reData.code == 1006){
               openDialog(reData.msg,false) //余额不足
            }else{
                openDialog(reData.msg,false)
            }
        })
        moneyhr.send('', 'token='+token+'&gtype='+classNum, 'POST', 'JSON');
        */
    }

    // 绘制声音按钮以及绑定事件
    function bgmSoundALL(){
        bgmBtnArr = [
            { x : ww-65 , y : 60 , objImg : imgUrl+'aideoplay.png' , w : 42 , h : 42},
            { x : ww-30 , y : 60 , objImg : imgUrl+'aideostop.png' , w : 42 , h : 42},
        ];
        // 声音按钮
        var bgmBtn = new Sprite(),statu = false;
        bgmBtn.loadImage( bgmBtnArr[0].objImg , bgmBtnArr[0].x , bgmBtnArr[0].y , bgmBtnArr[0].w , bgmBtnArr[0].h );
        bgmBtn.size(bgmBtnArr[0].w , bgmBtnArr[0].h);
        
        bgmBtn.on(Event.CLICK , this , function(){
            if(statu == false){
                stopAllMusic();
                bgmBtn.loadImage( bgmBtnArr[1].objImg , bgmBtnArr[0].x , bgmBtnArr[0].y , bgmBtnArr[0].w , bgmBtnArr[0].h );
                statu = true;
            }else{
                playBgm();
                bgmBtn.loadImage( bgmBtnArr[0].objImg , bgmBtnArr[0].x , bgmBtnArr[0].y , bgmBtnArr[0].w , bgmBtnArr[0].h );
                statu = false;
            }
        })
        Laya.stage.addChild(bgmBtn);
    
    };
    // 背景音乐播放
    function playBgm(){
        soundStatus = true;
        SoundManager.playMusic(bgm, 0);
    };
    // 背景音乐暂停
    function stopAllMusic(){    
        soundStatus = false;
        SoundManager.stopAll();
    };
    // 爪子下降上升音效
    function playHookSound(){
        if(soundStatus == true){
            SoundManager.playSound(imgUrl+"hookplay.mp3", 0);
        }
    };
    // 抓住音效
    function playHitSound(){
        if(soundStatus == true){
            SoundManager.playSound(imgUrl+"hittoy.mp3", 1);
        }
    };
    // 未抓住音效
    function playMissSound(){
        if(soundStatus == true){
            SoundManager.playSound(imgUrl+"misstoy.mp3", 1);
        }
    };
    // 停止音效
    function stopMusic(){
        SoundManager.stopAllSound()
    }
    
    // dialog 消息框
    function openDialog(te,bool){
        var DIALOG_WIDTH = ww*4/5,
            DIALOG_HEIGHT = DIALOG_WIDTH/1.06,
            bgImgUrl;
		var dialog = new Dialog();
        var txt = new Text();
        if( bool){
            // hit
            bgImgUrl = hintbg;
            if(te != '谢谢参与'){
                txt.text = '恭喜您,获得 '+te;
            }else{
                txt.text = '不好意思 '+te;
            }
            
        }else{
            // miss
            bgImgUrl = hintbg;
            txt.text = '很遗憾 '+te;
        }

		var bg = new Image(bgImgUrl);
        bg.width = DIALOG_WIDTH;
        bg.height = DIALOG_HEIGHT;
		

        txt.color = '#fff';
        // txt.bold = true;
        txt.fontSize = 16 ;
        txt.leading = 10;
        txt.align = 'center';
        txt.valign = 'middle';
        txt.width = DIALOG_WIDTH;
        txt.height = DIALOG_HEIGHT;
        txt.wordWrap = true;
        txt.padding = [40,20,0,20];
        txt.stroke = 2;
        txt.strokeColor = '#000';


        dialog.addChild(bg);
        dialog.addChild(txt);

		dialog.dragArea = "0,0," + DIALOG_WIDTH + "," + DIALOG_HEIGHT;
		dialog.show();
        Laya.timer.once(1500, this, function(){
           dialog.close();
        });
	}
    // Laya.timer.once(2700, this, function(){
    //     if( token == null || token == undefined){
    //         var DIALOG_WIDTH = ww*4/5,
    //         DIALOG_HEIGHT = DIALOG_WIDTH/1.06 ,
    //         bgImgUrl;
    //         var dialog = new Dialog();
    //         var txt = new Text();
            
    //         bgImgUrl = hintbg;
             

    //         var bg = new Image(bgImgUrl);
    //         bg.width = DIALOG_WIDTH;
    //         bg.height = DIALOG_HEIGHT;
            
    //         txt.color = '#fff';
    //         txt.text = '您还没有登录！';
    //         // txt.bold = true;
    //         txt.fontSize = 16 ;
    //         txt.leading = 10;
    //         txt.align = 'center';
    //         txt.valign = 'middle';
    //         txt.width = DIALOG_WIDTH;
    //         txt.height = DIALOG_HEIGHT;
    //         txt.wordWrap = true;
    //         txt.padding = [40,20,0,20];
    //         txt.stroke = 2;
    //         txt.strokeColor = '#000';


    //         dialog.addChild(bg);
    //         dialog.addChild(txt);

    //         dialog.dragArea = "0,0," + DIALOG_WIDTH + "," + DIALOG_HEIGHT;
    //         dialog.show();
    //     }
    // });
    // 判断 点击坐标 是否在你需要的位置 
    function fnS(arr,p){
    　　var who = '',
            cvs = document.getElementById('layaCanvas'),
            ctx = cvs.getContext('2d');
        arr.forEach(function(v, i){
        　　ctx.beginPath();
        　　ctx.rect(v.x, v.y, v.w, v.h);
            　　//如果传入了事件坐标，就用isPointInPath判断一下
        　　if(p && ctx.isPointInPath(p.x, p.y)){
            　　//如果当前环境覆盖了该坐标，就将当前环境的index值放到数组里
        　　　　who = i;
        　　}

    　　});
    　　//根据who相应的值找到元素。
    　　return who;
    }
     // 获取URL拼接字符串
    function getUrlParam(name){
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if(r!=null)return  unescape(r[2]); 
         return null;
    }


    var interFace = {
        playSound:function(){
            playBgm()
        },
        stopSound:function(){
            stopAllMusic()
        },
    }
    return interFace;
})();




