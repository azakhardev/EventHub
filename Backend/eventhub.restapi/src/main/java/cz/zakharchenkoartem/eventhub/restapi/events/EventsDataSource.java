package cz.zakharchenkoartem.eventhub.restapi.events;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventsDataSource extends JpaRepository<Event, Long> {
}
