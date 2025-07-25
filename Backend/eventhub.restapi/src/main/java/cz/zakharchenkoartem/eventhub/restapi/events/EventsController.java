package cz.zakharchenkoartem.eventhub.restapi.events;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/events")
public class EventsController {

    EventsDataSource eventsDataSource;

    @Autowired
    public EventsController(EventsDataSource eventsDataSource) {
        this.eventsDataSource = eventsDataSource;
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

}
