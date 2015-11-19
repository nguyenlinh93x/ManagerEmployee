<%@include file="template/startheader.jsp" %>
<!-- Change your title here -->
<title>Login page</title>
<!-- This part contain link to css file -->
<%@include file="template/endheader.jsp" %>
<body id="homepage">

	<!-- effect loading page -->
	<c:import url="homepage/preloadpage.jsp" />

	<!-- Nav bar of the page -->
	<c:import url="homepage/navbar.jsp" />
	
	<!-- If user is admin, you can see that part -->
	<sec:authorize access="hasRole('ROLE_ADMIN')">
		<!-- Body of page -->
		<c:import url="homepage/body.jsp" />
	</sec:authorize>
	
	<!-- Footer of page -->
	<c:import url="homepage/footer.jsp" />
	

	
	<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
	<script
		src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

	<script src="${pageContext.request.contextPath}/resources/js/main.js"></script>
	
	<script
		src="${pageContext.request.contextPath}/resources/js/jquery.smooth-scroll.min.js"></script>

	<!-- Include all compiled plugins (below), or include individual files as needed -->
	<script
		src="${pageContext.request.contextPath}/resources/js/bootstrap.min.js"></script>
	<script src="http://code.jquery.com/ui/1.11.3/jquery-ui.min.js" type="text/javascript"></script>
	

</body>