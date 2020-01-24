/**
 * @description 结果页面js   扫码验证显示信息详情页面
 * @author 易文俊
 * @since 2017-08-03
 */
var Information = function() {
	var t = {
		loadInformationData : function() {
		    var reqNo = $("#reqNoHidden").val();
		    var status = $("#status").val();
			Ajax.call({
				url : "licRequest/get.html",
				p : {
					reqNo : reqNo,
					state : status,
					contentType: "application/x-www-form-urlencoded; charset=utf-8"
				},
				f : function(data) { 
					if (data && data.code == "0000") {
						var info = data.data;
                        //许可证是否失效                       
                        var effective = info.EFFECTIVE;
                        var state = info.REQ_STATUS;
                        if(state == "52"){
                        	if(effective == true){
                        		$("#msg").css('display','block');
                        	}else{
                        		$("#msg1").css('display','block');
                        	}
                        }
						// 基本信息
						$("#reqNo").html(info.REQ_NO);
						//通行次数
						var cishu  = info.PASS_THROUGH;
						if(cishu == "1"){
						    $("#passCount").html("单次");
						} else if(cishu == "2"){
						    $("#passCount").html("多次");
						}
						
						var startDate = info.START_DATE;
						
						var endDate = info.END_DATE;
					
						$("#passDate").html(startDate + " 至 " +endDate);
						$("#orgCertNo").html(info.ORG_CERT_NO);
						// 途经省份
						$("#passDists").html(t.transDists(info.PASS_DISTS,info.TRANS_PROVINCIAL));
						//通行路线
						var routes = info.ROUTE;
						if(routes != undefined){
						    if(routes.length > 0){
	                            var roads ="</br>";
	                            for (var a= 0;a<routes.length;a++){
	                                roads += "<span id = 'pro'>" + routes[a].DIST_NAME +"</span>:"+ routes[a].BEGIN_POINT+"--" + routes[a].ROUTE_DESC +"--"+routes[a].END_POINT+ "</br><hr>";                              
	                            }
	                            $("#roads").html(roads);
	                        }else{
	                            $("#roads").text("无");
	                        };
						}else{
						    $("#roads").html(info.ROADS);
						}
						
						//通行意见
						var optMap = info.OPT_DESC_LIST;
						
					    var opt = "</br>";
					    for(var key in optMap){
                            
                            var value = optMap[ key ]; 
                            opt += value.OPT_BY + "：</br>";
                            if(value.OPT_DESC !="" && value.OPT_DESC != undefined){
                                opt +=  "交通部门意见:"+ value.OPT_DESC + "</br>";
                            }else{
                                opt +=  "交通部门意见:"+ "暂无！</br>"; 
                            }
                            if(value.OPT_DESC_GA !="" && value.OPT_DESC_GA != undefined){
                                opt += "公安部门意见:"+ value.OPT_DESC_GA + "</br><hr>";
                            }else{
                                opt += "公安部门意见:" + "暂无！</br><hr>"; 
                            }
                        }
					    if(opt == "</br>"){
					        $("#passOpinion").html("无");
					    }else{
					        $("#passOpinion").html(opt);
					    }
						//备注
						var bz = info.OPT_DESC;
						if(bz =="" || bz == "null" || bz == undefined){
						    $("#bz").text("无");
						}else{
						    $("#bz").text(bz);
						}
						// 车货情况
						$("#totalWeight").html(t.kgTodun(info.TOTAL_WEIGHT) + "吨");
						$("#totalOutline").html(t.mmTom(info.TOTAL_LENGTH) + " × " + t.mmTom(info.TOTAL_WIDTH) + " × " + t.mmTom(info.TOTAL_HEIGHT));
						$("#cargoWeight").html(t.kgTodun(info.CARGO_WEIGHT) + "吨");
						$("#cargoOutline").html(t.mmTom(info.CARGO_LENGTH) + " × " + t.mmTom(info.CARGO_WIDTH) + " × " + t.mmTom(info.CARGO_HEIGHT));
						$("#tyles").html(info.TYLES);
						$("#axles").html(info.AXLES);
						$("#wheelBases").html(info.WHEELBASES);
						$("#axlesLoad").html(info.AXLES_LOAD);
						$("#cargoInfo").html(info.CARGO_INFO);
						if (info.TOTAL_IMG && info.TOTAL_IMG.length > 0) {
							var keys = info.TOTAL_IMG.split(",");
							var imgs = "";
							for (var i = 0; i < keys.length; i++) {
								imgs += "<div><img alt='车货照片' src='file/get.html?key=" + keys[i] + "&reqNo=" + reqNo + "' data-preview-src='' data-preview-group='1' /></div>";
							}
							$("#totalImgs").html(imgs);
							mui.previewImage();
						} else {
							$("#totalImgs").html("无");
						}
						if(info.PLAN_DOC && info.PLAN_DOC.length > 0){
                            var keys = info.PLAN_DOC.split(",");
                            var plan = "";
                            for (var i = 0; i < keys.length; i++) {
//                                t.loadPlanFile( keys[i]);    
                                /*plan+="<div><a href='file/getPlan.html?key="+keys[i]+"'>护送方案_"+(i+1)+"</a></div>";*/
                                plan+="<div><a href='#' onclick=\"Information.loadPlanFile('"+keys[i]+"','" + reqNo + "');\">护送方案_"+(i+1)+"</a></div>";
                                
                            }
                            $("#planfile").html(plan);
                        }else {
                            $("#planfile").html("无");
                        }
						//运输计划
						if(info.TRANS_PLAN_KEY && info.TRANS_PLAN_KEY.length > 0){
                            var tkeys = info.TRANS_PLAN_KEY.split(",");
                            var tplan = "";
                            for (var i = 0; i < tkeys.length; i++) {
//                                t.loadPlanFile( keys[i]);    
                                /*plan+="<div><a href='file/getPlan.html?key="+keys[i]+"'>护送方案_"+(i+1)+"</a></div>";*/
                                tplan+="<div><a href='#' onclick=\"Information.loadPlanFile('"+tkeys[i]+"','" + reqNo + "');\">运输计划_"+(i+1)+"</a></div>";
                                
                            }
                            $("#transportplan").html(tplan);
                        }else {
                            $("#transportplan").html("无");
                        }
						
						t.loadApplicantData(info.ORG_CERT_NO,reqNo)
						t.loadCarSituationData();
                        $("#box_qrcode").show();
                        t.generateQRcode(info.REQ_NO);
					} else {
						$("#otherImgs").parent().html("");
						$("#totalImgs").parent().html("");
						alert("未查询到数据，请确认许可证号是否正确");
						top.location.replace("search.html?reqNo=" + $("#reqNoHidden").val() + "&status=" + status);
					}
				}
			});
		},
		//加载护送方案 /运输计划
		loadPlanFile : function(key,reqNo){
		    window.location.href = "file/getPlan.html?key="+key+"&reqNo=" + reqNo;
		},
		loadCarSituationData : function() {
		    var reqNo = $("#reqNoHidden").val();
			Ajax.call({
				url : "licVehicle/get.html",
				p : {
					reqNo : reqNo,
					contentType: "application/x-www-form-urlencoded; charset=utf-8"
				},
				f : function(data) {
					if (data && data.length > 0) {
					    for(var i = 0; i < data.length; i++){
					        var info = data[i];
					        if(info.VEHICLE_KIND == "36" || info.VEHICLE_KIND == "20"  ){  //牵引车
					           var vehicleNo =  $("#vehicleNo").val();
					           if(vehicleNo != ""){
					               vehicleNo = vehicleNo +";"+ info.VEHICLE_NO;
					           }else{
					               vehicleNo = info.VEHICLE_NO;
					           };
					           var model =  $("#model").val();
                               if(model != ""){
                                   model = model +";"+ info.MODEL;
                               }else{
                                   model = info.MODEL;
                               };
                               var vehWeight =  $("#vehWeight").val();
                               if(vehWeight != ""){
                                   vehWeight = vehWeight +";"+ t.kgTodun(info.WEIGHT);
                               }else{
                                   vehWeight = t.kgTodun(info.WEIGHT);
                               };
	                            $("#vehicleNo").html(vehicleNo);
	                            $("#model").html(model);
	                            $("#vehWeight").html(vehWeight+"吨");
					        } 
					        if(info.VEHICLE_KIND == "37" || info.VEHICLE_KIND == "38"  ){  //挂车
					            var hanvehicleNo =  $("#hanvehicleNo").val();
                                if(hanvehicleNo != ""){
                                   hanvehicleNo = hanvehicleNo +";"+ info.VEHICLE_NO;
                                }else{
                                    hanvehicleNo = info.VEHICLE_NO;
                                };
                                var hanmodel =  $("#hanmodel").val();
                                if(hanmodel != ""){
                                    hanmodel = hanmodel +";"+ info.MODEL;
                                }else{
                                    hanmodel = info.MODEL;
                                };
                                var hanvehWeight =  $("#hanvehWeight").val();
                                if(hanvehWeight != ""){
                                    hanvehWeight = hanvehWeight +";"+ t.kgTodun(info.WEIGHT);
                                }else{
                                    hanvehWeight = t.kgTodun(info.WEIGHT);
                                };
                                $("#hanvehicleNo").html(info.VEHICLE_NO);
                                $("#hanmodel").html(info.MODEL);
                                $("#hanvehWeight").html(t.kgTodun(info.WEIGHT)+"吨");
	                        }
					    }					
					}
				}
			});
		},
		loadApplicantData : function(certNo, reqNo) {
			Ajax.call({
				url : "licApplicant/get.html",
				p : {
					certNo : certNo,
					reqNo : reqNo ,
					contentType: "application/x-www-form-urlencoded; charset=utf-8"
				},
				f : function(data) {
					if (data && data.code == "0000") {
						var info = data.data;
			            $("#certName").html(info.NAME);
						var startTime = info.START_TIME;
						if (startTime && startTime.trim().length > 0) {
							startTime = startTime.trim().split(" ")[0];
						}
						var endTime = info.END_TIME;
						if (endTime && endTime.trim().length > 0) {
							endTime = endTime.trim().split(" ")[0];
						}
						$("#periodDate").html(startTime + " 至 " +endTime);
					}
				}
			});
		},
		toFixed : function (n, fixed) {
		     if(typeof n !=='number'){
		      return n
		     }
		     fixed = fixed || 2
		        var sN = '' + n
		        var reg = new RegExp("\\d+\\.\\d{" + (fixed + 1) + "}")
		        var s = sN.match(reg)
		        var diff = 1 / Math.pow(10, fixed)
		        if (s) {
		            var val = s[0]
		            var len = val.length
		            var v = val[len-1]
		            n = +val.substring(0, len-1)
		            if (v >= 5) {
		                n += diff
		                n=+n.toFixed(fixed)
		            }
		        }
		     	n=n.toFixed(fixed)
		        return n
		    },
		mmTom : function(value) {
			if (!value) {
				return "--";
			}
			var value = (parseFloat(value) * 100) / 100000;
			var xsd = t.toFixed(value,2);
			return xsd;
		},
		kgTodun : function(value) {			if (!value) {
				return "--";
			}
			var value = (parseFloat(value) * 100) / 100000;
			var xsd = t.toFixed(value,2);
			return xsd;
		},
        transDists : function(passDists,isProvincial) {
            var dists = [ {
                "distCode" : "110000",
                "distName" : "北京市"
            }, {
                "distCode" : "120000",
                "distName" : "天津市"
            }, {
                "distCode" : "130000",
                "distName" : "河北省"
            }, {
                "distCode" : "140000",
                "distName" : "山西省"
            }, {
                "distCode" : "150000",
                "distName" : "内蒙古自治区"
            }, {
                "distCode" : "210000",
                "distName" : "辽宁省"
            }, {
                "distCode" : "220000",
                "distName" : "吉林省"
            }, {
                "distCode" : "230000",
                "distName" : "黑龙江省"
            }, {
                "distCode" : "310000",
                "distName" : "上海市"
            }, {
                "distCode" : "320000",
                "distName" : "江苏省"
            }, {
                "distCode" : "330000",
                "distName" : "浙江省"
            }, {
                "distCode" : "340000",
                "distName" : "安徽省"
            }, {
                "distCode" : "350000",
                "distName" : "福建省"
            }, {
                "distCode" : "360000",
                "distName" : "江西省"
            }, {
                "distCode" : "370000",
                "distName" : "山东省"
            }, {
                "distCode" : "410000",
                "distName" : "河南省"
            }, {
                "distCode" : "420000",
                "distName" : "湖北省"
            }, {
                "distCode" : "430000",
                "distName" : "湖南省"
            }, {
                "distCode" : "440000",
                "distName" : "广东省"
            }, {
                "distCode" : "450000",
                "distName" : "广西壮族自治区"
            }, {
                "distCode" : "460000",
                "distName" : "海南省"
            }, {
                "distCode" : "500000",
                "distName" : "重庆市"
            }, {
                "distCode" : "510000",
                "distName" : "四川省"
            }, {
                "distCode" : "520000",
                "distName" : "贵州省"
            }, {
                "distCode" : "530000",
                "distName" : "云南省"
            }, {
                "distCode" : "540000",
                "distName" : "西藏自治区"
            }, {
                "distCode" : "610000",
                "distName" : "陕西省"
            }, {
                "distCode" : "620000",
                "distName" : "甘肃省"
            }, {
                "distCode" : "630000",
                "distName" : "青海省"
            }, {
                "distCode" : "640000",
                "distName" : "宁夏回族自治区"
            }, {
                "distCode" : "650000",
                "distName" : "新疆维吾尔自治区"
            }, {
                "distCode" : "710000",
                "distName" : "台湾省"
            }, {
                "distCode" : "810000",
                "distName" : "香港特别行政区"
            }, {
                "distCode" : "820000",
                "distName" : "澳门特别行政区"
            } ];
            var distStr = "";
            var distArray = new Array();
            if(passDists != ""){
                distArray = passDists.split(","); 
            }
            if(isProvincial == "1"){
            	for(i=0;i<distArray.length ;i++ ){
                    for(j=0;j<dists.length; j++){
                        if(distArray[i].substr(0,2) == dists[j].distCode.substr(0,2)){
                            distStr += dists[j].distName + ",";
                        }
                    }
                }
            } else {
            	for(j=0;j<dists.length; j++){
                    if(distArray[0].substr(0,2) == dists[j].distCode.substr(0,2)){
                        distStr = dists[j].distName + ",";
                    }
                }
            }
             
            
            distStr = distStr.substring(0,distStr.length-1)
            return distStr;
        },
		prImg: function (){
			var imgsurl=[];
			var nowurl='';
			var imgObj= $("img");
			for(var i=0;i<imgObj.length;i++){
				imgsurl[i]=imgObj[i].src;
				imgObj[i].onclick=function(){
					nowurl=this.src;
					wx.previewImage({
						current: nowurl,
						urls: imgsurl
					});	
				}
			}
		},
        //中文编码格式转换
        utf16to8 : function (str) {
            var out, i, len, c;
            out = "";
            len = str.length;
            for (i = 0; i < len; i++) {
                c = str.charCodeAt(i);
                if ((c >= 0x0001) && (c <= 0x007F)) {
                    out += str.charAt(i);
                } else if (c > 0x07FF) {
                    out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                    out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                    out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                } else {
                    out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                    out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                }
            }
            return out;
        },
      //生成二维码
        generateQRcode : function(reqNo){
            $("#qrcode").qrcode({ 
                //render: "table",  渲染方式有table方式（IE兼容）和canvas方式
                width: 180, //宽度 
                height:180, //高度 
                text: t.utf16to8(reqNo), //内容 
                typeNumber:-1,//计算模式
                correctLevel:1,//二维码纠错级别
                background:"#ffffff",//背景颜色
                foreground:"#000000"  //二维码颜色

            });
            var w = document.documentElement.clientWidth || document.body.clientWidth;
            $("#qrcode").css("left",w/2-90);
        }
	}
	return t;
}();