var mobileService = {};
var g_contextPath = "";
var init = {};


init.event = function() {
	$(document).off("click", 'input[id^="act_"]');
	
	$(document).on("click", 'input[id^="act_"]', function(){
				var btnName = this.id.replace('act_','');
	            switch(btnName) {
	           
				case 'shopInfo': { // 목록
					try{
					mobileService.util.shopInfo();
					}catch(e){
						console.log(e);
					}
					break;
				}
				case 'search': { // 목록
					try{
						fn_search();
					}catch(e){
						console.log(e);
					}
					break;
				}
				case 'init': { // 목록
					try{
						fn_init();
					}catch(e){
						console.log(e);
					}
					break;
				}
	            default: {
	                    alert('Action-name not matched \n'+ this.id +'/'+ btnName);
	                    break;
	                };
	            }//end switch
			}
	);	
	
	
	mobileService.util.userAuthority();
};


mobileService.util = {};

mobileService.util.setStyle = function(dom, options) {
    for(var key in options) {
        switch(key) {
            case 'position': {
                dom.style.position = options.position;
            }; break;
            case 'float': {
                dom.style.float = options.float;
            }; break;
            case 'top': {
                dom.style.top = options.top + 'px';
            }; break;
            case 'left': {
                dom.style.left = options.left + 'px';
            }; break;
            case 'width': {
                dom.style.width = options.width + 'px';
            }; break;
            case 'height': {
                dom.style.height = options.height + 'px';
            }; break;
            case 'padding': {
                dom.style.padding = options.padding;
            }; break;
            case 'border': {
                dom.style.border = options.border;
            }; break;
            case 'backgroundColor': {
                dom.style.backgroundColor = options.backgroundColor;
            }; break;
            case 'zIndex': {
                dom.style.zIndex = options.zIndex;
            }; break;
        } // switch
    } // for
};

mobileService.ui = {};

mobileService.ui.showLoadingBar = function(options){

	if(options == null){
		options = {
				theme : "b",
				textonly :false,
				textvisible : true,
				msgtext : "Loading..." 				
		};
	}
	
    var theme = options.theme || $.mobile.loader.prototype.options.theme,
    msgText = options.msgtext || $.mobile.loader.prototype.options.text,
    textVisible = options.textvisible || $.mobile.loader.prototype.options.textVisible,
    textonly = !!options.textonly;
    
    html = options.html || "";
    $.mobile.loading( "show", {
            text: msgText,
            textVisible: textVisible,
            theme: theme,
            textonly: textonly,
            html: html
    });
};
mobileService.ui.hideLoadingBar = function(options){
	$.mobile.loading( "hide" );
};

mobileService.util.createForm = function(options) {
    var form = null;
    if(!options.name) {
        form = $('<form></form>');
    } else {
        $('form[name="'+options.name+'"]').remove();
        form = $('<form id="'+options.name+'" name="'+options.name+'"></form>');
    }
    if(!options.method) options['method'] = 'POST';
    for(var key in options) { // set attr
        switch(key) {
            case 'method': {
                form.attr('method',options.method);
            }; break;
            case 'action': {
                if(!!options.action) form.attr('action',options.action);
            }; break;
            case 'target': {
                if(!!options.target) form.attr('target',options.target);
            }; break;
        } // switch
    } // for
    if(!!options.params) {
    	
        for(var key in options.params) {
            var input = $('<input type="hidden" />');
            input.attr({
                'name': key,
                'value': options.params[key]
            });
            input.appendTo(form);
        }
    }
    if(!!options.parent) {
        form.appendTo($(options.parent));
    }
    return form;
};

mobileService.util.makePagenationBtn= function(){
	var html = '<div class="floatingBtn left">' +
	'<a href="#" id="btnPreviousPage"><img src="'+g_contextPath+'/images/btn/arr_02.png" alt="왼쪽 btn" width="27px" /></a>'+
	'</div>'+
	'<div class="floatingBtn right">'+
		'<a href="#" id="btnNextPage"><img src="'+g_contextPath+'/images/btn/arr_03.png" alt="왼쪽 btn" width="27px" /></a>'+
	'</div>';
	var vPageBtn =  $(html);
	$("body").append(vPageBtn);
	
	$("#btnPreviousPage").on("click", function() {
		fn_previousPage();
	});
	$("#btnNextPage").on("click", function() {
		fn_nextPage();
	});
};



mobileService.util.getCommonCode = function(gbnCd, sqlId,callBackNm){
	
	var inputParams = {
   		 "gbnCd" : gbnCd,
   		 "sqlId" : sqlId,
   		 "callBackNm" : callBackNm
   };
	var options = {
		name : "name",
		method : "POST",
		target : "_self",
		parent : $("body"),
		params : inputParams
	};

	var vForm = mobileService.util.createForm(options);
	mobileService.ajax.query(g_contextPath + "/commonCode.mdo", "name",
			fn_callBack, false);
	
};

