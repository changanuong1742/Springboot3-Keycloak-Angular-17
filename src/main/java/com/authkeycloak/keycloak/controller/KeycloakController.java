package com.authkeycloak.keycloak.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api")
public class KeycloakController {

    @GetMapping("/hello-2")
//    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<String> getAdminDetails() {
        return ResponseEntity.ok("Hello admin");
    }

    @GetMapping("/getUserDetails")
//    @PreAuthorize("hasRole('user')")
    public ResponseEntity<String> getUserDetails() {
        return ResponseEntity.ok("Hello user");
    }
}
