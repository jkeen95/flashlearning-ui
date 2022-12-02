//Test Case ID: Test89
describe('Not Permitted To Browse Fake Set', () => {
    it("validate that the permission message is displayed when a user tries to browse a set which does not exist", () => {
        cy.visit('http://localhost:3000/set/fakeSet/browse')
        cy.get('[placeholder="Username"]').type(Cypress.env("test1_username"))
        cy.get('[placeholder="Password"]').type(Cypress.env("test1_password"))
        cy.get('.amplify-button').contains("Sign in").click()
        cy.wait(1000)
        cy.get('h1:contains("You are not permitted to view this set!")').should("exist")
    })
})

//Test Case ID: Test90
describe('Not Permitted To Memorize Fake Set', () => {
    it("validate that the permission message is displayed when a user tries to memorize a set which does not exist", () => {
        cy.visit('http://localhost:3000/set/fakeSet/memorize')
        cy.get('[placeholder="Username"]').type(Cypress.env("test1_username"))
        cy.get('[placeholder="Password"]').type(Cypress.env("test1_password"))
        cy.get('.amplify-button').contains("Sign in").click()
        cy.wait(1000)
        cy.get('h1:contains("You are not permitted to view this set!")').should("exist")
    })
})

//Test Case ID: Test91
describe('Not Permitted To Edit Fake Set', () => {
    it("validate that the permission message is displayed when a user tries to edit a set which does not exist", () => {
        cy.visit('http://localhost:3000/set/fakeSet/edit')
        cy.get('[placeholder="Username"]').type(Cypress.env("test1_username"))
        cy.get('[placeholder="Password"]').type(Cypress.env("test1_password"))
        cy.get('.amplify-button').contains("Sign in").click()
        cy.wait(1000)
        cy.get('h1:contains("You are not permitted to view this set!")').should("exist")
    })
})