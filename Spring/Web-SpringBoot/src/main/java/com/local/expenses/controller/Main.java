package com.local.expenses.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class Main {
    @RequestMapping("/")
    public String hello(Model model) {
        model.addAttribute("name", "toto");
        return "main";
    }
}

