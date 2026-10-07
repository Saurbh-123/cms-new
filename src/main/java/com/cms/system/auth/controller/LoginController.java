package com.cms.system.auth.controller;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AnonymousAuthenticationFilter;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cms.system.model.Users;

@Controller
@RequestMapping("/login")
public class LoginController {

	@GetMapping("")
	public String login(Authentication authentication  ,Model model) {
		
		if(authentication != null && authentication.isAuthenticated()
				&& (authentication instanceof AnonymousAuthenticationToken)
				) {
			
			return "redirect: admin/dashboard";
		}
		
		model.addAttribute("user", new Users());
		
		
		return "layouts/login";      
	}
}
