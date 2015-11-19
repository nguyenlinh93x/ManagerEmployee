package com.project.batis.mapper;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.project.batis.domain.User;

public interface UserMapper {
	@Transactional
	public void saveUser(User user);
	
	@Transactional
	public void saveAuthority(User user);

	public void deleteUser(int id);

	public List<User> getAllUser();
}
