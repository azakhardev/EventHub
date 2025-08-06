package cz.zakharchenkoartem.eventhub.restapi.users;

import com.fasterxml.jackson.annotation.JsonView;
import cz.zakharchenkoartem.eventhub.restapi.dto.PageInfo;
import cz.zakharchenkoartem.eventhub.restapi.dto.PaginatedResponse;
import cz.zakharchenkoartem.eventhub.restapi.dto.Views;
import cz.zakharchenkoartem.eventhub.restapi.events.Event;
import cz.zakharchenkoartem.eventhub.restapi.events.dto.EventDto;
import cz.zakharchenkoartem.eventhub.restapi.follows.FollowRelation;
import cz.zakharchenkoartem.eventhub.restapi.follows.dto.PinFollowerRequest;
import cz.zakharchenkoartem.eventhub.restapi.login.JwtService;
import cz.zakharchenkoartem.eventhub.restapi.notifications.Notification;
import cz.zakharchenkoartem.eventhub.restapi.users.dto.ChangePassword;
import cz.zakharchenkoartem.eventhub.restapi.users.dto.FollowedUser;
import cz.zakharchenkoartem.eventhub.restapi.users.dto.FriendRequest;
import cz.zakharchenkoartem.eventhub.restapi.users.dto.UserEditProfile;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
        if (!Objects.equals(userId, id)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
        }
        return userService.getUser(id);
    }

    @GetMapping("/by-name")
    @JsonView(Views.Public.class)
    public PaginatedResponse<User> getUsersByName(@RequestParam String name, @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "20") int pageSize) {
        Page<User> pageResult = userService.getUsersByName(name, page - 1, pageSize);

        PageInfo pageInfo = new PageInfo(page, pageSize, pageResult.getTotalPages(), pageResult.getTotalElements());

        return new PaginatedResponse<User>(pageResult.getContent(), pageInfo);
    }

    @GetMapping("/{id}/following")
    @JsonView(Views.Public.class)
    public PaginatedResponse<FollowedUser> getFollowedUsers(@RequestHeader("Authorization") String authHeader, @PathVariable Long id, @RequestParam(required = false) String expression, @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "20") int pageSize) {
        Long userId = jwtService.extractUserId(authHeader.replace("Bearer ", ""));
        if (!Objects.equals(userId, id)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
        }

        Page<FollowedUser> pageResult = userService.getFollowing(id, expression, page - 1, pageSize);

        PageInfo pageInfo = new PageInfo(page, pageSize, pageResult.getTotalPages(), pageResult.getTotalElements());

        return new PaginatedResponse<FollowedUser>(pageResult.getContent(), pageInfo);
    }

    @GetMapping("/{id}/followers")
    @JsonView(Views.Public.class)
    public PaginatedResponse<FollowedUser> getFollowers(@RequestHeader("Authorization") String authHeader, @PathVariable Long id, @RequestParam(required = false) String expression, @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "20") int pageSize) {
        Long userId = jwtService.extractUserId(authHeader.replace("Bearer ", ""));
        if (!Objects.equals(userId, id)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
        }

        Page<FollowedUser> pageResult = userService.getFollowers(id, expression, page - 1, pageSize);

        PageInfo pageInfo = new PageInfo(page, pageSize, pageResult.getTotalPages(), pageResult.getTotalElements());

        return new PaginatedResponse<FollowedUser>(pageResult.getContent(), pageInfo);
    }

    @GetMapping("/{id}/notifications")
    public PaginatedResponse<Notification> getNotifications(@PathVariable Long id, @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "20") int pageSize) {
        Page<Notification> pageResult = userService.getNotifications(id, page - 1, pageSize);

        PageInfo pageInfo = new PageInfo(page, pageSize, pageResult.getTotalPages(), pageResult.getTotalElements());

        return new PaginatedResponse<Notification>(pageResult.getContent(), pageInfo);
    }

    @GetMapping("/{id}/my-events")
    public PaginatedResponse<EventDto> getMyEvents(@RequestHeader("Authorization") String authHeader, @PathVariable Long id, @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "20") int pageSize, @RequestParam(required = false) Boolean important, @RequestParam(required = false) Boolean owned) {
        Long userId = jwtService.extractUserId(authHeader.replace("Bearer ", ""));
        if (!Objects.equals(userId, id)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
        }

        Page<EventDto> pageResult = userService.getMyEvents(id, page - 1, pageSize, important, owned);

        PageInfo pageInfo = new PageInfo(page, pageSize, pageResult.getTotalPages(), pageResult.getTotalElements());

        return new PaginatedResponse<EventDto>(pageResult.getContent(), pageInfo);
    }

    @GetMapping("/{id}/foreign-events")
    public PaginatedResponse<EventDto> getForeignEvents(@PathVariable Long id, @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "20") int pageSize, @RequestParam(required = false) Boolean important) {
        Page<EventDto> pageResult = userService.getForeignEvents(id, page - 1, pageSize, important);

        PageInfo pageInfo = new PageInfo(page, pageSize, pageResult.getTotalPages(), pageResult.getTotalElements());

        return new PaginatedResponse<EventDto>(pageResult.getContent(), pageInfo);
    }

    @PostMapping("/{id}/add-friend")
    @JsonView(Views.Public.class)
    public ResponseEntity<User> sendFriendRequest(@PathVariable Long id, @RequestBody FriendRequest friendRequest) {
        User followedUser = userService.followUser(id, friendRequest);
        return ResponseEntity.ok(followedUser);
    }

    @DeleteMapping("/{id}/remove-friend/{friendId}")
    public ResponseEntity<?> removeFriend(@RequestHeader("Authorization") String authHeader, @PathVariable Long id, @PathVariable Long friendId) {
        Long userId = jwtService.extractUserId(authHeader.replace("Bearer ", ""));
        if (!Objects.equals(userId, id)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
        }

        userService.unfollowUser(id, friendId);
        return ResponseEntity.ok(friendId);
    }

    @DeleteMapping("/{id}/remove-follower/{followerId}")
    public ResponseEntity<?> removeFollower(@RequestHeader("Authorization") String authHeader, @PathVariable Long id, @PathVariable Long followerId) {
        Long userId = jwtService.extractUserId(authHeader.replace("Bearer ", ""));
        if (!Objects.equals(userId, id)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
        }

        userService.deleteFollower(id, followerId);

        return ResponseEntity.ok(followerId);
    }

    @PutMapping("/pin-followed")
    public ResponseEntity<FollowedUser> pinFollower(@RequestBody PinFollowerRequest request) {
        FollowedUser user = userService.pinFollower(request);
        return ResponseEntity.ok(user);
    }

    @PutMapping("{id}/edit-profile")
    public User editProfile(@RequestHeader("Authorization") String authHeader, @PathVariable Long id, @RequestBody @Valid UserEditProfile user) {
        Long userId = jwtService.extractUserId(authHeader.replace("Bearer ", ""));
        if (!Objects.equals(userId, id)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
        }

        return userService.editProfile(id, user);
    }

    @PutMapping("{id}/change-password")
    public ResponseEntity<?> changePassword(@RequestHeader("Authorization") String authHeader, @PathVariable Long id, @RequestBody @Valid ChangePassword changePassword) {
        Long userId = jwtService.extractUserId(authHeader.replace("Bearer ", ""));
        if (!Objects.equals(userId, id)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
        }

        userService.changePassword(id, changePassword);
        return ResponseEntity.ok().build();
    }
}