package cz.zakharchenkoartem.eventhub.restapi.notifications;

import cz.zakharchenkoartem.eventhub.restapi.events.Event;
import cz.zakharchenkoartem.eventhub.restapi.users.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NotificationsDataSource extends JpaRepository<Notification, Long> {
    Page<Notification> findByUser(User user, Pageable pageable);

    boolean existsByEventAndUserAndType(Event event, User user, String type);

    @Modifying
    @Query("UPDATE Notification n SET n.isRead = true WHERE n.id IN :ids")
    void markAsRead(@Param("ids") List<Long> ids);

    @Query("SELECT count(n) FROM Notification n WHERE n.user.id = :userId AND n.isRead = FALSE")
    Long getCountByUserId(@Param("userId") Long userId);
}
