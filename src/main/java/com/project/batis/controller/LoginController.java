package com.project.batis.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.ModelAndView;

import com.project.batis.domain.User;
import com.project.batis.mapper.UserMapper;

@Controller
@RequestMapping("/user")
public class LoginController {

	@Autowired
	UserMapper userMapper;

	private static final Logger logger = LoggerFactory
			.getLogger(LoginController.class);

	// Catch event when submit button is clicked
	@RequestMapping(value = "/home", method = RequestMethod.POST)
	public ModelAndView showUserPage(User user, BindingResult result,
			SessionStatus status, HttpSession session) {
		ModelAndView mav = new ModelAndView();
		if (result.hasErrors()) {
			logger.info("A error appears");
		} else {
			List<User> listOfUser = userMapper.getAllUser();
			logger.info("info: " + listOfUser);
			for (User account : listOfUser) {
				if (user.getEmail().equals(account.getEmail())
						&& user.getPassword().equals(account.getPassword())) {
					session.setAttribute("userSession", account);
					mav.setViewName("home");
					return mav;
				}
			}
		}
		mav.setViewName("login");
		return mav;
	}

	// Catch logout event
	@RequestMapping("/logout")
	public ModelAndView logoutLogin(HttpSession session) {
		session.removeAttribute("userSession");
		return new ModelAndView("redirect:" + "/");
	}
	
	
}
