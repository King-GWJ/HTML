/**
 * 联通-腾讯-积分数据管理
 * sceneid可以理解为在同一个business下区分不同场景，同一个business下的sceneid是不会重复的
 */
var UnicomYHLAd = {

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
     * 判断是否是Android手机
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
     * 激励视频
     */
    showVideoAd: function(configJO){
    
        var msgJO = {
            ylhadtype:0,
            PlacementId:configJO.PlacementId,
            openVioce:configJO.openVioce,
            onComplete:configJO.onComplete,
            onError:configJO.onError
        }

		var config = {
			type: 'YLHAD',
			msg: JSON.stringify(msgJO)
        }
        
         //接收成功回调数据
         UnicomYHLAd.showVideoAd.onComplete = function (data) {
            if (typeof configJO.onComplete === 'function') {
                configJO.onComplete(data);
            }
        };

        //接收失败回调数据
        UnicomYHLAd.showVideoAd.onError = function (error) {
            if (typeof configJO.onError === 'function') {
                configJO.onError(error);
            }
        };

		if (this.isAndroid()) {
            console.log("android");
            window.js_invoke.interact(JSON.stringify(config));
        } else if(this.isIOS()) {
            window.location = encodeURI('clientAction=' + JSON.stringify(config));
        }
    },
    
    /**
     * 自渲染
     */
    unifiedVideoAd: function(configJO){

        var msgJO = {
            ylhadtype:1,
            PlacementId:configJO.PlacementId,
            AdCount:configJO.AdCount,
            onComplete:configJO.onComplete,
            onError:configJO.onError
        }

		var config = {
			type: 'YLHAD',
			msg: JSON.stringify(msgJO)
        }

        //接收成功回调数据
        UnicomYHLAd.unifiedVideoAd.onComplete = function (data) {
            if (typeof configJO.onComplete === 'function') {
                configJO.onComplete(data);
            }
        };

        //接收失败回调数据
        UnicomYHLAd.unifiedVideoAd.onError = function (error) {
            if (typeof configJO.onError === 'function') {
                configJO.onError(error);
            }
        };

        if (this.isAndroid()) {
            window.js_invoke.interact(JSON.stringify(config));
        } else if(this.isIOS()) {
            window.location = encodeURI('clientAction=' + JSON.stringify(config));
        }
    },

    wxLogin: function(){
        window.js_invoke.wxLoginMessage();
    }
    
}