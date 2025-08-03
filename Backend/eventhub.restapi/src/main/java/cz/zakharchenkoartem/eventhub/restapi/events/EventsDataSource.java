package cz.zakharchenkoartem.eventhub.restapi.events;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface EventsDataSource extends JpaRepository<Event, Long> {
    @Modifying
    @Query("DELETE FROM Event e WHERE " +
            "(e.recurrence = 'ONCE' AND e.endTime < :now) OR " +
            "(e.recurrence <> 'ONCE' AND e.recurrenceEndDate < :now)")
    void deleteOldEvents(@Param("now") LocalDateTime now);

    Page<Event> findAllByOwnerId(@Param("ownerId") long ownerId, Pageable pageable);
}
