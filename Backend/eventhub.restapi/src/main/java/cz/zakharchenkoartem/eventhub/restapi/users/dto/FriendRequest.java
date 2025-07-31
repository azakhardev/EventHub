package cz.zakharchenkoartem.eventhub.restapi.users.dto;

import java.util.UUID;

public class FriendRequest {

    private Long followedUserId;

    private UUID followToken;


    public Long getFollowedUserId() {
        return followedUserId;
    }

    public void setFollowedUserId(Long followedUserId) {
        this.followedUserId = followedUserId;
    }

    public UUID getFollowToken() {
        return followToken;
    }

    public void setFollowToken(UUID followToken) {
        this.followToken = followToken;
    }
}
