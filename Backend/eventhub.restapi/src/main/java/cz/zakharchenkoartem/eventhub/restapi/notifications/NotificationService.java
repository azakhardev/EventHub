package cz.zakharchenkoartem.eventhub.restapi.notifications;

import cz.zakharchenkoartem.eventhub.restapi.events.Event;
import cz.zakharchenkoartem.eventhub.restapi.events.EventsDataSource;
import cz.zakharchenkoartem.eventhub.restapi.events.dto.EventDto;
import cz.zakharchenkoartem.eventhub.restapi.events.dto.InvitationResponse;
import cz.zakharchenkoartem.eventhub.restapi.events_participants.EventParticipantId;
import cz.zakharchenkoartem.eventhub.restapi.events_participants.EventParticipantRelation;
import cz.zakharchenkoartem.eventhub.restapi.events_participants.EventsParticipantsDataSource;
import cz.zakharchenkoartem.eventhub.restapi.follows.FollowRelation;
import cz.zakharchenkoartem.eventhub.restapi.follows.FollowRelationsDataSource;
import cz.zakharchenkoartem.eventhub.restapi.users.User;
import cz.zakharchenkoartem.eventhub.restapi.users.UsersDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class NotificationService {
    private final FollowRelationsDataSource followRelationsDataSource;
    NotificationsDataSource notificationsDataSource;
    EventsDataSource eventsDataSource;
    UsersDataSource usersDataSource;
    EventsParticipantsDataSource eventsParticipantsDataSource;

    @Autowired
    public NotificationService(NotificationsDataSource notificationsDataSource, EventsDataSource eventsDataSource, UsersDataSource usersDataSource, EventsParticipantsDataSource eventsParticipantsDataSource, FollowRelationsDataSource followRelationsDataSource) {
        this.notificationsDataSource = notificationsDataSource;
        this.eventsDataSource = eventsDataSource;
        this.usersDataSource = usersDataSource;
        this.eventsParticipantsDataSource = eventsParticipantsDataSource;
        this.followRelationsDataSource = followRelationsDataSource;
    }

    @Transactional
    public InvitationResponse inviteFriends(Long eventId, List<Long> friendsIds) {
        Event event = eventsDataSource.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        List<Long> invited = new ArrayList<>();
        List<Long> alreadyInvited = new ArrayList<>();

        for (Long friendId : friendsIds) {
            User user = usersDataSource.findById(friendId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            boolean exists = notificationsDataSource.existsByEventAndUserAndType(event, user, "INVITE");

            if (!exists) {
                Notification notification = new Notification();
                notification.setEvent(event);
                notification.setUser(user);
                notification.setType("INVITE");
                notification.setMessage("You are invited to " + event.getTitle());
                notificationsDataSource.save(notification);

                EventParticipantRelation relation = new EventParticipantRelation(new EventParticipantId(user.getId(), event.getId()), user, event, false, false);
                eventsParticipantsDataSource.save(relation);

                invited.add(friendId);
            } else {
                alreadyInvited.add(friendId);
            }
        }

        return new InvitationResponse(invited, alreadyInvited);
    }

    @Transactional
    public void deleteNotification(Long notificationId, Long userId) {
        Notification notification = notificationsDataSource.findById(notificationId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Notification does not exist"));

        if (!notification.getUser().getId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can't delete foreign notifications");
        }

        notificationsDataSource.deleteById(notificationId);
    }

    @Transactional
    public EventDto acceptInvitation(Long notificationId) {
        Notification notification = notificationsDataSource.findById(notificationId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Notification not found"));

        User user = notification.getUser();
        Event event = notification.getEvent();

        if (!"INVITE".equalsIgnoreCase(notification.getType())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Notification is not an invitation");
        }

        EventParticipantRelation relation = eventsParticipantsDataSource.findByUserAndEvent(user, event)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.CONFLICT, "No participant relation found for this invitation"));

        if (relation.isAccepted()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "You already participate in this event");
        }

        relation.setAccepted(true);
        eventsParticipantsDataSource.save(relation);

        notification.setIsRead(true);
        notificationsDataSource.save(notification);

        return new EventDto(event, false, true);
    }

    @Transactional
    public void updateStatuses(List<Long> notificationIds) {
        notificationsDataSource.markAsRead(notificationIds);
    }

    @Transactional
    public Long getNotificationsCount(Long userId) {
        return notificationsDataSource.getCountByUserId(userId);
    }

    @Transactional
    public void notifyDeletion(Event event) {
        List<EventParticipantRelation> relations = eventsParticipantsDataSource.findByEvent(event);

        List<Notification> notifications = relations.stream().map(EventParticipantRelation::getUser)
                .filter(user -> !Objects.equals(user.getId(), event.getOwner().getId()))
                .map(rel -> new Notification(rel, null, "DELETE", "Event " + event.getTitle() + " was deleted"))
                .collect(Collectors.toList());

        notificationsDataSource.saveAll(notifications);
    }

    @Transactional
    public void notifyEdit(Event event) {
        List<EventParticipantRelation> relations = eventsParticipantsDataSource.findByEvent(event);

        List<Notification> notifications = relations.stream()
                .map(EventParticipantRelation::getUser)
                .filter(user -> !Objects.equals(user.getId(), event.getOwner().getId()))
                .map(user -> new Notification(user, event, "UPDATE", "Information about event " + event.getTitle() + " was changed, please check new details"))
                .collect(Collectors.toList());

        notificationsDataSource.saveAll(notifications);
    }

    @Transactional
    public void notifyCreation(User user, Event event) {
        List<FollowRelation> followers = followRelationsDataSource.findAllByFollowedUser(user);

        List<Notification> notifications = followers.stream()
                .map(fol -> new Notification(fol.getFollower(), event, "CREATE", "User " + user.getNickname() + " created a new event " + event.getTitle()))
                .collect(Collectors.toList());

        notificationsDataSource.saveAll(notifications);
    }
}
