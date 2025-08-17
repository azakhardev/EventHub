package cz.zakharchenkoartem.eventhub.restapi.events.dto;

import cz.zakharchenkoartem.eventhub.restapi.events.Event;
import cz.zakharchenkoartem.eventhub.restapi.users.User;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.Date;

public class EventDto extends Event {
    private boolean important;
    private boolean participates;

    public EventDto(Event event, boolean important, boolean participates) {
        super(event.getId(), event.getTitle(), event.getBody(), event.getOwner(), event.getCreationDate(), event.getStartTime(), event.getEndTime(), event.getPlace(), event.getCategory(), event.getColor(), event.isPublic(), event.getLinkToken(), event.getRecurrence(), event.getRecurrenceEndDate());
        this.important = important;
        this.participates = participates;
    }

    public EventDto(Long id, String title, User owner, OffsetDateTime startTime, OffsetDateTime endTime, String color, boolean important, boolean participates) {
        super(id, title, null, owner, null, startTime, endTime, null, null, color, false, null, null, null);
        this.important = important;
        this.participates = participates;
    }

    public EventDto(EventDto other, OffsetDateTime startTime, OffsetDateTime endTime) {
        super(other.getId(), other.getTitle(), other.getBody(), other.getOwner(), other.getCreationDate(), startTime, endTime, other.getPlace(), other.getCategory(), other.getColor(), other.isPublic(), other.getLinkToken(), other.getRecurrence(), other.getRecurrenceEndDate());
        this.important = other.isImportant();
        this.participates = other.isParticipates();
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
