<%@include file="template/startheader.jsp" %>
<!-- Change your title here -->
<title>Add new employee</title>
<!-- This part contain link to css file -->
<%@include file="template/endheader.jsp" %>
<body>
	<%@include file="homepage/navbar.jsp" %>
	
	<!-- Body of add new -->
	<div id="addnew" class="container" style="background-color: white; margin-bottom: 20px;">
	<form:form action="${pageContext.request.contextPath}/submitAdd" method="post" modelAttribute="employeeForm">
		<div class="full-contain"><hr />
			<h3 style="color: blue;">Add New Employee</h3>
			<table class="table">
				<tr id="tr-add-header" class="border">
					<th class="table-add-check"><input type="checkbox" name="check-all-main" value=""></th>
					<th class="table-add-stt">Stt</th>
					<th class="table-add-code">Sex</th>
					<th class="table-add-name">Name</th>
					<th class="table-add-position">Position</th>
					<th class="table-add-date">Date</th>
					<th class="table-add-region">Nationality</th>
				</tr>
				<tr id="table-add-lastrow">
					<td class="none-border" colspan="3">
						<div class="btn-group">
						<button class="btn btn-primary" name="table-add-row">+</button>
						<button class="btn btn-primary" name="table-remove-row">-</button>
						</div>
					</td>
					
					<td class="none-border" colspan="3">&nbsp;</td>
					<td><input type="submit" class="btn btn-success" value="Save" /></td>
				</tr>
			</table>
		</div>
	</form:form>
	
	</div>
	
	<!-- End body of add new -->
	
	<%@include file="homepage/footer.jsp" %>
	
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