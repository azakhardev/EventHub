package cz.zakharchenkoartem.eventhub.restapi.follows;

import cz.zakharchenkoartem.eventhub.restapi.users.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowRelationDataSource extends JpaRepository<FollowRelation, Long> {
    List<FollowRelation> findByFollower(User owner);
}
