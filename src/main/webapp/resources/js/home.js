jQuery(document).ready(function() {
	hideElement();
	/*
	 * Start table employee and filter
	 */
	//Create json object
	var test;
	
	//Use ajax get employee show for table
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
	
	//Declare a json array
	var data = {"employee": []};
	
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
	
	//Load Database show on table
	loadTableEmployee(data);
	
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
	});
	
	//Filter employee
	jQuery('button#bt-filter-ei').click(function(event) {
		alert("Start filter");
	});
	
	//Delete rows have checked checkbox
	jQuery('.full-contain button[name="delete"]').on('click', function(event) {
		var lengthDelete = jQuery('.full-contain input[name="check-all"]:checked').length;
		var r = confirm("Are you really want to delete?");
		if(jQuery == true) {
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
			loadTableEmployee(data);
			console.log(data.employee);
		} else {
			
		}
	});
	
	function setTest(x) {
		test = x;
	}
	
	//Hide fieldset and button
	function hideElement() {
		jQuery("fieldset > span#span-ei-id, span#span-ei-name, span#span-ei-date").hide();
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
	
})