package cz.zakharchenkoartem.eventhub.restapi.follows.dto;

import java.util.Objects;

public class PinFollowerRequest {
    private Long followerId;
    private Long followedUserId;
    private boolean pinned;

    public PinFollowerRequest(Long followerId, Long followedUserId, boolean pinned) {
        this.followerId = followerId;
        this.followedUserId = followedUserId;
        this.pinned = pinned;
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

    public boolean isPinned() {
        return pinned;
    }

    public void setPinned(boolean pinned) {
        this.pinned = pinned;
    }

    @Override
    public String toString() {
        return "PinFollowerRequest{" +
                "followerId=" + followerId +
                ", followedUserId=" + followedUserId +
                ", favorite=" + pinned +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        PinFollowerRequest that = (PinFollowerRequest) o;
        return pinned == that.pinned && Objects.equals(followerId, that.followerId) && Objects.equals(followedUserId, that.followedUserId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(followerId, followedUserId, pinned);
    }
}
