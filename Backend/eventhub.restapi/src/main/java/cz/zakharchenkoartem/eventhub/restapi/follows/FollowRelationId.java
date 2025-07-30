package cz.zakharchenkoartem.eventhub.restapi.follows;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class FollowRelationId implements Serializable {

    @Column(name = "following_user_id")
    private Long followerId;

    @Column(name = "followed_user_id")
    private Long followedUserId;

    public FollowRelationId() {}

    public FollowRelationId(Long followerId, Long followedUserId) {
        this.followerId = followerId;
        this.followedUserId = followedUserId;
    }

    public Long getFollowerId() {
        return followerId;
    }

    public void setFollowerId(Long followerId) {
        this.followerId = followerId;
    }

    public Long getFollowedUserId() {
        return followedUserId;
    }

    public void setFollowedUserId(Long followedUserId) {
        this.followedUserId = followedUserId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof FollowRelationId)) return false;
        FollowRelationId that = (FollowRelationId) o;
        return Objects.equals(followerId, that.followerId) &&
                Objects.equals(followedUserId, that.followedUserId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(followerId, followedUserId);
    }
}