package com.project.batis.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.transaction.annotation.Transactional;

import com.project.batis.domain.Employee;


public interface EmployeeMapper {
	@Transactional
	public void saveEmployee(Employee emp);

	@Transactional
	public void updateEmployee(Employee emp);

	public void deleteEmployee(int id);

	public List<Employee> getAllEmployee(); 
	
	@Transactional
	public void updateIdTableEmployee(@Param("id") int id, @Param("change") int change);
	
	//Set auto-increment when 1 object delete
	
	//Get last id of table
	public int getLastIdEmployee();
	
	//Filter with id, name and date
	public List<Employee> getFilter3Element(Employee employee);
	
	public List<Employee> getFilter2Element(Employee employee);
	
	public List<Employee> getFilterElement(Employee employee);
	
}
