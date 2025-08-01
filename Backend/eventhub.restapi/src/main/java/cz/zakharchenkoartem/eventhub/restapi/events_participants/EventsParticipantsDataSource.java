package cz.zakharchenkoartem.eventhub.restapi.events_participants;

import cz.zakharchenkoartem.eventhub.restapi.events.Event;
import cz.zakharchenkoartem.eventhub.restapi.users.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventsParticipantsDataSource extends JpaRepository<EventParticipantRelation, Long> {
    Page<EventParticipantRelation> findByEvent(Event event, Pageable pageable);

    Page<EventParticipantRelation> findByUser(User user, Pageable pageable);
}
