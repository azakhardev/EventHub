package cz.zakharchenkoartem.eventhub.restapi.users;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsersDataSource extends JpaRepository<User, Long> {
    User findByEmail(String email);

    Page<User> findAllByUsernameContainingIgnoreCase(String username, Pageable pageable);
}
