<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ page session="false"%>
<html>
<head>
<title>Home</title>
<script type="text/javascript"
	src="<c:url value='/js/jquery-1.11.1.min.js'/>"></script>
</head>
<body>
	<h1>Hello world!</h1>



	<P>The time on the server is ${serverTime}.</P>

	<form:form method="post" enctype="multipart/form-data"
		modelAttribute="uploadedFile" action="fileUpload.htm">
		<table>
			<tr>
				<td>Upload File:</td>
				<td><input type="file" name="file" /></td>
				<td style="color: red; font-style: italic;"><form:errors
						path="file" /></td>
			</tr>
			<tr>
				<td></td>
				<td><input type="submit" value="Upload" /></td>
				<td></td>
			</tr>
		</table>
	</form:form>
</body>
</html>
