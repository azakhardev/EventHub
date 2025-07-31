package cz.zakharchenkoartem.eventhub.restapi.users;

import com.fasterxml.jackson.annotation.JsonView;
import cz.zakharchenkoartem.eventhub.restapi.dto.Views;
import cz.zakharchenkoartem.eventhub.restapi.events.Event;
import cz.zakharchenkoartem.eventhub.restapi.follows.FollowRelation;
import cz.zakharchenkoartem.eventhub.restapi.follows.dto.PinFollowerRequest;
import cz.zakharchenkoartem.eventhub.restapi.login.JwtService;
import cz.zakharchenkoartem.eventhub.restapi.notifications.Notification;
import cz.zakharchenkoartem.eventhub.restapi.users.dto.FollowedUser;
import cz.zakharchenkoartem.eventhub.restapi.users.dto.FriendRequest;
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
    @JsonView(Views.Public.class)
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/{id}")
    @JsonView(Views.Owner.class)
    public User getUser(@PathVariable Long id, @RequestHeader("Authorization") String authHeader) {
        Long userId = jwtService.extractUserId(authHeader.replace("Bearer ", ""));
        if(!Objects.equals(userId, id)){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
        }
        return userService.getUser(id);
    }

    @GetMapping("/by-name/{name}")
    @JsonView(Views.Public.class)
    public List<User> getUsersByName(@PathVariable String name) {
        return userService.getUsersByName(name);
    }

    @GetMapping("/{id}/following")
    @JsonView(Views.Public.class)
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

    @PostMapping("/{id}/add-friend")
    @JsonView(Views.Public.class)
    public ResponseEntity<User> sendFriendRequest(@PathVariable Long id, @RequestBody FriendRequest friendRequest) {
        User followedUser = userService.followUser(id, friendRequest);
        return ResponseEntity.ok(followedUser);
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