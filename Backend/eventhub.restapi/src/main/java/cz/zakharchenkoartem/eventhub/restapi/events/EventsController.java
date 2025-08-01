package cz.zakharchenkoartem.eventhub.restapi.events;

import cz.zakharchenkoartem.eventhub.restapi.dto.PageInfo;
import cz.zakharchenkoartem.eventhub.restapi.dto.PaginatedResponse;
import cz.zakharchenkoartem.eventhub.restapi.events.dto.InvitationResponse;
import cz.zakharchenkoartem.eventhub.restapi.notifications.NotificationService;
import cz.zakharchenkoartem.eventhub.restapi.users.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
    public PaginatedResponse<Event> getEvents(@RequestParam(defaultValue = "1") int page,
                                              @RequestParam(defaultValue = "20") int pageSize) {
        Page<Event> pageResult = eventService.getEvents(page - 1, pageSize);

        PageInfo pageInfo = new PageInfo(
                page,
                pageResult.getSize(),
                pageResult.getTotalPages(),
                pageResult.getTotalElements()
        );

        return new PaginatedResponse<Event>(pageResult.getContent(), pageInfo);
    }

    @GetMapping("{id}")
    public Event getEvent(@PathVariable Long id) {
        return eventService.getEvent(id);
    }

    @GetMapping("{id}/participants")
    public PaginatedResponse<User> getParticipatedUsers(@PathVariable Long id, @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "20") int pageSize) {

        Page<User> pageResult = eventService.getEventParticipants(id, page - 1, pageSize);

        PageInfo pageInfo = new PageInfo(page, pageSize, pageResult.getTotalPages(), pageResult.getTotalElements());

        return new PaginatedResponse<User>(pageResult.getContent(), pageInfo);
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
