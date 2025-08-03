package cz.zakharchenkoartem.eventhub.restapi.events;

import cz.zakharchenkoartem.eventhub.restapi.dto.PageInfo;
import cz.zakharchenkoartem.eventhub.restapi.dto.PaginatedResponse;
import cz.zakharchenkoartem.eventhub.restapi.events.dto.InvitationResponse;
import cz.zakharchenkoartem.eventhub.restapi.login.JwtService;
import cz.zakharchenkoartem.eventhub.restapi.notifications.NotificationService;
import cz.zakharchenkoartem.eventhub.restapi.users.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/events")
public class EventsController {

    EventService eventService;
    NotificationService notificationsService;
    JwtService jwtService;

    @Autowired
    public EventsController(EventService eventService, NotificationService notificationsService, JwtService jwtService) {
        this.eventService = eventService;
        this.notificationsService = notificationsService;
        this.jwtService = jwtService;
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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@RequestHeader("Authorization") String authHeader, @PathVariable Long id) {
        Long userId = jwtService.extractUserId(authHeader.replace("Bearer ", ""));

        Event event = eventService.getEvent(id);

        if (!Objects.equals(userId, event.getOwner().getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
        }

        eventService.deleteEvent(id);

        return ResponseEntity.noContent().build();
    }

}
