//Test Case ID: Test103
describe('Checks Browse Page Edit Link', () => {
    it("validates that the edit link on the browse page takes the user to the edit page for the set", () => {
        cy.visit('https://main.d38j7hxrca4p4q.amplifyapp.com/set/01364586-5fb2-4284-b4c4-25a7df644f79/browse')
        cy.get('[placeholder="Username"]').type(Cypress.env("test1_username"))
        cy.get('[placeholder="Password"]').type(Cypress.env("test1_password"))
        cy.get('.amplify-button').contains("Sign in").click()
        cy.wait(1000)

        cy.get('a:contains("Edit")').click()
        cy.get('[value="BrowseSetTest"]').should("exist")
    })
})

//Test Case ID: Test104
describe('Checks Browse Page Memorize Link', () => {
    it("validates that the memorize link on the browse page take the user to the memorize page for the set", () => {
        cy.visit('https://main.d38j7hxrca4p4q.amplifyapp.com/set/01364586-5fb2-4284-b4c4-25a7df644f79/browse')
        cy.get('[placeholder="Username"]').type(Cypress.env("test1_username"))
        cy.get('[placeholder="Password"]').type(Cypress.env("test1_password"))
        cy.get('.amplify-button').contains("Sign in").click()
        cy.wait(1000)

        cy.get('a:contains("Memorize")').click()
        cy.get('h2:contains("How do you want to memorize this flashcard set?")').should("exist")
    })
})