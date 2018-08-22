package de.leif.ffw.datacenter.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A CommonInfo.
 */
@Document(collection = "common_info")
public class CommonInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("title")
    private String title;

    @Field("description")
    private String description;

    @Field("show_start_date")
    private LocalDate showStartDate;

    @Field("show_end_date")
    private LocalDate showEndDate;

    @Field("alarm_relevant")
    private Boolean alarmRelevant;

    @Field("alarm_relevant_start_date")
    private LocalDate alarmRelevantStartDate;

    @Field("alarm_relevant_end_date")
    private LocalDate alarmRelevantEndDate;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public CommonInfo title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public CommonInfo description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getShowStartDate() {
        return showStartDate;
    }

    public CommonInfo showStartDate(LocalDate showStartDate) {
        this.showStartDate = showStartDate;
        return this;
    }

    public void setShowStartDate(LocalDate showStartDate) {
        this.showStartDate = showStartDate;
    }

    public LocalDate getShowEndDate() {
        return showEndDate;
    }

    public CommonInfo showEndDate(LocalDate showEndDate) {
        this.showEndDate = showEndDate;
        return this;
    }

    public void setShowEndDate(LocalDate showEndDate) {
        this.showEndDate = showEndDate;
    }

    public Boolean isAlarmRelevant() {
        return alarmRelevant;
    }

    public CommonInfo alarmRelevant(Boolean alarmRelevant) {
        this.alarmRelevant = alarmRelevant;
        return this;
    }

    public void setAlarmRelevant(Boolean alarmRelevant) {
        this.alarmRelevant = alarmRelevant;
    }

    public LocalDate getAlarmRelevantStartDate() {
        return alarmRelevantStartDate;
    }

    public CommonInfo alarmRelevantStartDate(LocalDate alarmRelevantStartDate) {
        this.alarmRelevantStartDate = alarmRelevantStartDate;
        return this;
    }

    public void setAlarmRelevantStartDate(LocalDate alarmRelevantStartDate) {
        this.alarmRelevantStartDate = alarmRelevantStartDate;
    }

    public LocalDate getAlarmRelevantEndDate() {
        return alarmRelevantEndDate;
    }

    public CommonInfo alarmRelevantEndDate(LocalDate alarmRelevantEndDate) {
        this.alarmRelevantEndDate = alarmRelevantEndDate;
        return this;
    }

    public void setAlarmRelevantEndDate(LocalDate alarmRelevantEndDate) {
        this.alarmRelevantEndDate = alarmRelevantEndDate;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        CommonInfo commonInfo = (CommonInfo) o;
        if (commonInfo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), commonInfo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CommonInfo{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", showStartDate='" + getShowStartDate() + "'" +
            ", showEndDate='" + getShowEndDate() + "'" +
            ", alarmRelevant='" + isAlarmRelevant() + "'" +
            ", alarmRelevantStartDate='" + getAlarmRelevantStartDate() + "'" +
            ", alarmRelevantEndDate='" + getAlarmRelevantEndDate() + "'" +
            "}";
    }
}
