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
    private final EventsDataSource eventsDataSource;
    UsersDataSource usersDataSource;

    FollowRelationsDataSource followersDataSource;

    NotificationsDataSource notificationsDataSource;

    EventsParticipantsDataSource eventsParticipantsDataSource;

    @Autowired
    public UsersController(UsersDataSource usersDataSource, FollowRelationsDataSource followersDataSource, NotificationsDataSource notificationsDataSource, EventsParticipantsDataSource eventsParticipantsDataSource, EventsDataSource eventsDataSource) {
        this.usersDataSource = usersDataSource;
        this.followersDataSource = followersDataSource;
        this.notificationsDataSource = notificationsDataSource;
        this.eventsParticipantsDataSource = eventsParticipantsDataSource;
        this.eventsDataSource = eventsDataSource;
    }

    @GetMapping
    public List<User> getUsers() {
        return usersDataSource.findAll();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return getUserFromDataSource(id);
    }

    @GetMapping("/{id}/following")
    public List<User> getFollowers(@PathVariable Long id) {
        User user = getUserFromDataSource(id);
        List<FollowRelation> followRelations = followersDataSource.findByFollower(user);

        List<User> followedUsers = new ArrayList<User>();

        for (FollowRelation relation : followRelations) {
            followedUsers.add(relation.getFollowedUser());
        }

        return followedUsers;
    }

    @GetMapping("{id}/notifications")
    public List<Notification> getNotifications(@PathVariable Long id) {
        User user = getUserFromDataSource(id);

        return notificationsDataSource.findByUser(user);
    }

    @GetMapping("{id}/my-events")
    public List<Event> getMyEvents(@PathVariable Long id) {
        User user = getUserFromDataSource(id);

        List<EventParticipantRelation> participantRelations = eventsParticipantsDataSource.findByUser(user);
        List<Event> events = new ArrayList<>();

        for (EventParticipantRelation relation : participantRelations) {
            events.add(relation.getEvent());
        }

        return events;
    }

    @GetMapping("{id}/foreign-events")
    public List<Event> getForeignEvents(@PathVariable Long id) {
        User user = getUserFromDataSource(id);

        return eventsDataSource.findAllByOwnerIdAndIsPublic(id, true);
    }

    private User getUserFromDataSource(Long id) {
        Optional<User> user = usersDataSource.findById(id);

        if (user.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        return user.get();
    }
}
