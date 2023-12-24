package com.prj1.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class JobsTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Jobs getJobsSample1() {
        return new Jobs().id(1L).title("title1").slug("slug1").featureImage("featureImage1").createdBy(1L).updateBy(1L);
    }

    public static Jobs getJobsSample2() {
        return new Jobs().id(2L).title("title2").slug("slug2").featureImage("featureImage2").createdBy(2L).updateBy(2L);
    }

    public static Jobs getJobsRandomSampleGenerator() {
        return new Jobs()
            .id(longCount.incrementAndGet())
            .title(UUID.randomUUID().toString())
            .slug(UUID.randomUUID().toString())
            .featureImage(UUID.randomUUID().toString())
            .createdBy(longCount.incrementAndGet())
            .updateBy(longCount.incrementAndGet());
    }
}
