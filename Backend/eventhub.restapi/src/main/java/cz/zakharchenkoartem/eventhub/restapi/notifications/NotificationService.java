package cz.zakharchenkoartem.eventhub.restapi.notifications;

import cz.zakharchenkoartem.eventhub.restapi.events.Event;
import cz.zakharchenkoartem.eventhub.restapi.events.EventsDataSource;
import cz.zakharchenkoartem.eventhub.restapi.events.dto.InvitationResponse;
import cz.zakharchenkoartem.eventhub.restapi.users.User;
import cz.zakharchenkoartem.eventhub.restapi.users.UsersDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {
    NotificationsDataSource notificationsDataSource;
    EventsDataSource eventsDataSource;
    UsersDataSource usersDataSource;

    @Autowired
    public NotificationService(NotificationsDataSource notificationsDataSource, EventsDataSource eventsDataSource, UsersDataSource usersDataSource) {
        this.notificationsDataSource = notificationsDataSource;
        this.eventsDataSource = eventsDataSource;
        this.usersDataSource = usersDataSource;
    }
    public InvitationResponse inviteFriends(Long eventId, List<Long> friendsIds) {
        Event event = eventsDataSource.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        List<Long> invited = new ArrayList<>();
        List<Long> alreadyInvited = new ArrayList<>();

        for (Long friendId : friendsIds) {
            User user = usersDataSource.findById(friendId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            boolean already = notificationsDataSource.existsByEventAndUserAndType(event, user, "invite");

            if (!already) {
                Notification notification = new Notification();
                notification.setEvent(event);
                notification.setUser(user);
                notification.setType("invite");
                notification.setMessage("You are invited to " + event.getTitle());
                notificationsDataSource.save(notification);

                invited.add(friendId);
            } else {
                alreadyInvited.add(friendId);
            }
        }

        return new InvitationResponse(invited, alreadyInvited);
    }
}
