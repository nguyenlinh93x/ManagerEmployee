<div id="page1" class="container">
  <a id="function1"></a>
   <div class="row" id="content">
		<div class="col-md-6">
			<div class="content-left">
			<fieldset style="border: none;" name="ei">
				<legend>Employee information</legend>
				<!-- Employee id -->
				<span  id="span-ei-id">
					<input type="checkbox" name="ei-check-id" value="">&nbsp;
					<label>Employee id (Emp id):</label>
					<input class="form-control" data-toggle="popover" title="Guild" data-content="Write your employee id" data-trigger="focus" data-placement="top" type="text" name="ei-id" value="" placeholder="Your id" required="required"><br />
				</span>
				<!-- End -->

				<!-- Employee name -->
				<span id="span-ei-name">
					<input type="checkbox" name="ei-check-name" value="">&nbsp;
					<label>Name:</label>
					<input class="form-control" data-toggle="popover" title="Guild" data-content="Write your name" data-trigger="focus" data-placement="top" type="text" name="ei-name" value="" placeholder="Your name" required='required'><br />
				</span>
				<!-- End -->

				<!-- Employee date -->
				<span id="span-ei-date">
					<input type="checkbox" name="ei-check-date" value="">
					<label>Birthday:</label>
					<input type="text" class="datepicker form-control"  name="ei-birthdate" value="" placeholder="Click to choose date" required='required'>
				</span><br /><br />
				<!-- End -->
			</fieldset>
		</div>
		</div>
		<div class="col-md-6">
			<div class="content-right">
			<fieldset>
				<legend>What the information do you want to find?</legend>
				<label>Filter:</label>
				<select class="form-control"  name="filter-emp">
					<option value="sl-empty"></option>
					<option value="sl-id">ID</option>
					<option value="sl-name">Name</option>
					<option value="sl-date">Birthday</option>
				</select> <br /><br />
				<span id="action-epm" class="pull-right">
					<button class="submit-button btn btn-primary" id="bt-filter-ei" type="submit" name="filter">Apply</button>
					<button class="delete-button btn btn-danger" id="bt-delete-ei" name="delete">Delete</button>
				</span>
			</fieldset>
		</div>
		</div>
	</div>
</div>

<!-- Table Employee  -->
<div id="page2" class="container">
  <a id="function2"></a>
  <div class="row">
  	<div>
  		<div class="full-contain"><hr />
			<h3>Employee table
				<a href="${pageContext.request.contextPath}/addnew">
					<input type="button" class="btn btn-primary pull-right"  value="ADD NEW"/>
				</a>
			</h3>
			<table id="example" class="table">
				
				<tr id="tr-header" class="border">
					<th class="table-check"><input type="checkbox" name="check-all-main" value=""></th>
					<th class="table-stt">Stt</th>
					<th class="table-code">Emp id</th>
					<th class="table-name">Name</th>
					<th class="table-position">Position</th>
					<th class="table-date">Birthday</th>
					<th class="table-region">Nationality</th>
				</tr>
				<tr id="table-lastrow">
					<th class="none-border" colspan="2">
					<!-- <button class="btn btn-primary" name="add">+</button> -->
						<button class="btn btn-primary" name="delete">-</button>
					</th>
					<td class="none-border" colspan="5">
						<div class="col-md-10 text-center">
							<!-- Pagination page -->
			      			<ul class="pagination pagination-sm pager" id="myPager">
	      						<li id="page-previous" class="disabled">
	      							<a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>
	      						</li>
	  							<li id="page-next" >
						 			<a href="#" aria-label="Next">
						      			<span aria-hidden="true">&raquo;</span>
						  			</a>
								</li>
      						</ul>
      					</div>
					</td>
				</tr>
			</table>
			
		</div>
  	</div>
  </div>
 </div>
 
 <!-- Modal for Edit employee -->
<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">
    <!-- Modal content-->
    <div class="modal-content">
    <form role="form" action="${pageContext.request.contextPath }/edit" method="post">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title" style="color: blue;">Edit Employee</h4>
      </div>
      <div class="modal-body">
      	<div class="form-group">
      		<label for="id">Id:</label>
      		<input type="text" class="form-control" readonly="readonly" value="10" name="id"  placeholder="Your id">
      	</div>
      	<div class="form-group">
      		<label for="codeId">Emp Id:</label>
      		<input type="text" class="form-control" name="codeId" placeholder="Your id" required="required">
      	</div>
      	<div class="form-group has-success has-feedback">
      		<label for="name">Full name:</label>
      		<input type="text" class="form-control" name="name" placeholder="Your name" required="required">
      		<span class="glyphicon glyphicon-ok form-control-feedback">
      	</div>
      	<div class="form-group has-success has-feedback">
      		<label for="position">Position:</label>
      		<input type="text" class="form-control" name="position" placeholder="Your position" required="required">
      		<span class="glyphicon glyphicon-ok form-control-feedback">
      	</div>
      	<div class="form-group  has-success has-feedback">
      		<label for="birthday:">Birthday:</label>
      		<input type="text" class="form-control datepicker" name="birthday" placeholder="mm-dd-yyyy" required="required">
      		<span class="glyphicon glyphicon-ok form-control-feedback">
      	</div>
      	<div class="form-group">
      		<label for="nationality:">Nationality:</label>
      		<select class="form-control" name="nationality" required="required">
      		  	<option disabled selected value=""></option>
			    <option value="VN">VN</option>
			    <option value="USA">USA</option>
  			</select>
      	</div>
      
      </div>
      <div class="modal-footer">
       <input type="submit" class="btn btn-primary" value="OK">
       <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
      </form>
    </div>

  </div>
</div>

<!-- Modal failed -->
 <!-- Modal for Edit employee -->
<div id="modalFailed" class="modal fade" role="dialog">
  <div class="modal-dialog">
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title" style="color: blue;">This employee is not found!</h4>
      </div>
      <div class="modal-body">
      	<img  class="img-responsive" src="${pageContext.request.contextPath }/resources/img/404.png" />
      </div>
      <div class="modal-footer">
       <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>
	
 <!--  
<div id="page2" class="container-fluid">
  <a id="function2">dasdasdb</a>
    Portfolio page content goes here.
</div>
 
<div id="page3" class="container-fluid">
  <a id="function3">function3</a>
    Contact page content goes here.
</div>
-->