package cz.zakharchenkoartem.eventhub.restapi.events_participants;

import cz.zakharchenkoartem.eventhub.restapi.events.Event;
import cz.zakharchenkoartem.eventhub.restapi.users.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventsParticipantsDataSource extends JpaRepository<EventParticipantRelation, Long> {
    List<EventParticipantRelation> findByEvent(Event event);

    List<EventParticipantRelation> findByUser(User user);
}
