package cz.zakharchenkoartem.eventhub.restapi.dto;

import com.fasterxml.jackson.annotation.JsonView;

import java.util.List;

public class PaginatedResponse<T> {
    @JsonView(Views.Public.class)
    private List<T> data;

    @JsonView(Views.Public.class)
    private PageInfo pageInfo;

    public PaginatedResponse(List<T> data, PageInfo pageInfo) {
        this.data = data;
        this.pageInfo = pageInfo;
    }

    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }

    public PageInfo getPageInfo() {
        return pageInfo;
    }

    public void setPageInfo(PageInfo pageInfo) {
        this.pageInfo = pageInfo;
    }
}
