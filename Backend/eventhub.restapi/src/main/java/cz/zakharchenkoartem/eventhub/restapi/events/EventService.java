package cz.zakharchenkoartem.eventhub.restapi.events;

import cz.zakharchenkoartem.eventhub.restapi.events_participants.EventParticipantRelation;
import cz.zakharchenkoartem.eventhub.restapi.events_participants.EventsParticipantsDataSource;
import cz.zakharchenkoartem.eventhub.restapi.users.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public List<Event> getEvents() {
        return eventsDataSource.findAll();
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
    public List<User> getEventParticipants(Long id) {
        Optional<Event> event = eventsDataSource.findById(id);

        if (event.isEmpty()) {
            throw new RuntimeException("Event not found");
        }

        List<EventParticipantRelation> participantRelations = eventsParticipantsDataSource.findByEvent(event.get());
        List<User> user = new ArrayList<>();

        for (EventParticipantRelation relation : participantRelations) {
            if(relation.isAccepted()) {
                user.add(relation.getUser());
            }
        }

        return user;
    }
}
