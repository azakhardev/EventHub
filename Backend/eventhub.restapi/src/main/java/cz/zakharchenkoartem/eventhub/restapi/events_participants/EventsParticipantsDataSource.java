package cz.zakharchenkoartem.eventhub.restapi.events_participants;

import cz.zakharchenkoartem.eventhub.restapi.events.Event;
import cz.zakharchenkoartem.eventhub.restapi.users.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
                  AND (:private IS NULL OR
                       (:private = TRUE AND e.isPublic = FALSE) OR
                       (:private = FALSE AND e.isPublic = TRUE))
                  AND (:expression IS NULL OR :expression = '' OR LOWER(e.title) LIKE LOWER(CONCAT('%', :expression, '%')))
                  AND e.startTime >= :from
                  AND e.startTime <= :to
                ORDER BY
                      CASE WHEN :order = 'desc' THEN e.startTime END DESC,
                      CASE WHEN :order <> 'desc' OR :order IS NULL THEN e.startTime END ASC
            """)
    Page<EventParticipantRelation> findByUserOrdered(
            @Param("user") User user,
            @Param("important") Boolean important,
            @Param("owned") Boolean owned,
            @Param("private") Boolean isPrivate,
            @Param("from") LocalDateTime from,
            @Param("to") LocalDateTime to,
            @Param("expression") String expression,
            @Param("order") String order,
            Pageable pageable
    );

    EventParticipantRelation getByEventAndUser(Event event, User user);
}
