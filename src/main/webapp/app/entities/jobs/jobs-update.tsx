import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICategory } from 'app/shared/model/category.model';
import { getEntities as getCategories } from 'app/entities/category/category.reducer';
import { IJobs } from 'app/shared/model/jobs.model';
import { JobStatus } from 'app/shared/model/enumerations/job-status.model';
import { getEntity, updateEntity, createEntity, reset } from './jobs.reducer';

export const JobsUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const categories = useAppSelector(state => state.category.entities);
  const jobsEntity = useAppSelector(state => state.jobs.entity);
  const loading = useAppSelector(state => state.jobs.loading);
  const updating = useAppSelector(state => state.jobs.updating);
  const updateSuccess = useAppSelector(state => state.jobs.updateSuccess);
  const jobStatusValues = Object.keys(JobStatus);

  const handleClose = () => {
    navigate('/jobs' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getCategories({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    values.validFrom = convertDateTimeToServer(values.validFrom);
    values.validThrough = convertDateTimeToServer(values.validThrough);
    if (values.createdBy !== undefined && typeof values.createdBy !== 'number') {
      values.createdBy = Number(values.createdBy);
    }
    values.createdDate = convertDateTimeToServer(values.createdDate);
    values.updateDate = convertDateTimeToServer(values.updateDate);
    if (values.updateBy !== undefined && typeof values.updateBy !== 'number') {
      values.updateBy = Number(values.updateBy);
    }

    const entity = {
      ...jobsEntity,
      ...values,
      category: categories.find(it => it.id.toString() === values.category.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          validFrom: displayDefaultDateTime(),
          validThrough: displayDefaultDateTime(),
          createdDate: displayDefaultDateTime(),
          updateDate: displayDefaultDateTime(),
        }
      : {
          status: 'DRAFT',
          ...jobsEntity,
          validFrom: convertDateTimeFromServer(jobsEntity.validFrom),
          validThrough: convertDateTimeFromServer(jobsEntity.validThrough),
          createdDate: convertDateTimeFromServer(jobsEntity.createdDate),
          updateDate: convertDateTimeFromServer(jobsEntity.updateDate),
          category: jobsEntity?.category?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="project1Week2App.jobs.home.createOrEditLabel" data-cy="JobsCreateUpdateHeading">
            <Translate contentKey="project1Week2App.jobs.home.createOrEditLabel">Create or edit a Jobs</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="jobs-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('project1Week2App.jobs.title')}
                id="jobs-title"
                name="title"
                data-cy="title"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('project1Week2App.jobs.slug')}
                id="jobs-slug"
                name="slug"
                data-cy="slug"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('project1Week2App.jobs.featureImage')}
                id="jobs-featureImage"
                name="featureImage"
                data-cy="featureImage"
                type="text"
              />
              <ValidatedField
                label={translate('project1Week2App.jobs.validFrom')}
                id="jobs-validFrom"
                name="validFrom"
                data-cy="validFrom"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('project1Week2App.jobs.validThrough')}
                id="jobs-validThrough"
                name="validThrough"
                data-cy="validThrough"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('project1Week2App.jobs.status')}
                id="jobs-status"
                name="status"
                data-cy="status"
                type="select"
              >
                {jobStatusValues.map(jobStatus => (
                  <option value={jobStatus} key={jobStatus}>
                    {translate('project1Week2App.JobStatus.' + jobStatus)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('project1Week2App.jobs.createdBy')}
                id="jobs-createdBy"
                name="createdBy"
                data-cy="createdBy"
                type="text"
              />
              <ValidatedField
                label={translate('project1Week2App.jobs.createdDate')}
                id="jobs-createdDate"
                name="createdDate"
                data-cy="createdDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('project1Week2App.jobs.updateDate')}
                id="jobs-updateDate"
                name="updateDate"
                data-cy="updateDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('project1Week2App.jobs.updateBy')}
                id="jobs-updateBy"
                name="updateBy"
                data-cy="updateBy"
                type="text"
              />
              <ValidatedField
                id="jobs-category"
                name="category"
                data-cy="category"
                label={translate('project1Week2App.jobs.category')}
                type="select"
              >
                <option value="" key="0" />
                {categories
                  ? categories.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/jobs" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default JobsUpdate;
