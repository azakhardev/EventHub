package cz.zakharchenkoartem.eventhub.restapi.notifications;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class NotificationsController {

    private final NotificationService notificationService;


    @Autowired
    public NotificationsController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PutMapping
    public ResponseEntity<Void> updateNotificationsStatuses(@RequestBody List<Long> notificationIds) {
        notificationService.updateStatuses(notificationIds);
        return ResponseEntity.ok().build();
    }
}
