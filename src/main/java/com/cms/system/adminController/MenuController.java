package com.cms.system.adminController;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class MenuController {

	@GetMapping("/menus")
	public String dashboard() {
		
		return "admin/menus/insert_menu";
	}
}