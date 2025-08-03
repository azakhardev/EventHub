package cz.zakharchenkoartem.eventhub.restapi.events_participants;

import cz.zakharchenkoartem.eventhub.restapi.events.Event;
import cz.zakharchenkoartem.eventhub.restapi.users.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EventsParticipantsDataSource extends JpaRepository<EventParticipantRelation, Long> {
    Page<EventParticipantRelation> findByEvent(Event event, Pageable pageable);

    @Query("""
                SELECT rel FROM EventParticipantRelation rel
                JOIN rel.event e
                WHERE rel.user = :user
                    AND (:important IS NULL OR rel.important = :important)
                    AND (:owned IS NULL OR
                            (:owned = TRUE AND e.owner.id = rel.user.id) OR
                            (:owned = FALSE AND e.owner.id <> rel.user.id))
                ORDER BY e.startTime ASC
            """)
    Page<EventParticipantRelation> findByUserOrdered(@Param("user") User user, @Param("important") Boolean important, @Param("owned") Boolean owned, Pageable pageable);
}
