package cz.zakharchenkoartem.eventhub.restapi.notifications;

import cz.zakharchenkoartem.eventhub.restapi.events.dto.EventDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationsController {

    private final NotificationService notificationService;


    @Autowired
    public NotificationsController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping("/{id}/accept")
    public ResponseEntity<EventDto> acceptInvitation(@PathVariable Long id){
        EventDto event = notificationService.acceptInvitation(id);

        return ResponseEntity.ok(event);
    }

    @PutMapping("/update-status")
    public ResponseEntity<Void> updateNotificationsStatuses(@RequestBody List<Long> notificationIds) {
        notificationService.updateStatuses(notificationIds);
        return ResponseEntity.ok().build();
    }
}
