package cz.zakharchenkoartem.eventhub.restapi.notifications;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationsController {

    private final NotificationService notificationService;


    @Autowired
    public NotificationsController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PutMapping("/update-status")
    public ResponseEntity<Void> updateNotificationsStatuses(@RequestBody List<Long> notificationIds) {
        notificationService.updateStatuses(notificationIds);
        return ResponseEntity.ok().build();
    }
}
