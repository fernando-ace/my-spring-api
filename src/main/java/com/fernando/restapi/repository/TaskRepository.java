package com.fernando.restapi.repository;

import com.fernando.restapi.model.Task;
import com.fernando.restapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUser(User user);
}
