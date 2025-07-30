package cz.zakharchenkoartem.eventhub.restapi.events;

import cz.zakharchenkoartem.eventhub.restapi.events.dto.InvitationResponse;
import cz.zakharchenkoartem.eventhub.restapi.events_participants.EventParticipantRelation;
import cz.zakharchenkoartem.eventhub.restapi.events_participants.EventsParticipantsDataSource;
import cz.zakharchenkoartem.eventhub.restapi.notifications.NotificationService;
import cz.zakharchenkoartem.eventhub.restapi.users.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
public class EventsController {

    EventService eventService;
    NotificationService notificationsService;

    @Autowired
    public EventsController(EventService eventService, NotificationService notificationsService) {
        this.eventService = eventService;
        this.notificationsService = notificationsService;
    }

    @GetMapping
    public List<Event> getEvents() {
        return eventService.getEvents();
    }

    @GetMapping("{id}")
    public Event getEvent(@PathVariable Long id) {
        return eventService.getEvent(id);
    }

    @GetMapping("{id}/participants")
    public List<User> getParticipatedUsers(@PathVariable Long id) {
        return eventService.getEventParticipants(id);
    }

    @PostMapping("/{id}/invite")
    public ResponseEntity<InvitationResponse> inviteFriends(
            @PathVariable Long id,
            @RequestBody List<Long> participantsIds
    ) {
        InvitationResponse response = notificationsService.inviteFriends(id, participantsIds);
        return ResponseEntity.ok(response);
    }

}
