package com.project.batis.mapper;

import java.util.List;

import com.project.batis.domain.User;

public interface UserMapper {
	public void saveUser(User user);

	public void updateUser(User user);

	public void deleteUser(int id);

	public List<User> getAllUser();
}
