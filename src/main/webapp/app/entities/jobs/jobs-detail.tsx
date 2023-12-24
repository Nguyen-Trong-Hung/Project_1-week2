import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './jobs.reducer';

export const JobsDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const jobsEntity = useAppSelector(state => state.jobs.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="jobsDetailsHeading">
          <Translate contentKey="project1Week2App.jobs.detail.title">Jobs</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{jobsEntity.id}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="project1Week2App.jobs.title">Title</Translate>
            </span>
          </dt>
          <dd>{jobsEntity.title}</dd>
          <dt>
            <span id="slug">
              <Translate contentKey="project1Week2App.jobs.slug">Slug</Translate>
            </span>
          </dt>
          <dd>{jobsEntity.slug}</dd>
          <dt>
            <span id="featureImage">
              <Translate contentKey="project1Week2App.jobs.featureImage">Feature Image</Translate>
            </span>
          </dt>
          <dd>{jobsEntity.featureImage}</dd>
          <dt>
            <span id="validFrom">
              <Translate contentKey="project1Week2App.jobs.validFrom">Valid From</Translate>
            </span>
          </dt>
          <dd>{jobsEntity.validFrom ? <TextFormat value={jobsEntity.validFrom} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="validThrough">
              <Translate contentKey="project1Week2App.jobs.validThrough">Valid Through</Translate>
            </span>
          </dt>
          <dd>{jobsEntity.validThrough ? <TextFormat value={jobsEntity.validThrough} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="project1Week2App.jobs.status">Status</Translate>
            </span>
          </dt>
          <dd>{jobsEntity.status}</dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="project1Week2App.jobs.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{jobsEntity.createdBy}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="project1Week2App.jobs.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>{jobsEntity.createdDate ? <TextFormat value={jobsEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="updateDate">
              <Translate contentKey="project1Week2App.jobs.updateDate">Update Date</Translate>
            </span>
          </dt>
          <dd>{jobsEntity.updateDate ? <TextFormat value={jobsEntity.updateDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="updateBy">
              <Translate contentKey="project1Week2App.jobs.updateBy">Update By</Translate>
            </span>
          </dt>
          <dd>{jobsEntity.updateBy}</dd>
          <dt>
            <Translate contentKey="project1Week2App.jobs.category">Category</Translate>
          </dt>
          <dd>{jobsEntity.category ? jobsEntity.category.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/jobs" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/jobs/${jobsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default JobsDetail;
