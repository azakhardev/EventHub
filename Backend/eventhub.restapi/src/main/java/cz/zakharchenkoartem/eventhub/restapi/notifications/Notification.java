package cz.zakharchenkoartem.eventhub.restapi.notifications;

import com.fasterxml.jackson.annotation.JsonIgnore;
import cz.zakharchenkoartem.eventhub.restapi.events.Event;
import cz.zakharchenkoartem.eventhub.restapi.users.User;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "notifications")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(name = "fk_user_id"))
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false, foreignKey = @ForeignKey(name = "fk_event_id"))
    private Event event;

    private String type;

    @Column(columnDefinition = "TEXT")
    private String message;

    @Column(name = "created_at", updatable = false, insertable = false)
    private LocalDateTime timestamp;

    @Column(name = "is_read")
    private boolean isRead;

    public Notification() {}

    public Notification(User user, Event event, String type, String message) {
        this.user = user;
        this.event = event;
        this.type = type;
        this.message = message;
    }

    public Notification(Long id, User user, Event event, String type, String message, LocalDateTime timestamp, boolean isRead) {
        this.id = id;
        this.user = user;
        this.event = event;
        this.type = type;
        this.message = message;
        this.timestamp = timestamp;
        this.isRead = isRead;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public boolean isIsRead() {
        return isRead;
    }

    public void setIsRead(boolean is_read) {
        this.isRead = is_read;
    }

    @Override
    public String toString() {
        return "Notification{" +
                "id=" + id +
                ", user=" + user +
                ", event=" + event +
                ", type='" + type + '\'' +
                ", message='" + message + '\'' +
                ", timestamp=" + timestamp +
                ", is_read=" + isRead +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Notification that = (Notification) o;
        return isRead == that.isRead && Objects.equals(id, that.id) && Objects.equals(user, that.user) && Objects.equals(event, that.event) && Objects.equals(type, that.type) && Objects.equals(message, that.message) && Objects.equals(timestamp, that.timestamp);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, user, event, type, message, timestamp, isRead);
    }
}
