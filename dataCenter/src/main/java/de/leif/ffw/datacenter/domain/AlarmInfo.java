package de.leif.ffw.datacenter.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A AlarmInfo.
 */
@Document(collection = "alarm_info")
public class AlarmInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("time")
    private Instant time;

    @Field("location")
    private String location;

    @Field("geoposition")
    private String geoposition;

    @Field("keywords")
    private String keywords;

    @Field("comment")
    private String comment;

    @Field("priority")
    private Integer priority;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Instant getTime() {
        return time;
    }

    public AlarmInfo time(Instant time) {
        this.time = time;
        return this;
    }

    public void setTime(Instant time) {
        this.time = time;
    }

    public String getLocation() {
        return location;
    }

    public AlarmInfo location(String location) {
        this.location = location;
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getGeoposition() {
        return geoposition;
    }

    public AlarmInfo geoposition(String geoposition) {
        this.geoposition = geoposition;
        return this;
    }

    public void setGeoposition(String geoposition) {
        this.geoposition = geoposition;
    }

    public String getKeywords() {
        return keywords;
    }

    public AlarmInfo keywords(String keywords) {
        this.keywords = keywords;
        return this;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public String getComment() {
        return comment;
    }

    public AlarmInfo comment(String comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Integer getPriority() {
        return priority;
    }

    public AlarmInfo priority(Integer priority) {
        this.priority = priority;
        return this;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
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
        AlarmInfo alarmInfo = (AlarmInfo) o;
        if (alarmInfo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), alarmInfo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AlarmInfo{" +
            "id=" + getId() +
            ", time='" + getTime() + "'" +
            ", location='" + getLocation() + "'" +
            ", geoposition='" + getGeoposition() + "'" +
            ", keywords='" + getKeywords() + "'" +
            ", comment='" + getComment() + "'" +
            ", priority=" + getPriority() +
            "}";
    }
}
