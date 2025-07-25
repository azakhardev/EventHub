package cz.zakharchenkoartem.eventhub.restapi.users;

import cz.zakharchenkoartem.eventhub.restapi.events.Event;
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
    UsersDataSource usersDataSource;

    FollowRelationsDataSource followersDataSource;

    NotificationsDataSource notificationsDataSource;

    EventsParticipantsDataSource eventsParticipantsDataSource;

    @Autowired
    public UsersController(UsersDataSource usersDataSource, FollowRelationsDataSource followersDataSource, NotificationsDataSource notificationsDataSource, EventsParticipantsDataSource eventsParticipantsDataSource) {
        this.usersDataSource = usersDataSource;
        this.followersDataSource = followersDataSource;
        this.notificationsDataSource = notificationsDataSource;
        this.eventsParticipantsDataSource = eventsParticipantsDataSource;
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

    @GetMapping("/{id}/following")
    public List<User> getFollowers(@PathVariable Long id) {
        Optional<User> user = usersDataSource.findById(id);

        if (user.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        List<FollowRelation> followRelations = followersDataSource.findByFollower(user.get());

        List<User> followedUsers = new ArrayList<User>();

        for (FollowRelation relation : followRelations) {
            followedUsers.add(relation.getFollowedUser());
        }

        return followedUsers;
    }

    @GetMapping("{id}/notifications")
    public List<Notification> getNotifications(@PathVariable Long id) {
        Optional<User> user = usersDataSource.findById(id);

        if (user.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        return notificationsDataSource.findByUser(user.get());
    }

    @GetMapping("{id}/foreignEvents")
    public List<Event> getForeignEvents(@PathVariable Long id) {
        Optional<User> user = usersDataSource.findById(id);

        if (user.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        List<EventParticipantRelation> participantRelations = eventsParticipantsDataSource.findByUser(user.get());
        List<Event> events = new ArrayList<>();

        for (EventParticipantRelation relation : participantRelations) {
            events.add(relation.getEvent());
        }

        return events;
    }
}
