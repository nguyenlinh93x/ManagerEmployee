package com.project.batis.domain;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

public class User {
	//@Pattern(regexp="^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", message="Email must be right syntax")
	@NotBlank
	@Email
	private String email;
	@Pattern(regexp="^\\S+$")
	@Size(min=8, max=15)
	private String password;
	private boolean enabled = false;
	private String authority;

	public User() {

	}

	public User(String email, String password, boolean enabled, String authority) {
		this.email = email;
		this.password = password;
		this.enabled = enabled;
		this.authority = authority;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public String getAuthority() {
		return authority;
	}

	public void setAuthority(String authority) {
		this.authority = authority;
	}

	@Override
	public String toString() {
		return "User [email=" + email + ", password=" + password + ", enabled="
				+ enabled + ", authority=" + authority + "]";
	}

}
