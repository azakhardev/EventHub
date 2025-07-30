package cz.zakharchenkoartem.eventhub.restapi.events.dto;

import java.util.List;

public class InvitationResponse {

    private List<Long> invited;
    private List<Long> alreadyInvited;

    public InvitationResponse(List<Long> invited, List<Long> alreadyInvited) {
        this.invited = invited;
        this.alreadyInvited = alreadyInvited;
    }

    public List<Long> getInvited() {
        return invited;
    }

    public void setInvited(List<Long> invited) {
        this.invited = invited;
    }

    public List<Long> getAlreadyInvited() {
        return alreadyInvited;
    }

    public void setAlreadyInvited(List<Long> alreadyInvited) {
        this.alreadyInvited = alreadyInvited;
    }

}
