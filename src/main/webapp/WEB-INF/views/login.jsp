<%@include file="template/startheader.jsp" %>
<!-- Change your title here -->
<title>Login page</title>
<!-- This part contain link to css file -->
<%@include file="template/endheader.jsp" %>
<body id="body-login"  onload='document.f.email.focus();'>
	<!-- You can write code html here or import another jsp file -->
	<div class="container container-table">
		<div class="row vertical-center-row">
			<div id="login-form" class="text-center col-md-4 col-md-offset-4">
				<!-- Show error line -->
				<c:if test="${param.error != null}">
					<div class="alert alert-danger">Your username or password is not true!</div>
				</c:if>
				<!-- Start form login, action is path of spring security -->
				<form name='f' action='${pageContext.request.contextPath }/j_spring_security_check' method='POST'>
				<table class="table">
					<tr class="title-login">
						<th colspan="2">Come with us!</th>
					</tr>
					<tr>
						<td class="label-login">Email:</td>
						<td>
							<div class="form-group">
								<input type="text" class="form-control" name="email" required />
							</div>
						</td>
					</tr>
					<tr>
						<td class="label-login">Password:</td>
						<td>
							<div class="form-group">
								<input type="password" class="form-control" name="password" />
							</div>
						</td>
					</tr>
					<tr>
						<td colspan="2" style="padding: none;">
							<input class="btn btn-info" type="submit" value="LOGIN" name="login" />
						</td>
					</tr>
					<tr>
						<td colspan="2" style="padding: none;">
							<a style="font-style: italic;" href="${pageContext.request.contextPath}/signup">Sign Up&nbsp;</a>or
							<a style="font-style: italic;" href="#">&nbsp;Forget Password?</a>
						</td>
						
					</tr>
				</table>
				</form>
				<!-- End form login -->
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