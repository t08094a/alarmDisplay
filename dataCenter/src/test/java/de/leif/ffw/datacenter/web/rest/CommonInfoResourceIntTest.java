package de.leif.ffw.datacenter.web.rest;

import de.leif.ffw.datacenter.DataCenterApp;

import de.leif.ffw.datacenter.domain.CommonInfo;
import de.leif.ffw.datacenter.repository.CommonInfoRepository;
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

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static de.leif.ffw.datacenter.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CommonInfoResource REST controller.
 *
 * @see CommonInfoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DataCenterApp.class)
public class CommonInfoResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_SHOW_START_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_SHOW_START_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_SHOW_END_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_SHOW_END_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Boolean DEFAULT_ALARM_RELEVANT = false;
    private static final Boolean UPDATED_ALARM_RELEVANT = true;

    private static final LocalDate DEFAULT_ALARM_RELEVANT_START_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_ALARM_RELEVANT_START_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_ALARM_RELEVANT_END_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_ALARM_RELEVANT_END_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private CommonInfoRepository commonInfoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restCommonInfoMockMvc;

    private CommonInfo commonInfo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CommonInfoResource commonInfoResource = new CommonInfoResource(commonInfoRepository);
        this.restCommonInfoMockMvc = MockMvcBuilders.standaloneSetup(commonInfoResource)
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
    public static CommonInfo createEntity() {
        CommonInfo commonInfo = new CommonInfo()
            .title(DEFAULT_TITLE)
            .description(DEFAULT_DESCRIPTION)
            .showStartDate(DEFAULT_SHOW_START_DATE)
            .showEndDate(DEFAULT_SHOW_END_DATE)
            .alarmRelevant(DEFAULT_ALARM_RELEVANT)
            .alarmRelevantStartDate(DEFAULT_ALARM_RELEVANT_START_DATE)
            .alarmRelevantEndDate(DEFAULT_ALARM_RELEVANT_END_DATE);
        return commonInfo;
    }

    @Before
    public void initTest() {
        commonInfoRepository.deleteAll();
        commonInfo = createEntity();
    }

    @Test
    public void createCommonInfo() throws Exception {
        int databaseSizeBeforeCreate = commonInfoRepository.findAll().size();

        // Create the CommonInfo
        restCommonInfoMockMvc.perform(post("/api/common-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commonInfo)))
            .andExpect(status().isCreated());

        // Validate the CommonInfo in the database
        List<CommonInfo> commonInfoList = commonInfoRepository.findAll();
        assertThat(commonInfoList).hasSize(databaseSizeBeforeCreate + 1);
        CommonInfo testCommonInfo = commonInfoList.get(commonInfoList.size() - 1);
        assertThat(testCommonInfo.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testCommonInfo.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testCommonInfo.getShowStartDate()).isEqualTo(DEFAULT_SHOW_START_DATE);
        assertThat(testCommonInfo.getShowEndDate()).isEqualTo(DEFAULT_SHOW_END_DATE);
        assertThat(testCommonInfo.isAlarmRelevant()).isEqualTo(DEFAULT_ALARM_RELEVANT);
        assertThat(testCommonInfo.getAlarmRelevantStartDate()).isEqualTo(DEFAULT_ALARM_RELEVANT_START_DATE);
        assertThat(testCommonInfo.getAlarmRelevantEndDate()).isEqualTo(DEFAULT_ALARM_RELEVANT_END_DATE);
    }

    @Test
    public void createCommonInfoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = commonInfoRepository.findAll().size();

        // Create the CommonInfo with an existing ID
        commonInfo.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restCommonInfoMockMvc.perform(post("/api/common-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commonInfo)))
            .andExpect(status().isBadRequest());

        // Validate the CommonInfo in the database
        List<CommonInfo> commonInfoList = commonInfoRepository.findAll();
        assertThat(commonInfoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllCommonInfos() throws Exception {
        // Initialize the database
        commonInfoRepository.save(commonInfo);

        // Get all the commonInfoList
        restCommonInfoMockMvc.perform(get("/api/common-infos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(commonInfo.getId())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].showStartDate").value(hasItem(DEFAULT_SHOW_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].showEndDate").value(hasItem(DEFAULT_SHOW_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].alarmRelevant").value(hasItem(DEFAULT_ALARM_RELEVANT.booleanValue())))
            .andExpect(jsonPath("$.[*].alarmRelevantStartDate").value(hasItem(DEFAULT_ALARM_RELEVANT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].alarmRelevantEndDate").value(hasItem(DEFAULT_ALARM_RELEVANT_END_DATE.toString())));
    }

    @Test
    public void getCommonInfo() throws Exception {
        // Initialize the database
        commonInfoRepository.save(commonInfo);

        // Get the commonInfo
        restCommonInfoMockMvc.perform(get("/api/common-infos/{id}", commonInfo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(commonInfo.getId()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.showStartDate").value(DEFAULT_SHOW_START_DATE.toString()))
            .andExpect(jsonPath("$.showEndDate").value(DEFAULT_SHOW_END_DATE.toString()))
            .andExpect(jsonPath("$.alarmRelevant").value(DEFAULT_ALARM_RELEVANT.booleanValue()))
            .andExpect(jsonPath("$.alarmRelevantStartDate").value(DEFAULT_ALARM_RELEVANT_START_DATE.toString()))
            .andExpect(jsonPath("$.alarmRelevantEndDate").value(DEFAULT_ALARM_RELEVANT_END_DATE.toString()));
    }

    @Test
    public void getNonExistingCommonInfo() throws Exception {
        // Get the commonInfo
        restCommonInfoMockMvc.perform(get("/api/common-infos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateCommonInfo() throws Exception {
        // Initialize the database
        commonInfoRepository.save(commonInfo);
        int databaseSizeBeforeUpdate = commonInfoRepository.findAll().size();

        // Update the commonInfo
        CommonInfo updatedCommonInfo = commonInfoRepository.findOne(commonInfo.getId());
        updatedCommonInfo
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .showStartDate(UPDATED_SHOW_START_DATE)
            .showEndDate(UPDATED_SHOW_END_DATE)
            .alarmRelevant(UPDATED_ALARM_RELEVANT)
            .alarmRelevantStartDate(UPDATED_ALARM_RELEVANT_START_DATE)
            .alarmRelevantEndDate(UPDATED_ALARM_RELEVANT_END_DATE);

        restCommonInfoMockMvc.perform(put("/api/common-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCommonInfo)))
            .andExpect(status().isOk());

        // Validate the CommonInfo in the database
        List<CommonInfo> commonInfoList = commonInfoRepository.findAll();
        assertThat(commonInfoList).hasSize(databaseSizeBeforeUpdate);
        CommonInfo testCommonInfo = commonInfoList.get(commonInfoList.size() - 1);
        assertThat(testCommonInfo.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testCommonInfo.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testCommonInfo.getShowStartDate()).isEqualTo(UPDATED_SHOW_START_DATE);
        assertThat(testCommonInfo.getShowEndDate()).isEqualTo(UPDATED_SHOW_END_DATE);
        assertThat(testCommonInfo.isAlarmRelevant()).isEqualTo(UPDATED_ALARM_RELEVANT);
        assertThat(testCommonInfo.getAlarmRelevantStartDate()).isEqualTo(UPDATED_ALARM_RELEVANT_START_DATE);
        assertThat(testCommonInfo.getAlarmRelevantEndDate()).isEqualTo(UPDATED_ALARM_RELEVANT_END_DATE);
    }

    @Test
    public void updateNonExistingCommonInfo() throws Exception {
        int databaseSizeBeforeUpdate = commonInfoRepository.findAll().size();

        // Create the CommonInfo

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCommonInfoMockMvc.perform(put("/api/common-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commonInfo)))
            .andExpect(status().isCreated());

        // Validate the CommonInfo in the database
        List<CommonInfo> commonInfoList = commonInfoRepository.findAll();
        assertThat(commonInfoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    public void deleteCommonInfo() throws Exception {
        // Initialize the database
        commonInfoRepository.save(commonInfo);
        int databaseSizeBeforeDelete = commonInfoRepository.findAll().size();

        // Get the commonInfo
        restCommonInfoMockMvc.perform(delete("/api/common-infos/{id}", commonInfo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CommonInfo> commonInfoList = commonInfoRepository.findAll();
        assertThat(commonInfoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CommonInfo.class);
        CommonInfo commonInfo1 = new CommonInfo();
        commonInfo1.setId("id1");
        CommonInfo commonInfo2 = new CommonInfo();
        commonInfo2.setId(commonInfo1.getId());
        assertThat(commonInfo1).isEqualTo(commonInfo2);
        commonInfo2.setId("id2");
        assertThat(commonInfo1).isNotEqualTo(commonInfo2);
        commonInfo1.setId(null);
        assertThat(commonInfo1).isNotEqualTo(commonInfo2);
    }
}
