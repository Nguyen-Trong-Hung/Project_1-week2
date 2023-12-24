package com.prj1.service.mapper;

import com.prj1.domain.Category;
import com.prj1.domain.Jobs;
import com.prj1.service.dto.CategoryDTO;
import com.prj1.service.dto.JobsDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Jobs} and its DTO {@link JobsDTO}.
 */
@Mapper(componentModel = "spring")
public interface JobsMapper extends EntityMapper<JobsDTO, Jobs> {
    @Mapping(target = "category", source = "category", qualifiedByName = "categoryId")
    JobsDTO toDto(Jobs s);

    @Named("categoryId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CategoryDTO toDtoCategoryId(Category category);
}
