package cz.zakharchenkoartem.eventhub.restapi.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UsersController {
    UsersDataSource usersDataSource;

    @Autowired
    public UsersController(UsersDataSource usersDataSource) {
        this.usersDataSource = usersDataSource;
    }

    @GetMapping
    public List<User> getUsers() {
        return usersDataSource.findAll();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        Optional<User> user = usersDataSource.findById(id);

        if (user.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        return user.get();
    }
}
