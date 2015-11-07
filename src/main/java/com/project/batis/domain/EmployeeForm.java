package com.project.batis.domain;

import java.util.List;

public class EmployeeForm {
	private List<Employee> listOfEmployee;

	public List<Employee> getListOfEmployee() {
		return listOfEmployee;
	}

	public void setListOfEmployee(List<Employee> listOfEmployee) {
		this.listOfEmployee = listOfEmployee;
	}

	@Override
	public String toString() {
		String result = "";
		for (Employee employee : listOfEmployee) {
			result += employee + "\n";
		}
		return result;
	}
	
	
}	
