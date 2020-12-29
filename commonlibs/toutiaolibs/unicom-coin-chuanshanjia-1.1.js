
/**
 * 联通-头条-积分数据管理
 * sceneid可以理解为在同一个business下区分不同场景，同一个business下的sceneid是不会重复的
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
        if (UnicomCSJCoinAd.isInApp()) {
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

            if (UnicomCSJCoinAd.isIOS()) {
                var config = {
                    type: 'getClientInfo',
                };
                window.location = encodeURI("clientAction=" + JSON.stringify(config));
            } else if (UnicomCSJCoinAd.isAndroid()) {
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
            codeId = configJO.androidCodeId;
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
    
}
window.UnicomCSJCoinAd=UnicomCSJCoinAd;

// const UnicomCSJCoinAdVue = {
//     install(Vue) {
//         Vue.prototype.$UnicomCSJCoinAd = UnicomCSJCoinAd;
//     }
// };
// export default UnicomCSJCoinAdVue;