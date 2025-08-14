package cz.zakharchenkoartem.eventhub.restapi.notifications;

import cz.zakharchenkoartem.eventhub.restapi.events.Event;
import cz.zakharchenkoartem.eventhub.restapi.events.EventsDataSource;
import cz.zakharchenkoartem.eventhub.restapi.events.dto.InvitationResponse;
import cz.zakharchenkoartem.eventhub.restapi.events_participants.EventParticipantRelation;
import cz.zakharchenkoartem.eventhub.restapi.events_participants.EventsParticipantsDataSource;
import cz.zakharchenkoartem.eventhub.restapi.users.User;
import cz.zakharchenkoartem.eventhub.restapi.users.UsersDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationService {
    NotificationsDataSource notificationsDataSource;
    EventsDataSource eventsDataSource;
    UsersDataSource usersDataSource;
    EventsParticipantsDataSource eventsParticipantsDataSource;

    @Autowired
    public NotificationService(NotificationsDataSource notificationsDataSource, EventsDataSource eventsDataSource, UsersDataSource usersDataSource, EventsParticipantsDataSource eventsParticipantsDataSource) {
        this.notificationsDataSource = notificationsDataSource;
        this.eventsDataSource = eventsDataSource;
        this.usersDataSource = usersDataSource;
        this.eventsParticipantsDataSource = eventsParticipantsDataSource;
    }

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

                invited.add(friendId);
            } else {
                alreadyInvited.add(friendId);
            }
        }

        return new InvitationResponse(invited, alreadyInvited);
    }

    @Transactional
    public void notifyDeletion(Event event) {
        List<EventParticipantRelation> relations = eventsParticipantsDataSource.findByEvent(event);

        List<Notification> notifications = relations.stream()
                .map(rel -> new Notification(rel.getUser(), event, "DELETE", "Event " + event.getTitle() + " was deleted"))
                .collect(Collectors.toList());

        notificationsDataSource.saveAll(notifications);
    }

    public void notifyEdit(Event event) {

    }

    @Transactional
    public void updateStatuses(List<Long> notificationIds) {
        notificationsDataSource.markAsRead(notificationIds);
    }

    public void notifyCreation(Event event) {

    }
}
