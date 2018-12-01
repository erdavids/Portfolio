/// <reference types="Cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/actions')
  })

  // https://on.cypress.io/interacting-with-elements

  it('works', () => {
    cy.visit('https://applitools.com/helloworld');

    //Start the test
    cy.eyesOpen({
      appName: 'Hello World!',
      testName: 'My first JavaScript test!',
      browser: { width: 800, height: 600 },
    });

    // Add checkpoint #1 (This is test step #1)
    cy.eyesCheckWindow('Main Page');

    cy.get('button').click();

    // Add checkpoint #2 (This is test step #2)
    cy.eyesCheckWindow('Click!');

    //End Test
    cy.eyesClose();
  });
})
