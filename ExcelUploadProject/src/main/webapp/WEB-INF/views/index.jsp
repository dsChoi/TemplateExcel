<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype HTML>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Login Demo - Kakao Javascript SDK</title>
    <script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/jquery-1.11.1.min.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/jquery-ui.min.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/mobileService.js'/>"></script>
    <style type="text/css">
@charset("utf-8");
* {margin:0;padding:0;font-family:"돋움",Dotum,Verdana,Arial,sans-serif;font-size:12px;}
html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, a, abbr, acronym, big, font, img, small, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, tbody, tfoot, thead, tr, th, td {margin:0; padding:0; border:0;font-size:100%; vertical-align:baseline; background:transparent;} 

blockquote, q {quotes:none;} 
ins {text-decoration:none;} 
del {text-decoration:line-through;} 
blockquote:before, blockquote:after,q:before, q:after {content: "";}
blockquote, q {quotes: "" "";}

/*  Table  */
table {border-collapse: separate; border-spacing: 0;}
caption, th, td {font-weight: normal; }
caption {overflow:hidden; visibility:hidden; width:0; height:0; font-size:0; line-height:0;}

img {border:0 none;}
hr {color:#e4e4e4}
em, address {font-style:normal;}
strong {font-weight:bold;}
ol, ul {list-style:none;} 

/*  Form  */
fieldset {border:0 none;}
legend {visibility:hidden; height:0; width:0; font-size:0; line-height:0; overflow:hidden; left:-9999px; top:-9999px;}
hr {visibility:hidden; height:0; width:0; font-size:0; line-height:0; overflow:hidden; position:absolute; left:-9999px; top:-9999px;}
textarea {padding:5px;line-height:16px;border:solid 1px #9c9c9c;overflow-x:hidden;}
input.type_text, input.type_file {padding:3px 5px 1px;border:solid 1px #9c9c9c;}
input.type_radio, input.type_check {width:13px;height:13px;}
select {border:solid 1px #9c9c9c;}

/* link */
a:link, a:visited, a:active {text-decoration:none;}
a:hover {text-decoration:none;}
a:active {text-decoration:none;}

.hidden {position:absolute !important; z-index:-1 !important; top:0 !important; left:0 !important; width:0 !important; height:0 !important; margin:0 !important; padding:0 !important; overflow:hidden !important; font-size:0 !important; line-height:0 !important;}
.clearfix{clear:both;}

body{background:#ededed}
.viewArea{background:#fff;padding:20px 10px;width:500px;margin:0 auto;}
.userInfo{margin:0 0 20px 0;}
.name{display:inline-block;font-size:12px;margin-right:15px;font-weight:bold;color:#333;}
.date{color:#666;font-size:11px;font-weight:normal}
.contents{font-size:12px;color:#333;line-height:1.4;}
.contents .photoArea{margin:20px 0}
.contents .photoArea img{max-width:100%}
</style>
    
  </head>
  
  <body>
    <a id="kakao-login-btn"></a>


	<div id="content" style="display:none;">
		<span id="myStory">내 스토리</span>
		
		<div id="myStories"></div>
	</div>

    <script>
    
      var kasUri = "https://kapi.kakao.com/v1/api/story/mystories";
    
      var login_init = function(){
    	  $("#kakao-login-btn").hide();
          $("#content").show();
          getMyStory();
      };
      
      
      var lastId = "";
      
      var getMyStory = function(){
    	  var inputParams = {
    				/* "userId" : v_userId,
    				"password" : v_password */
    			};
    			var options = {
    				name : "name",
    				method : "GET",
    				target : "_self",
    				params : inputParams,
    				parent : $("body")
    			};
    			var vForm = mobileService.util.createForm(options);
    			/* debugger;
    			var header = {data: "Bearer " + loginObj.access_token};
    			mobileService.ajax.query(kasUri, "name", fn_callBack,
    					true, header); */
    				
    			var datas = {};
    					
    					debugger;
    			if(lastId != '' ){
    				datas = {last_id : lastId};
    			}		
    					
    			Kakao.API.request({
    				url: "/v1/api/story/mystories",
    				data : datas,
    				success : function(resultObj){
    					debugger;
    					for(var i = 0; i< resultObj.length; i ++){
    						var content = resultObj[i].content;
    						var created_at  = resultObj[i].created_at;
    						var id = resultObj[i].id;
    						var media_type =  resultObj[i].media_type;
    						var media_arr =  resultObj[i].media;
    						var objMedia = new Array();
    						var divViewArea = $("<div class='viewArea'/>");
    						var divUserInfo = $("<div class='userInfo'>너!<span class='name'></span><span class='date'>"+created_at+"</span></div>");
    						var divContent = $("<div class='contents'/>").html(content);
    						var divPhotoArea = $("<div class='photoArea'/>");
    						lastId = id;
    						if(media_arr != null){
	    						for(var z = 0; z < media_arr.length ; z++){
	    							divPhotoArea.append($("<img/>").attr("src", media_arr[z].original));
	    						}
    						}
    						divContent.append(divPhotoArea);
    						divViewArea.append(divUserInfo).append(divContent);
   							$("#myStories").append(divViewArea);
   							
    					}
    					
    				},
    				fail : function(resultObj){
    					
    				}
    					
    			});
      };
      
      function fn_callBack(res){
    	  console.log(res);
      }
      
      
      $(window).scroll(function(){
    	   if  ($(window).scrollTop() == $(document).height() - $(window).height()){
    		   getMyStory(lastId);   		   
    	   }
      });
      
    
      // 사용할 앱의 Javascript 키를 설정해 주세요.
      Kakao.init('acef30b07b555db828d31446301374ff');
      var loginObj;
      var userObj;
      // 카카오 로그인 버튼을 생성합니다.
      Kakao.Auth.createLoginButton({
        container: '#kakao-login-btn',
        size: 'small',
        success: function(authObj) {
        	console.log(authObj);
        	loginObj = authObj;
        	Kakao.API.request({
              url: '/v1/user/me',
              success: function(res) {
                //alert(JSON.stringify(res));
                console.log(res);
                userObj = res;
                login_init();
              }
            });
        },
        fail : function(authObj) {
        	alert(JSON.stringify(authObj));
        }
      });
    </script>
  </body>
</html>