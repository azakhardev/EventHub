package cz.zakharchenkoartem.eventhub.restapi.events_participants;

import cz.zakharchenkoartem.eventhub.restapi.events.Event;
import cz.zakharchenkoartem.eventhub.restapi.users.User;
import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "events_participants")
public class EventParticipantRelation {
    @EmbeddedId
    private EventParticipantId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("eventId")
    @JoinColumn(name = "event_id")
    private Event event;

    private boolean accepted;

    private boolean important;

    public EventParticipantRelation() {}

    public EventParticipantRelation(EventParticipantId id, User user, Event event, boolean accepted, boolean important) {
        this.id = id;
        this.user = user;
        this.event = event;
        this.accepted = accepted;
        this.important = important;
    }

    public EventParticipantId getId() {
        return id;
    }

    public void setId(EventParticipantId id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User follower) {
        this.user = follower;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public boolean isAccepted() {
        return accepted;
    }

    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
    }

    public boolean isImportant() {
        return important;
    }

    public void setImportant(boolean important) {
        this.important = important;
    }

    @Override
    public String toString() {
        return "EventParticipantRelation{" +
                "id=" + id +
                ", follower=" + user +
                ", event=" + event +
                ", accepted=" + accepted +
                ", important=" + important +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        EventParticipantRelation that = (EventParticipantRelation) o;
        return accepted == that.accepted && important == that.important && Objects.equals(id, that.id) && Objects.equals(user, that.user) && Objects.equals(event, that.event);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, user, event, accepted, important);
    }
}
