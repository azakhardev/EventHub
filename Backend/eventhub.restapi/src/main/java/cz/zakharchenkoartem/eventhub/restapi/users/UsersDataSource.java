package cz.zakharchenkoartem.eventhub.restapi.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersDataSource extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
