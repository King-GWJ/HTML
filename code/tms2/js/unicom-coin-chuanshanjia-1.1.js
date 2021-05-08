
/**
 * 联通-头条-积分数据管理
 * sceneid可以理解为在同一个business下区分不同场景，同一个business下的sceneid是不会重复
 */
var UnicomCSJCoinAd = { 
    
    /**
     * 判断是否在联通手厅客户端内部
     */
    isInApp: function () {
        if (navigator.userAgent.indexOf('unicom') > -1) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 判断是否是iOS手机
     */
    isIOS: function () {
        var u = navigator.userAgent;
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        return isIOS;
    },
    /**
     * 判断是否在联通手厅客户端内部
     */
    isAndroid: function () {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
        return isAndroid;
    },
    /**
     * 获取客户端版本
     * 客户端版本规则： 7.4版本返回android@7.0400   7.4.1版本返回android@7.0401  7.3版本返回android@7.0300
     */
    getClientVersion:function () {
        console.log(0)
		var u = navigator.userAgent;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; 
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
		var arr = u.split(";")
		var V = ''
        console.log(1)
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].indexOf("unicom") > 0) {
				V = arr[i];
				break
			}
        }
        console.log(2)
        var version = "";
		if (isAndroid) {
		    version = V.match(/\:(\S*)\,/)[1]
		} else if (isiOS) {
			version = V.match(/\:(\S*)\}/)[1].split("}")[0]
		}
        console.log(3)
		return version;
    },
    /**
     * 工具函数：根据参数名获取URL中的参数值
     * @param {*}} variable 
     */
    getQueryVariable: function(variable){
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
             var pair = vars[i].split("=");
             if(pair[0] == variable){
                 return pair[1];
             }
        }
        return(-1);
     },
     /**
     * 获取客户端信息，不要联系调用，尽量只调用一次
     * @param {Function} callback 
     */
    getClientInfo: function(callback) { 

        console.log('1')
        
        if (UnicomCSJCoinAd.isInApp()) {
            window.setClientInfo = function(info) {

                console.log('4')

                if (typeof callback === 'function') {
                    console.log('5')
                    var infoOBJ = JSON.parse(info); 
                    console.log(info)
                    callback(infoOBJ);
                }
            } 

            if (UnicomCSJCoinAd.isIOS()) {
                var config = {
                    type: 'getClientInfo',
                };
                console.log('2')
                window.location = encodeURI("clientAction=" + JSON.stringify(config));
            } else if (UnicomCSJCoinAd.isAndroid()) {
                console.log('3')
                window.setClientInfo(window.js_invoke.getClientInfoByJS()); 
            }
        }
    },
    /**
     * 拉登录
     * @param {Boolean} retainWebview 登录返回是否保留webview
     */
    loginByClient: function() {
        if (this.isInApp()) {
            var config = {
                type: 'login',
                msg: ''
            }
            if (this.isIOS()) {
                window.location = encodeURI("clientAction=" + JSON.stringify(config));
            } else if (this.isAndroid()) {
                window.js_invoke.interact(JSON.stringify(config));
            }
        }
    }, 

    /**
     * 注册客户端右上角更多菜单
     * {
     *  shareTitle: '标题',
        shareContent: '正文',
        shareURL: '',
        shareIconURL: ''
        shareQrcodeURL:'二维码URL地址'
     * }
     * 分享前缀：var prefixURL = "https://wap.10010.com/t/clickCountLogRecord/pageClickCount.htm?flag=new&actCode=40288&title=" + encodeURI("title") + "&actName=" + encodeURI("title") + "&application=113000010&openUrl=";
     * @param {Object} shareConfig 分享菜单配置
     */
    registerMoreMenu: function(shareConfig) {
        window.getMenuConfig_Local = function() {
            //普通分享
            var shareJson1 = {
                    shareType: "url",
                    shareTitle: shareConfig['shareTitle'],
                    shareContent: shareConfig['shareContent'],
                    shareURL: shareConfig['shareURL'],
                    shareIconURL: shareConfig['shareIconURL']
                }
            //截图分享
            var shareJson2 = {
                    shareType: "longScreenshot",
                    shareQrcodeURL: shareConfig['shareQrcodeURL'],
                    shareTitle: shareConfig['shareTitle'],
                    shareContent: shareConfig['shareContent'],
                    shareURL: shareConfig['shareURL'],
                    shareIconURL: shareConfig['shareIconURL']
                }
                //菜单配置
            var menuConfig = {
                config: [
                    {
                        code: "fenxiang",
                        title: "分享",
                        shareList: "wechat,wechatmoments,qq,qzone,sinaweibo,email,shortmessage,jietufenxiang",
                        shareJson: shareJson1
                    },
                    {
                        code: "jietufenxiang",
                        title: "截图分享",
                        shareList: "wechat,wechatmoments,qq,qzone",
                        shareJson: shareJson2
                    },
                    { code: "tucao", title: "吐槽", desc: "吐槽" },
                    { code: "shouye", title: "首页", desc: "回到首页" }
                ]
            }
            console.log("客户端右上角三个点配置信息：" + JSON.stringify(menuConfig));
            return JSON.stringify(menuConfig);
        }
    },
    /**
     * 直接打开分享菜单
     * @param {Object} shareJson 
     * 分享内容应该包含：
     * shareJson: {
            shareTitle: '分享标题',
            shareContent: '分享正文内容',
            shareURL: '分享目标URL',
            shareIconURL: '分享小图标URL',
            miniProgramShare:'如果要分享程微信小程序，请填字符串1，如果不分享小程序不需要填',
            miniProgramType'小程序目前的状态（0-正式，1-开发，2-体验），如果不分享小程序不需要填',
            miniProgramUserName:'小程序原始ID，如果不分享小程序不需要填',
            miniProgramPath:'小程序页面路径，如果不分享小程序不需要填'
        }
     */
    share:function(shareJson) {
        var shareConfig = {
            type: "share2",
            url: "",
            shareList: "wechat,wechatmoments,qq,qzone,sinaweibo,email,shortmessage",
            msg: "",
            shareJson: {
                shareType: "url",
                shareTitle: shareJson.shareTitle,
                shareContent: shareJson.shareContent,
                shareURL: shareJson.shareURL,
                shareIconURL: shareJson.shareIconURL,
                miniProgramShare: shareJson.miniProgramShare,
                miniProgramType: shareJson.miniProgramType,
                miniProgramUserName: shareJson.miniProgramUserName,
                miniProgramPath: shareJson.miniProgramPath
            }
        }
        if (this.isIOS()) {
            window.location = encodeURI("clientAction=" + JSON.stringify(shareConfig));
        } else if (this.isAndroid()) {
            window.js_invoke.interact(JSON.stringify(shareConfig));
        }
    },

      /**
     * 
     * @param {是否在返回按钮中关闭banner广告} 
     * isHide ：true隐藏，false不隐藏
     */
    registerClientBack:function(isHide,url){

        window.clientDirectorCallBack = function() {

            if(isHide){
                UnicomCSJCoinAd.hideToutiaoBannerAd();
            } 

            return false;

        }

    }, 

    /** 
     * @param {跳转到某个url} 
     * url ：是否要跳转到某个url
     */
    registerDirectUrl:function(url){

        window.clientDirectorCallBack = function() {

            if(url){
                this.window.location.href = url;
                return true;
            } else{
                return false;
            }   
        }

    }, 

    //=================================================头条JS方法=================================================================================

        /**
     * 获取浏览器相关信息
     */
    getBrowserInfo: function(browserInfoCallback){
        var msgJO = {
			action: 'getBrowserInfo',
        }

        var config = {
			type: 'TOUTIAOAD',
			msg: JSON.stringify(msgJO)
        }
        
        //接收回调数据
        UnicomCSJCoinAd.getBrowserInfo.browserInfoCallback = function (data) { 
            if (typeof browserInfoCallback === 'function') {
                browserInfoCallback(data);
            }
        };
 
		if (this.isAndroid()) {
			window.js_invoke.interact(JSON.stringify(config));
		}else{
            window.location = encodeURI("clientAction="+JSON.stringify(config));
        }
    },
       /**
     * 最低支持android客户端7.4.1版本
     * 广告图是60:9比例
     * 创建一个客户端Banner广告对象，具体Banner由客户端负责展示，只要调用该方法，banner会自动显示，以此达到最有益的曝光。
     * 开发者可以调用 showBannerAd 创建 Banner 广告组件。Banner 广告组件在创建后会自动拉取广告数据并进行渲染，
     * 开发者只需要控制 Banner 广告组件的位置和显示/隐藏即可。
     * @param {Object} configJO Bannber广告初始化配置
     * configJO = {
     *      codeId:"代码位"
     *      acId:"活动id",  
     *      taskId:"任务id", 
     *      channel:'渠道',
     *      screenId:'场景ID',
     *      gameId:'游戏ID',
     *      gameSceneId:'游戏场景ID',
     *      style:{ 
     *          top:0, //y轴显示位置 
     *      },
     *      adIntervals:0, //广告定时自动更新，单位秒
     *      onLoadSuccess:function, // 当广告加载完毕时
     *      onLoadError: function, // 当广告加载错误时
     *      onHideManually: function // 当广告被用户关闭时
     * }
     */
    showToutiaoBannerAd:function(configJO){  

        var codeId = configJO.androidCodeId;
        if (this.isAndroid()) {
            codeId = configJO.androidCodeId;
            var clientVersion = UnicomCSJCoinAd.getClientVersion();  
            if(clientVersion > "android@7.0402" ){

                if(configJO.style.scale == 1){
                    configJO.style.top=configJO.style.top*3/window.devicePixelRatio;
                }else{
                    configJO.style.top=configJO.style.top*3/window.devicePixelRatio*360/window.innerWidth;
                }
                
         }
        }else{
            codeId = configJO.iosCodeId+"";//如果传了number,强转成string
        }
        configJO.codeId = codeId;
        configJO.action ='showBannerAd';


       
        // var msgJO = {
        //     codeId:codeId,  
		//     action: 'showBannerAd',
        //     channel: configJO.channel, 
        //     channelName:configJO.channelName,
        //     gameId:configJO.gameId,
        //     gameSceneId:configJO.gameSceneId,
        //     style:configJO.style,
        //     adIntervals: configJO.adIntervals,
        //     onLoadSuccess:configJO.onLoadSuccess,
        //     onLoadError:configJO.onLoadError,
        //     onHideManually:configJO.onHideManually
		// }
		var config = {
			type: 'TOUTIAOAD',
			msg: JSON.stringify(configJO)
        }
        
        //接收回调数据
        UnicomCSJCoinAd.showToutiaoBannerAd.onLoadSuccess = function () {
            if (typeof configJO.onLoadSuccess === 'function') {
                configJO.onLoadSuccess();
            }
        };

        //接收回调数据
        UnicomCSJCoinAd.showToutiaoBannerAd.onLoadError = function (data) {
            console.log("头条banner错误:"+data)
            if (typeof configJO.onLoadError === 'function') {
                configJO.onLoadError(data); 
            }
        };

        //接收回调数据
        UnicomCSJCoinAd.showToutiaoBannerAd.onHideManually = function () {
            if (typeof configJO.onHideManually === 'function') {
                configJO.onHideManually();
            }
        }; 

		if (this.isAndroid()) {
			window.js_invoke.interact(JSON.stringify(config));
		}else{ 
            window.location = encodeURI("clientAction=" + JSON.stringify(config));
        }
    },
    /**
     * 最低支持android客户端7.4版本
     * 隐藏正在显示的Banner广告
     */
    hideToutiaoBannerAd:function(){  

        var msgJO = {
			action: 'hideBannerAd',
        }
        
        var config = {
			type: 'TOUTIAOAD',
			msg: JSON.stringify(msgJO)
        }

		if (this.isAndroid()) {
			window.js_invoke.interact(JSON.stringify(config));
		}else{
            window.location = encodeURI("clientAction=" + JSON.stringify(config));
        }
    }, 

    /**
     * 通过旧的ID转换为新的ID
     * @param {*} codeId 
     */
    getNomubanCodeId:function(codeId){  
          var codeMap = {
              '945510695':'945535750',//android-游戏频道看视频得积分2-激励视频
              '945490759':'945535754',//android-买什么都省0.1元薅羊毛-激励视频
              '945490446':'945535421',//android-阅读每日读书福利广告2-激励视频
              '945490436':'945535424',//android-阅读每日读书福利广告1-激励视频
              '945490433':'945535429',//android-阅读打卡视频广告2-激励视频
              '945488048':'945535497',//android-买什么都省刮机票-激励视频
              '945485144':'945535532',//android-签到领福利赚积分翻牌活动-激励视频
              '945479131':'945535537',//android-分享看视频翻倍得积分-激励视频
              '945474727':'945535596',//android-签到看视频得积分2-激励视频
              '945444936':'945535612',//android-签到领福利赚积分-激励视频
              '945432413':'945535616',//android-阅读打卡看视频得积分-激励视频
              '945430422':'945535625',//android-签到任务读小说赚积分-激励视频
              '945413733':'945535626',//android-沃之树看视频得浇水机会-激励视频
              '945399856':'945535628',//android-沃之树看视频发流量-激励视频
              '945398647':'945535629',//android-签到小游戏盲盒4-激励视频
              '945398637':'945535631',//android-签到小游戏盲盒3-激励视频
              '945398632':'945535632',//android-签到小游戏盲盒2-激励视频
              '945398627':'945535633',//android-签到小游戏盲盒-激励视频
              '945369958':'945535634',//android-积分商城积分夺宝-激励视频
              '945369931':'945535635',//android-积分商城女神口红-激励视频
              '945369805':'945535636',//android-积分商城小游戏-激励视频
              '945363378':'945535637',//android-买什么都省刮刮卡积分翻倍-激励视频
              '945363376':'945535641',//android-买什么都省刮刮卡-激励视频
              '945358647':'945535673',//android-阅读章节视频得积分2-激励视频
              '945358646':'945535674',//android-阅读章节视频得积分1-激励视频
              '945349372':'945535675',//android-买什么都省神奇便利店2-激励视频
              '945349368':'945535676',//android-买什么都省神奇便利店-激励视频
              '945340295':'945535677',//android-聚人气看视频得助力-激励视频
              '945339639':'945535679',//android-签到小游戏买幸运转转赚4-激励视频
              '945339636':'945535680',//android-签到小游戏买扭蛋机4-激励视频
              '945339630':'945535681',//android-签到小游戏买幸运转转赚3-激励视频
              '945339624':'945535683',//android-签到小游戏买扭蛋机3-激励视频
              '945339619':'945535684',//android-签到小游戏买幸运转转赚2-激励视频
              '945339610':'945535686',//android-签到小游戏买扭蛋机2-激励视频
              '945318810':'945535689',//android-签到小游戏买什么都省免费夺宝-激励视频
              '945318808':'945535693',//android-签到小游戏买什么都省申请便利店抽奖-激励视频
              '945318805':'945535695',//android-签到小游戏买什么都省转盘抽奖-激励视频
              '945292330':'945535698',//android-沃砍看视频砍价-激励视频
              '945290261':'945535700',//ios-游戏佰多惠看视频得道具-激励视频
              '945281443':'945535703',//android-业务查询看视频得积分-激励视频
              '945254827':'945535704',//android-签到看视频得积分-激励视频
              '945254821':'945535705',//android-福利订单看视频得积分-激励视频
              '945254816':'945535706',//android-10分精彩看视频得积分-激励视频
              '945235460':'945535707',//android-签到小游戏-激励视频
              '945228773':'945535710',//android-签到任务看视频领流量-激励视频
              '945228768':'945535712',//android-游戏漫乐游看视频得道具-激励视频
              '945228766':'945535714',//android-游戏杭州西米看视频得道具-激励视频
              '945228764':'945535718',//android-游戏悠游看视频得道具-激励视频
              '945228762':'945535724',//android-游戏触推河北看视频得道具-激励视频
              '945228759':'945535729',//android-游戏互娱看视频得道具-激励视频
              '945210860':'945535731',//android-游戏深圳微应看视频得道具-激励视频
              '945188117':'945535734',//android-游戏掌上乐游看视频得道具-激励视频
              '945188116':'945535736',//android-游戏频道看视频得积分-激励视频
              '945188114':'945535740',//android-阅读计时器看视频得积分-激励视频
              '945188112':'945535743'//android-签到看视频翻倍得积分-激励视频 
          } 
          var newCodeId = codeMap[codeId];   

          if(newCodeId){
            return newCodeId;
          }else{
              return codeId;
          }  
    },

        /**
     * 直接显示视频广告
     * configJO = {
    *       codeId:"代码位"
    *       acId:"活动id", 
    *       taskId:"任务id",    
     *      channel:'渠道',
     *      screenId:'场景ID',
     *      gameId:'游戏ID',
     *      gameSceneId:'游戏场景ID',
     *      rewards: '是否有除了积分之外的额外奖励',
     *      onPrepared:function, // 表示视频准备就绪可以播放
     *      onComplete: function, // 表示视频播放完成
     *      onError: function // 表示视频播放错误
     * }
     */
    showToutiaoVideoAd: function(configJO){ 

        var isError = false;//标识 
        var codeId = configJO.androidCodeId;
        if (this.isAndroid()) { 
            codeId = UnicomCSJCoinAd.getNomubanCodeId(configJO.androidCodeId+""); 
        }else{
            codeId = configJO.iosCodeId+""; //如果传了number,强转成string
            var clientVersion = UnicomCSJCoinAd.getClientVersion();  
            if(clientVersion == "iphone_c@7.0402"){
                if(configJO.unWantedToast){
                    configJO.unWantedToast = true;
                }else{
                    configJO.unWantedToast = true; 
                } 
            }
            if(clientVersion == "iphone_c@8.0001"){
               configJO.rewards = true;
            }
        }

        configJO.codeId = codeId;
        configJO.action ='showVideoAd';
        configJO.channel='GGPD';

        // var msgJO = {
        //     codeId:codeId,
        //     acId:configJO.acId,
        //     taskId:configJO.taskId, 
		// 	action: 'showVideoAd',
        //     channel: configJO.channel, 
        //     channelName:configJO.channelName,
        //     gameId:configJO.gameId,
        //     gameSceneId:configJO.gameSceneId,
        //     rewards: configJO.rewards,
        //     unWantedToast:configJO.unWantedToast,
        //     remark:configJO.remark,
        //     onPrepared:configJO.onPrepared,
        //     onComplete:configJO.onComplete,
        //     onError:configJO.onError
        // } 
		var config = {
			type: 'TOUTIAOAD',
			msg: JSON.stringify(configJO)
        }
        
        //接收回调数据
        UnicomCSJCoinAd.showToutiaoVideoAd.onPrepared = function () {
            if (typeof configJO.onPrepared === 'function') {
                configJO.onPrepared();
            }
        };

        //接收回调数据
        UnicomCSJCoinAd.showToutiaoVideoAd.onComplete = function (data,timeFlag) { 
            if(isError){
                data = '0';
            }
            if (typeof configJO.onComplete === 'function') {
                configJO.onComplete(data,timeFlag);
            }
        };

          //接收验证参数
          UnicomCSJCoinAd.showToutiaoVideoAd.onRewardVerify = function (result) {  
           
            if (typeof configJO.onRewardVerify === 'function') {
                configJO.onRewardVerify(result);
            }

        };

        //接收回调数据
        UnicomCSJCoinAd.showToutiaoVideoAd.onError = function (data) {
            isError = true;
            console.log("头条激励视频错误:"+data)
            if (typeof configJO.onError === 'function') {
                configJO.onError(); 
            }
        };

        //覆盖
        window.videoStatusCallback = function (data) {};

		if (this.isAndroid()) {
          
			window.js_invoke.interact(JSON.stringify(config));
        }else{
            window.location = encodeURI("clientAction=" + JSON.stringify(config));
        }
    },

      /**
         * 最低支持android客户端7.6版本
         * 支持 1、横版视频 2、上下图文模板 3、左图右文模板
         * modelType 1:modelType  2:上下图文模板  3:左图右文模板
         * configJO = {
         *      codeId:"代码位"
         *      acId:"活动id",
         *      channel:'渠道',
         *      channelName:configJO.channelName,
         *      style:{
         *          top:top,//距离屏幕顶部的高度
         *          width:XXLWidth,
                    height:XXLHeight,
                    scale:scale  //缩放比例，1是按照屏幕宽度。不填默认为1。
         *      },
         *      onLoadSuccess:function, // 当广告加载完毕时
         *      onLoadError: function, // 当广告加载错误时
         *      onHideManually: function // 当广告被用户关闭时
         * }
         */
        showToutiaoXXLAd:function(configJO){

            var codeId = configJO.androidCodeId;
            if (this.isAndroid()) {
                codeId = configJO.androidCodeId;
                var clientVersion = UnicomCSJCoinAd.getClientVersion();
                if(clientVersion > "android@7.0402" ){
                    //兼容客户端。scale=1时代是全屏广告，否则是悬浮窗广告
                    if(configJO.style.scale == 1){
                        configJO.style.top=configJO.style.top*3/window.devicePixelRatio;
                    }else{
                        configJO.style.top=configJO.style.top*3/window.devicePixelRatio*360/window.innerWidth;
                    }
                }
            }else{
                codeId = configJO.iosCodeId+"";//如果传了number,强转成string
            }
            configJO.codeId = codeId;
            configJO.action ='showXXLAd';

    		var config = {
    			type: 'TOUTIAOAD',
    			msg: JSON.stringify(configJO)
            }

            //接收回调数据
            UnicomCSJCoinAd.showToutiaoXXLAd.onLoadSuccess = function () {
                if (typeof configJO.onLoadSuccess === 'function') {
                    configJO.onLoadSuccess();
                }
            };

            //接收回调数据
            UnicomCSJCoinAd.showToutiaoXXLAd.onLoadError = function (data) {
                console.log("头条信息流错误:"+data)
                if (typeof configJO.onLoadError === 'function') {
                    configJO.onLoadError(data);
                }
            };

            //接收回调数据
            UnicomCSJCoinAd.showToutiaoXXLAd.onHideManually = function () {
                if (typeof configJO.onHideManually === 'function') {
                    configJO.onHideManually();
                }
            };

    		if (this.isAndroid()) {
    			window.js_invoke.interact(JSON.stringify(config));
    		}else{
                window.location = encodeURI("clientAction=" + JSON.stringify(config));
            }
        },

       /**
         * 最低支持android客户端7.6版本
         * 隐藏正在显示的信息流广告
         */
        hideToutiaoXXLAd:function(){
            var msgJO = {
    			action: 'hideXXLAd',
            }

            var config = {
    			type: 'TOUTIAOAD',
    			msg: JSON.stringify(msgJO)
            }

    		if (this.isAndroid()) {
    			window.js_invoke.interact(JSON.stringify(config));
    		}else{
                window.location = encodeURI("clientAction=" + JSON.stringify(config));
            }
        },
    
}
window.UnicomCSJCoinAd=UnicomCSJCoinAd;

// const UnicomCSJCoinAdVue = {
//     install(Vue) {
//         Vue.prototype.$UnicomCSJCoinAd = UnicomCSJCoinAd;
//     }
// };
// export default UnicomCSJCoinAdVue;