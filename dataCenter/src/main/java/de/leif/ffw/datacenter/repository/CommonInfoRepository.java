package de.leif.ffw.datacenter.repository;

import de.leif.ffw.datacenter.domain.CommonInfo;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the CommonInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommonInfoRepository extends MongoRepository<CommonInfo, String> {

}
