package de.leif.ffw.datacenter.web.rest;

import de.leif.ffw.datacenter.DataCenterApp;

import de.leif.ffw.datacenter.domain.AlarmInfo;
import de.leif.ffw.datacenter.repository.AlarmInfoRepository;
import de.leif.ffw.datacenter.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static de.leif.ffw.datacenter.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AlarmInfoResource REST controller.
 *
 * @see AlarmInfoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DataCenterApp.class)
public class AlarmInfoResourceIntTest {

    private static final Instant DEFAULT_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_LOCATION = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION = "BBBBBBBBBB";

    private static final String DEFAULT_GEOPOSITION = "AAAAAAAAAA";
    private static final String UPDATED_GEOPOSITION = "BBBBBBBBBB";

    private static final String DEFAULT_KEYWORDS = "AAAAAAAAAA";
    private static final String UPDATED_KEYWORDS = "BBBBBBBBBB";

    private static final String DEFAULT_COMMENT = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT = "BBBBBBBBBB";

    private static final Integer DEFAULT_PRIORITY = 1;
    private static final Integer UPDATED_PRIORITY = 2;

    @Autowired
    private AlarmInfoRepository alarmInfoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restAlarmInfoMockMvc;

    private AlarmInfo alarmInfo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AlarmInfoResource alarmInfoResource = new AlarmInfoResource(alarmInfoRepository);
        this.restAlarmInfoMockMvc = MockMvcBuilders.standaloneSetup(alarmInfoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AlarmInfo createEntity() {
        AlarmInfo alarmInfo = new AlarmInfo()
            .time(DEFAULT_TIME)
            .location(DEFAULT_LOCATION)
            .geoposition(DEFAULT_GEOPOSITION)
            .keywords(DEFAULT_KEYWORDS)
            .comment(DEFAULT_COMMENT)
            .priority(DEFAULT_PRIORITY);
        return alarmInfo;
    }

    @Before
    public void initTest() {
        alarmInfoRepository.deleteAll();
        alarmInfo = createEntity();
    }

    @Test
    public void createAlarmInfo() throws Exception {
        int databaseSizeBeforeCreate = alarmInfoRepository.findAll().size();

        // Create the AlarmInfo
        restAlarmInfoMockMvc.perform(post("/api/alarm-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alarmInfo)))
            .andExpect(status().isCreated());

        // Validate the AlarmInfo in the database
        List<AlarmInfo> alarmInfoList = alarmInfoRepository.findAll();
        assertThat(alarmInfoList).hasSize(databaseSizeBeforeCreate + 1);
        AlarmInfo testAlarmInfo = alarmInfoList.get(alarmInfoList.size() - 1);
        assertThat(testAlarmInfo.getTime()).isEqualTo(DEFAULT_TIME);
        assertThat(testAlarmInfo.getLocation()).isEqualTo(DEFAULT_LOCATION);
        assertThat(testAlarmInfo.getGeoposition()).isEqualTo(DEFAULT_GEOPOSITION);
        assertThat(testAlarmInfo.getKeywords()).isEqualTo(DEFAULT_KEYWORDS);
        assertThat(testAlarmInfo.getComment()).isEqualTo(DEFAULT_COMMENT);
        assertThat(testAlarmInfo.getPriority()).isEqualTo(DEFAULT_PRIORITY);
    }

    @Test
    public void createAlarmInfoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = alarmInfoRepository.findAll().size();

        // Create the AlarmInfo with an existing ID
        alarmInfo.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restAlarmInfoMockMvc.perform(post("/api/alarm-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alarmInfo)))
            .andExpect(status().isBadRequest());

        // Validate the AlarmInfo in the database
        List<AlarmInfo> alarmInfoList = alarmInfoRepository.findAll();
        assertThat(alarmInfoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllAlarmInfos() throws Exception {
        // Initialize the database
        alarmInfoRepository.save(alarmInfo);

        // Get all the alarmInfoList
        restAlarmInfoMockMvc.perform(get("/api/alarm-infos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(alarmInfo.getId())))
            .andExpect(jsonPath("$.[*].time").value(hasItem(DEFAULT_TIME.toString())))
            .andExpect(jsonPath("$.[*].location").value(hasItem(DEFAULT_LOCATION.toString())))
            .andExpect(jsonPath("$.[*].geoposition").value(hasItem(DEFAULT_GEOPOSITION.toString())))
            .andExpect(jsonPath("$.[*].keywords").value(hasItem(DEFAULT_KEYWORDS.toString())))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT.toString())))
            .andExpect(jsonPath("$.[*].priority").value(hasItem(DEFAULT_PRIORITY)));
    }

    @Test
    public void getAlarmInfo() throws Exception {
        // Initialize the database
        alarmInfoRepository.save(alarmInfo);

        // Get the alarmInfo
        restAlarmInfoMockMvc.perform(get("/api/alarm-infos/{id}", alarmInfo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(alarmInfo.getId()))
            .andExpect(jsonPath("$.time").value(DEFAULT_TIME.toString()))
            .andExpect(jsonPath("$.location").value(DEFAULT_LOCATION.toString()))
            .andExpect(jsonPath("$.geoposition").value(DEFAULT_GEOPOSITION.toString()))
            .andExpect(jsonPath("$.keywords").value(DEFAULT_KEYWORDS.toString()))
            .andExpect(jsonPath("$.comment").value(DEFAULT_COMMENT.toString()))
            .andExpect(jsonPath("$.priority").value(DEFAULT_PRIORITY));
    }

    @Test
    public void getNonExistingAlarmInfo() throws Exception {
        // Get the alarmInfo
        restAlarmInfoMockMvc.perform(get("/api/alarm-infos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateAlarmInfo() throws Exception {
        // Initialize the database
        alarmInfoRepository.save(alarmInfo);
        int databaseSizeBeforeUpdate = alarmInfoRepository.findAll().size();

        // Update the alarmInfo
        AlarmInfo updatedAlarmInfo = alarmInfoRepository.findOne(alarmInfo.getId());
        updatedAlarmInfo
            .time(UPDATED_TIME)
            .location(UPDATED_LOCATION)
            .geoposition(UPDATED_GEOPOSITION)
            .keywords(UPDATED_KEYWORDS)
            .comment(UPDATED_COMMENT)
            .priority(UPDATED_PRIORITY);

        restAlarmInfoMockMvc.perform(put("/api/alarm-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAlarmInfo)))
            .andExpect(status().isOk());

        // Validate the AlarmInfo in the database
        List<AlarmInfo> alarmInfoList = alarmInfoRepository.findAll();
        assertThat(alarmInfoList).hasSize(databaseSizeBeforeUpdate);
        AlarmInfo testAlarmInfo = alarmInfoList.get(alarmInfoList.size() - 1);
        assertThat(testAlarmInfo.getTime()).isEqualTo(UPDATED_TIME);
        assertThat(testAlarmInfo.getLocation()).isEqualTo(UPDATED_LOCATION);
        assertThat(testAlarmInfo.getGeoposition()).isEqualTo(UPDATED_GEOPOSITION);
        assertThat(testAlarmInfo.getKeywords()).isEqualTo(UPDATED_KEYWORDS);
        assertThat(testAlarmInfo.getComment()).isEqualTo(UPDATED_COMMENT);
        assertThat(testAlarmInfo.getPriority()).isEqualTo(UPDATED_PRIORITY);
    }

    @Test
    public void updateNonExistingAlarmInfo() throws Exception {
        int databaseSizeBeforeUpdate = alarmInfoRepository.findAll().size();

        // Create the AlarmInfo

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAlarmInfoMockMvc.perform(put("/api/alarm-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alarmInfo)))
            .andExpect(status().isCreated());

        // Validate the AlarmInfo in the database
        List<AlarmInfo> alarmInfoList = alarmInfoRepository.findAll();
        assertThat(alarmInfoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    public void deleteAlarmInfo() throws Exception {
        // Initialize the database
        alarmInfoRepository.save(alarmInfo);
        int databaseSizeBeforeDelete = alarmInfoRepository.findAll().size();

        // Get the alarmInfo
        restAlarmInfoMockMvc.perform(delete("/api/alarm-infos/{id}", alarmInfo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AlarmInfo> alarmInfoList = alarmInfoRepository.findAll();
        assertThat(alarmInfoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AlarmInfo.class);
        AlarmInfo alarmInfo1 = new AlarmInfo();
        alarmInfo1.setId("id1");
        AlarmInfo alarmInfo2 = new AlarmInfo();
        alarmInfo2.setId(alarmInfo1.getId());
        assertThat(alarmInfo1).isEqualTo(alarmInfo2);
        alarmInfo2.setId("id2");
        assertThat(alarmInfo1).isNotEqualTo(alarmInfo2);
        alarmInfo1.setId(null);
        assertThat(alarmInfo1).isNotEqualTo(alarmInfo2);
    }
}
