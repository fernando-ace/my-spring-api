package com.fernando.restapi;

import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class HomeController {
    @GetMapping("/")
    public String home() {
        return "Welcome to the Task API!";
    }
}