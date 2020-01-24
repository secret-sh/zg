/**
 * @description Ajax调用工具类
 * @author 易文俊
 * @since 2015-04-02
 */
var Ajax = function(){
	
	return {
		/** 标识是否已经提示过用户已超时，避免重复弹窗 */
		hasAlertTimeOut: false,
		
		/**
		 * 调用指定的Controller类中的某个方法，带参数和回调函数
		 * @param cfg 调用配置，包含以下几个属性：
         * url: 要调用的url名称，主要用于struts、spring MVC、servlet
		 * callPara：要传给后台的参数对象
		 * callback：调用完毕后的回调函数,包含一个data参数
		 */
		call: function(cfg){
            var url = cfg.url;
			var callPara = cfg.callPara 		|| cfg.p;
			var callback = cfg.callback 		|| cfg.f;
			var scope = cfg.scope				|| cfg.s;
			var timeout = cfg.timeout			|| cfg.t || 60000;
			var method = cfg.method				|| 'POST';
            var mergePara = cfg.mergePara		|| true;
            var async = cfg.async;
            var jsonp = cfg.jsonp;

			if (!url) {
				return;
			}
			var para = JSON.stringify(callPara || {});
            if ( mergePara == true ){
                para = callPara;
            } else {
                para = {para: para};
            }
            if(async==undefined){
            	async=true;
            }
            var promise = $.ajax({
                url: url,
                type: method,
                data: para,
                async: async,
                timeout : timeout
            }).complete(function(data) {
                Ajax.callback(data, url, scope, callback);
            });

            if ( jsonp ){
                promise = $.ajax({
                    url: url,
                    type: method,
                    dataType : "jsonp",
                    jsonp:"jsonpCallback" , //服务端用于接收callback调用的函数名参数，不得修改
                    data: para,
                    async: async,
                    timeout : timeout
                }).complete(function(data) {
                    Ajax.callback(data, url, scope, callback);
                });
            }
            return promise;
        },

        callRest: function(cfg){
            var url = cfg.url;
            var callPara = cfg.callPara 		|| cfg.p;
            var callback = cfg.callback 		|| cfg.f;
            var scope = cfg.scope				|| cfg.s;
            var jsonp = cfg.jsonp;
            var timeout = cfg.timeout			|| cfg.t || 60000;

            if (!url) {
                return;
            }

            var ajaxPara = {
                url: url,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(callPara),
                crossDomain: true,
                dataType: "json",
                timeout : timeout
            };

            if ( jsonp ){
                ajaxPara.dataType = "jsonp";
                ajaxPara.jsonp = "jsonpCallback";  //服务端用于接收callback调用的函数名参数，不得修改
            }

            var promise = $.ajax(ajaxPara).complete(function(data, aa, bb, cc, dd) {
                Ajax.callback(data, url, scope, callback);
            });
            return promise;
        },

        callback: function(data, url, scope, callbackFun){
            var responseText = data.responseText;

            if (!responseText) {
                return;
            }

            var jsonObject = jQuery.parseJSON(responseText);
            if (jsonObject.exceptionID) {
                console.error(jsonObject.stack);
                Ajax.popupException(jsonObject.exceptionID);
                return;
            }

            if ( jsonObject != null && jsonObject.timeout != null && jsonObject.timeout ){
                if (Ajax.hasAlertTimeOut) {
                    return;
                } else {
                    Ajax.hasAlertTimeOut = true;
                }

                //对于轮询请求，不弹出提示。
                if (url == 'loop.action') {
                    return;
                }

                Notify.error("连接超时", true);
                location.reload();
                return;
            }

            if ( callbackFun != null && callbackFun != undefined ){
                if(scope == null || typeof scope != 'object'){
                    callbackFun(jsonObject);
                }else{
                    callbackFun.call(scope,jsonObject);
                }
            } else {
                console.log("callback function is null!");
            }
        },
        popupException: function(exceptionID) {
            Notify.error("系统异常", true);
        },

        empty: null
	};


}();