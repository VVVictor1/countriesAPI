describe('Country Information App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('loads the app', () => {
    cy.contains('Country Information App');
  });

  it('fetches country information', () => {
    cy.get('input').should('exist').type('Canada');
    cy.get('button').click();
    cy.contains('Loading...').should('be.visible');
    cy.contains('Loading...').should('not.exist');

    cy.get('.card-container', { timeout: 10000 }).then(() => {
      cy.contains('Canada'); 
    });
  });

  it('displays Open Map link', () => {
    cy.get('input').should('exist').type('Canada'); 
    cy.get('button').click();
    cy.get('a[href*="openstreetmap"]').should('be.visible').click();
  }); 
});
