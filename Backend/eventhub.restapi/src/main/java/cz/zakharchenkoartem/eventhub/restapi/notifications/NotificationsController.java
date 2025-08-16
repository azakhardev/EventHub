package cz.zakharchenkoartem.eventhub.restapi.notifications;

import cz.zakharchenkoartem.eventhub.restapi.events.dto.EventDto;
import cz.zakharchenkoartem.eventhub.restapi.login.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/notifications")
public class NotificationsController {

    private final NotificationService notificationService;
    private final JwtService jwtService;


    @Autowired
    public NotificationsController(NotificationService notificationService, JwtService jwtService) {
        this.notificationService = notificationService;
        this.jwtService = jwtService;
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

    @DeleteMapping("/{id}")
    public ResponseEntity<EventDto> deleteNotification(@RequestHeader("Authorization") String authHeader, @PathVariable Long id){
        Long userId = jwtService.extractUserId(authHeader.replace("Bearer ", ""));

        notificationService.deleteNotification(id, userId);

        return ResponseEntity.ok().build();
    }
}
