package cz.zakharchenkoartem.eventhub.restapi.events;

import cz.zakharchenkoartem.eventhub.restapi.events_participants.EventParticipantRelation;
import cz.zakharchenkoartem.eventhub.restapi.events_participants.EventsParticipantsDataSource;
import cz.zakharchenkoartem.eventhub.restapi.users.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/events")
public class EventsController {

    EventService eventService;

    @Autowired
    public EventsController(EventService eventService) {
        this.eventService = eventService;
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

}
