package com.project.batis.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.project.batis.domain.Employee;
import com.project.batis.mapper.EmployeeMapper;

@Controller
public class EmployeeController {

	@Autowired
	private EmployeeMapper employeeService;

	// Get list object to json
	@RequestMapping(value = "/getJson", method = RequestMethod.GET, headers = "Accept=*/*", produces = "application/json")
	public @ResponseBody List<Employee> getListUserJson() {
		List<Employee> listOfEmployee = employeeService.getAllEmployee();
		return listOfEmployee;
	}

	// Get delete event from ajax
	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE, headers = "Accept=*/*", produces = "application/x-www-form-urlencoded;charset=UTF-8")
	public @ResponseBody String deleteEmployee(@PathVariable int id) {
		String decoded = "";
		// Decode codeId from ISO to UTF-8 string
		// decoded = new String(codeId.getBytes("ISO-8859-1"));
		employeeService.deleteEmployee(id);
		// System.out.println(decoded);
		// List<Employee> listEmp = employeeService.getAllEmployee();
		// for (Employee employee : listEmp) {
		// System.out.println(employee);
		// }

		return decoded;
	}

	// Get updateTable from Ajax
	@RequestMapping(value = "/updateTable/{id}/{change}", method = RequestMethod.PUT)
	public @ResponseBody boolean updateTableEmployee(
			@PathVariable("id") int id, @PathVariable("change") int change) {

		employeeService.updateIdTableEmployee(id, change);
		return true;
	}

	// Get last id to get number for add row button
	@RequestMapping(value = "getLastId", method = RequestMethod.GET)
	public @ResponseBody int getLastId() {
		return employeeService.getLastIdEmployee();
	}

	// Add employee to database
	@RequestMapping(value = "/submitAdd", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody boolean submitAddNewEmployee(
			@RequestBody Employee employee, HttpServletRequest request) {
		// System.out.println("Rs: " + employee);
		// System.out.println("Quản lý");
		employeeService.saveEmployee(employee);
		return true;
	}

	@RequestMapping("/addnew")
	public String showAddNew() {
		return "addnew";
	}

	// Edit employee
	@RequestMapping(value = "/edit", method = RequestMethod.POST)
	public String editEmployee(Model model, Employee employee) {
		// System.out.println(employee);
		employeeService.updateEmployee(employee);
		return "home";
	}

	// Filter employee
	@RequestMapping(value = "/filter", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody List<Employee> filterEmployee(
			@RequestBody Employee employee, BindingResult result) {
		List<Employee> listOfFilter = new ArrayList<Employee>();
		System.out.println("Filter: " + employee);
		if (result.hasErrors()) {
			System.out.println("error");
			return null;
		}
		if (employee.getId() > 0 && employee.getName() != null
				&& employee.getBirthday() != null) {
			listOfFilter = employeeService.getFilter3Element(employee);
		} else if ((employee.getId() <= 0 && employee.getName() != null && employee
				.getBirthday() != null)
				|| (employee.getName() == null && employee.getId() > 0 && employee
						.getBirthday() != null)
				|| (employee.getBirthday() == null
						&& employee.getId() > 0 && employee.getName() != null)) {

			listOfFilter = employeeService.getFilter2Element(employee);
		} else {
			listOfFilter = employeeService.getFilterElement(employee);
		}

		System.out.println(listOfFilter);

		return listOfFilter;
	}
}
