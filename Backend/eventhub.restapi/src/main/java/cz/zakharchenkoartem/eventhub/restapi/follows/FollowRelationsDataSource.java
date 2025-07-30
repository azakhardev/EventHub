package cz.zakharchenkoartem.eventhub.restapi.follows;

import cz.zakharchenkoartem.eventhub.restapi.users.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FollowRelationsDataSource extends JpaRepository<FollowRelation, FollowRelationId> {
    List<FollowRelation> findByFollower(User owner);

    @Query("SELECT fr FROM FollowRelation fr WHERE fr.follower = :owner AND LOWER(fr.followedUser.username) LIKE LOWER(CONCAT('%', :expression, '%'))")
    List<FollowRelation> findByFollowerAndUsernameLike(@Param("owner") User owner, @Param("expression") String expression);

    Optional<FollowRelation> findByFollowedUserIdAndFollowerId(Long followedUserId, Long followerId);
}