mobileService.util.makeSelectBox = function(name, codeList, totalText){
	var selector = $("#"+name);
	var option = $("<option selected='selected' value=''>"+totalText+"</option>");
	selector.append(option);
	for(var i=0; i < codeList.length; i++){
		var option = $("<option></option>").text(codeList[i].NAME).attr("value",codeList[i].VALUE);
		selector.append(option);
	}
	selector.selectmenu("refresh");
};

mobileService.util.makeBrDivSelectBox = function(name, codeList){
	var selector = $("#"+name);
	for(var i=0; i < codeList.length; i++){
		var option = $("<option></option>").text(codeList[i].NAME).attr("value",codeList[i].VALUE);
		
		if(codeList[i].REPYN == "Y") {
			option.attr("selected","selected");
		}
		
		selector.append(option);
	}
	selector.selectmenu("refresh");
};

mobileService.util.date = {};

mobileService.util.date.formatDate = function (date){
	var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();
    return (date.getFullYear() + "-" + ((mymonth < 10) ? "0" : "") + mymonth + "-" + ((myweekday < 10) ? "0" : "") + myweekday);	
};

mobileService.util.date.formatMonth = function (date){
	var mymonth = date.getMonth() + 1;
	var myweekday = date.getDate();
	return (date.getFullYear() + "-" + ((mymonth < 10) ? "0" : "") + mymonth);	
};

mobileService.util.date.getPreviousDay = function (strDate){
	 var mydate = new Date(strDate);
	 mydate.setDate(mydate.getDate() - 1);
	 return mobileService.util.date.formatDate(mydate); 
};

mobileService.util.date.getNextDay= function (strDate){
	var mydate = new Date(strDate);
	mydate.setDate(mydate.getDate() + 1);
	return mobileService.util.date.formatDate(mydate); 
};
mobileService.util.date.getPrevious7Day= function (strDate){
	var mydate = new Date(strDate);
	mydate.setDate(mydate.getDate() - 7);
	return mobileService.util.date.formatDate(mydate); 
};
mobileService.util.date.getNext7Day= function (strDate){
	var mydate = new Date(strDate);
	mydate.setDate(mydate.getDate() + 7);
	return mobileService.util.date.formatDate(mydate); 
};


/**
 * yyyy-MM 형태 입력 필수
 * @param strDate
 * @returns
 */
mobileService.util.date.getNextMonth= function (strDate){
	var myDate = new Date(strDate);
	myDate.setMonth(myDate.getMonth() + 1 );
	myDate.setDate (myDate.getDate() + 1);
	return mobileService.util.date.formatMonth(myDate); 
};

/**
 * yyyy-MM 형태 입력 필수
 * @param strDate
 * @returns
 */
mobileService.util.date.getPreviousMonth= function (strDate){
	var myDate = new Date(strDate);
	myDate.setMonth(myDate.getMonth());
	myDate.setDate(myDate.getDate() -1 );
	return mobileService.util.date.formatMonth(myDate); 
};

mobileService.util.shopInfo = function(){
	//http://api.jquerymobile.com/jQuery.mobile.changePage/
	
	
	
	debugger;
	localStorage.setItem('prevUrl', $(location).attr("pathname"));
	console.log(localStorage.getItem('prevUrl'));
	

		/*
		 * var inputParams = {
			isBack : true
			};
		  var vForm = mobileService.util.createForm(options);
		mobileService.ajax.query(g_contextPath+"/shop/shopInfo.nplus", "name",
				null, true);*/
		location.href = g_contextPath+"/shop/shopInfo.nplus?isBack=true";
	/*$.mobile.changePage( g_contextPath+"/shop/shopInfo.nplus", {
		  type: "post",
		  changeHash: true,
		  allowSamePageTransition :true,
		  transition: "pop",
		  back:true,
		  reloadPage:true,
		  showLoadMsg:true,
		  data: inputParams
	});*/
	
};

mobileService.util.userAuthority = function(){
	var v_menuData = localStorage.getItem("menuData");
	
	
	if ($.type(v_menuData) == 'string') {
		v_menuData = $.parseJSON(v_menuData);
	}
	
	var v_currentUrl = $(location).attr("pathname");
	
	if(v_currentUrl == v_menuData.url){
		var v_menuId = v_menuData.menuId;
		var inputParams = {
		   		 "menuId" : v_menuId,
		   		 "sqlId" : "MobileCmmnDAO.selectUserProgramAuth",
		   };
			var options = {
				name : "name",
				method : "POST",
				target : "_self",
				parent : $("body"),
				params : inputParams
			};

			var vForm = mobileService.util.createForm(options);
			mobileService.ajax.query(g_contextPath + "/userProgramAuth.mdo", "name",
					mobileService.util.userAuthorityCallBack, true);
	}
};


