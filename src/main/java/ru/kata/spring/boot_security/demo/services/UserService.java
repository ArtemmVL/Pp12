package ru.kata.spring.boot_security.demo.services;

import ru.kata.spring.boot_security.demo.entity.User;

import java.util.List;

public interface UserService {

    List<User> getAllUsers();

    boolean saveUser(User user);

    void updateUser(User user);

    void deleteUser(Long id);

    User findById(Long id);

    User findByUsername(String username);

}
