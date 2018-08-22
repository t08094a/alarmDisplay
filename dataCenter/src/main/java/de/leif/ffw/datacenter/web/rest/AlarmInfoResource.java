package de.leif.ffw.datacenter.web.rest;

import com.codahale.metrics.annotation.Timed;
import de.leif.ffw.datacenter.domain.AlarmInfo;

import de.leif.ffw.datacenter.repository.AlarmInfoRepository;
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
 * REST controller for managing AlarmInfo.
 */
@RestController
@RequestMapping("/api")
public class AlarmInfoResource {

    private final Logger log = LoggerFactory.getLogger(AlarmInfoResource.class);

    private static final String ENTITY_NAME = "alarmInfo";

    private final AlarmInfoRepository alarmInfoRepository;

    public AlarmInfoResource(AlarmInfoRepository alarmInfoRepository) {
        this.alarmInfoRepository = alarmInfoRepository;
    }

    /**
     * POST  /alarm-infos : Create a new alarmInfo.
     *
     * @param alarmInfo the alarmInfo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new alarmInfo, or with status 400 (Bad Request) if the alarmInfo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/alarm-infos")
    @Timed
    public ResponseEntity<AlarmInfo> createAlarmInfo(@RequestBody AlarmInfo alarmInfo) throws URISyntaxException {
        log.debug("REST request to save AlarmInfo : {}", alarmInfo);
        if (alarmInfo.getId() != null) {
            throw new BadRequestAlertException("A new alarmInfo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AlarmInfo result = alarmInfoRepository.save(alarmInfo);
        return ResponseEntity.created(new URI("/api/alarm-infos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /alarm-infos : Updates an existing alarmInfo.
     *
     * @param alarmInfo the alarmInfo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated alarmInfo,
     * or with status 400 (Bad Request) if the alarmInfo is not valid,
     * or with status 500 (Internal Server Error) if the alarmInfo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/alarm-infos")
    @Timed
    public ResponseEntity<AlarmInfo> updateAlarmInfo(@RequestBody AlarmInfo alarmInfo) throws URISyntaxException {
        log.debug("REST request to update AlarmInfo : {}", alarmInfo);
        if (alarmInfo.getId() == null) {
            return createAlarmInfo(alarmInfo);
        }
        AlarmInfo result = alarmInfoRepository.save(alarmInfo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, alarmInfo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /alarm-infos : get all the alarmInfos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of alarmInfos in body
     */
    @GetMapping("/alarm-infos")
    @Timed
    public List<AlarmInfo> getAllAlarmInfos() {
        log.debug("REST request to get all AlarmInfos");
        return alarmInfoRepository.findAll();
        }

    /**
     * GET  /alarm-infos/:id : get the "id" alarmInfo.
     *
     * @param id the id of the alarmInfo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the alarmInfo, or with status 404 (Not Found)
     */
    @GetMapping("/alarm-infos/{id}")
    @Timed
    public ResponseEntity<AlarmInfo> getAlarmInfo(@PathVariable String id) {
        log.debug("REST request to get AlarmInfo : {}", id);
        AlarmInfo alarmInfo = alarmInfoRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(alarmInfo));
    }

    /**
     * DELETE  /alarm-infos/:id : delete the "id" alarmInfo.
     *
     * @param id the id of the alarmInfo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/alarm-infos/{id}")
    @Timed
    public ResponseEntity<Void> deleteAlarmInfo(@PathVariable String id) {
        log.debug("REST request to delete AlarmInfo : {}", id);
        alarmInfoRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
