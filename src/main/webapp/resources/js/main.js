$.noConflict();
jQuery(window).load(function() {
	jQuery('#status').fadeOut();
	jQuery('#preloader').delay(350).fadeOut('slow');
	
});

jQuery(document).ready(function() {
//	jQuery('#example').dataTable();
	jQuery('#span-ei-id input[name="ei-id"]').popover();
	jQuery('#span-ei-name input[name="ei-name"]').popover();
	//Effect scroll mouse
	jQuery('.smooth').on('click', function() {
		var idV = jQuery(this).attr('href');
		
		jQuery.smoothScroll({
			scrollElement : jQuery('body'),
			scrollTarget : idV
		});

		return false;
	});
	hideElement();
	/*
	 * Start table employee and filter
	 */
	//Create json object
	var test;
	
	//Use ajax get employee show for table
	function getAllEmployee() {
		jQuery.ajax({
			type: 'GET',
			url: "/batis/getJson",
			async: false,
			success: function(data) {
				if(data == null) {
					alert("error")
				} else {
					setTest(data);
				}
			}
		});
	}
	
	
	//Declare a json array
	var data = {"employee": []};
	getAllEmployee();
	//Insert data to varible: data
	var jsonArray = JSON.parse(JSON.stringify(test));
	for(var i=0; i<jsonArray.length; i++) {
		if(jsonArray[i].birthday != null) {
			var birthdayTime = new Date(jsonArray[i].birthday);
			var month = birthdayTime.getMonth() + 1;
			var day = birthdayTime.getDate();
			var year = birthdayTime.getFullYear();
			var date = day + "-" + month + "-" + year;
		} else {
			var date = "";
		}
		
		data['employee'].push({'id' : jsonArray[i].id, 'codeId' : jsonArray[i].codeId, 'name' : jsonArray[i].name,'position' : jsonArray[i].position , 'birthday' : date, 'nationality' : jsonArray[i].nationality, 'checked' : false});
	}
	
	//Config datepicker
	jQuery('.datepicker').datepicker({
		dateFormat: "dd-mm-yy",
		changeMonth: true,
		changeYear: true,
		yearRange: '1950:2015',
		showButtonPanel: true
	});
	
	//Auto sort id if it isn't sorted
	//Load Database show on table
	//loadTableEmployee(data);
	//Number of page you want seperate.
	var numberRowOfPage = 10;
	initPagination(numberRowOfPage);
	/*
	 * Init pagination employee table
	 */
	function initPagination(numberRow) {
		//total size of employee
		var size = data['employee'].length;
		//Number page in a table
		var pageSize = Math.ceil(size/numberRow);
		//Get all employee
		var listPage = data['employee'];
		//Get 5 employee to show
		var splitPage = listPage.slice(0,numberRow);
		//Create a object array to add in loadTableEmployee table
		var show = {"employee": []};
		for(var i=0; i<splitPage.length; i++) {
			show['employee'].push(splitPage[i]);
		}
		//Load on table
		loadTableEmployee(show);
		
		console.log(data);
		//if table has 10 pages, it will show all the number
		//console.log(jQuery('#myPager li#page-previous').nextUntil('#myPager li#page-next').size());
		//Load pagination bar
		if(jQuery('#myPager li#page-previous').nextUntil('#myPager li#page-next').size() <= 0) {
			if(pageSize < 10) {
				for(var i=pageSize; i>0; i--) {
					if(i==1) {
						jQuery('#example').find('li#page-previous').after("<li class='active'><a href='#'>"+i+"</a></li>");
					} else {
						jQuery('#example').find('li#page-previous').after("<li><a href='#'>"+i+"</a></li>");
					}
				}
			}
		//If pagination bar is exist, remove it and create again
		} else {
			jQuery('#myPager li#page-previous').nextUntil('#myPager li#page-next').remove();
			if(pageSize < 10) {
				for(var i=pageSize; i>0; i--) {
					if(i==1) {
						jQuery('#example').find('li#page-previous').after("<li class='active'><a href='#'>"+i+"</a></li>");
					} else {
						jQuery('#example').find('li#page-previous').after("<li><a href='#'>"+i+"</a></li>");
					}
				}
			}
		}
		
		
		
	}
	
	//Catch event click select option
	jQuery("select[name='filter-emp']").on('change', function(event) {
		var value = jQuery(this).val();
		if(value != 'sl-empty') {
			disableOption(value);
			if(value === 'sl-id') {
				jQuery("fieldset > span#span-ei-id").show();
			}
			if(value === 'sl-name') {
				jQuery("fieldset > span#span-ei-name").show();
			}	
			if(value === 'sl-date') {
				jQuery("fieldset > span#span-ei-date").show();
			}
		}
		jQuery('#action-epm').show();
	});

	//Catch checkbox
	jQuery(".content-left > fieldset > span > input[type='checkbox']").on('click', function(event) {
		//alert($(this).parent().children("input[type='text']").attr('name'));
		var changeEnable = jQuery(this).parent().children("input:not([type='checkbox'])");
		var check = jQuery(this);
	
		if(check.prop('checked') === false) {
			changeEnable.show();
			
		} else {
			changeEnable.hide();
		}

	});

 	//Delete employee
	jQuery('button#bt-delete-ei').click(function(event) {
		hideElement();
		showOption();
		jQuery("select[name='filter-emp'] option[value='sl-empty']").prop('selected', true);
		initPagination(numberRowOfPage);
	});
	
	

	//Catch uncheck a box will uncheck checkbox all
	jQuery('.full-contain input[name="check-all"]').on('click', function(event) {
		var check = jQuery(this).prop('checked');
		var checkedAll = jQuery('.full-contain input[name="check-all-main"]').prop("checked");
		if(check === true) {
			var checkValue = parseInt(jQuery(this).parent().parent().find('.table-stt').text());
			changeOneElementChecked(data, checkValue);
		}
		if(check === false) {
			var checkValue = parseInt(jQuery(this).parent().parent().find('.table-stt').text());
			changeOneElementUnchecked(data, checkValue);
		}
		if(checkedAll === true && check === false ) {
			jQuery('.full-contain input[name="check-all-main"]').prop("checked", false);
		}
		
	});


//	//Add row
//	$(".full-contain button[name='add']").on('click', function(event) {
//		var result = getIdTable(); 
//		var id = result.find('td:nth-child(2)').text(); //Get value of stt
//		var finalId = Number(++id); //Parse to number
//		var checked = $('.full-contain input[name="check-all-main"]').prop('checked');
//
//		if(checked === true) {
//			checked = 'checked';
//		} else {
//			checked = null;
//		}
//		data['employee'].push({'id' : finalId, 'codeId' : 'Te Te', 'name' : jsonArray[0].name,'position' : jsonArray[0].position , 'birthday' : jsonArray[0].birthday, 'nationality' : jsonArray[0].nationality, 'checked' : false});
//		loadTableEmployee(data);
//
//		
//	});

	//This is checkbox ticks all other checkbox
	jQuery('.full-contain input[name="check-all-main"]').on('click', function(event) {
		var check = jQuery(this).prop('checked');
		if(check === true) {
			jQuery('.full-contain input[name="check-all"]').prop('checked', true);
			addChecked(data);
		} else if(check === false) {
			jQuery('.full-contain input[name="check-all"]').prop('checked', false);
			removeChecked(data);
		}
	});

	
	//Delete rows have checked checkbox
	jQuery('.full-contain button[name="delete"]').on('click', function(event) {
		var lengthDelete = jQuery('.full-contain input[name="check-all"]:checked').length;
		var r = confirm("Are you really want to delete?");
		if(r == true) {
			jQuery('.full-contain input[name="check-all"]:checked').each(function(index, el) {
				
				var checked = jQuery(this);
				var number_delete = parseInt(checked.parent().next().text());

				checked.parent().parent().remove();
				jQuery('.full-contain input[name="check-all-main"]').prop('checked', false);
				//console.log("length " + data.employee.length + ' ' + number_delete);
				for(var i=0; i < data.employee.length; i++) {
					if(data.employee[i].id === number_delete) {
						console.log("/batis/delete/" + (data.employee[i].codeId));
						jQuery.ajax({
							scriptCharset: "utf-8", 
							contentType: "application/x-www-form-urlencoded; charset=UTF-8",
							type: 'DELETE',
							url: "/batis/delete/" +(data.employee[i].codeId),
							success: function(data) {
								
							}
						});
						data.employee.splice(i,1);
						//Delete object from database
						
					} 
				}
			});
			sortIdEmployee(data);
			initPagination(numberRowOfPage);
			console.log(data.employee);
		} else {
			
		}
	});
	
	//Set value for modal edit employee
	jQuery('#page2').on('click', 'a[name="modalEmp"]', function(event) {
		var parent = jQuery(this).parent().parent();
		var modal = jQuery('#myModal');
		
		//Set input id a value
		var id = parent.find('td.table-stt').text();
		modal.find('input[name="id"]').attr('value', id);
		
		//Set input EmpId a value
		var codeId = parent.find('td.table-code').text();
		modal.find('input[name="codeId"]').attr('value', codeId);
		
		//Set input Name a value
		var name = parent.find('td > a[name="modalEmp"]').text();
		modal.find('input[name="name"]').attr('value', name);
		
		//Set input Position a value
		var position = parent.find('td.table-position').text();
		modal.find('input[name="position"]').attr('value', position);
		
		//Set input Birthday a value
		var birthday = parent.find('td.table-birthday').text();
		modal.find('input[name="birthday"]').attr('value', birthday);
		
		//Set input Nationality a value
		var nation = parent.find('td.table-nationality').text();
		modal.find('select[name="nationality"]').find('option:first-child').attr('value', nation);
		modal.find('select[name="nationality"]').find('option:first-child').text(nation);
		
		console.log(id);
	});
	
	//Edit event
	jQuery('#myModal form').submit(function(event) {
		var birthday = jQuery('#myModal').find('input[name="birthday"]');
		var dateTime = new Date(birthday.datepicker("getDate"));
		var strDateTime = dateTime.getFullYear() + "-" + (dateTime.getMonth()+1) + "-" + dateTime.getDate();
		jQuery('#myModal').find('input[name="birthday"]').val(strDateTime);
		jQuery('#myModal').find('select[name="nationality"]').find('option:selected').prop('disabled', false);
	});
	
	
	/*
	 * Js for add new page
	 *
	 * */
	var idEmp = null;
	//data of add new page
	var dataJson = {};
	
	//Disabled button when we don't have data row
	jQuery('#addnew input[type="submit"]').prop("disabled","true");
	
	//Prevent submit, because we use ajax. Use form to validate html
	jQuery('#addnew form').submit(function(event) {
		event.preventDefault();
	});
	
	/*CAtch submit add new button*/
	jQuery('#addnew input[type="submit"]').click(function(event) {
		jQuery('#addnew input[name="birthday"]').each(function(i, e) {
			var thisTime = jQuery(e);
			var fulldate = thisTime.val();
			if(fulldate != null) {
				//Convert back date javascript
				var dateTime = new Date(thisTime.datepicker("getDate"));
				var strDateTime = dateTime.getFullYear() + "-" + (dateTime.getMonth()+1) + "-" + dateTime.getDate();
				thisTime.val(strDateTime);
			}
			
		});
	
		
		jQuery('#addnew tr#tr-add-header').nextUntil('#addnew tr#table-add-lastrow').each(function(index, element) {
			jQuery(this).find('input:not([type="checkbox"]),select option:selected').each(function(i,e) {
				var input = jQuery(e);
				//Convert back date javascript
				dataJson[input.attr("name")] = input.val();
				
			})
			console.log(dataJson);
			if(dataJson['codeId'] != "" && dataJson['name'] != "" ) {
				jQuery.ajax({
					contentType : 'application/json; charset=utf-8',
					type : 'POST',
					url: '/batis/submitAdd',
					dataType: 'json',
					data: JSON.stringify(dataJson),
					success: function(data) {
						window.location = "/batis/";
					}
				});
			} else {
				
			}
		});
		sortIdEmployee(data);
	});
	
	jQuery('#addnew button[name="table-remove-row"]').on('click', function(event) {
		var lengthDelete = jQuery('.full-contain input[name="check-all"]:checked').length;
		var r = confirm("Are you really want to remove this row(s)?");
		if(r == true) {
			jQuery('.full-contain input[name="check-all"]:checked').each(function(index, el) {

				var checked = jQuery(this);
				var number_delete = parseInt(checked.parent().next().next().val());

				checked.parent().parent().remove();
				jQuery('.full-contain input[name="check-all-main"]').prop('checked', false);
				//console.log("length " + data.employee.length + ' ' + number_delete);
				for(var i=0; i < dataJson.length; i++) {
					if(dataJson[i].id === number_delete) {
						dataJson.splice(i,1);
						//Delete object from database
						
					} 
				}
			});
//			sortIdAddNew(dataJson);
//			loadTableEmployee(data);
//			console.log(data.employee);
//			//alert("h0h0");
		} else {
			
		}
	});
	
	jQuery('#addnew button[name="table-add-row"]').on('click', function(event) {
		event.preventDefault();
		jQuery('#addnew input[type="submit"]').removeAttr("disabled");
		//Get last insert id to start new stt
		if(idEmp == null) {
			jQuery.ajax({
				type: 'GET',
				url: "/batis/getLastId",
				async: false,
				success: function(data) {
					setIdEmp(data);
				}
			});
		} else {
			
		}
		//Can phai lay so thu tu cuoi cung waiting...
		jQuery('#addnew #table-add-lastrow').before("<tr>" + 
				"<th><input type='checkbox' name='check-all' value=''></th>"
				+"<td class='table-add-stt'><input disabled='disabled' type='text' class='form-control' name='id' required value='"+(++idEmp)+"'/></td>"
				+"<td class='table-add-code'><input type='text' class='form-control' name='codeId' required placeholder='Ex:M2345, NY123, etc!'/></td>"
				+"<td><input type='text' class='form-control' name='name' required placeholder='Your full name!'/></td>"
				+"<td><input type='text' class='form-control' name='position' required placeholder='Ex:Employee, Manager'/></td>"
				+"<th><input type='text' class='datepicker form-control' name='birthday' value='' placeholder='dd/mm/yyyy'></th>"
				+"<th><select  class='table-region-select form-control' name='nationality'>"
				+"<option name='nationality' value='region-empty'></option>"
				+"<option name='nationality' value='VN'>VN</option>"
				+"<option name='nationality' value='USA'>USA</option>"
				+"</select></th>"
				+"</tr>");
		jQuery('.datepicker').datepicker({
			dateFormat: "dd-mm-yy",
			changeMonth: true,
		    changeYear: true,
		    yearRange: '1950:2015'
			
		});
		
		function setIdEmp(data) {
			idEmp = data;
		}
	});
	
	/*
	 * Config for filter part
	 */
	//Apply button for filter employee
	jQuery('#action-epm #bt-filter-ei').on('click', function(event) {
		jQuery('#modalFailed .modal-header').find('h4').text("This employee is not found!");
		var dataFilter = {};
		//Get id
		if(jQuery('#span-ei-id').css('display') != 'none') {
			var checkId = jQuery('#span-ei-id').find('input[type="checkbox"]').prop('checked');
			if(checkId === false) {
				dataFilter['codeId'] = jQuery('#span-ei-id').find('input[name="ei-id"]').val();
			}
		}
		//Get name
		if(jQuery('#span-ei-name').css('display') != 'none') {
			var checkName = jQuery('#span-ei-name').find('input[type="checkbox"]').prop('checked');
			if(checkName === false) {
				dataFilter['name'] = jQuery('#span-ei-name').find('input[name="ei-name"]').val();
			}
		}
		
		//Get date
		if(jQuery('#span-ei-date').css('display') != 'none') {
			var checkDate = jQuery('#span-ei-date').find('input[type="checkbox"]').prop('checked');
			if(checkDate === false ) {
				var dateTime = new Date(jQuery('#span-ei-date').find('input[name="ei-birthdate"]').datepicker("getDate"));
				var strDateTime = dateTime.getFullYear() + "-" + (dateTime.getMonth()+1) + "-" + dateTime.getDate();
				dataFilter['birthday'] = strDateTime;
				
			}
		}
		jQuery.ajax({
			contentType : 'application/json; charset=utf-8',
			type : 'POST',
			url: '/batis/filter',
			dataType: 'json',
			data: JSON.stringify(dataFilter),
			success: function(data) {
				if(data != null && data.length > 0 ) {
					jQuery('#tr-header').nextUntil('#table-lastrow').remove();
					for(var i=0; i<data.length; i++) {
						jQuery('#tr-header').after("<tr>" + 
								"<th><input type='checkbox' name='check-all' value=''></th>"
								+"<td class='table-stt'>"+(data[i].id)+"</td>"
								+"<td class='table-code'>"+(data[i].codeId)+"</td>"
								+"<td><a href='#' name='modalEmp' data-toggle='modal' data-target='#myModal' title='Click to edit!'>"+data[i].name+"</a></td>"
								+"<td class='table-position'>"+(data[i].position)+"</td>"
								+"<td class='table-birthday'>"+(data[i].birthday)+"</td>"
								+"<td class='table-nationality'>"+(data[i].nationality)+"</td>"
								+"</tr>");
					}
				} else {
					jQuery('#modalFailed').modal({
						show : 'true',
						backdrop: false
					});
				}
			}
		});
		if(jQuery('#span-ei-id').css('display') != "none" && jQuery('#span-ei-id input[name="ei-id"]').val().length <= 0 ||
			jQuery('#span-ei-name').css('display') != "none" && jQuery('#span-ei-name input[name="ei-name"]').val().length <= 0 ||
			jQuery('#span-ei-date').css('display') != "none" && jQuery('#span-ei-date input[name="ei-birthdate"]').val().length <= 0) {
			jQuery('#modalFailed .modal-header').find('h4').text("Error: A or more your input empty! If you don't use this field, please check into checkbox!");
			loadTableEmployee(data);
		}
		
		
	});
	
	//Validator filter 
	
	jQuery('#span-ei-id input[name="ei-id"]').on('keyup focusout', function(e) {
	
		
		if(e.type == 'focusout') {
			//Check not null
			if(jQuery(this).val().length <= 0) {
				jQuery(this).attr("data-original-title", "Please don't go T_T");
				jQuery(this).attr("data-content", "Your text needs more than 1 character.");
				jQuery(this).focus();
			}
			if(/^[a-zA-Z0-9]+$/.test(jQuery(this).val()) == false) {
				jQuery(this).attr("data-original-title", "You have some wrong syntax");
				jQuery(this).attr("data-content", "Your text doesn't contain special character! Only a-z,A-Z,0-9");
				jQuery(this).focus();
			} else {
				jQuery(this).attr("data-original-title", "Good");
				jQuery(this).attr("data-content", "Your test is right syntax");
			}
			jQuery(this).css({
				'border': '1px solid #ccc',
				'box-shadow': 'none'
			});
		}
		if(e.type == 'keyup') {
			if(/^[a-zA-Z0-9]+$/.test(jQuery(this).val()) == false) {
				jQuery(this).css({
					'border': '2px solid #A94442',
					'box-shadow': 'inset 0 1px 1px rgba(169, 68, 66, 1), 0 0 8px rgba(150, 87, 107, 0.6)'
				});
			} else {
				jQuery(this).css({
					'border': '2px solid #66afe9',
					'box-shadow': 'inset 0 1px 1px rgba(102, 175 ,233, .6), 0 0 8px rgba(102, 175 ,233, .6)'
				});
			}
		}
	});
	
jQuery('#span-ei-name input[name="ei-name"]').on('focusout keyup', function(e) {
		
		if(e.type == 'focusout') {
			//Check not null
			if(jQuery(this).val().length <= 0) {
				jQuery(this).attr("data-original-title", "Please don't go T_T");
				jQuery(this).attr("data-content", "Your text needs more than 1 character.");
				jQuery(this).focus();
			}
			
		}
	});
	

	
	/*
	*Functions	
	*/
	function setTest(x) {
		test = x;
	}
	
	//Hide fieldset and button
	function hideElement() {
		jQuery("fieldset > span#span-ei-id, span#span-ei-name, span#span-ei-date").hide();
		jQuery("fieldset > span#span-ei-id input[name='ei-id'], span#span-ei-name input[name='ei-name'], span#span-ei-date input[name='ei-birthdate']").val('');
		
	}

	//Get text id(ex: 1, 2, 3 in stt column)
	var getIdTable = function() {
		var x = jQuery('.full-contain table').find('tr:nth-last-child(2)');
		return x;
	}

	function disableOption(val) {
		jQuery("select[name='filter-emp']").find('option[value='+val+']').prop('disabled', true);
	}

	function showOption() {
		jQuery("select[name='filter-emp']").find('option').prop('disabled', false);
	}
	
	
	
	//Load data on table
	function loadTableEmployee(data) {
		jQuery('.full-contain #table-lastrow').siblings().not('tr#tr-header').remove();
			for(var i in data.employee) {
				//console.log(data.employee[i].checked);
				jQuery('.full-contain #table-lastrow').before("<tr>" + 
				"<th><input type='checkbox' name='check-all' value='' "+data.employee[i].checked+"></th>"
				+"<td class='table-stt'>"+(data.employee[i].id)+"</td>"
				+"<td class='table-code'>"+(data.employee[i].codeId)+"</td>"
				+"<td><a href='#' name='modalEmp' data-toggle='modal' data-target='#myModal' title='Click to edit!'>"+data.employee[i].name+"</a></td>"
				+"<td class='table-position'>"+(data.employee[i].position)+"</td>"
				+"<td class='table-birthday'>"+(data.employee[i].birthday)+"</td>"
				+"<td class='table-nationality'>"+(data.employee[i].nationality)+"</td>"
				+"</tr>");
			}
			jQuery('.datepicker').datepicker({
			dateFormat: "dd-mm-yy"
		});
	}
	
	var delayValue;
	//Delete row will auto sort id
	function sortIdEmployee(dataSort) {
		var idNext = 0;
		
		if(dataSort.employee.length > 0 && dataSort.employee[0].id > 1) {
			jQuery.ajax({
				type: 'PUT',
				url: "/batis/updateTable/" + (data.employee[0].id) +"/" + 1,
				success: function(data) {
					console.log("Change 1 success");
				}
			});
			dataSort.employee[0].id = 1;
		}
		var length = parseInt(dataSort.employee.length - 1);
		
		for(var i  in dataSort.employee) {
			console.log("i" + i);
			
			if(i < length) {
				var idNext = parseInt(i)+1;
				console.log("idnext" + idNext);
				var compare = parseInt(dataSort.employee[idNext].id) - 1; 
				console.log("compare" + compare);
				console.log('final' + dataSort.employee[i].id);
				if(parseInt(dataSort.employee[i].id) != compare) {
					//alert("before");
					//updateTable(dataSort,idNext, i);
					jQuery.when(updateTable(dataSort, idNext, i)).done(function(x1) {
						var success ="success";
					})
					dataSort.employee[idNext].id = parseInt(dataSort.employee[i].id) + 1;
				}
				
			}
			
		}
	}
	
	function updateTable(dataSort,idNext, i) {
		jQuery.ajax({
			type: 'PUT',
			async: false,
			url: "/batis/updateTable/" + (dataSort.employee[idNext].id) +"/" + (parseInt(dataSort.employee[i].id) + 1),
			success: function(data) {
				//alert("after");
			}
		});
	}
	
	function setDelayValue(value) {
		delayValue = value;
	}
	

	//Checked all checkbox
	function addChecked(dataChecked) {
		for(var i in dataChecked.employee) {
			dataChecked.employee[i].checked = "checked";
		}
	}

	//Uncheck all checkbox when checkbox all unchecked
	function removeChecked(dataUnchecked) {
		for(var i in dataUnchecked.employee) {
			dataUnchecked.employee[i].checked = null;	
		}
	}

	function changeOneElementChecked(dataChecked, checkValue) {
		for(var i in dataChecked.employee) {
			if(dataChecked.employee[i].id == checkValue) {
				dataChecked.employee[i].checked = "checked";
			}
		}
	}

	function changeOneElementUnchecked(dataChecked, checkValue) {
		for(var i in dataChecked.employee) {
			if(dataChecked.employee[i].id == checkValue) {
				dataChecked.employee[i].checked = null;
			}
		}
	}
		
});