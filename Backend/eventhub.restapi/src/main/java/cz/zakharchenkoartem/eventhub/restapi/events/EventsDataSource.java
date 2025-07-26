package cz.zakharchenkoartem.eventhub.restapi.events;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Repository
public interface EventsDataSource extends JpaRepository<Event, Long> {
    List<Event> findAllByOwnerIdAndIsPublic(Long ownerId, boolean aPublic);
}
