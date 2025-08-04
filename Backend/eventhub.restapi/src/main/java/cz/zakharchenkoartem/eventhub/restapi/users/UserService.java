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
import cz.zakharchenkoartem.eventhub.restapi.users.dto.FriendRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class UserService {

    private final UsersDataSource usersDataSource;
    private final FollowRelationsDataSource followersDataSource;
    private final NotificationsDataSource notificationsDataSource;
    private final EventsParticipantsDataSource eventsParticipantsDataSource;
    private final FollowRelationsDataSource followRelationsDataSource;

    @Autowired
    public UserService(
            UsersDataSource usersDataSource,
            FollowRelationsDataSource followersDataSource,
            NotificationsDataSource notificationsDataSource,
            EventsParticipantsDataSource eventsParticipantsDataSource, FollowRelationsDataSource followRelationsDataSource) {
        this.usersDataSource = usersDataSource;
        this.followersDataSource = followersDataSource;
        this.notificationsDataSource = notificationsDataSource;
        this.eventsParticipantsDataSource = eventsParticipantsDataSource;
        this.followRelationsDataSource = followRelationsDataSource;
    }

    @Transactional(readOnly = true)
    public List<User> getUsers() {
        return usersDataSource.findAll();
    }

    @Transactional(readOnly = true)
    public Page<User> getUsersByName(String name, int page, int pageSize) {
        Pageable pageable = PageRequest.of(page, pageSize);

        return usersDataSource.findAllByUsernameContainingIgnoreCase(name, pageable);
    }

    @Transactional(readOnly = true)
    public User getUser(Long id) {
        return usersDataSource.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Transactional(readOnly = true)
    public Page<FollowedUser> getFollowing(Long id, String expression, int page, int pageSize) {
        User user = getUser(id);
        Page<FollowRelation> followRelations;

        Pageable pageable = PageRequest.of(page, pageSize);

        if (expression != null && !expression.isBlank()) {
            followRelations = followersDataSource.findByFollowerAndUsernameLike(user, expression, pageable);
        } else {
            followRelations = followersDataSource.findByFollower(user, pageable);
        }

        List<FollowedUser> followedUsers = new ArrayList<>();
        for (FollowRelation relation : followRelations) {
            followedUsers.add(new FollowedUser(relation.getFollowedUser(), relation.isFavorite()));
        }

        return new PageImpl<>(followedUsers, pageable, followRelations.getTotalElements());
    }

    @Transactional(readOnly = true)
    public Page<Notification> getNotifications(Long id, int size, int pageSize) {
        User user = getUser(id);

        Pageable pageable = PageRequest.of(pageSize, size);

        return notificationsDataSource.findByUser(user, pageable);
    }

    @Transactional(readOnly = true)
    public Page<Event> getMyEvents(Long id, int page, int pageSize, Boolean important, Boolean owned) {
        User user = getUser(id);

        Pageable pageable = PageRequest.of(page, pageSize);

        Page<EventParticipantRelation> participantRelations = eventsParticipantsDataSource.findByUserOrdered(user, important, owned, pageable);

        List<Event> events = new ArrayList<>();

        for (EventParticipantRelation relation : participantRelations) {
            events.add(relation.getEvent());
        }

        return new PageImpl<Event>(events, pageable, participantRelations.getTotalElements());
    }

    @Transactional(readOnly = true)
    public Page<Event> getForeignEvents(Long id, int page, int pageSize, Boolean important) {
        User user = getUser(id);

        Pageable pageable = PageRequest.of(page, pageSize);

        Page<EventParticipantRelation> participantRelations = eventsParticipantsDataSource.findByUserOrdered(user, important, null, pageable);

        List<Event> events = new ArrayList<>();
        for (EventParticipantRelation relation : participantRelations) {
            if (relation.getEvent().isPublic()) {
                events.add(relation.getEvent());
            }
        }

        return new PageImpl<Event>(events, pageable, participantRelations.getTotalElements());
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

        if (relation == null) {
            relation = new FollowRelation();
            relation.setId(new FollowRelationId(request.getFollowerId(), request.getFollowedUserId()));
            relation.setFollower(follower);
            relation.setFollowedUser(followed);
            relation.setFavorite(request.isPinned());
            relation.setCreatedAt(LocalDateTime.now());
        } else {
            relation.setFavorite(request.isPinned());
        }

        followersDataSource.save(relation);

        return new FollowedUser(followed, request.isPinned());
    }

    @Transactional
    public User followUser(Long followerId, FriendRequest friendRequest) {
        User user = getUser(followerId);
        User followedUser = getUser(friendRequest.getFollowedUserId());

        if (!followedUser.getFollowToken().equals(friendRequest.getFollowToken())) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Wrong follow token");
        }

        if (followersDataSource.findByFollowedUserIdAndFollowerId(followedUser.getId(), followerId).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "You already follow this user");
        }

        FollowRelation relation = new FollowRelation();
        relation.setId(new FollowRelationId(followerId, followedUser.getId()));
        relation.setFollowedUser(followedUser);
        relation.setFollower(user);

        followersDataSource.save(relation);

        return followedUser;
    }

    @Transactional
    public void unfollowUser(Long followerId, Long followedUserId) {
        FollowRelation followRelation = followersDataSource.findByFollowedUserIdAndFollowerId(followedUserId, followerId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "You do not follow this user"));

        followersDataSource.delete(followRelation);
    }

    @Transactional
    public void deleteFollower(Long userId, Long followerId) {
        FollowRelation followRelation = followersDataSource.findByFollowedUserIdAndFollowerId(userId, followerId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "You do not follow this user"));

        followersDataSource.delete(followRelation);
    }
}