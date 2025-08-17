package cz.zakharchenkoartem.eventhub.restapi.events;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class EventCleanupScheduler {

    private final EventService eventService;

    public EventCleanupScheduler(EventService eventService) {
        this.eventService = eventService;
    }

    @Scheduled(cron = "0 0 0 * * *")
    public void deleteOldEvents() {
        eventService.deleteOldEvents();
    }
}