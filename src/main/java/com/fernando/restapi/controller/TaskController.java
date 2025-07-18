package com.fernando.restapi.controller;

import com.fernando.restapi.model.Task;
import com.fernando.restapi.model.User;
import com.fernando.restapi.repository.TaskRepository;
import com.fernando.restapi.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
//@CrossOrigin // if needed for frontend
@CrossOrigin(origins = {
    "http://localhost:3000",
    "https://verbose-meme-5g9p7q9j5659f7vqj-8080.app.github.dev"
})
public class TaskController {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final String jwtSecret = "mySecretKey";

    @Autowired
    public TaskController(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    private User getUserFromToken(String token) {
        if (token == null || !token.startsWith("Bearer ")) return null;
        String jwt = token.substring(7);
        Claims claims = Jwts.parser()
                .setSigningKey(jwtSecret.getBytes())
                .parseClaimsJws(jwt)
                .getBody();
        String username = claims.getSubject();
        return userRepository.findByUsername(username);
    }

    @GetMapping
    public List<Task> getTasks(@RequestHeader("Authorization") String authHeader) {
        User user = getUserFromToken(authHeader);
        if (user == null) throw new RuntimeException("Unauthorized");
        return taskRepository.findByUser(user);
    }

    @PostMapping
    public Task createTask(@RequestHeader("Authorization") String authHeader, @RequestBody Task task) {
        User user = getUserFromToken(authHeader);
        if (user == null) throw new RuntimeException("Unauthorized");
        task.setUser(user);
        return taskRepository.save(task);
    }

    @PutMapping("/{id}")
    public Task updateTask(@RequestHeader("Authorization") String authHeader, @PathVariable Long id, @RequestBody Task updatedTask) {
        User user = getUserFromToken(authHeader);
        if (user == null) throw new RuntimeException("Unauthorized");
        return taskRepository.findById(id).map(task -> {
            if (task.getUser() == null || !task.getUser().getId().equals(user.getId())) throw new RuntimeException("Forbidden");
            task.setName(updatedTask.getName());
            task.setCompleted(updatedTask.isCompleted());
            return taskRepository.save(task);
        }).orElseThrow(() -> new RuntimeException("Task not found with id " + id));
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@RequestHeader("Authorization") String authHeader, @PathVariable Long id) {
        User user = getUserFromToken(authHeader);
        if (user == null) throw new RuntimeException("Unauthorized");
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        if (task.getUser() == null || !task.getUser().getId().equals(user.getId())) throw new RuntimeException("Forbidden");
        taskRepository.deleteById(id);
    }
}
