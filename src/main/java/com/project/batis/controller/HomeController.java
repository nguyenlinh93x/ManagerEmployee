package com.project.batis.controller;

import java.util.Locale;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.project.batis.domain.User;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {

	private static final Logger logger = LoggerFactory
			.getLogger(HomeController.class);


	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public ModelAndView home(Locale locale, Model model, HttpSession session) {
		ModelAndView mav = new ModelAndView();
		logger.info("Welcome home! The client locale is {}.", locale);
		User user = (User) session.getAttribute("userSession");
		if (user == null) {
			System.out.println("New");
		} else {
			return new ModelAndView("redirect:" + "/back");
		}
		mav.setViewName("login");
		return mav;
	}
	
	@RequestMapping(value = "/back", method = RequestMethod.GET)
	public ModelAndView backHome(HttpSession session) {
		ModelAndView mav = new ModelAndView();
		if(session.isNew() || session == null) {
			mav.setViewName("login");
			return mav;
		}
		mav.setViewName("home");
		return mav;
	}

}
