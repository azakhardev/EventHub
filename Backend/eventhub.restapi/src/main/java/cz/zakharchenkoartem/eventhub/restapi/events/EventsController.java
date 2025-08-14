package cz.zakharchenkoartem.eventhub.restapi.events;

import cz.zakharchenkoartem.eventhub.restapi.dto.PageInfo;
import cz.zakharchenkoartem.eventhub.restapi.dto.PaginatedResponse;
import cz.zakharchenkoartem.eventhub.restapi.events.dto.*;
import cz.zakharchenkoartem.eventhub.restapi.events_participants.EventParticipantRelation;
import cz.zakharchenkoartem.eventhub.restapi.login.JwtService;
import cz.zakharchenkoartem.eventhub.restapi.notifications.NotificationService;
import cz.zakharchenkoartem.eventhub.restapi.users.User;
import cz.zakharchenkoartem.eventhub.restapi.users.UserService;
import jakarta.validation.Valid;
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

    private final UserService userService;
    EventService eventService;
    NotificationService notificationsService;
    JwtService jwtService;

    @Autowired
    public EventsController(EventService eventService, NotificationService notificationsService, JwtService jwtService, UserService userService) {
        this.eventService = eventService;
        this.notificationsService = notificationsService;
        this.jwtService = jwtService;
        this.userService = userService;
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

    @PostMapping("/{id}/join")
    public ResponseEntity<Void> joinEvent(@PathVariable Long id, @RequestBody JoinEventRequestBody body){
        eventService.joinEvent(id, body.getToken(), body.getUserId());

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}/leave")
    public ResponseEntity<Void> leaveEvent(@PathVariable Long id, @RequestParam Long userId){
        eventService.leaveEvent(id, userId);

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/create")
    public ResponseEntity<Event> createEvent(@RequestHeader("Authorization") String authHeader, @Valid @RequestBody CRUDEventDto event) {
        Long userId = jwtService.extractUserId(authHeader.replace("Bearer ", ""));

        if (!Objects.equals(userId, event.getOwnerId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
        }
        User owner = userService.getUser(event.getOwnerId());

        Event createdEvent = eventService.createEvent(event, owner);

        return new ResponseEntity<>(createdEvent, HttpStatus.CREATED);
    }

    @PutMapping("/{id}/edit")
    public ResponseEntity<Event> editEvent(@RequestHeader("Authorization") String authHeader, @PathVariable Long id, @Valid @RequestBody CRUDEventDto event) {
        Long userId = jwtService.extractUserId(authHeader.replace("Bearer ", ""));

        if (!Objects.equals(userId, event.getOwnerId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
        }

        Event existingEvent = getEvent(id);
        Event e = eventService.editEvent(existingEvent, event);

        return ResponseEntity.ok(e);
    }

    @PutMapping("/{id}/important")
    public ResponseEntity<EventParticipantRelation> toggleImportant(@RequestHeader("Authorization") String authHeader, @PathVariable Long id, @RequestBody ToggleImportantRequestBody body) {
        Long userId = jwtService.extractUserId(authHeader.replace("Bearer ", ""));

        if (!Objects.equals(userId, body.getUserId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
        }

        EventParticipantRelation e = eventService.toggleImportant(id, body);

        return ResponseEntity.ok(e);
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