mobileService.util.userAuthorityCallBack = function(response, status){
	if ($.type(response) == 'string') {
		response = $.parseJSON(response);
	}
	var authority = response.authority;
	//fn_makeTable();
	//var length = authority.USER_AUTHORITY.length;
	
	var userAuthority = authority.userAuthority;
	mobileService.util.enableCommonBtn(userAuthority.charAt(0), "search");
	mobileService.util.enableCommonBtn(userAuthority.charAt(1), "add");
	mobileService.util.enableCommonBtn(userAuthority.charAt(2), "delete");
	mobileService.util.enableCommonBtn(userAuthority.charAt(3), "save");
	
	mobileService.ui.hideLoadingBar();
};


mobileService.util.createMenuBtn = function(menuNm, menuId, dataRel, gubun, dataUrl){
	var v_btnDiv = $("<div/>").addClass("list_btn");
	var v_imgSrc = "";
	if(gubun == "FOLDER"){
		v_imgSrc = g_contextPath + "/images/btn/list_02.png";
	}else{
		v_imgSrc = g_contextPath + "/images/btn/arr_01.png";
	}
	var v_logoImg = $("<img/>").addClass("logo01").attr("src", v_imgSrc).attr("alt", "list btn");
	var v_input = $("<input/>").attr("type", "button").val(menuNm).addClass("btn1").addClass(gubun).attr("data-role", "none").attr("data-menuId", menuId).attr('data-url', dataUrl);
	
	
	v_btnDiv.append(v_logoImg).append(v_input);
	return v_btnDiv;
};

mobileService.util.enableCommonBtn = function(auth, btnId){
	try{
	var a = $("#cmnBtn_"+btnId);
	if(auth == "1"){
		$(a).attr("enable","enable");
		$(a).prev().show();
		$(a).show();
		switch (btnId) {
			 case 'init': { // 초기화
	         	try{
	         		$(a).on("click",fn_init);
		            }catch(e){
						console.log(e);
					}
	         	break;
	         }
			 case 'del': { // 삭제
					try{
						$(a).on("click",fn_delete);
					}catch(e){
						console.log(e);
					}
					break;
				}
				case 'save': { // 저장
					try{
						$(a).on("click",fn_save);
					}catch(e){
						console.log(e);
					}
					break;
				}
				case 'add': { // 저장
					try{
						$(a).on("click",fn_add);
					}catch(e){
						console.log(e);
					}
					break;
				}
			
				case 'search': { // 목록
					try{
						$(a).on("click",fn_search);
					}catch(e){
						console.log(e);
					}
					break;
				}		default:
				break;
			}
		
		
	}else{
		$(a).addClass("btnDisabled");
		$("#footer").off("click", "#cmnBtn_"+btnId);
	}
	}catch(e){
		console.log("Error : " + e);
	}
};

/**
 * var inputParams = {
			"userId" : v_userId,
			"password" : v_password
		};
		var options = {
			name : "name",
			method : "POST",
			target : "_self",
			params : inputParams,
			parent : $("body")
		};
		var vForm = mobileService.util.createForm(options);
		mobileService.ajax.query("<c:url value='/login.mdo'/>", "name", fn_callBack,
				true);
		
 * 
 */


mobileService.ajax = {
		query : function(_vActionUrl,_vForm,_vCallBack,_vAsync, header){
			if(_vAsync==null){
				_vAsync = false;
			}
			
	        $.ajaxSetup({
	               beforeSend: function(xhr) {
	                xhr.setRequestHeader("AJAX", true);
	                debugger;
	                if(header != null){
	                xhr.setRequestHeader("Authorization", header.data);
	                }
	            },
	            error: function(xhr, status, err) {
	                if (xhr.status == 401) {
	                       alert("로그아웃 되었습니다.\n 다시 로그인 후 사용해 주십시오.");
	                       location.href= g_contextPath +"/index.nplus";
	                } else if (xhr.status == 403) {
	                } else if (xhr.status == 428) {
	                       mobileService.util.shopInfo();
	                } else {
	                	
	                	console.log(xhr);
	                	console.log(status);
	                	console.log(err);
	                    alert("예외가 발생했습니다. 관리자에게 문의하세요.");
	                }
	                try{
	                $.mobile.loading( "hide" );
	                }catch(e){
	                	
	                }
	            }
	        });
			
	        debugger;
			$.ajax({ 
				type: "POST"
				,async: _vAsync  
				// ,url: _mobileDomainUrl+_vActionUrl
				,url: _vActionUrl  
				,dataType: "json"
				,cache: false
				,data : $("#"+_vForm).serialize()
				,contentType: "application/x-www-form-urlencoded; charset=UTF-8" 
				,success: function(response,status){
					_vCallBack(response,status);
				} 
			});
		}
};
