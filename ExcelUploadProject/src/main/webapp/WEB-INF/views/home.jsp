<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ page session="false" %>
<html>
<head>
	<title>Home</title>
	<script type="text/javascript" src="<c:url value='/js/jquery-1.11.1.min.js'/>"></script>
</head>
<body>
<h1>
	Hello world!  
</h1>



<P>  The time on the server is ${serverTime}. </P>

<form:form modelAttribute="uploadFile" name="aa" action="/fileUload" enctype="multipart/form-data" method="post" >
	<input type="file"  name="" />
	<input type="submit" value="전송"/>
	<form:errors path="file"></form:errors>
</form>
</body>
</html>
