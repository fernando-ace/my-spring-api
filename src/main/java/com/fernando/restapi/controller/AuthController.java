// src/main/java/com/fernando/restapi/controller/AuthController.java

package com.fernando.restapi.controller;

import com.fernando.restapi.model.User;
import com.fernando.restapi.repository.UserRepository;
import com.fernando.restapi.security.JwtUtils;
import com.fernando.restapi.security.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    // Endpoint to register a new user
    @PostMapping("/signup")
        public ResponseEntity<?> registerUser(@RequestBody Map<String, String> payload) {
            String username = payload.get("username");
            String email = payload.get("email");
            String password = payload.get("password");

            if (username == null || email == null || password == null) {
                return ResponseEntity.badRequest().body(Map.of("message", "Error: Missing username, email, or password."));
            }

            if (userRepository.existsByUsername(username)) {
                return ResponseEntity.badRequest().body(Map.of("message", "Error: Username is already taken!"));
            }

            if (userRepository.existsByEmail(email)) {
                return ResponseEntity.badRequest().body(Map.of("message", "Error: Email is already in use!"));
            }

            User user = new User();
            user.setUsername(username);
            user.setEmail(email);
            user.setPassword(passwordEncoder.encode(password));
            user.setRoles("ROLE_USER");

            userRepository.save(user);

            return ResponseEntity.ok(Map.of("message", "User registered successfully!"));
        }

        @PostMapping("/login")
        public ResponseEntity<?> authenticateUser(@RequestBody Map<String, String> payload) {
            String username = payload.get("username");
            String password = payload.get("password");

            if (username == null || password == null) {
                return ResponseEntity.badRequest().body(Map.of("message", "Error: Missing username or password."));
            }

            try {
                Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
                );

                UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

                String jwt = jwtUtils.generateJwtToken(userDetails.getUsername());

                return ResponseEntity.ok(Map.of(
                    "token", jwt,
                    "username", userDetails.getUsername()
                ));
            } catch (BadCredentialsException ex) {
                return ResponseEntity.status(401).body(Map.of("message", "Invalid username or password"));
            } catch (Exception ex) {
                return ResponseEntity.status(500).body(Map.of("message", "Authentication failed due to server error"));
            }
        }

}
