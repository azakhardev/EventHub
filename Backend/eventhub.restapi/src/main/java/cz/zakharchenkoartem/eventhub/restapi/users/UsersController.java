package cz.zakharchenkoartem.eventhub.restapi.users;

import cz.zakharchenkoartem.eventhub.restapi.events.Event;
import cz.zakharchenkoartem.eventhub.restapi.follows.FollowRelation;
import cz.zakharchenkoartem.eventhub.restapi.follows.dto.PinFollowerRequest;
import cz.zakharchenkoartem.eventhub.restapi.notifications.Notification;
import cz.zakharchenkoartem.eventhub.restapi.users.dto.FollowedUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UsersController {

    private final UserService userService;

    @Autowired
    public UsersController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUser(id);
    }

    @GetMapping("/{id}/following")
    public List<FollowedUser> getFollowers(@PathVariable Long id,  @RequestParam(required = false) String expression) {
        return userService.getFollowing(id, expression);
    }

    @GetMapping("/{id}/notifications")
    public List<Notification> getNotifications(@PathVariable Long id) {
        return userService.getNotifications(id);
    }

    @GetMapping("/{id}/my-events")
    public List<Event> getMyEvents(@PathVariable Long id) {
        return userService.getMyEvents(id);
    }

    @GetMapping("/{id}/foreign-events")
    public List<Event> getForeignEvents(@PathVariable Long id) {
        return userService.getForeignEvents(id);
    }

    @PutMapping("/pin-follower")
    public ResponseEntity<FollowedUser> pinFollower(@RequestBody PinFollowerRequest request) {
        FollowedUser user = userService.pinFollower(request);
        return ResponseEntity.ok(user);
    }
}