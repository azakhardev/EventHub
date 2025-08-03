package cz.zakharchenkoartem.eventhub.restapi.events;

import cz.zakharchenkoartem.eventhub.restapi.events_participants.EventParticipantRelation;
import cz.zakharchenkoartem.eventhub.restapi.events_participants.EventsParticipantsDataSource;
import cz.zakharchenkoartem.eventhub.restapi.users.User;
import org.springframework.data.domain.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {
    EventsDataSource eventsDataSource;

    EventsParticipantsDataSource eventsParticipantsDataSource;

    @Autowired
    public EventService(EventsDataSource eventsDataSource, EventsParticipantsDataSource eventsParticipantsDataSource) {
        this.eventsDataSource = eventsDataSource;
        this.eventsParticipantsDataSource = eventsParticipantsDataSource;
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
            throw new RuntimeException("Event not found");
        }

        return event.get();
    }

    @Transactional(readOnly = true)
    public Page<User> getEventParticipants(Long id, int page, int pageSize) {
        Optional<Event> event = eventsDataSource.findById(id);

        if (event.isEmpty()) {
            throw new RuntimeException("Event not found");
        }

        Pageable pageable = PageRequest.of(page, pageSize);

        Page<EventParticipantRelation> participantRelations = eventsParticipantsDataSource.findByEvent(event.get(), pageable );
        List<User> user = new ArrayList<>();

        for (EventParticipantRelation relation : participantRelations) {
            if(relation.isAccepted()) {
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
    public void deleteEvent(Long eventId) {
        eventsDataSource.deleteById(eventId);
    }

}
