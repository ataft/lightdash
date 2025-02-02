describe('Dashboard List', () => {
    before(() => {
        // @ts-ignore
        cy.login();
        // @ts-ignore
        cy.preCompileProject();
    });

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('connect.sid');
    });

    it('Should display dashboards', () => {
        cy.visit('/');
        cy.findByRole('button', { name: 'Browse' }).click();
        cy.findByRole('button', { name: 'Dashboards' }).click();
        cy.findByText('Jaffle dashboard').should('exist');
    });

    it('Should delete dashboards', () => {
        cy.visit('/');
        cy.findByRole('button', { name: 'Browse' }).click();
        cy.findByRole('button', { name: 'Dashboards' }).click();
        // click on delete
        cy.get('[data-icon=more]').click();
        cy.findByRole('button', { name: 'Delete' }).click();
        // click on delete in the popup
        cy.findByText('Delete').click();
        cy.findByText('No results available');
    });

    it('Should create a new dashboard', () => {
        cy.visit('/');
        cy.findByRole('button', { name: 'Browse' }).click();
        cy.findByRole('button', { name: 'Dashboards' }).click();
        cy.findByRole('button', { name: 'Create dashboard' }).click();

        cy.url().should(
            'match',
            /.*\/projects\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\/dashboards\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/,
        );
        cy.findByText('Untitled dashboard').should('exist');
    });

    it('Should update dashboards', () => {
        cy.visit('/');
        cy.findByRole('button', { name: 'Browse' }).click();
        cy.findByRole('button', { name: 'Dashboards' }).click();
        // click on rename
        cy.get('[data-icon=more]').click();
        cy.findByRole('button', { name: 'Rename' }).click();
        cy.findByLabelText('Name *').clear().type('Jaffle dashboard');
        // click on save
        cy.findByRole('button', { name: 'Save' }).click();

        // verify dashboard name has been updated in the list
        cy.findByText('Jaffle dashboard').should('exist');
    });
});
