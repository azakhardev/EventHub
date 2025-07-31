package cz.zakharchenkoartem.eventhub.restapi.users;

import cz.zakharchenkoartem.eventhub.restapi.events.Event;
import cz.zakharchenkoartem.eventhub.restapi.follows.FollowRelation;
import cz.zakharchenkoartem.eventhub.restapi.follows.dto.PinFollowerRequest;
import cz.zakharchenkoartem.eventhub.restapi.login.JwtService;
import cz.zakharchenkoartem.eventhub.restapi.notifications.Notification;
import cz.zakharchenkoartem.eventhub.restapi.users.dto.FollowedUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/users")
public class UsersController {

    private final UserService userService;
    private final JwtService jwtService;

    @Autowired
    public UsersController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
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
    public List<FollowedUser> getFollowers(@RequestHeader("Authorization") String authHeader, @PathVariable Long id,  @RequestParam(required = false) String expression) {
        Long userId = jwtService.extractUserId(authHeader.replace("Bearer ", ""));
        if(!Objects.equals(userId, id)){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
        }
        return userService.getFollowing(id, expression);
    }

    @GetMapping("/{id}/notifications")
    public List<Notification> getNotifications(@PathVariable Long id) {
        return userService.getNotifications(id);
    }

    @GetMapping("/{id}/my-events")
    public List<Event> getMyEvents(@RequestHeader("Authorization") String authHeader, @PathVariable Long id) {
        Long userId = jwtService.extractUserId(authHeader.replace("Bearer ", ""));
        if(!Objects.equals(userId, id)){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
        }
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