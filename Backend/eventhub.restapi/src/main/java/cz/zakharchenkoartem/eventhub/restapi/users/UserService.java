package cz.zakharchenkoartem.eventhub.restapi.users;

import cz.zakharchenkoartem.eventhub.restapi.events.Event;
import cz.zakharchenkoartem.eventhub.restapi.events_participants.EventParticipantRelation;
import cz.zakharchenkoartem.eventhub.restapi.events_participants.EventsParticipantsDataSource;
import cz.zakharchenkoartem.eventhub.restapi.follows.FollowRelation;
import cz.zakharchenkoartem.eventhub.restapi.follows.FollowRelationsDataSource;
import cz.zakharchenkoartem.eventhub.restapi.notifications.Notification;
import cz.zakharchenkoartem.eventhub.restapi.notifications.NotificationsDataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private final UsersDataSource usersDataSource;
    private final FollowRelationsDataSource followersDataSource;
    private final NotificationsDataSource notificationsDataSource;
    private final EventsParticipantsDataSource eventsParticipantsDataSource;

    @Autowired
    public UserService(
            UsersDataSource usersDataSource,
            FollowRelationsDataSource followersDataSource,
            NotificationsDataSource notificationsDataSource,
            EventsParticipantsDataSource eventsParticipantsDataSource) {
        this.usersDataSource = usersDataSource;
        this.followersDataSource = followersDataSource;
        this.notificationsDataSource = notificationsDataSource;
        this.eventsParticipantsDataSource = eventsParticipantsDataSource;
    }

    @Transactional(readOnly = true)
    public List<User> getUsers() {
        return usersDataSource.findAll();
    }

    @Transactional(readOnly = true)
    public User getUser(Long id) {
        return usersDataSource.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Transactional(readOnly = true)
    public List<User> getFollowing(Long id) {
        User user = getUser(id);
        List<FollowRelation> followRelations = followersDataSource.findByFollower(user);

        List<User> followedUsers = new ArrayList<>();
        for (FollowRelation relation : followRelations) {
            followedUsers.add(relation.getFollowedUser());
        }

        return followedUsers;
    }

    @Transactional(readOnly = true)
    public List<Notification> getNotifications(Long id) {
        User user = getUser(id);
        return notificationsDataSource.findByUser(user);
    }

    @Transactional(readOnly = true)
    public List<Event> getMyEvents(Long id) {
        User user = getUser(id);
        List<EventParticipantRelation> participantRelations = eventsParticipantsDataSource.findByUser(user);

        List<Event> events = new ArrayList<>();
        for (EventParticipantRelation relation : participantRelations) {
            events.add(relation.getEvent());
        }

        return events;
    }

    @Transactional(readOnly = true)
    public List<Event> getForeignEvents(Long id) {
        User user = getUser(id);
        List<EventParticipantRelation> participantRelations = eventsParticipantsDataSource.findByUser(user);

        List<Event> events = new ArrayList<>();
        for (EventParticipantRelation relation : participantRelations) {
            if (relation.getEvent().isPublic()) {
                events.add(relation.getEvent());
            }
        }

        return events;
    }
}