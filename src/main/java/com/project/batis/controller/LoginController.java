package com.project.batis.controller;

import java.util.Locale;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.project.batis.domain.User;
import com.project.batis.mapper.UserMapper;

@Controller
public class LoginController {

	@Autowired
	private UserMapper userService;
	private static final Logger logger = LoggerFactory
			.getLogger(LoginController.class);

	// Show login interface
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String showHome(Locale locale) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "login";
	}
	
	@RequestMapping("/signup")
	public String showSignUp(Model modal) {
		modal.addAttribute("user", new User());
		return "signup";
	}

	@RequestMapping("/createaccount")
	public String createAccount(@Valid User user, BindingResult result) {
		if(result.hasErrors()) {
			System.out.println(result);
			return "signup";
		}
		user.setEnabled(true);
		user.setAuthority("user");
		System.out.println(user);
		
		//Need check duplicate email with select user
		try {
			userService.saveUser(user);
			userService.saveAuthority(user);
		} catch (DuplicateKeyException e) {
			result.rejectValue("email", "DuplicateKey.user.email");
			return "signup";
		}
		
		return "login";
	}
	
	// // Catch event when submit button is clicked
	// @RequestMapping(value = "/home", method = RequestMethod.POST)
	// public ModelAndView showUserPage(User user, BindingResult result) {
	// ModelAndView mav = new ModelAndView();
	// List<User> listOfUser = userMapper.getAllUser();
	// logger.info("info: " + listOfUser);
	// for (User account : listOfUser) {
	// if (user.getEmail().equals(account.getEmail())
	// && user.getPassword().equals(account.getPassword())) {
	// mav.setViewName("home");
	// return mav;
	// }
	// }
	// return mav;
	// }

	// Catch logout event
	// @RequestMapping("/logout")
	// public ModelAndView logoutLogin(HttpSession session) {
	// session.removeAttribute("userSession");
	// return new ModelAndView("redirect:" + "/");
	// }

}
