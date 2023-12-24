import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('Jobs e2e test', () => {
  const jobsPageUrl = '/jobs';
  const jobsPageUrlPattern = new RegExp('/jobs(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const jobsSample = { title: 'discompose below improbable', slug: 'successfully' };

  let jobs;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/jobs+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/jobs').as('postEntityRequest');
    cy.intercept('DELETE', '/api/jobs/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (jobs) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/jobs/${jobs.id}`,
      }).then(() => {
        jobs = undefined;
      });
    }
  });

  it('Jobs menu should load Jobs page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('jobs');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Jobs').should('exist');
    cy.url().should('match', jobsPageUrlPattern);
  });

  describe('Jobs page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(jobsPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Jobs page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/jobs/new$'));
        cy.getEntityCreateUpdateHeading('Jobs');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', jobsPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/jobs',
          body: jobsSample,
        }).then(({ body }) => {
          jobs = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/jobs+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/jobs?page=0&size=20>; rel="last",<http://localhost/api/jobs?page=0&size=20>; rel="first"',
              },
              body: [jobs],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(jobsPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Jobs page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('jobs');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', jobsPageUrlPattern);
      });

      it('edit button click should load edit Jobs page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Jobs');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', jobsPageUrlPattern);
      });

      it('edit button click should load edit Jobs page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Jobs');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', jobsPageUrlPattern);
      });

      it('last delete button click should delete instance of Jobs', () => {
        cy.intercept('GET', '/api/jobs/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('jobs').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', jobsPageUrlPattern);

        jobs = undefined;
      });
    });
  });

  describe('new Jobs page', () => {
    beforeEach(() => {
      cy.visit(`${jobsPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Jobs');
    });

    it('should create an instance of Jobs', () => {
      cy.get(`[data-cy="title"]`).type('gee');
      cy.get(`[data-cy="title"]`).should('have.value', 'gee');

      cy.get(`[data-cy="slug"]`).type('blissfully psst willing');
      cy.get(`[data-cy="slug"]`).should('have.value', 'blissfully psst willing');

      cy.get(`[data-cy="featureImage"]`).type('alarming promise');
      cy.get(`[data-cy="featureImage"]`).should('have.value', 'alarming promise');

      cy.get(`[data-cy="validFrom"]`).type('2023-12-23T22:53');
      cy.get(`[data-cy="validFrom"]`).blur();
      cy.get(`[data-cy="validFrom"]`).should('have.value', '2023-12-23T22:53');

      cy.get(`[data-cy="validThrough"]`).type('2023-12-24T09:18');
      cy.get(`[data-cy="validThrough"]`).blur();
      cy.get(`[data-cy="validThrough"]`).should('have.value', '2023-12-24T09:18');

      cy.get(`[data-cy="status"]`).select('TRASHED');

      cy.get(`[data-cy="createdBy"]`).type('12887');
      cy.get(`[data-cy="createdBy"]`).should('have.value', '12887');

      cy.get(`[data-cy="createdDate"]`).type('2023-12-23T23:21');
      cy.get(`[data-cy="createdDate"]`).blur();
      cy.get(`[data-cy="createdDate"]`).should('have.value', '2023-12-23T23:21');

      cy.get(`[data-cy="updateDate"]`).type('2023-12-24T09:23');
      cy.get(`[data-cy="updateDate"]`).blur();
      cy.get(`[data-cy="updateDate"]`).should('have.value', '2023-12-24T09:23');

      cy.get(`[data-cy="updateBy"]`).type('1937');
      cy.get(`[data-cy="updateBy"]`).should('have.value', '1937');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        jobs = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', jobsPageUrlPattern);
    });
  });
});
