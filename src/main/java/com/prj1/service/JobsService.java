package com.prj1.service;

import com.prj1.service.dto.JobsDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.prj1.domain.Jobs}.
 */
public interface JobsService {
    /**
     * Save a jobs.
     *
     * @param jobsDTO the entity to save.
     * @return the persisted entity.
     */
    JobsDTO save(JobsDTO jobsDTO);

    /**
     * Updates a jobs.
     *
     * @param jobsDTO the entity to update.
     * @return the persisted entity.
     */
    JobsDTO update(JobsDTO jobsDTO);

    /**
     * Partially updates a jobs.
     *
     * @param jobsDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<JobsDTO> partialUpdate(JobsDTO jobsDTO);

    /**
     * Get all the jobs.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<JobsDTO> findAll(Pageable pageable);

    /**
     * Get the "id" jobs.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<JobsDTO> findOne(Long id);

    /**
     * Delete the "id" jobs.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
