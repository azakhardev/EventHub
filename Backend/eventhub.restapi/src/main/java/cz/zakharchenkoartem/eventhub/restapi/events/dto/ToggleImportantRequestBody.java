package cz.zakharchenkoartem.eventhub.restapi.events.dto;

public class ToggleImportantRequestBody {
    private boolean important;

    private Long userId;

    public boolean isImportant() {
        return important;
    }

    public void setImportant(boolean important) {
        this.important = important;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
