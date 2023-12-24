package com.prj1.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class CategoryTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Category getCategorySample1() {
        return new Category().id(1L).name("name1").createdBy(1L).updateBy(1L);
    }

    public static Category getCategorySample2() {
        return new Category().id(2L).name("name2").createdBy(2L).updateBy(2L);
    }

    public static Category getCategoryRandomSampleGenerator() {
        return new Category()
            .id(longCount.incrementAndGet())
            .name(UUID.randomUUID().toString())
            .createdBy(longCount.incrementAndGet())
            .updateBy(longCount.incrementAndGet());
    }
}
