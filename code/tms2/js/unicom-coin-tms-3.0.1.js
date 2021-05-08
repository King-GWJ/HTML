/**
 * 联通-腾讯-积分数据管理
 * sceneid可以理解为在同一个business下区分不同场景，同一个business下的sceneid是不会重复的
 */
var UnicomTMSCoinAd = {

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
		var u = navigator.userAgent;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; 
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
		var arr = u.split(";")
		var V = ''
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].indexOf("unicom") > 0) {
				V = arr[i];
				break
			}
        }
        var version = "";
		if (isAndroid) {
		    version = V.match(/\:(\S*)\,/)[1]
		} else if (isiOS) {
			version = V.match(/\:(\S*)\}/)[1].split("}")[0]
		}
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
        if (UnicomTMSCoinAd.isInApp()) {
            window.setClientInfo = function(info) {
                if (typeof callback === 'function') {
                    var infoOBJ = JSON.parse(info);
                    var currentPhoneNumber = infoOBJ['currentPhoneNumber'];
                    if (_.isNil(currentPhoneNumber)) {
                        infoOBJ['currentPhoneNumber'] = "";
                    } else if ('0' == currentPhoneNumber) {
                        infoOBJ['currentPhoneNumber'] = "";
                    } else {
                        infoOBJ['currentPhoneNumber'] = _.trim(currentPhoneNumber);
                    }
                    callback(infoOBJ);
                }
            }

            if (UnicomTMSCoinAd.isIOS()) {
                var config = {
                    type: 'getClientInfo',
                };
                window.location = encodeURI("clientAction=" + JSON.stringify(config));
            } else if (UnicomTMSCoinAd.isAndroid()) {
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
    share(shareJson) {
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
                UnicomTMSCoinAd.hideBannerAd();
            } 

            return false;

        }

    }, 

    /**
     * 
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


    /**
     * 最低支持android客户端7.4版本
     * 广告图是16:9比例
     * 创建一个客户端Banner广告对象，具体Banner由客户端负责展示，只要调用该方法，banner会自动显示，以此达到最有益的曝光。
     * 开发者可以调用 showBannerAd 创建 Banner 广告组件。Banner 广告组件在创建后会自动拉取广告数据并进行渲染，
     * 开发者只需要控制 Banner 广告组件的位置和显示/隐藏即可。
     * @param {Object} configJO Bannber广告初始化配置
     * configJO = {
     *      taskType:'任务类型，Number类型',
     *      channel:'渠道',
     *      screenId:'场景ID',
     *      gameId:'游戏ID',
     *      gameSceneId:'游戏场景ID',
     *      style:{
     *          left:0, //x轴显示位置
     *          top:0, //y轴显示位置
     *          width:360,//宽度，单位是px，高度根据banner的实际尺寸自动计算缩放
     *      },
     *      adIntervals:0, //广告定时自动更新，单位秒
     *      onLoadSuccess:function, // 当广告加载完毕时
     *      onLoadError: function, // 当广告加载错误时
     *      onHideManually: function // 当广告被用户关闭时
     * }
     */
    showBannerAd:function(configJO){
        var msgJO = {
			taskType: configJO.taskType,
			action: 'showBannerAd',
            channel: configJO.channel,
            screenId: configJO.screenId,
            gameId:configJO.gameId,
            gameSceneId:configJO.gameSceneId,
            style:configJO.style,
            adIntervals: configJO.adIntervals,
            onLoadSuccess:configJO.onLoadSuccess,
            onLoadError:configJO.onLoadError,
            onHideManually:configJO.onHideManually
		}
		var config = {
			type: 'TMSAD',
			msg: JSON.stringify(msgJO)
        }
        
        //接收回调数据
        UnicomTMSCoinAd.showBannerAd.onLoadSuccess = function () {
            if (typeof configJO.onLoadSuccess === 'function') {
                configJO.onLoadSuccess();
            }
        };

        //接收回调数据
        UnicomTMSCoinAd.showBannerAd.onLoadError = function (data) {
            if (typeof configJO.onLoadError === 'function') {
                configJO.onLoadError(data);
            }
        };

        //接收回调数据
        UnicomTMSCoinAd.showBannerAd.onHideManually = function () {
            if (typeof configJO.onHideManually === 'function') {
                configJO.onHideManually();
            }
        };

		if (this.isAndroid()) {
			window.js_invoke.interact(JSON.stringify(config));
		}
    },
    /**
     * 最低支持android客户端7.4版本
     * 隐藏正在显示的Banner广告
     */
    hideBannerAd:function(){
        var msgJO = {
			action: 'hideBannerAd',
        }
        
        var config = {
			type: 'TMSAD',
			msg: JSON.stringify(msgJO)
        }

		if (this.isAndroid()) {
			window.js_invoke.interact(JSON.stringify(config));
		}
    },

    /**
     * 最低支持android客户端7.4版本
     * 广告图是16:9比例
     * 创建一个客户端Banner广告对象，具体Banner由客户端负责展示，只要调用该方法，banner会自动显示，以此达到最有益的曝光。
     * 开发者可以调用 showBannerAd 创建 Banner 广告组件。Banner 广告组件在创建后会自动拉取广告数据并进行渲染，
     * 开发者只需要控制 Banner 广告组件的位置和显示/隐藏即可。
     * @param {Object} configJO Bannber广告初始化配置
     * configJO = {
     *      taskType:'任务类型，Number类型',
     *      channel:'渠道',
     *      screenId:'场景ID',
     *      gameId:'游戏ID',
     *      gameSceneId:'游戏场景ID',
     *      style:{
     *          left:0, //x轴显示位置
     *          top:0, //y轴显示位置
     *          width:360,//宽度，单位是px，高度根据banner的实际尺寸自动计算缩放
     *      },
     *      adIntervals:0, //广告定时自动更新，单位秒
     *      onLoadSuccess:function, // 当广告加载完毕时
     *      onLoadError: function, // 当广告加载错误时
     *      onHideManually: function // 当广告被用户关闭时
     * }
     */
    showBannerAd:function(configJO){
        var msgJO = {
			taskType: configJO.taskType,
			action: 'showBannerAd',
            channel: configJO.channel,
            screenId: configJO.screenId,
            gameId:configJO.gameId,
            gameSceneId:configJO.gameSceneId,
            style:configJO.style,
            adIntervals: configJO.adIntervals,
            onLoadSuccess:configJO.onLoadSuccess,
            onLoadError:configJO.onLoadError,
            onHideManually:configJO.onHideManually
		}
		var config = {
			type: 'TMSAD',
			msg: JSON.stringify(msgJO)
        }
        
        //接收回调数据
        UnicomTMSCoinAd.showBannerAd.onLoadSuccess = function () {
            if (typeof configJO.onLoadSuccess === 'function') {
                configJO.onLoadSuccess();
            }
        };

        //接收回调数据
        UnicomTMSCoinAd.showBannerAd.onLoadError = function (data) {
            if (typeof configJO.onLoadError === 'function') {
                configJO.onLoadError(data);
            }
        };

        //接收回调数据
        UnicomTMSCoinAd.showBannerAd.onHideManually = function () {
            if (typeof configJO.onHideManually === 'function') {
                configJO.onHideManually();
            }
        };

		if (this.isAndroid()) {
			window.js_invoke.interact(JSON.stringify(config));
		}
    },
    /**
     * 最低支持android客户端7.4版本
     * 隐藏正在显示的Banner广告
     */
    hideBannerAd:function(){
        var msgJO = {
			action: 'hideBannerAd',
        }
        
        var config = {
			type: 'TMSAD',
			msg: JSON.stringify(msgJO)
        }

		if (this.isAndroid()) {
			window.js_invoke.interact(JSON.stringify(config));
		}
    },

    /**
     * 获取浏览器相关信息
     */
    getBrowserInfo: function(browserInfoCallback){
        var msgJO = {
			action: 'getBrowserInfo',
        }

        var config = {
			type: 'TMSAD',
			msg: JSON.stringify(msgJO)
        }
        
        //接收回调数据
        UnicomTMSCoinAd.getBrowserInfo.browserInfoCallback = function (data) {
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
     * 直接显示视频广告
     * configJO = {
     *      taskType:'任务类型，Number类型',
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
    showVideoAd2: function(configJO){
        var msgJO = {
			taskType: configJO.taskType,
			action: 'showVideoAd',
            channel: configJO.channel,
            screenId: configJO.screenId,
            gameId:configJO.gameId,
            gameSceneId:configJO.gameSceneId,
            rewards: configJO.rewards,
            onPrepared:configJO.onPrepared,
            onComplete:configJO.onComplete,
            onError:configJO.onError
		}
		var config = {
			type: 'TMSAD',
			msg: JSON.stringify(msgJO)
        }
        
        //接收回调数据
        UnicomTMSCoinAd.showVideoAd2.onPrepared = function () {
            if (typeof configJO.onPrepared === 'function') {
                configJO.onPrepared();
            }
        };

        //接收回调数据
        UnicomTMSCoinAd.showVideoAd2.onComplete = function (data) {
            if (typeof configJO.onComplete === 'function') {
                configJO.onComplete(data);
            }
        };

        //接收回调数据
        UnicomTMSCoinAd.showVideoAd2.onError = function () {
            if (typeof configJO.onError === 'function') {
                configJO.onError();
            }
        };

        //覆盖
        window.videoStatusCallback = function (data) {};

		if (this.isAndroid()) {
			window.js_invoke.interact(JSON.stringify(config));
        }
    },
    /**
     * 直接显示视频广告
     * @param {Number} taskType 积分任务类型
     * @param {String} channel 渠道号 
     * @param {String} screenId 场景ID 
     * @param {Function} videoStatusCallback 视频播放状态回调 
     * @param {Boolean} rewards 是否有除了积分之外的额外奖励
     * onPrepared 表示视频准备就绪可以播放
     * onComplete 表示视频播放完成
     * onError 表示视频播放错误
     */
    showVideoAd: function(taskType,channel,screenId,rewards,videoStatusCallback){
        var msgJO = {
			taskType: taskType,
			action: 'showVideoAd',
            channel: channel,
            screenId: screenId,
            rewards: rewards
		}
		var config = {
			type: 'TMSAD',
			msg: JSON.stringify(msgJO)
        }
        
        //接收回调数据
        window.videoStatusCallback = function (data) {
            if (typeof videoStatusCallback === 'function') {
                videoStatusCallback(data);
            }
        };

        //覆盖
        UnicomTMSCoinAd.showVideoAd2.onPrepared = function () {};

        //覆盖
        UnicomTMSCoinAd.showVideoAd2.onComplete = function () {};

        //覆盖
        UnicomTMSCoinAd.showVideoAd2.onError = function () {};

		if (this.isAndroid()) {
			window.js_invoke.interact(JSON.stringify(config));
		}
    },
    /**
     * 获取积分任何和广告数据，仅返回一条广告数据
     * @param {Number} taskType 积分任务类型
     * @param {String} business 广告类型
     * @param {String} channel 渠道号
     * @param {String} screenId 场景ID 
     * @param {Function} callback 接收数据回调函数
     */
    getCoinAdData: function(taskType,business,channel,screenId,callback){
        var businessT = business;
        var clientVersion = this.getClientVersion();
        if(!_.isNil(clientVersion) && !_.isEmpty(clientVersion) && clientVersion.split("@")[1] > 7.03){
            //7.3.1开始banner广告开始使用 COIN_BANNER_EXIT
            if(businessT == 'COIN_CARD_GIVE'){
                businessT = 'COIN_BANNER_EXIT';
            }
        }else {
            //7.2 7.3 版本banner广告还是使用 COIN_CARD_GIVE
            if(businessT == 'COIN_BANNER_EXIT'){
                businessT = 'COIN_CARD_GIVE';
            }
        }
        
        var msgJO = {
			taskType: taskType,
			action: 'getCoinAdData',
            business: businessT,
            channel: channel,
            screenId: screenId
        }
        
		var config = {
			type: 'TMSAD',
			msg: JSON.stringify(msgJO)
        }
        
        //接收回调数据
        window.getCoinAdDataCallback = function (data) {
            if (typeof callback === 'function') {
                callback(data);
            }
        };

		if (this.isAndroid()) {
			window.js_invoke.interact(JSON.stringify(config));
		}
    },
    /**
     * 开始做积分任务
     * @param {String} uuid 
     * @param {Number} taskType 积分任务类型
     * @param {String} channel 渠道号
     * @param {String} screenId 场景ID 
     * @param {Function} startCoinTaskCallback 积分任务完成结果回调
     * @param {Function} appStatusCallback app下载安装并成功激活各种状态回调
     * 1：onAdAppDownloadStart  app开始下载
     * 2：onAdAppDownloadSucceed  app下载完成
     * 3：onAdAppInstall  app安装
     * 4：onAdAppActive  app从手厅启动激活
      */
    startCoinTask: function(uuid,taskType,channel,screenId,startCoinTaskCallback,appStatusCallback){
        var msgJO = {
			uuid: uuid,
            action: 'startCoinTask',
            taskType: taskType,
            channel: channel,
            screenId: screenId
		}
		var config = {
			type: 'TMSAD',
			msg: JSON.stringify(msgJO)
        }

        //接收积分任务完成状态回调
        window.startCoinTaskCallback = function (data) {
            if (typeof startCoinTaskCallback === 'function') {
                startCoinTaskCallback(data);
            }
        };

        //app下载信息广告回调
        window.appStatusCallback = function (data) {
            if (typeof appStatusCallback === 'function') {
                appStatusCallback(data);
            }
        }

		if (this.isAndroid()) {
			window.js_invoke.interact(JSON.stringify(config));
		}
    },
    /**
     * 自由上报曝光
     * @param {String} uuid 
     * @param {Number} taskType 积分任务类型
     * @param {String} channel 渠道号
     * @param {String} screenId 场景ID 
     */
    onAdDisplay: function(uuid,taskType){
        var msgJO = {
			uuid: uuid,
            action: 'onAdDisplay',
            taskType: taskType
		}
		var config = {
			type: 'TMSAD',
			msg: JSON.stringify(msgJO)
        }

		if (this.isAndroid()) {
			window.js_invoke.interact(JSON.stringify(config));
		}
    },

    //=================================================头条JS方法=================================================================================
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
        }else{
            codeId = configJO.iosCodeId;
        }
        var msgJO = {
            codeId:codeId,  
			action: 'showBannerAd',
            channel: configJO.channel, 
            gameId:configJO.gameId,
            gameSceneId:configJO.gameSceneId,
            style:configJO.style,
            adIntervals: configJO.adIntervals,
            onLoadSuccess:configJO.onLoadSuccess,
            onLoadError:configJO.onLoadError,
            onHideManually:configJO.onHideManually
		}
		var config = {
			type: 'TOUTIAOAD',
			msg: JSON.stringify(msgJO)
        }
        
        //接收回调数据
        UnicomTMSCoinAd.showToutiaoBannerAd.onLoadSuccess = function () {
            if (typeof configJO.onLoadSuccess === 'function') {
                configJO.onLoadSuccess();
            }
        };

        //接收回调数据
        UnicomTMSCoinAd.showToutiaoBannerAd.onLoadError = function (data) {
            if (typeof configJO.onLoadError === 'function') {
                configJO.onLoadError(data);
            }
        };

        //接收回调数据
        UnicomTMSCoinAd.showToutiaoBannerAd.onHideManually = function () {
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
        var codeId = configJO.androidCodeId;
        if (this.isAndroid()) {
            codeId = configJO.androidCodeId;
        }else{
            codeId = configJO.iosCodeId;
        }

        var msgJO = {
            codeId:codeId,
            acId:configJO.acId,
            taskId:configJO.taskId, 
			action: 'showVideoAd',
            channel: configJO.channel, 
            gameId:configJO.gameId,
            gameSceneId:configJO.gameSceneId,
            rewards: configJO.rewards,
            remark:configJO.remark,
            onPrepared:configJO.onPrepared,
            onComplete:configJO.onComplete,
            onError:configJO.onError
        } 
		var config = {
			type: 'TOUTIAOAD',
			msg: JSON.stringify(msgJO)
        }
        
        //接收回调数据
        UnicomTMSCoinAd.showToutiaoVideoAd.onPrepared = function () {
            if (typeof configJO.onPrepared === 'function') {
                configJO.onPrepared();
            }
        };

        //接收回调数据
        UnicomTMSCoinAd.showToutiaoVideoAd.onComplete = function (data) { 
            if (typeof configJO.onComplete === 'function') {
                configJO.onComplete(data);
            }
        };

        //接收回调数据
        UnicomTMSCoinAd.showToutiaoVideoAd.onError = function () {
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
    
}