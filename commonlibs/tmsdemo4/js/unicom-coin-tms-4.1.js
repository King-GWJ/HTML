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
		}
    },
    /**
     * 直接显示视频广告
     * configJO = {
     *      taskType:'android使用的任务类型，Number类型',
     *      taskTypeIOS: 'ios使用的任务类型',
     *      channel:'渠道',
     *      sceneId:'android 获取广告需要配置 场景ID',
     *      positionId:'ios 获取广告需要配置',
     *      styleId:' ios 获取广告需要配置',
     *      gameId:'游戏ID',
     *      gameSceneId:'游戏场景ID',
     *      rewards: '是否有除了积分之外的额外奖励',
     *      onPrepared:function, // 表示视频准备就绪可以播放
     *      onComplete: function, // 表示视频播放完成
     *      onError: function // 表示视频播放错误
     * }
     */
    showVideoAd2: function(configJO){
        var taskTypeT = configJO.taskType;
        if(this.isIOS()){
            taskTypeT = configJO.taskTypeIOS;
        }

        var msgJO = {
			taskType: taskTypeT,
			action: 'showVideoAd',
            channel: configJO.channel,
            screenId: configJO.sceneId,
            positionId: configJO.positionId,
            styleId: configJO.styleId,
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
            
        } else if(this.isIOS()) {
            window.location = encodeURI('clientAction=' + JSON.stringify(config));
        }
    },
    /**
     * 直接显示视频广告
     * @param {Number} taskType 积分任务类型
     * @param {String} channel 渠道号 
     * @param {String} screenId 场景ID 
     * @param {Function} videoStatusCallback 视频播放状态回调 
     * @param {Boolean} rewards 是否赠送非积分的奖励
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
        if(this.isAndroid()){
            //处理android历史版本问题
            var clientVersion = this.getClientVersion();
            if(!_.isNil(clientVersion) && !_.isEmpty(clientVersion) && clientVersion.split("@")[1] > 7.04){
                //从7.4.1版本开始，卡券和Banner区分独立返回 。。。。。
            }else if(!_.isNil(clientVersion) && !_.isEmpty(clientVersion) && clientVersion.split("@")[1] > 7.03){
                //7.3.1 7.4版本 banner广告使用 COIN_BANNER_EXIT，卡券广告没有也使用Banner
                if(businessT == 'COIN_CARD_GIVE'){
                    businessT = 'COIN_BANNER_EXIT';
                }
            }else {
                //7.2 7.3 Banner和卡券都是用COIN_CARD_GIVE
                if(businessT == 'COIN_BANNER_EXIT'){
                    businessT = 'COIN_CARD_GIVE';
                }
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
     * 获取Banner广告数据，仅返回一条广告数据
     * configJO = {
     *      taskType:'任务类型，Number类型',
     *      taskTypeIOS: 'ios使用的任务类型',
     *      channel:'渠道',
     *      sceneId:'android 获取广告需要配置 场景ID',
     *      positionId:'ios 获取广告需要配置',
     *      styleId:' ios 获取广告需要配置',
     *      rewards: '是否赠送非积分奖励',
     *      callback:function //接收广告数据
     * }
     */
    getBannerAdData(configJO){
        configJO.business = "COIN_BANNER_EXIT";
        this.getCoinAdData2(configJO);
    },
    /**
     * 获取卡券广告数据，仅返回一条广告数据
     * configJO = {
     *      taskType:'任务类型，Number类型',
     *      taskTypeIOS: 'ios使用的任务类型',
     *      channel:'渠道',
     *      sceneId:'android 获取广告需要配置 场景ID',
     *      positionId:'ios 获取广告需要配置',
     *      styleId:' ios 获取广告需要配置',
     *      rewards: '是否赠送非积分奖励',
     *      callback:function //接收广告数据
     * }
     */
    getCardAdData(configJO){
        configJO.business = "COIN_CARD_GIVE";
        this.getCoinAdData2(configJO);
    },
    /**
     * 获取APP广告数据，仅返回一条广告数据
     * configJO = {
     *      taskType:'任务类型，Number类型',
     *      taskTypeIOS: 'ios使用的任务类型',
     *      channel:'渠道',
     *      sceneId:'android 获取广告需要配置 场景ID',
     *      positionId:'ios 获取广告需要配置',
     *      styleId:' ios 获取广告需要配置',
     *      rewards: '是否赠送非积分奖励',
     *      callback:function //接收广告数据
     * }
     */
    getAppAdData(configJO){
        configJO.business = "COIN_DOWNLOAD_APP_AD";
        this.getCoinAdData2(configJO);
    },
    /**
     * 根据business获取广告数据，仅返回一条广告数据
     * configJO = {
     *      taskType:'任务类型，Number类型',
     *      taskTypeIOS: 'ios使用的任务类型',
     *      business: '广告类型',
     *      channel:'渠道',
     *      sceneId:'android 获取广告需要配置 场景ID',
     *      positionId:'ios 获取广告需要配置',
     *      styleId:' ios 获取广告需要配置',
     *      rewards: '是否赠送非积分奖励',
     *      callback:function //接收广告数据
     * }
     */
    getCoinAdData2: function(configJO){
        var businessT = configJO.business;

        if(this.isAndroid()){
            //处理android历史版本问题
            var clientVersion = this.getClientVersion();
            if(!_.isNil(clientVersion) && !_.isEmpty(clientVersion) && clientVersion.split("@")[1] > 7.04){
                //从7.4.1版本开始，卡券和Banner区分独立返回 。。。。。
            }else if(!_.isNil(clientVersion) && !_.isEmpty(clientVersion) && clientVersion.split("@")[1] > 7.03){
                //7.3.1 7.4版本 banner广告使用 COIN_BANNER_EXIT，卡券广告没有也使用Banner
                if(businessT == 'COIN_CARD_GIVE'){
                    businessT = 'COIN_BANNER_EXIT';
                }
            }else {
                //7.2 7.3 Banner和卡券都是用COIN_CARD_GIVE
                if(businessT == 'COIN_BANNER_EXIT'){
                    businessT = 'COIN_CARD_GIVE';
                }
            }
        }

        var taskTypeT = configJO.taskType;
        if(this.isIOS()){
            taskTypeT = configJO.taskTypeIOS;
        }

        var msgJO = {
            action: 'getCoinAdData',
            taskType: taskTypeT,
            business: businessT,
            channel: configJO.channel,
            screenId: configJO.sceneId,
            positionId: configJO.positionId,
            styleId: configJO.styleId,
            callback:configJO.callback
        }
        
		var config = {
			type: 'TMSAD',
			msg: JSON.stringify(msgJO)
        }
        
        //接收回调数据
        UnicomTMSCoinAd.getCoinAdData2.callback = function (data) {
            if (typeof configJO.callback === 'function') {
                configJO.callback(data);
            }
        };

		if (this.isAndroid()) {
            window.js_invoke.interact(JSON.stringify(config)); 
        } else if(this.isIOS()) {
            window.location = encodeURI('clientAction=' + JSON.stringify(config));
        }
    },
    /**
     * 开始做任务
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
     * 开始做任务
     * configJO = {
     *      uuid: '返回的广告任务uuid',
     *      taskType:'任务类型，Number类型',
     *      taskTypeIOS: 'ios使用的任务类型',
     *      channel:'渠道',
     *      sceneId:'android 获取广告需要配置 场景ID',
     *      positionId:'ios 获取广告需要配置',
     *      styleId:' ios 获取广告需要配置',
     *      rewards: '是否赠送非积分奖励',
     *      startCoinTaskCallback :function , 积分任务完成结果回调，如果不送积分则不会回调
     *      appStatusCallback:function  app下载安装并成功激活各种状态回调
     * }
     */
    startCoinTask2: function(configJO){
        var taskTypeT = configJO.taskType;
        if(this.isIOS()){
            taskTypeT = configJO.taskTypeIOS;
        }

        var msgJO = {
            action: 'startCoinTask',
            uuid: configJO.uuid,
            taskType: taskTypeT,
            channel: configJO.channel,
            screenId: configJO.sceneId,
            positionId: configJO.positionId,
            styleId: configJO.styleId,
            rewards: configJO.rewards,
            startCoinTaskCallback:configJO.startCoinTaskCallback,
            appStatusCallback:configJO.appStatusCallback
        }
        
		var config = {
			type: 'TMSAD',
			msg: JSON.stringify(msgJO)
        }
        
        //接收积分任务完成状态回调
        UnicomTMSCoinAd.startCoinTask2.startCoinTaskCallback = function (data) {
            if (typeof configJO.startCoinTaskCallback === 'function') {
                configJO.startCoinTaskCallback(data);
            }
        };

        //app下载信息广告回调
        UnicomTMSCoinAd.startCoinTask2.appStatusCallback = function (data) {
            if (typeof configJO.appStatusCallback === 'function') {
                configJO.appStatusCallback(data);
            }
        }

		if (this.isAndroid()) {
            window.js_invoke.interact(JSON.stringify(config)); 
        } else if(this.isIOS()) {
            window.location = encodeURI('clientAction=' + JSON.stringify(config));
        }
    },
    /**
     * 从下载有礼中获取app下载任务，点击打开下载有礼并自动下载
     * @param {Function} callback 回调函数用来接收返回数据
     */
    loadADFrom103XiaZaiYouLi: function(callback){
        var msgJO = {
			action: 'loadADFrom103XiaZaiYouLi'
		}
		var config = {
			type: 'TMSAD',
			msg: JSON.stringify(msgJO)
        }
        
        //接收回调数据
        UnicomTMSCoinAd.loadADFrom103XiaZaiYouLi.callback = function (data) {
            if (typeof callback === 'function') {
                callback(data);
            }
        };
        
        //下载有礼只支持android
		if (this.isAndroid()) {
            window.js_invoke.interact(JSON.stringify(config));
        }
    },
    /**
     * 打开下载有礼并自动开始下载对应的app的广告
     * @param {String} mUniqueKey 
     * @param {Function} taskUpdateCallback 积分任务状态更新结果回调
      */
     open103XiaZaiYouLi: function(mUniqueKey,taskUpdateCallback){
        var msgJO = {
			mUniqueKey: mUniqueKey,
            action: 'open103XiaZaiYouLi'
		}
		var config = {
			type: 'TMSAD',
			msg: JSON.stringify(msgJO)
        }

        //接收积分任务状态更新结果回调
        UnicomTMSCoinAd.open103XiaZaiYouLi.taskUpdateCallback = function () {
            if (typeof taskUpdateCallback === 'function') {
                taskUpdateCallback();
            }
        };
        
        //只有android可以调用
		if (this.isAndroid()) {
			window.js_invoke.interact(JSON.stringify(config));
		}
    },
    /**
     * 返回多个app下载展示，点击展示的其中一个app进入应用下载页并开启自动下载，业务侧自行申请配置任务类型ID进行接入
     * @param {Object} configJO 
     * configJO = {
     *      taskType:'任务类型，Number类型',
     *      channel:'渠道',
     *      sceneId:'android 获取广告需要配置 场景ID',
     *      gameId:'游戏ID',
     *      gameSceneId:'游戏场景ID',
     *      callback:function //接收广告数据
     * }
     */
    loadAppAdList: function(configJO){
        var msgJO = {
            action: 'loadAppAdList',
            taskType: configJO.taskType,
            channel: configJO.channel,
            sceneId: configJO.sceneId,
            gameId: configJO.gameId,
            gameSceneId: configJO.gameSceneId
        }

		var config = {
			type: 'TMSAD',
			msg: JSON.stringify(msgJO)
        }
        
        //接收回调数据
        UnicomTMSCoinAd.loadAppAdList.callback = function (data) {
            if (typeof configJO.callback === 'function') {
                configJO.callback(data);
            }
        };
        
        //只支持android
		if (this.isAndroid()) {
            window.js_invoke.interact(JSON.stringify(config));
        }
    },
    /**
     * 打开APP广告列表并下载
     * @param {String} mUniqueKey 
     * @param {Function} taskUpdateCallback 积分任务状态更新结果回调
      */
     /**
      * 打开APP广告列表并下载
      * @param {Object} configJO 
    * configJO = {
     *      taskType:'任务类型，Number类型',
     *      channel:'渠道',
     *      sceneId:'android 获取广告需要配置 场景ID',
     *      gameId:'游戏ID',
     *      gameSceneId:'游戏场景ID',
     *      taskUpdateCallback:function //任务状态改变通知
     * }
      */
     openAppAdList: function(configJO){
        var msgJO = {
            action: 'openAppAdList',
            mUniqueKey: configJO.mUniqueKey,
            taskType: configJO.taskType,
            channel: configJO.channel,
            sceneId: configJO.sceneId,
            gameId: configJO.gameId,
            gameSceneId: configJO.gameSceneId
        }
		var config = {
			type: 'TMSAD',
			msg: JSON.stringify(msgJO)
        }

        //接收积分任务状态更新结果回调
        UnicomTMSCoinAd.openAppAdList.taskUpdateCallback = function () {
            if (typeof configJO.taskUpdateCallback === 'function') {
                configJO.taskUpdateCallback();
            }
        };
        
        //只有android可以调用
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
    }
    
}