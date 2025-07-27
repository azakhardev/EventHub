package cz.zakharchenkoartem.eventhub.restapi.users;

import cz.zakharchenkoartem.eventhub.restapi.events.Event;
import cz.zakharchenkoartem.eventhub.restapi.events.EventsDataSource;
import cz.zakharchenkoartem.eventhub.restapi.events_participants.EventParticipantRelation;
import cz.zakharchenkoartem.eventhub.restapi.events_participants.EventsParticipantsDataSource;
import cz.zakharchenkoartem.eventhub.restapi.follows.FollowRelation;
import cz.zakharchenkoartem.eventhub.restapi.follows.FollowRelationsDataSource;
import cz.zakharchenkoartem.eventhub.restapi.notifications.Notification;
import cz.zakharchenkoartem.eventhub.restapi.notifications.NotificationsDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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
    public List<User> getFollowers(@PathVariable Long id) {
        return userService.getFollowing(id);
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
}