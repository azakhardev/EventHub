package cz.zakharchenkoartem.eventhub.restapi.dto;

import com.fasterxml.jackson.annotation.JsonView;

public class PageInfo {
    @JsonView(Views.Public.class)
    private int page;

    @JsonView(Views.Public.class)
    private int pageSize;

    @JsonView(Views.Public.class)
    private int totalPages;

    @JsonView(Views.Public.class)
    private Long totalElements;

    public PageInfo(int page, int pageSize, int totalPages, Long totalElements) {
        this.page = page;
        this.pageSize = pageSize;
        this.totalPages = totalPages;
        this.totalElements = totalElements;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public Long getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(Long totalElements) {
        this.totalElements = totalElements;
    }

    @Override
    public String toString() {
        return "PageInfo{" +
                "page=" + page +
                ", pageSize=" + pageSize +
                ", totalPages=" + totalPages +
                ", totalElements=" + totalElements +
                '}';
    }
}
