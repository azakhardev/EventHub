package cz.zakharchenkoartem.eventhub.restapi.follows;

import cz.zakharchenkoartem.eventhub.restapi.users.User;
import jakarta.persistence.*;

import java.security.Timestamp;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "followed_users")
public class FollowRelation {
    @EmbeddedId
    private FollowRelationId id;

    @ManyToOne
    @MapsId("followerId")
    @JoinColumn(name = "following_user_id")
    private User follower;

    @ManyToOne
    @MapsId("followedUserId")
    @JoinColumn(name = "followed_user_id")
    private User followedUser;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    private boolean favorite;

    public FollowRelation() {

    }

    public FollowRelation(FollowRelationId id, User follower, User followedUser, LocalDateTime createdAt, boolean favorite) {
        this.id = id;
        this.follower = follower;
        this.followedUser = followedUser;
        this.createdAt = createdAt;
        this.favorite = favorite;
    }

    public FollowRelationId getId() {
        return id;
    }

    public void setId(FollowRelationId id) {
        this.id = id;
    }

    public User getFollower() {
        return follower;
    }

    public void setFollower(User follower) {
        this.follower = follower;
    }

    public User getFollowedUser() {
        return followedUser;
    }

    public void setFollowedUser(User followed) {
        this.followedUser = followed;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public boolean isFavorite() {
        return favorite;
    }

    public void setFavorite(boolean favorite) {
        this.favorite = favorite;
    }

    @Override
    public String toString() {
        return "FollowRelation{" +
                "id=" + id +
                ", follower=" + follower +
                ", followed=" + followedUser +
                ", createdAt=" + createdAt +
                ", favorite=" + favorite +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        FollowRelation that = (FollowRelation) o;
        return Objects.equals(id, that.id) && Objects.equals(follower, that.follower) && Objects.equals(followedUser, that.followedUser) && Objects.equals(createdAt, that.createdAt) && Objects.equals(favorite, that.favorite);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, follower, followedUser, createdAt, favorite);
    }
}
