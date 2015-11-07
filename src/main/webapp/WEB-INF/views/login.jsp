<%@include file="template/startheader.jsp" %>
<!-- Change your title here -->
<title>Login page</title>
<!-- This part contain link to css file -->
<%@include file="template/endheader.jsp" %>
<body id="body-login">
	<!-- You can write code html here or import another jsp file -->
	<div class="container container-table">
		<div class="row vertical-center-row">
			<div id="login-form" class="text-center col-md-4 col-md-offset-4">
				<!-- Start form login -->
				<form action="${pageContext.request.contextPath}/user/home" method="post">
				<table class="table">
					<tr class="title-login">
						<th colspan="2">Come with us!</th>
					</tr>
					<tr>
						<td class="label-login">Email:</td>
						<td>
							<div class="form-group">
								<input type="email" class="form-control" name="email" required />
							</div>
						</td>
					</tr>
					<tr>
						<td class="label-login">Password:</td>
						<td>
							<div class="form-group">
								<input type="password" class="form-control" name="password" required />
							</div>
						</td>
					</tr>
					<tr>
						<td colspan="2" style="padding: none;">
							<input class="btn btn-info" type="submit" value="LOGIN" name="login" />
						</td>
					</tr>
				</table>
				</form>
				<!-- End form login -->
				<p1>${userSession.email }</p1>
			</div>
		</div>
	</div>
	
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