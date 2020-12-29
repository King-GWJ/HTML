
/**
 * 联通-优乐惠
 */
var UnicomYLHAd = {

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
        if (UnicomYLHAd.isInApp()) {
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

            if (UnicomYLHAd.isIOS()) {
                var config = {
                    type: 'getClientInfo',
                };
                window.location = encodeURI("clientAction=" + JSON.stringify(config));
            } else if (UnicomYLHAd.isAndroid()) {
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
        UnicomYLHAd.getBrowserInfo.browserInfoCallback = function (data) {
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
                UnicomYLHAd.hideToutiaoBannerAd();
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

    //=================================================优量汇JS方法=================================================================================

    showYLHVideoAd: function(configJO){

        var isError = false;//标识

        if (this.isAndroid()) {
            PlacementId = configJO.PlacementId;
        }else{
            PlacementId = configJO.iosPlacementId+""; //如果传了number,强转成string
            var clientVersion = UnicomYLHAd.getClientVersion();
            if(clientVersion === "iphone_c@7.0402"){
                if(configJO.unWantedToast){
                    configJO.unWantedToast = true;
                }else{
                    configJO.unWantedToast = true;
                }
            }
        }
        configJO.PlacementId = PlacementId;
        /**
         * ---------------------可以删除-------------------------
         * /
        switch (configJO.ylhadtype) {
            case 0:
                //0是激励视频
                configJO.action ='showYLHVideoAd';
                break;
            case 1:
                //1是自渲染
                configJO.action ='getUnifiedNativeAdData';
                break;
            default:
                break;
        }
        /**
         * ----------------------------------------------------
         */

        // configJO.channel='GGPD';

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
            type: 'YLHAD',
            msg: JSON.stringify(configJO)
        }


        //激励视频开始播放
        UnicomYLHAd.showYLHVideoAd.startPlayVideo = function () {
            configJO.startPlayVideo();
        };

        //激励视频播放完毕
        UnicomYLHAd.showYLHVideoAd.onComplete = function () {
            configJO.onComplete();
        };

        //激励视频发生错误回调
        UnicomYLHAd.showYLHVideoAd.onError = function (error) {
            isError = true;
            configJO.onError(error);
        };

        //接收自渲染请求数据成功回调
        UnicomYLHAd.showYLHVideoAd.requestDataSuccess = function (data) {
            configJO.requestDataSuccess(data);
        };

        //接收自渲染请求数据失败回调
        UnicomYLHAd.showYLHVideoAd.requestDataFail = function (error) {
            configJO.requestDataFail(error);
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
window.UnicomYLHAd=UnicomYLHAd;

// const UnicomYLHAdVue = {
//     install(Vue) {
//         Vue.prototype.$UnicomYLHAd = UnicomYLHAd;
//     }
// };
// export default UnicomYLHAdVue;