package com.prj1.domain;

import static com.prj1.domain.CategoryTestSamples.*;
import static com.prj1.domain.JobsTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.prj1.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class JobsTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Jobs.class);
        Jobs jobs1 = getJobsSample1();
        Jobs jobs2 = new Jobs();
        assertThat(jobs1).isNotEqualTo(jobs2);

        jobs2.setId(jobs1.getId());
        assertThat(jobs1).isEqualTo(jobs2);

        jobs2 = getJobsSample2();
        assertThat(jobs1).isNotEqualTo(jobs2);
    }

    @Test
    void categoryTest() throws Exception {
        Jobs jobs = getJobsRandomSampleGenerator();
        Category categoryBack = getCategoryRandomSampleGenerator();

        jobs.setCategory(categoryBack);
        assertThat(jobs.getCategory()).isEqualTo(categoryBack);

        jobs.category(null);
        assertThat(jobs.getCategory()).isNull();
    }
}
