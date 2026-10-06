package com.cms.system.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cms.system.helper.Information;

@Controller
@RequestMapping("/information")
public class InformationController {

	
	@GetMapping("")
	public String information(Model model) {
		model.addAttribute("information", Information.INFORMATION);
		return "information/information";
	}
	
	
	
	
}
