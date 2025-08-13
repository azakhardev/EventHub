package cz.zakharchenkoartem.eventhub.restapi.events;

import cz.zakharchenkoartem.eventhub.restapi.events.dto.CRUDEventDto;
import cz.zakharchenkoartem.eventhub.restapi.events_participants.EventParticipantId;
import cz.zakharchenkoartem.eventhub.restapi.events_participants.EventParticipantRelation;
import cz.zakharchenkoartem.eventhub.restapi.events_participants.EventsParticipantsDataSource;
import cz.zakharchenkoartem.eventhub.restapi.users.User;
import cz.zakharchenkoartem.eventhub.restapi.users.UserService;
import org.springframework.data.domain.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class EventService {
    EventsDataSource eventsDataSource;
    UserService userService;

    EventsParticipantsDataSource eventsParticipantsDataSource;

    @Autowired
    public EventService(EventsDataSource eventsDataSource, EventsParticipantsDataSource eventsParticipantsDataSource, UserService userService) {
        this.eventsDataSource = eventsDataSource;
        this.eventsParticipantsDataSource = eventsParticipantsDataSource;
        this.userService = userService;
    }

    @Transactional(readOnly = true)
    public Page<Event> getEvents(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        return eventsDataSource.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Event getEvent(Long id) {
        Optional<Event> event = eventsDataSource.findById(id);

        if (event.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Event not found");
        }

        return event.get();
    }

    @Transactional(readOnly = true)
    public Page<User> getEventParticipants(Long id, int page, int pageSize) {
        Event event = getEvent(id);

        Pageable pageable = PageRequest.of(page, pageSize);

        Page<EventParticipantRelation> participantRelations = eventsParticipantsDataSource.findByEvent(event, pageable);
        List<User> user = new ArrayList<>();

        for (EventParticipantRelation relation : participantRelations) {
            if (relation.isAccepted()) {
                user.add(relation.getUser());
            }
        }

        return new PageImpl<>(user, pageable, participantRelations.getTotalElements());
    }

    @Transactional
    public void deleteExpiredEvents() {
        LocalDateTime now = LocalDateTime.now();
        eventsDataSource.deleteOldEvents(now);
    }

    @Transactional
    public Event createEvent(CRUDEventDto event, User owner) {
        Event newEvent = new Event(event.getTitle(), event.getBody(), owner, event.getStartTime(), event.getEndTime(), event.getPlace(), event.getCategory(), event.getColor(), event.isPublic(), event.getRecurrence(), event.getRecurrenceEndDate());

        return  eventsDataSource.save(newEvent);
    }

    @Transactional
    public Event editEvent(Event existingEvent, CRUDEventDto event) {
        existingEvent.setTitle(event.getTitle());
        existingEvent.setBody(event.getBody());
        existingEvent.setStartTime(event.getStartTime());
        existingEvent.setEndTime(event.getEndTime());
        existingEvent.setPlace(event.getPlace());
        existingEvent.setCategory(event.getCategory());
        existingEvent.setColor(event.getColor());
        existingEvent.setPublic(event.isPublic());
        existingEvent.setRecurrence(event.getRecurrence());
        existingEvent.setRecurrenceEndDate(event.getRecurrenceEndDate());

        return eventsDataSource.save(existingEvent);
    }

    @Transactional
    public void deleteEvent(Long eventId) {
        eventsDataSource.deleteById(eventId);
    }

    @Transactional
    public void joinEvent(Long eventId, String token, Long userId) {
        Event event = getEvent(eventId);
        User user = userService.getUser(userId);

        if (!event.isPublic() && (token == null || token.isEmpty())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Please provide a token");
        }

        boolean exists = eventsParticipantsDataSource.existsByUserAndEvent(user, event);
        if (exists) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User already participates in this event");
        }

        if (!event.isPublic() && !Objects.equals(token, event.getLinkToken().toString())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Incorrect token");
        }

        EventParticipantRelation relation = new EventParticipantRelation(
                new EventParticipantId(userId, eventId),
                user,
                event,
                true,
                false
        );

        eventsParticipantsDataSource.save(relation);
    }

}
