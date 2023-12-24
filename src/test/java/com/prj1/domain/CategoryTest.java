package com.prj1.domain;

import static com.prj1.domain.CategoryTestSamples.*;
import static com.prj1.domain.JobsTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.prj1.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class CategoryTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Category.class);
        Category category1 = getCategorySample1();
        Category category2 = new Category();
        assertThat(category1).isNotEqualTo(category2);

        category2.setId(category1.getId());
        assertThat(category1).isEqualTo(category2);

        category2 = getCategorySample2();
        assertThat(category1).isNotEqualTo(category2);
    }

    @Test
    void jobsTest() throws Exception {
        Category category = getCategoryRandomSampleGenerator();
        Jobs jobsBack = getJobsRandomSampleGenerator();

        category.addJobs(jobsBack);
        assertThat(category.getJobs()).containsOnly(jobsBack);
        assertThat(jobsBack.getCategory()).isEqualTo(category);

        category.removeJobs(jobsBack);
        assertThat(category.getJobs()).doesNotContain(jobsBack);
        assertThat(jobsBack.getCategory()).isNull();

        category.jobs(new HashSet<>(Set.of(jobsBack)));
        assertThat(category.getJobs()).containsOnly(jobsBack);
        assertThat(jobsBack.getCategory()).isEqualTo(category);

        category.setJobs(new HashSet<>());
        assertThat(category.getJobs()).doesNotContain(jobsBack);
        assertThat(jobsBack.getCategory()).isNull();
    }
}
