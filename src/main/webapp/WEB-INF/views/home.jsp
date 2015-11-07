<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
<title>Bootstrap 101 Template</title>

<!-- Bootstrap -->
<link
	href="${pageContext.request.contextPath}/resources/css/bootstrap.min.css"
	rel="stylesheet">
	<link rel="stylesheet" href="http://cdn.datatables.net/1.10.2/css/jquery.dataTables.min.css">

<link href="${pageContext.request.contextPath}/resources/css/main.css"
	rel="stylesheet" type="text/css">
<link href="${pageContext.request.contextPath}/resources/css/jquery-ui.min.css" rel="stylesheet" type="text/css">
<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body id="homepage">

	<!-- effect loading page -->
	<c:import url="homepage/preloadpage.jsp" />

	<!-- Nav bar of the page -->
	<c:import url="homepage/navbar.jsp" />

	<!-- Body of page -->
	<c:import url="homepage/body.jsp" />
	
	<!-- Footer of page -->
	<c:import url="homepage/footer.jsp" />
	

	
	<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
	<script
		src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script type="text/javascript" src="http://cdn.datatables.net/1.10.2/js/jquery.dataTables.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/main.js"></script>
	
	<script
		src="${pageContext.request.contextPath}/resources/js/jquery.smooth-scroll.min.js"></script>

	<!-- Include all compiled plugins (below), or include individual files as needed -->
	<script
		src="${pageContext.request.contextPath}/resources/js/bootstrap.min.js"></script>
	<script src="http://code.jquery.com/ui/1.11.3/jquery-ui.min.js" type="text/javascript"></script>
	

</body>