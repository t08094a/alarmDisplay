package de.leif.ffw.datacenter.web.rest;

import com.codahale.metrics.annotation.Timed;
import de.leif.ffw.datacenter.domain.CommonInfo;

import de.leif.ffw.datacenter.repository.CommonInfoRepository;
import de.leif.ffw.datacenter.web.rest.errors.BadRequestAlertException;
import de.leif.ffw.datacenter.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing CommonInfo.
 */
@RestController
@RequestMapping("/api")
public class CommonInfoResource {

    private final Logger log = LoggerFactory.getLogger(CommonInfoResource.class);

    private static final String ENTITY_NAME = "commonInfo";

    private final CommonInfoRepository commonInfoRepository;

    public CommonInfoResource(CommonInfoRepository commonInfoRepository) {
        this.commonInfoRepository = commonInfoRepository;
    }

    /**
     * POST  /common-infos : Create a new commonInfo.
     *
     * @param commonInfo the commonInfo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new commonInfo, or with status 400 (Bad Request) if the commonInfo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/common-infos")
    @Timed
    public ResponseEntity<CommonInfo> createCommonInfo(@RequestBody CommonInfo commonInfo) throws URISyntaxException {
        log.debug("REST request to save CommonInfo : {}", commonInfo);
        if (commonInfo.getId() != null) {
            throw new BadRequestAlertException("A new commonInfo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CommonInfo result = commonInfoRepository.save(commonInfo);
        return ResponseEntity.created(new URI("/api/common-infos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /common-infos : Updates an existing commonInfo.
     *
     * @param commonInfo the commonInfo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated commonInfo,
     * or with status 400 (Bad Request) if the commonInfo is not valid,
     * or with status 500 (Internal Server Error) if the commonInfo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/common-infos")
    @Timed
    public ResponseEntity<CommonInfo> updateCommonInfo(@RequestBody CommonInfo commonInfo) throws URISyntaxException {
        log.debug("REST request to update CommonInfo : {}", commonInfo);
        if (commonInfo.getId() == null) {
            return createCommonInfo(commonInfo);
        }
        CommonInfo result = commonInfoRepository.save(commonInfo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, commonInfo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /common-infos : get all the commonInfos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of commonInfos in body
     */
    @GetMapping("/common-infos")
    @Timed
    public List<CommonInfo> getAllCommonInfos() {
        log.debug("REST request to get all CommonInfos");
        return commonInfoRepository.findAll();
        }

    /**
     * GET  /common-infos/:id : get the "id" commonInfo.
     *
     * @param id the id of the commonInfo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the commonInfo, or with status 404 (Not Found)
     */
    @GetMapping("/common-infos/{id}")
    @Timed
    public ResponseEntity<CommonInfo> getCommonInfo(@PathVariable String id) {
        log.debug("REST request to get CommonInfo : {}", id);
        CommonInfo commonInfo = commonInfoRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(commonInfo));
    }

    /**
     * DELETE  /common-infos/:id : delete the "id" commonInfo.
     *
     * @param id the id of the commonInfo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/common-infos/{id}")
    @Timed
    public ResponseEntity<Void> deleteCommonInfo(@PathVariable String id) {
        log.debug("REST request to delete CommonInfo : {}", id);
        commonInfoRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
