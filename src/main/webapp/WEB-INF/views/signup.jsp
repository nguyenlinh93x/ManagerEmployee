<%@include file="template/startheader.jsp" %>
<!-- Change your title here -->
<title>Create account</title>
<!-- This part contain link to css file -->
<%@include file="template/endheader.jsp" %>
<body>
	<!-- Nav bar of the page -->
	<c:import url="homepage/navbar.jsp" />
	
	<!-- Body part -->
	<div class="container">
		<div class="jumbotron">
			<!-- Use <spring:eval expression="@propertyConfigurer.getProperty('account.email')" /> connect to properties file -->
			
			<form:form style="width: 60%; margin: 0 auto;" class="form-horizontal" role="form" commandName="user" action="${pageContext.request.contextPath}/createaccount" method="post">
				<form:errors class="alert alert-danger" path="*" element="div" />
			
				<h3 style="text-align: center;">Sign Up!</h3>
				<!-- Input email part -->
				<div class="form-group form-group-sm">
					<label class="col-sm-3 control-label" for="email">Email:</label>
					<div class="col-sm-9">
						<form:input class="form-control" path="email" placeholder="a" />
					</div>
				</div>
				<!-- End input email -->
				<!-- Input password part -->
				<div class="form-group form-group-sm">
					<label class="col-sm-3 control-label" for="password">Password:</label>
					<div class="col-sm-9">
						<form:input type="password" path="password" class="form-control"  />
					</div>
				</div>
				<!-- End input password -->
				<!-- Input password confirm part -->
				<div class="form-group form-group-sm">
					<label class="col-sm-3 control-label" for="passwordConfirm">Password (confirm):</label>
					<div class="col-sm-9">
						<input type="password" name="passwordConfirm" class="form-control" required="required">
						<span></span>
					</div>
				</div>
				<!-- End input confirm -->
				<!-- Submit button -->
				<div class="form-group">
					<div class="col-sm-9 col-sm-offset-3" style="padding-left: 15%;">
						<input type="submit" class="btn btn-info" value="Sign Up">
						<button type="button" class="btn btn-info" value="Cancle">Reset</button>
					</div>
				</div>
			</form:form>
		</div>
	</div>
	
	
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