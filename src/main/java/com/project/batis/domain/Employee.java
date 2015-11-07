package com.project.batis.domain;

import java.sql.Date;

public class Employee {
	private int id;
	private String codeId;
	private String name;
	private String position;
	private Date birthday;
	private String nationality;
	
	public Employee() {
	}

	public Employee(int id, String codeId, String name, String position,
			Date birthday, String nationality) {
		this.id = id;
		this.codeId = codeId;
		this.name = name;
		this.position = position;
		this.birthday = birthday;
		this.nationality = nationality;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCodeId() {
		return codeId;
	}

	public void setCodeId(String codeId) {
		this.codeId = codeId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public String getNationality() {
		return nationality;
	}

	public void setNationality(String nationality) {
		this.nationality = nationality;
	}

	@Override
	public String toString() {
		return "Employee [id=" + id + ", codeId=" + codeId + ", name=" + name
				+ ", position=" + position + ", birthday=" + birthday
				+ ", nationality=" + nationality + "]";
	}
	
}
