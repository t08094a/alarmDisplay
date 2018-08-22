package de.leif.ffw.datacenter.repository;

import de.leif.ffw.datacenter.domain.AlarmInfo;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the AlarmInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AlarmInfoRepository extends MongoRepository<AlarmInfo, String> {

}
