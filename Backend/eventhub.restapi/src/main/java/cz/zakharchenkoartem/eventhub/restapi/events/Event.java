package cz.zakharchenkoartem.eventhub.restapi.events;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import cz.zakharchenkoartem.eventhub.restapi.events_participants.EventParticipantRelation;
import cz.zakharchenkoartem.eventhub.restapi.notifications.Notification;
import cz.zakharchenkoartem.eventhub.restapi.users.User;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.UUID;


@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String body;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false, foreignKey = @ForeignKey(name = "fk_event_owner"))
    @JsonIgnoreProperties("events")
    private User owner;

    @Column(name = "creation_date", updatable = false, insertable = false)
    private OffsetDateTime creationDate;

    @Column(name = "start_time", nullable = false)
    private OffsetDateTime startTime;

    @Column(name = "end_time", nullable = false)
    private OffsetDateTime endTime;

    private String place;

    private String category;

    private String color;

    @Column(name = "public", nullable = false)
    private boolean isPublic = true;

    @Column(name = "link_token", columnDefinition = "UUID DEFAULT gen_random_uuid()", updatable = false, insertable = false)
    private UUID linkToken;

    @JsonIgnore
    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EventParticipantRelation> participants;

    @JsonIgnore
    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Notification> notifications;

    @Enumerated(EnumType.STRING)
    private RecurrenceType recurrence = RecurrenceType.once;

    @Column(name = "recurrence_end_date" )
    private OffsetDateTime recurrenceEndDate;

    public enum RecurrenceType {
        once,
        weekly,
        biweekly,
        monthly,
        quarterly,
        yearly
    }

    public Event() {
    }

    public Event(String title, String body, User owner, OffsetDateTime startTime, OffsetDateTime endTime, String place, String category, String color, boolean isPublic, RecurrenceType recurrence, OffsetDateTime recurrenceEndDate) {
        this.title = title;
        this.body = body;
        this.owner = owner;
        this.startTime = startTime;
        this.endTime = endTime;
        this.place = place;
        this.category = category;
        this.color = color;
        this.isPublic = isPublic;
        this.recurrence = recurrence;
        this.recurrenceEndDate = recurrenceEndDate;
    }

    public Event(Long id, String title, String body, User owner, OffsetDateTime creationDate, OffsetDateTime startTime, OffsetDateTime endTime, String place, String category, String color, boolean isPublic, UUID linkToken, RecurrenceType recurrence, OffsetDateTime recurrenceEndDate) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.owner = owner;
        this.creationDate = creationDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.place = place;
        this.category = category;
        this.color = color;
        this.isPublic = isPublic;
        this.linkToken = linkToken;
        this.recurrence = recurrence;
        this.recurrenceEndDate = recurrenceEndDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public OffsetDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(OffsetDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public OffsetDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(OffsetDateTime startTime) {
        this.startTime = startTime;
    }

    public OffsetDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(OffsetDateTime endTime) {
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

    public UUID getLinkToken() {
        return linkToken;
    }

    public void setLinkToken(UUID linkToken) {
        this.linkToken = linkToken;
    }

    public RecurrenceType getRecurrence() {
        return recurrence;
    }

    public void setRecurrence(RecurrenceType recurrence) {
        this.recurrence = recurrence;
    }

    public OffsetDateTime getRecurrenceEndDate() {
        return recurrenceEndDate;
    }

    public List<EventParticipantRelation> getParticipants() {
        return participants;
    }

    public void setParticipants(List<EventParticipantRelation> participants) {
        this.participants = participants;
    }

    public List<Notification> getNotifications() {
        return notifications;
    }

    public void setNotifications(List<Notification> notifications) {
        this.notifications = notifications;
    }

    public void setRecurrenceEndDate(OffsetDateTime recurrenceEndDate) {
        this.recurrenceEndDate = recurrenceEndDate;
    }

    @Override
    public String toString() {
        return "Event{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", body='" + body + '\'' +
                ", owner=" + owner +
                ", creationDate=" + creationDate +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", place='" + place + '\'' +
                ", category='" + category + '\'' +
                ", color='" + color + '\'' +
                ", isPublic=" + isPublic +
                ", linkToken=" + linkToken +
                ", recurrence=" + recurrence +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Event event = (Event) o;
        return isPublic == event.isPublic && Objects.equals(id, event.id) && Objects.equals(title, event.title) && Objects.equals(body, event.body) && Objects.equals(owner, event.owner) && Objects.equals(creationDate, event.creationDate) && Objects.equals(startTime, event.startTime) && Objects.equals(endTime, event.endTime) && Objects.equals(place, event.place) && Objects.equals(category, event.category) && Objects.equals(color, event.color) && Objects.equals(linkToken, event.linkToken) && recurrence == event.recurrence;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, body, owner, creationDate, startTime, endTime, place, category, color, isPublic, linkToken, recurrence);
    }
}
