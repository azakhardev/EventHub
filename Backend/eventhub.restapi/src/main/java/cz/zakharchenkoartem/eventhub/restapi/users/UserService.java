package cz.zakharchenkoartem.eventhub.restapi.users;

import cz.zakharchenkoartem.eventhub.restapi.events.Event;
import cz.zakharchenkoartem.eventhub.restapi.events_participants.EventParticipantRelation;
import cz.zakharchenkoartem.eventhub.restapi.events_participants.EventsParticipantsDataSource;
import cz.zakharchenkoartem.eventhub.restapi.follows.FollowRelation;
import cz.zakharchenkoartem.eventhub.restapi.follows.FollowRelationId;
import cz.zakharchenkoartem.eventhub.restapi.follows.FollowRelationsDataSource;
import cz.zakharchenkoartem.eventhub.restapi.follows.dto.PinFollowerRequest;
import cz.zakharchenkoartem.eventhub.restapi.notifications.Notification;
import cz.zakharchenkoartem.eventhub.restapi.notifications.NotificationsDataSource;

import cz.zakharchenkoartem.eventhub.restapi.users.dto.FollowedUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    public List<FollowedUser> getFollowing(Long id, String expression) {
        User user = getUser(id);
        List<FollowRelation> followRelations;

        if (expression != null && !expression.isBlank()) {
            followRelations = followersDataSource.findByFollowerAndUsernameLike(user, expression);
        } else {
            followRelations = followersDataSource.findByFollower(user);
        }

        List<FollowedUser> followedUsers = new ArrayList<>();
        for (FollowRelation relation : followRelations) {
            followedUsers.add(new FollowedUser(relation.getFollowedUser(), relation.isFavorite()));
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

    @Transactional
    public FollowedUser pinFollower(PinFollowerRequest request) {
        User follower = usersDataSource.findById(request.getFollowerId())
                .orElseThrow(() -> new RuntimeException("User (follower) not found"));
        User followed = usersDataSource.findById(request.getFollowedUserId())
                .orElseThrow(() -> new RuntimeException("Followed user not found"));

        FollowRelation relation = followersDataSource
                .findByFollowedUserIdAndFollowerId(request.getFollowedUserId(), request.getFollowerId())
                .orElse(null);

        if(relation == null) {
            relation = new FollowRelation();
            relation.setId(new FollowRelationId(request.getFollowerId(), request.getFollowedUserId()));
            relation.setFollower(follower);
            relation.setFollowedUser(followed);
            relation.setFavorite(request.isPinned());
            relation.setCreatedAt(LocalDateTime.now());
        }else{
            relation.setFavorite(request.isPinned());
        }

        followersDataSource.save(relation);

        return new FollowedUser(followed, request.isPinned());
    }
}