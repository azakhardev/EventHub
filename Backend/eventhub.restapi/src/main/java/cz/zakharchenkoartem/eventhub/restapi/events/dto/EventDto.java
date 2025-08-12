package cz.zakharchenkoartem.eventhub.restapi.events.dto;

import cz.zakharchenkoartem.eventhub.restapi.events.Event;
import cz.zakharchenkoartem.eventhub.restapi.users.User;

import java.time.LocalDateTime;
import java.util.Date;

public class EventDto extends Event {
    private boolean important;
    private boolean participates;

    public EventDto(Event event, boolean important,  boolean participates) {
        super(event.getId(), event.getTitle(), event.getBody(), event.getOwner(), event.getCreationDate(), event.getStartTime(), event.getEndTime(), event.getPlace(), event.getCategory(), event.getColor(), event.isPublic(), event.getLinkToken(), event.getRecurrence(), event.getRecurrenceEndDate());
        this.important = important;
        this.participates = participates;
    }

    public boolean isImportant() {
        return important;
    }

    public void setImportant(boolean important) {
        this.important = important;
    }

    public boolean isParticipates() {
        return participates;
    }

    public void setParticipates(boolean participates) {
        this.participates = participates;
    }
}
