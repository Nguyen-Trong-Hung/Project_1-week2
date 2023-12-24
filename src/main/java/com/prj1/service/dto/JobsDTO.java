package com.prj1.service.dto;

import com.prj1.domain.enumeration.JobStatus;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A DTO for the {@link com.prj1.domain.Jobs} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class JobsDTO implements Serializable {

    private Long id;

    @NotNull
    private String title;

    @NotNull
    private String slug;

    private String featureImage;

    private ZonedDateTime validFrom;

    private ZonedDateTime validThrough;

    private JobStatus status;

    private Long createdBy;

    private ZonedDateTime createdDate;

    private ZonedDateTime updateDate;

    private Long updateBy;

    private CategoryDTO category;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getFeatureImage() {
        return featureImage;
    }

    public void setFeatureImage(String featureImage) {
        this.featureImage = featureImage;
    }

    public ZonedDateTime getValidFrom() {
        return validFrom;
    }

    public void setValidFrom(ZonedDateTime validFrom) {
        this.validFrom = validFrom;
    }

    public ZonedDateTime getValidThrough() {
        return validThrough;
    }

    public void setValidThrough(ZonedDateTime validThrough) {
        this.validThrough = validThrough;
    }

    public JobStatus getStatus() {
        return status;
    }

    public void setStatus(JobStatus status) {
        this.status = status;
    }

    public Long getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    public ZonedDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public ZonedDateTime getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(ZonedDateTime updateDate) {
        this.updateDate = updateDate;
    }

    public Long getUpdateBy() {
        return updateBy;
    }

    public void setUpdateBy(Long updateBy) {
        this.updateBy = updateBy;
    }

    public CategoryDTO getCategory() {
        return category;
    }

    public void setCategory(CategoryDTO category) {
        this.category = category;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof JobsDTO)) {
            return false;
        }

        JobsDTO jobsDTO = (JobsDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, jobsDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "JobsDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", slug='" + getSlug() + "'" +
            ", featureImage='" + getFeatureImage() + "'" +
            ", validFrom='" + getValidFrom() + "'" +
            ", validThrough='" + getValidThrough() + "'" +
            ", status='" + getStatus() + "'" +
            ", createdBy=" + getCreatedBy() +
            ", createdDate='" + getCreatedDate() + "'" +
            ", updateDate='" + getUpdateDate() + "'" +
            ", updateBy=" + getUpdateBy() +
            ", category=" + getCategory() +
            "}";
    }
}
