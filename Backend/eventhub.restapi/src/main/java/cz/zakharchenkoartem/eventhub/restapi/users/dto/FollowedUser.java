package cz.zakharchenkoartem.eventhub.restapi.users.dto;

import cz.zakharchenkoartem.eventhub.restapi.users.User;

public class FollowedUser extends User {
    private boolean pinned;

    public FollowedUser(User user, boolean pinned) {
        super(user.getId(), user.getUsername(), user.getPassword(), user.getNickname(), user.getEmail(),user.getAbout(),user.getProfile_picture_url(), user.getProffesion());
        this.pinned = pinned;
    }

    public boolean isPinned() {
        return pinned;
    }

    public void setPinned(boolean pinned) {
        this.pinned = pinned;
    }



}
