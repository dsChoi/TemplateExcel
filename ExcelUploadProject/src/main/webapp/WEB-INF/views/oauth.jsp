<%@ page contentType="text/html; charset=UTF-8" %>
<!doctype HTML>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Login Demo - Kakao Javascript SDK</title>
    <script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
  </head>
  <body>
    <a id="kakao-login-btn"></a>

    <script>
      // 사용할 앱의 Javascript 키를 설정해 주세요.
      Kakao.init('acef30b07b555db828d31446301374ff');

      // 카카오 로그인 버튼을 생성합니다.
      Kakao.Auth.createLoginButton({
        container: '#kakao-login-btn',
        size: 'small',
        success: function(authObj) {
          alert(JSON.stringify(authObj));
          
          Kakao.API.request({
              url: '/v1/user/me',
              success: function(res) {
                alert(JSON.stringify(res));
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