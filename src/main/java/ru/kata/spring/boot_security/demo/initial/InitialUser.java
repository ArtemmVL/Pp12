package ru.kata.spring.boot_security.demo.initial;

import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.entity.Role;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.services.RoleService;
import ru.kata.spring.boot_security.demo.services.UserService;

import javax.annotation.PostConstruct;
import java.util.Set;

@Component
public class InitialUser {
    private final UserService userService;
    private final RoleService roleService;

    private final Role roleAdmin = new Role("ROLE_ADMIN");
    private final Role roleUser = new Role("ROLE_USER");

    public InitialUser(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @PostConstruct
    private void startUsers() {
        roleService.addRole(roleAdmin);
        roleService.addRole(roleUser);
        User user = new User("name1", "admin", "name1", 1, "1", Set.of(roleAdmin));
        User user1 = new User("name2", "user", "name2", 2, "1", Set.of(roleUser));
        User user2 = new User("name3", "user_admin", "name3", 3, "1", Set.of(roleUser, roleAdmin));
        userService.saveUser(user);
        userService.saveUser(user1);
        userService.saveUser(user2);
    }
}