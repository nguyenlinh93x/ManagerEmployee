$.noConflict();
jQuery(window).load(function() {
	jQuery('#status').fadeOut();
	jQuery('#preloader').delay(350).fadeOut('slow');
	
});



jQuery(document).ready(function() {
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
		jQuery.when(jQuery.ajax({
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
		})).then(function(a) {
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
				
				data['employee'].push({'id' : jsonArray[i].id, 'sex' : jsonArray[i].sex, 'name' : jsonArray[i].name,'position' : jsonArray[i].position , 'birthday' : date, 'nationality' : jsonArray[i].nationality, 'checked' : false});
				stt[i] = i+1;
			}
			
		});
	}
	
	
	//Declare a object array
	var data = {"employee": []};
	var stt = [];
	getAllEmployee();
	//Insert data to varible: data
	
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
	var numberRowOfPage = 5;
	//Set numberRowOfPage when user change value
	jQuery("select#pagination-number").on('change', function(event) {
		jQuery('#bt-filter-ei').addClass('disabled');
		//console.log(jQuery(this).val());
		if(jQuery(this).val() == 'all') {
			numberRowOfPage = data['employee'].length;
		} else {
			numberRowOfPage = jQuery(this).val();
		}
		jQuery('.pagination').show();
		initPagination(numberRowOfPage);
	});
	
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
		
		for(var i=0; i < listPage.length; i++) {
			listPage[i].stt = parseInt(i) + 1;
			//console.log(listPage[i]);
		}
		//Get 5 employee to show
		var splitPage = listPage.slice(0,numberRow);
		//Create a object array to add in loadTableEmployee table
		var show = {"employee": []};
		for(var i=0; i<splitPage.length; i++) {
			show['employee'].push(splitPage[i]);
		}
		
		//Load on table
		loadTableEmployee(show);
		
		//console.log(data);
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
			//We need make a case when pageSize > 10, it has a tag a "..."
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
		
		//Add disable next and previous button when we have 1 page
		var closestElement = jQuery('#myPager #page-previous').next().find('a').text();
		//console.log('a1: ' + closestElement);
		var closestNextElement = jQuery('#myPager #page-next').prev().find('a').text();
		//console.log('b1: ' + closestNextElement);
		if(closestElement == closestNextElement) {
			jQuery('#myPager li#page-previous, #myPager li#page-next').addClass('disabled');	
		} else {
			jQuery('#myPager li#page-previous').addClass('disabled');	
			jQuery('#myPager li#page-next').removeClass('disabled');	
		}
	}
	
	//Catch event click number of pagination
	jQuery('#myPager').on('click', 'li > a', function(event) {
		//console.log(data);
		
		var oldCLick = jQuery('#myPager').find('li.active > a').text();
		if(jQuery(this).parent().hasClass('active') || jQuery(this).parent().hasClass('disabled')) {
			event.preventDefault();
		} else {
			event.preventDefault();
			var checkAllMain = jQuery('.full-contain input[name="check-all-main"]');
			if(checkAllMain.prop('checked') == true) {
				checkAllMain.click();
			}
			var startNumber = 0;
			var show = {"employee": []};
			//Value of tag a
			var number = parseInt(jQuery(this).text());
			//Set value when >> button is clicked
			
			var closestElement = jQuery('#myPager #page-previous').next().find('a').text();
			var closestNextElement = jQuery('#myPager #page-next').prev().find('a').text();
			
				//Disabled or enable button previous when click number nearest with previous
			if(jQuery(this).text() != closestElement) {
				jQuery('#myPager li#page-previous').removeClass('disabled');
			} else {
				jQuery('#myPager li#page-previous').addClass('disabled');
			}
			//Disabled or enable button next when click number nearest with next
			if(jQuery(this).text() != closestNextElement) {
				jQuery('#myPager li#page-next').removeClass('disabled');
			} else {
				jQuery('#myPager li#page-next').addClass('disabled');
			}
				
			
			
			
			
			//Get value of element before element is actived
			if(jQuery(this).text() == 'Previous') {
				var numberElement = jQuery('#myPager').find('li.active').prev();
				number = numberElement.find('a').text();
				//Remove all class active
				jQuery(this).parent().parent().find('li').removeClass('active');
				numberElement.addClass('active');
				if(number != closestElement) {
					jQuery('#myPager li#page-previous').removeClass('disabled');
				} else {
					jQuery('#myPager li#page-previous').addClass('disabled');
				}
			} else if(jQuery(this).text().trim() == 'Next') {
				var numberElement = jQuery('#myPager').find('li.active').next();
				number = numberElement.find('a').text();
				//Remove all class active
				jQuery(this).parent().parent().find('li').removeClass('active');
				numberElement.addClass('active');
				//console.log("a: " + closestNextElement);
				if(number != closestNextElement) {
					jQuery('#myPager li#page-next').removeClass('disabled');
				} else {
					jQuery('#myPager li#page-next').addClass('disabled');
				}
			} else {
				jQuery(this).parent().parent().find('li').removeClass('active');
				jQuery(this).parent().addClass('active');
			}
			//Create a object array to store
			
			
		
			//console.log(number);
			//Find the last id of table
			if(oldCLick < number) {
				var distance = number - oldCLick;
				startNumber =  (parseInt(jQuery('#example tr#tr-header').next().find('td.table-stt').text()) + (parseInt(numberRowOfPage) * parseInt(distance))) - 1;
				//console.log(startNumber);
			} else if(oldCLick > number){
				var distance = oldCLick - number;
				startNumber = (parseInt(jQuery('#example tr#tr-header').next().find('td.table-stt').text()) - (parseInt(numberRowOfPage) * parseInt(distance))) - 1;
			}

			var count = 1;
			
			for(var i = startNumber; i < data['employee'].length; i++) {
				if(data.employee[i] != null) {
					if(count <= numberRowOfPage) {
						show['employee'].push(data.employee[i]);
						++count;
					} else {
						break;
					}
				}
				
			}
			loadTableEmployee(show);
			//console.log(show);
		}
		
	})
	
	//Catch event click select option
	jQuery("select[name='filter-emp']").on('change', function(event) {
		jQuery('#bt-filter-ei').removeClass("disabled");
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
		jQuery('#bt-filter-ei').addClass("disabled");
		jQuery("select[name='filter-emp'] option[value='sl-empty']").prop('selected', true);
		jQuery('.pagination').show();
		
		initPagination(numberRowOfPage);
	});
	
	

	//Catch uncheck a box will uncheck checkbox all
	jQuery('.full-contain').on('click', 'input[name="check-all"]', function(event) {
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
	jQuery('.full-contain').on('click','button[name="delete"]' , function(event) {
		var lengthDelete = jQuery('.full-contain input[name="check-all"]:checked').length;
		var r = confirm("Are you really want to delete?");
		if(r == true) {
			jQuery('.full-contain input[name="check-all"]:checked').each(function(index, el) {
				
				var checked = jQuery(this);
				var number_delete = parseInt(checked.parent().next().next().text());
			

				checked.parent().parent().remove();
				jQuery('.full-contain input[name="check-all-main"]').prop('checked', false);
				
				//console.log("length " + data.employee.length + ' ' + number_delete);
				for(var i=0; i < data.employee.length; i++) {
					if(data.employee[i].id === number_delete) {
						//console.log("/batis/delete/" + (data.employee[i].id));
						jQuery.ajax({
							scriptCharset: "utf-8", 
							contentType: "application/x-www-form-urlencoded; charset=UTF-8",
							type: 'DELETE',
							url: "/batis/delete/" +(data.employee[i].id),
							success: function(data) {
								
							}
						});
						data.employee.splice(i,1);
						stt.splice(i,1);
						//Delete object from database
						
					} 
				}
			});
			
			sortIdEmployee(stt);
			initPagination(numberRowOfPage);
			jQuery('.full-contain input[name="check-all"]').prop('checked', false);
			//console.log(data.employee);
		} else {
			
		}
	});
	
	//Set value for modal edit employee
	jQuery('#page2').on('click', 'a[name="modalEmp"]', function(event) {	
		var parent = jQuery(this).parent().parent();
		var modal = jQuery('#myModal');
		
		//Set input id a value
		var id = parent.find('td.table-id').text();
		modal.find('input[name="id"]').val(id);
		
		//Set select sex a value
		var sex = parent.find('td.table-sex').text();
		modal.find('select[name="sex"]').val(sex);
		modal.find('select[name="sex"] option').each(function(i, e) {
			if(jQuery(this).val() == sex) {
				jQuery(this).prop('selected', true);
			}
		});
		
		//Set input Name a value
		var name = parent.find('td > a[name="modalEmp"]').text();
		modal.find('input[name="name"]').val(name);
		
		//Set input Position a value
		var position = parent.find('td.table-position').text();
		modal.find('input[name="position"]').val(position);
		
		//Set input Birthday a value
		var birthday = parent.find('td.table-birthday').text();
		modal.find('input[name="birthday"]').val(birthday);
		
		//Set input Nationality a value
		var nation = parent.find('td.table-nationality').text();
		modal.find('select[name="nationality"]').find('option:first-child').val(nation);
		modal.find('select[name="nationality"]').find('option:first-child').text(nation);
		
		//console.log(id);
	});
	
	/*
	 * Vadidate Edit field
	 */
	//Vadidate name
	jQuery('#myModal').on('blur', 'input[name="name"]', function(event) {
		//Check text has special character and contains UTF-8: \u00A1-\uFFFF
		if(/^\s*$/.test(jQuery(this).val()) == true) {
			//Show alert and show on page
			jQuery('#edit-alert').html('<strong>Error:</strong> <span> Your name can\'t empty!</span>');
			jQuery('#edit-alert').removeClass('hide');
			jQuery(this).focus();
		} else if((/^[\w\u00A1-\uFFFF]+[\w\u00A1-\uFFFF ]*$/.test(jQuery(this).val()) == false && jQuery(this).val() != "")) {
			//Show alert and show on page
			jQuery('#edit-alert').html('<strong>Error:</strong> <span> Your name can\'t contain special character!</span>');
			jQuery('#edit-alert').removeClass('hide');
			jQuery(this).focus();
		//If length of text > 45 character is unvalid
		} else if(jQuery(this).val().length > 45) {
			jQuery('#edit-alert').html('<strong>Error:</strong> <span> Your name too long. Max: 45 character.</span>');
			jQuery('#edit-alert').removeClass('hide');
			jQuery(this).focus();
		//If Satisfy condition, we'll hide the alert
		} else {
			jQuery('#edit-alert').addClass('hide');
		}
		if(jQuery(this).val() != "") {
			jQuery(this).css('border','1px solid #ccc');
		}
	});

	//Vadidate position
	jQuery('#myModal').on('blur', 'input[name="position"]', function(event) {
		//Text is not contain special character
		if((/^[\w\u00A1-\uFFFF]+[\w\u00A1-\uFFFF ]*$/.test(jQuery(this).val()) == false && jQuery(this).val() != "")) {
			jQuery('#edit-alert').html('<strong>Error:</strong> <span> Your position can\'t contain special character!</span>');
			jQuery('#edit-alert').removeClass('hide');
			jQuery(this).focus();
		} else if(jQuery(this).val().length > 60) {
			jQuery('#edit-alert').html('<strong>Error:</strong> <span> Your position too long. Max: 60 character.</span>');
			jQuery('#edit-alert').removeClass('hide');
			jQuery(this).focus();
		} else {
			jQuery('#edit-alert').addClass('hide');
		}
	});

	//Vadidate date
	jQuery('#myModal').on('blur', 'input[name="birthday"]', function(event) {
		
		if(/^[0-9]{2}\-[0-9]{2}\-[0-9]{4}$/.test(jQuery(this).val()) == false && jQuery(this).val() != "") {
			jQuery('#edit-alert').html('<strong>Error:</strong> <span> Your date is unvalid!</span>');
			jQuery('#edit-alert').removeClass('hide');
			jQuery(this).focus();
		} else {
			jQuery('#edit-alert').addClass('hide');
		}
	});
	
	//Edit event
	jQuery('#myModal').on('click', 'input[type="submit"]', function(event) {
		var currentDate = new Date();
		console.log("current: " + currentDate);
		var dateTime = new Date(jQuery('#myModal input[name="birthday"]').datepicker("getDate"));
		console.log("br: " + dateTime);
		if(dateTime >= currentDate) {
			jQuery('#edit-alert').html('<strong>Error:</strong> <span> Your date can\'t not larger than current date!</span>');
			jQuery('#edit-alert').removeClass('hide');
			jQuery(this).focus();
		} else {
			jQuery('#edit-alert').addClass('hide');
		}
		//If input don't have error
		if(jQuery('#edit-alert').hasClass('hide')) {
			jQuery('#example').find("td.table-id").parent().css("background-color", "white");
			event.preventDefault();
			var birthday = jQuery('#myModal').find('input[name="birthday"]');
			var dateTime = new Date(birthday.datepicker("getDate"));
			var strDateTime = dateTime.getFullYear() + "-" + (dateTime.getMonth()+1) + "-" + dateTime.getDate();
			
			jQuery('#myModal').find('input[name="birthday"]').val(strDateTime);
			jQuery('#myModal').find('select[name="nationality"]').find('option:selected').prop('disabled', false);
			
			//Create a array to use post to server
			var editArray = {
				'id' : jQuery('#myModal').find('input[name="id"]').val(),
				'sex': jQuery('#myModal').find('select[name="sex"] option:selected').val(),
				'name': jQuery('#myModal').find('input[name="name"]').val(),
				'position': jQuery('#myModal').find('input[name="position"]').val(),
				'birthday': jQuery('#myModal').find('input[name="birthday"]').val(),
				'nationality': jQuery('#myModal').find('select[name="nationality"] option:selected').val()
			};
		
			jQuery.ajax({
				contentType : 'application/json; charset=utf-8',
				type : 'POST',
				url: '/batis/edit',
				dataType: 'json',
				data:  JSON.stringify(editArray), //Must Stringtify object
				success: function(result) {
					jQuery('#myModal').modal('hide');
					var currentPagination = jQuery('#myPager').find('li.active > a');
					console.log("page: " + currentPagination.text());
					
					//Get old value
					var name, sex, position, birthday, nationality, newBirthday;
					
					//Update array in javascript and don't reload page
					for ( var i in data['employee']) {
						if(data.employee[i].id == result.id) {
							if(data.employee[i].name != result.name) {
								name = data.employee[i].name;
								data.employee[i].name = result.name;
							}
							if(data.employee[i].sex != result.sex) {
								sex = data.employee[i].sex;
								data.employee[i].sex = result.sex;
							}
							if(data.employee[i].position != result.position) {
								position = data.employee[i].position;
								data.employee[i].position = result.position;
							}
							if(data.employee[i].birthday != result.birthday) {
								birthday = data.employee[i].birthday;
								
								var dateTime = new Date(result.birthday);
								//Change format date: dd/mm/yyyy
								var strDateTime = dateTime.getDate() + "-" + (dateTime.getMonth()+1) + "-" + dateTime.getFullYear();
								newBirthday = strDateTime;
								data.employee[i].birthday = strDateTime;
							}
							if(data.employee[i].nationality != result.nationality) {
								nationality = data.employee[i].nationality;
								data.employee[i].nationality = result.nationality;
							}
							break;
						}
						
					}
					
					console.log(name + " " + sex + " " + position + " " + birthday + " " + nationality);
//					if(typeof position === "undefined") {
//						alert('ec');
//					}
					//Reload employee table and show background color this row on table
					if(jQuery('#bt-filter-ei').hasClass('disabled')) {
						 
						var numberRow = jQuery('#pagination-number option:selected').val();
						if(numberRow == "all") {
							numberRow = data['employee'].length;
						}
						initPagination(numberRow);
						//Reference to pagination which contains this row on table
						if(parseInt(currentPagination.text()) != 1) {
							jQuery('#myPager').find('li > a').filter(function() {
								return jQuery(this).text() == currentPagination.text();
							}).click();
						}
						jQuery('#pagination-number option[value='+numberRow+']').prop('selected', true);
						//Add css for row edited
						jQuery('#example').find("td.table-id").filter(function() {
							return jQuery(this).text() == result.id;
						}).parent().addClass('info');
						
						//Show background column has changed
						if(!(typeof name === "undefined")) {
							jQuery('#example').find("td.table-name").filter(function() {
								return jQuery(this).parent().find('.table-id').text() == result.id;
							}).css('background-color', "#E8ACAC");
						}
						
						//Show background column has changed
						if(!(typeof sex === "undefined")) {
							jQuery('#example').find("td.table-sex").filter(function() {
								return jQuery(this).parent().find('.table-id').text() == result.id;
							}).css('background-color', "#E8ACAC");
						}
						
						//Show background column has changed
						if(!(typeof position === "undefined")) {
							jQuery('#example').find("td.table-position").filter(function() {
								return jQuery(this).parent().find('.table-id').text() == result.id;
							}).css('background-color', "#E8ACAC");
						}
						
						//Show background column has changed
						if(birthday != newBirthday) {
							jQuery('#example').find("td.table-birthday").filter(function() {
								return jQuery(this).parent().find('.table-id').text() == result.id;
							}).css('background-color', "#E8ACAC");
						}
						
						//Show background column has changed
						if(!(typeof nationality === "undefined")) {
							jQuery('#example').find("td.table-nationality").filter(function() {
								return jQuery(this).parent().find('.table-id').text() == result.id;
							}).css('background-color', "#E8ACAC");
						}
					} else { //Catch in search table which we edit
						//Add css for row edited
						jQuery('#example').find("td.table-id").filter(function() {
							return jQuery(this).text() == result.id;
						}).parent().addClass('info');
						
						//Show background column has changed
						if(!(typeof name === "undefined")) {
							jQuery('#example').find("td.table-name").filter(function() {
								return jQuery(this).parent().find('.table-id').text() == result.id;
							}).find('a[name="modalEmp"]').text(result.name).parent().css('background-color', "#E8ACAC");
						}
						
						//Show background column has changed
						if(!(typeof sex === "undefined")) {
							jQuery('#example').find("td.table-sex").filter(function() {
								return jQuery(this).parent().find('.table-id').text() == result.id;
							}).text(result.sex).css('background-color', "#E8ACAC");
						}
						
						//Show background column has changed
						if(!(typeof position === "undefined")) {
							jQuery('#example').find("td.table-position").filter(function() {
								return jQuery(this).parent().find('.table-id').text() == result.id;
							}).text(result.position).css('background-color', "#E8ACAC");
						}
						
						//Show background column has changed
						if(birthday != newBirthday) {
							jQuery('#example').find("td.table-birthday").filter(function() {
								return jQuery(this).parent().find('.table-id').text() == result.id;
							}).text(newBirthday).css('background-color', "#E8ACAC");
						}
						
						//Show background column has changed
						if(!(typeof nationality === "undefined")) {
							jQuery('#example').find("td.table-nationality").filter(function() {
								return jQuery(this).parent().find('.table-id').text() == result.id;
							}).text(result.nationality).css('background-color', "#E8ACAC");
						}
					}
		
				}
			});
			
		}
	});
	
	
	/*
	 * Js for add new page
	 *
	 * */
	var idEmp = [];
	//data of add new page
	var dataJson = {"employee": []};
	
	//Disabled button when we don't have data row
	jQuery('#addnew input[type="submit"]').prop("disabled","true");
	
	/*CAtch submit add new button*/
	jQuery('#addnew input[type="submit"]').click(function(event) {
		dataJson = {"employee": []};
		event.preventDefault();
		var fail = false;
		if(jQuery('#addnew-alert').hasClass('hide')) {
			jQuery('#addnew input[name="birthday"]').each(function(i, e) {
				//alert('1');
				var thisTime = jQuery(e);
				if(thisTime.val() == "" ) {
					thisTime.val("");
				} else {
					var fulldate = thisTime.val();
					if(fulldate != null) {
						var currentDate = new Date();
						//console.log("Currentday: " + currentDate);
						
						//Convert back date javascript
						var dateTime = new Date(thisTime.datepicker("getDate"));
						//console.log("date: " + dateTime);
						if(dateTime >= currentDate) {
							thisTime.val("");
							jQuery('#addnew-alert').html('<strong>Error:</strong> <span> Your date can\'t larger than current date!</span>');
							jQuery('#addnew-alert').removeClass('hide');
							jQuery(this).focus();
							fail = true;
							return false;
							
						} else {
							
//							if(/^[0-9]{2}\-[0-9]{2}\-[0-9]{4}$/.test()) {
//								
//							}
							jQuery('#addnew-alert').addClass('hide');
							var strDateTime = dateTime.getFullYear() + "-" + (dateTime.getMonth()+1) + "-" + dateTime.getDate();
							//console.log(thisTime.val());
							//thisTime.val(thisTime);
						}
						
					}
				}
			});
			
			if(fail == true) {
				return false;
			}
			
			jQuery('#addnew tr#tr-add-header').nextUntil('#addnew tr#table-add-lastrow').each(function(index, element) {
				var dataTemp = {};
				jQuery(this).find('input:not([type="checkbox"]),select option:selected').each(function(i,e) {
					var input = jQuery(e);
					if(input.attr('name') == 'birthday') {
						//console.log(input.val());
						if(input.val() == "") {
							dataTemp[input.attr("name")] = "";
						} else {
							var dateTime = new Date(input.datepicker("getDate"));
							var strDateTime = dateTime.getFullYear() + "-" + (dateTime.getMonth()+1) + "-" + dateTime.getDate();
							dataTemp[input.attr("name")] = strDateTime;
						}
					}
					//Convert back date javascript
					if(!input.parent().hasClass('table-add-stt') && input.attr('name') != "birthday"){
						dataTemp[input.attr("name")] = input.val();
					}	
				});
				if(dataTemp['sex'] == "" && dataTemp['name'] == "" && dataTemp['position'] == "" && dataTemp['birthday'] == "" && dataTemp['nationality'] == "") {
					
				} else if(dataTemp['sex'] != "" && dataTemp['name'] != "" && dataTemp['position'] != "" && dataTemp['birthday'] != "" && dataTemp['nationality'] != "") {
					dataJson['employee'].push(dataTemp);
				} else if(dataTemp['name'] != "" && (!(dataTemp['sex'] != "" && dataTemp['position'] != "" && dataTemp['birthday'] != "" && dataTemp['nationality'] != ""))) {
					dataJson['employee'].push(dataTemp);
				} else {
					jQuery('#addnew-alert').html('<strong>Error:</strong> <span> Your name can\'t null!</span>');
					jQuery('#addnew-alert').removeClass('hide');
					jQuery(this).find('input[name="name"]').css('border-color', '#D02461');
					jQuery(this).find('input[name="name"]').attr('placeholder','CAN\'T NULL');
					fail = true;
				}
				
			});
			//console.log(dataJson);
			if(fail == true) {
				return false;
			}
			var postData = JSON.stringify(dataJson['employee']);
			//console.log(dataJson['employee'].length);
			//alert('2');
			if(dataJson['employee'].length > 0) {
				jQuery.ajax({
					contentType : 'application/json; charset=utf-8',
					type : 'POST',
					url: '/batis/submitAdd',
					dataType: 'json',
					data: postData,
					success: function(data) {
						window.location = "/batis/";
					}
				});
			} else {
				
			}
		
			sortIdEmployee(stt);
		}
	});
	
	function addAjax() {
		
	}
	
	jQuery('#addnew button[name="table-remove-row"]').on('click', function(event) {
		event.preventDefault();
		var lengthDelete = jQuery('.full-contain input[name="check-all"]:checked').length;
		var r = confirm("Are you really want to remove this row(s)?");
		if(r == true) {
			jQuery('.full-contain input[name="check-all"]:checked').each(function(index, el) {

				var checked = jQuery(this);
				var number_delete = parseInt(checked.parent().next().find('input[name="id"]').val());
				
				checked.parent().parent().remove();
				
				jQuery('.full-contain input[name="check-all-main"]').prop('checked', false);
				//console.log("length " + data.employee.length + ' ' + number_delete);
				for(var i=0; i < idEmp.length; i++) {
					//console.log('s1: ' + idEmp[i]);
					//console.log('s2: ' + number_delete);
					if(idEmp[i] == number_delete) {
						
						idEmp.splice(i,1);
						//Delete object from database
					} 
				}
			});
			sortIdEmployee(idEmp);
			var startChange = jQuery('#tr-add-header');
			for(var i=0; i<idEmp.length; i++) {
				startChange = startChange.next();
				startChange.find('td.table-add-stt input[name="id"]').attr('value', idEmp[i]);
			}
			//console.log(idEmp);
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
		if(idEmp.length <= 0) {
			idEmp[0] = 1;
		} else {
			idEmp[idEmp.length] = parseInt(idEmp[idEmp.length-1]) + 1; 
		}
	
		//Can phai lay so thu tu cuoi cung waiting...
		jQuery('#addnew #table-add-lastrow').before("<tr>" + 
				"<th><input type='checkbox' name='check-all' value=''></th>"
				+"<td class='table-add-stt'><input disabled='disabled' type='text' class='form-control' name='id' required value='"+(idEmp[idEmp.length - 1])+"'/></td>"
				+"<td class='table-add-sex'><select  class='table-sex-select form-control' name='sex'>"
				+"<option name='sex'></option>"
				+"<option name='sex' value='Male'>Male</option>"
				+"<option name='sex' value='Female'>Female</option>"
				+"</select></td>"
				+"<td><input type='text' class='form-control' name='name' required placeholder='Your full name!'/></td>"
				+"<td><input type='text' class='form-control' name='position' required placeholder='Ex:Employee, Manager'/></td>"
				+"<th><input type='text' class='datepicker form-control' name='birthday' value='' placeholder='dd/mm/yyyy'></th>"
				+"<th><select  class='table-region-select form-control' name='nationality'>"
				+"<option name='nationality'></option>"
				+"<option name='nationality' value='VN'>VN</option>"
				+"<option name='nationality' value='USA'>USA</option>"
				+"</select></th>"
				+"</tr>");
		jQuery('.datepicker').datepicker({
			dateFormat: "dd-mm-yy",
			changeMonth: true,
		    changeYear: true,
		    yearRange: '1950:2015'
			
		}).next().insertBefore('#datepicker');
		
		//jQuery('.ui-datepicker-trigger').addClass('pull-right');
		
	
		
//		function setIdEmp(data) {
//			idEmp = data;
//		}
	});
	
	
	/*
	 * Config for filter part
	 */
	//First init: disable button when you don't choose ability to search
	if(jQuery('#span-ei-id').css('display') == 'none' && jQuery('#span-ei-name').css('display') == 'none' && jQuery('#span-ei-date').css('display') == 'none') {
		jQuery('#bt-filter-ei').addClass("disabled");
	}
	//Apply button for filter employee
	jQuery('#action-epm #bt-filter-ei').on('click', function(event) {
		event.preventDefault();
		if(!jQuery(this).hasClass('disabled')) {
			jQuery('#modalFailed .modal-header').find('h4').text("This employee is not found!");
			
			var dataFilter = {};
			//Get id
			if(jQuery('#span-ei-id').css('display') != 'none') {
				var checkId = jQuery('#span-ei-id').find('input[type="checkbox"]').prop('checked');
				if(checkId === false) {
					if(jQuery('#span-ei-id').find('input[name="ei-id"]').val() == "") {
						jQuery('#span-ei-id').find('input[name="ei-id"]').focus();
						return false;
					} else {
						dataFilter['id'] = jQuery('#span-ei-id').find('input[name="ei-id"]').val();
					}	
				}
			}
			//Get name
			if(jQuery('#span-ei-name').css('display') != 'none') {
				var checkName = jQuery('#span-ei-name').find('input[type="checkbox"]').prop('checked');
				if(checkName === false) {
					if(jQuery('#span-ei-name').find('input[name="ei-name"]').val() == "") {
						jQuery('#span-ei-name').find('input[name="ei-name"]').focus();
						return false;
					} else {
						dataFilter['name'] = jQuery('#span-ei-name').find('input[name="ei-name"]').val();
					}	
				}
			}
			
			//Get date
			if(jQuery('#span-ei-date').css('display') != 'none') {
				var checkDate = jQuery('#span-ei-date').find('input[type="checkbox"]').prop('checked');
				if(checkDate === false ) {
					if(jQuery('#span-ei-date').find('input[name="ei-birthdate"]').val() == "") {
						jQuery('#span-ei-date').find('input[name="ei-birthdate"]').focus();
						return false;
					} else {
						var dateTime = new Date(jQuery('#span-ei-date').find('input[name="ei-birthdate"]').datepicker("getDate"));
						var strDateTime = dateTime.getFullYear() + "-" + (dateTime.getMonth()+1) + "-" + dateTime.getDate();
						dataFilter['birthday'] = strDateTime;
					}
				
				}
			}
			console.log(dataFilter);
			jQuery.ajax({
				contentType : 'application/json; charset=utf-8',
				type : 'POST',
				url: '/batis/filter',
				dataType: 'json',
				data: JSON.stringify(dataFilter),
				success: function(data) {
					if(data != null && data.length > 0 ) {
						var sttFilter = [];
						
						jQuery('#tr-header').nextUntil('#table-lastrow').remove();
						jQuery('.pagination').hide();
						for(var i=0; i<data.length; i++) {
							sttFilter[i] = parseInt(i) + 1;
							var birthdayTime = new Date(data[i].birthday);
							var month = birthdayTime.getMonth() + 1;
							var day = birthdayTime.getDate();
							var year = birthdayTime.getFullYear();
							var date = day + "-" + month + "-" + year;
							jQuery('#table-lastrow').before("<tr>" + 
									"<th><input type='checkbox' name='check-all' value=''></th>"
									+"<td class='table-stt'>"+sttFilter[i]+"</td>"
									+"<td class='table-id'>"+(data[i].id)+"</td>"
									+"<td class='table-sex'>"+(data[i].sex)+"</td>"
									+"<td class='table-name'><a href='#' name='modalEmp' data-toggle='modal' data-target='#myModal' title='Click to edit!'>"+data[i].name+"</a></td>"
									+"<td class='table-position'>"+(data[i].position)+"</td>"
									+"<td class='table-birthday'>"+(date)+"</td>"
									+"<td class='table-nationality'>"+(data[i].nationality)+"</td>"
									+"</tr>");
							
						}
					} else {
						jQuery('#myNavbar li').find('a[href="#function2"]').click();
						jQuery('#tr-header').nextUntil('#table-lastrow').remove();
//						jQuery('#modalFailed').modal({
//							show : 'true',
//							backdrop: false
//						});
						jQuery('#tr-header').after('<tr><td colspan="8"><div style="text-align:center" class="alert alert-info">Empty Employee</div></td></tr>');
						//jQuery('.pagination').hide();
					}
				}
			});
//			if(jQuery('#span-ei-id').css('display') != "none" && jQuery('#span-ei-id input[name="ei-id"]').val().length <= 0 ||
//				jQuery('#span-ei-name').css('display') != "none" && jQuery('#span-ei-name input[name="ei-name"]').val().length <= 0 ||
//				jQuery('#span-ei-date').css('display') != "none" && jQuery('#span-ei-date input[name="ei-birthdate"]').val().length <= 0) {
//				jQuery('#modalFailed .modal-header').find('h4').text("Error: A or more your input is empty or this employee is not exist ! If you don't use this field, please check into checkbox!");
//				loadTableEmployee(data);
//			}
			
			
		}
		
	});
	
	//Validator filter 
	
	jQuery('#span-ei-id input[name="ei-id"]').on('keyup focusout', function(e) {
	
		
		if(e.type == 'focusout') {
			//Check not null
			if(jQuery(this).val().length <= 0) {
				jQuery(this).attr("data-original-title", "Please don't go T_T");
				jQuery(this).attr("data-content", "Your text needs a 1 number.");
				jQuery(this).focus();
			}
			if(/^[0-9]+$/.test(jQuery(this).val()) == false) {
				jQuery(this).attr("data-original-title", "You have some wrong syntax");
				jQuery(this).attr("data-content", "Your text only contains number");
				jQuery(this).focus();
			} else {
				jQuery(this).attr("data-original-title", "Good");
				jQuery(this).attr("data-content", "Your text is right syntax");
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
	 * Vadidate add new field
	 */
	//Vadidate name
	jQuery('#addnew').on('blur', 'input[name="name"]', function(event) {
		//Check text has special character and contains UTF-8: \u00A1-\uFFFF
		if((/^[\w\u00A1-\uFFFF ]+$/.test(jQuery(this).val()) == false && jQuery(this).val() != "")) {
			//Show alert and show on page
			jQuery('#addnew-alert').html('<strong>Error:</strong> <span> Your name can\'t contain special character!</span>');
			jQuery('#addnew-alert').removeClass('hide');
			jQuery(this).focus();
		//If length of text > 45 character is unvalid
		} else if(jQuery(this).val().length > 45) {
			jQuery('#addnew-alert').html('<strong>Error:</strong> <span> Your name too long. Max: 45 character.</span>');
			jQuery('#addnew-alert').removeClass('hide');
			jQuery(this).focus();
		//If Satisfy condition, we'll hide the alert
		} else {
			jQuery('#addnew-alert').addClass('hide');
		}
		if(jQuery(this).val() != "") {
			jQuery(this).css('border','1px solid #ccc');
		}
	});

	//Vadidate position
	jQuery('#addnew').on('blur', 'input[name="position"]', function(event) {
		//Text is not contain special character
		if((/^[\w\u00A1-\uFFFF ]+$/.test(jQuery(this).val()) == false && jQuery(this).val() != "")) {
			jQuery('#addnew-alert').html('<strong>Error:</strong> <span> Your position can\'t contain special character!</span>');
			jQuery('#addnew-alert').removeClass('hide');
			jQuery(this).focus();
		} else if(jQuery(this).val().length > 60) {
			jQuery('#addnew-alert').html('<strong>Error:</strong> <span> Your position too long. Max: 60 character.</span>');
			jQuery('#addnew-alert').removeClass('hide');
			jQuery(this).focus();
		} else {
			jQuery('#addnew-alert').addClass('hide');
		}
	});

	//Vadidate date
	jQuery('#addnew').on('blur', 'input[name="birthday"]', function(event) {
		
		if(/^[0-9]{2}\-[0-9]{2}\-[0-9]{4}$/.test(jQuery(this).val()) == false && jQuery(this).val() != "") {
			jQuery('#addnew-alert').html('<strong>Error:</strong> <span> Your date is unvalid!</span>');
			jQuery('#addnew-alert').removeClass('hide');
			jQuery(this).focus();
		} else {
			jQuery('#addnew-alert').addClass('hide');
		}
	});

	/*
	 * Sign up form: check confirm password
	 */
	jQuery('#user').on('keyup', 'input[name="passwordConfirm"]', function(event) {
		var password =  jQuery('#user input#password').val();
		var confirmPass = jQuery(this).val();
		
		if(confirmPass != password) {
			if(jQuery(this).parent().parent().hasClass('has-success')) {
				jQuery(this).parent().parent().removeClass('has-success has-feedback');
				jQuery(this).next().removeClass('glyphicon glyphicon-ok form-control-feedback');
			} 
			jQuery(this).parent().parent().addClass('has-error has-feedback');
			jQuery(this).next().addClass('glyphicon glyphicon-remove form-control-feedback');
		} else {
			if(jQuery(this).parent().parent().hasClass('has-error')) {
				jQuery(this).parent().parent().removeClass('has-error has-feedback');
				jQuery(this).next().removeClass('glyphicon glyphicon-remove form-control-feedback');
			} 
			jQuery(this).parent().parent().addClass('has-success has-feedback');
			jQuery(this).next().addClass('glyphicon glyphicon-ok form-control-feedback');
		}
	});

	jQuery('form#user').submit(function(event) {
		if(jQuery('#user input[name="passwordConfirm"]').parent().parent().hasClass('has-error')) {
			event.preventDefault();
			jQuery('#user input[name="passwordConfirm"]').focus();
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
		jQuery("fieldset > span#span-ei-id input[type='checkbox'], span#span-ei-name input[type='checkbox'], span#span-ei-date input[type='checkbox']").prop('checked', false);
		jQuery("fieldset > span#span-ei-id input[name='ei-id'], span#span-ei-name input[name='ei-name'], span#span-ei-date input[name='ei-birthdate']").css('display','block');
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
				+"<td class='table-stt'>"+(data.employee[i].stt)+"</td>"
				+"<td class='table-id'>"+(data.employee[i].id)+"</td>"
				+"<td class='table-sex'>"+(data.employee[i].sex)+"</td>"
				+"<td class='table-name'><a href='#' name='modalEmp' data-toggle='modal' data-target='#myModal' title='Click to edit!'>"+data.employee[i].name+"</a></td>"
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
	function sortIdEmployee(stt) {
		
		var idNext = 0;
		
		if(stt.length > 0 && stt[0] > 1) {
			stt[0] = 1;
		}
		var length = parseInt(stt.length - 1);
		
		for(var i in stt) {
			//console.log("i" + i);
			
			if(i < length) {
				var idNext = parseInt(i)+1;
				//console.log("idnext" + idNext);
				var compare = parseInt(stt[idNext]) - 1; 
				//console.log("compare" + compare);
				//console.log('final' + dataSort.employee[i].id);
				if(parseInt(stt[i]) != compare) {
					//alert("before");
					//updateTable(dataSort,idNext, i);
//					jQuery.when(updateTable(dataSort, idNext, i)).done(function(x1) {
//						var success ="success";
//					})
					stt[idNext] = parseInt(stt[i]) + 1;
				}
				
			}
			
		}
	}
	
//	function updateTable(dataSort,idNext, i) {
//		jQuery.ajax({
//			type: 'PUT',
//			async: false,
//			url: "/batis/updateTable/" + (dataSort.employee[idNext].id) +"/" + (parseInt(dataSort.employee[i].id) + 1),
//			success: function(data) {
//				//alert("after");
//			}
//		});
//	}
//	
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