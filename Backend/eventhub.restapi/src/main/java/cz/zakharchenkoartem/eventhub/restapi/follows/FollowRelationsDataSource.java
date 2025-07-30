package cz.zakharchenkoartem.eventhub.restapi.follows;

import cz.zakharchenkoartem.eventhub.restapi.users.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FollowRelationsDataSource extends JpaRepository<FollowRelation, FollowRelationId> {
    List<FollowRelation> findByFollower(User owner);

    Optional<FollowRelation> findByFollowedUserIdAndFollowerId(Long followedUserId, Long followerId);
}
