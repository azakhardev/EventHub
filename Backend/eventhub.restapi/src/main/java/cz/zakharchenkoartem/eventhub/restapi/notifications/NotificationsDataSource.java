package cz.zakharchenkoartem.eventhub.restapi.notifications;

import cz.zakharchenkoartem.eventhub.restapi.users.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationsDataSource extends JpaRepository<Notification, Long> {
    List<Notification> findByUser(User user);
}
