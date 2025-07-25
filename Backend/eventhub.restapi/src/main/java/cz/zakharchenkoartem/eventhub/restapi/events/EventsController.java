package cz.zakharchenkoartem.eventhub.restapi.events;

import cz.zakharchenkoartem.eventhub.restapi.events_participants.EventParticipantRelation;
import cz.zakharchenkoartem.eventhub.restapi.events_participants.EventsParticipantsDataSource;
import cz.zakharchenkoartem.eventhub.restapi.users.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/events")
public class EventsController {

    EventsDataSource eventsDataSource;

    EventsParticipantsDataSource eventsParticipantsDataSource;

    @Autowired
    public EventsController(EventsDataSource eventsDataSource, EventsParticipantsDataSource eventsParticipantsDataSource) {
        this.eventsDataSource = eventsDataSource;
        this.eventsParticipantsDataSource = eventsParticipantsDataSource;
    }

    @GetMapping
    public List<Event> getEvents() {
        return eventsDataSource.findAll();
    }

    @GetMapping("{id}")
    public Event getEvent(@PathVariable Long id) {
        Optional<Event> event = eventsDataSource.findById(id);

        if (event.isEmpty()) {
            throw new RuntimeException("Event not found");
        }

        return event.get();
    }

    @GetMapping("{id}/participants")
    public List<User> getParticipatedUsers(@PathVariable Long id) {
        Optional<Event> event = eventsDataSource.findById(id);

        if (event.isEmpty()) {
            throw new RuntimeException("Event not found");
        }

        List<EventParticipantRelation> participantRelations = eventsParticipantsDataSource.findByEvent(event.get());
        List<User> user = new ArrayList<>();

        for (EventParticipantRelation relation : participantRelations) {
            user.add(relation.getUser());
        }

        return user;
    }

}
