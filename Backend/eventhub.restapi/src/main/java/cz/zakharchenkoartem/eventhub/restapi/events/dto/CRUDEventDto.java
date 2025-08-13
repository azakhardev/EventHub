package cz.zakharchenkoartem.eventhub.restapi.events.dto;

import cz.zakharchenkoartem.eventhub.restapi.events.Event;
import jakarta.persistence.*;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.context.annotation.DependsOn;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

public class CRUDEventDto {

    @NotBlank
    private String title;

    private String body;

    @NotNull
    private Long ownerId;

    @NotNull
    @Future
    private LocalDateTime startTime;

    @NotNull
    private LocalDateTime endTime;

    private String place;

    private String category;

    private String color;

    private boolean isPublic;

    private Event.RecurrenceType recurrence = Event.RecurrenceType.once;

    @Future
    private LocalDate recurrenceEndDate;

    @AssertTrue(message = "Recurrence End Date must be in the future and not null when recurrence is not 'once'")
    public boolean isRecurrenceEndDateValid() {
        if (recurrence == null || recurrence == Event.RecurrenceType.once) {
            return true;
        }
        return recurrenceEndDate != null && recurrenceEndDate.isAfter(LocalDate.now());
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public boolean isPublic() {
        return isPublic;
    }

    public void setPublic(boolean aPublic) {
        isPublic = aPublic;
    }

    public Event.RecurrenceType getRecurrence() {
        return recurrence;
    }

    public void setRecurrence(Event.RecurrenceType recurrence) {
        this.recurrence = recurrence;
    }

    public LocalDate getRecurrenceEndDate() {
        return recurrenceEndDate;
    }

    public void setRecurrenceEndDate(LocalDate recurrenceEndDate) {
        this.recurrenceEndDate = recurrenceEndDate;
    }
}
