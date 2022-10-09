//Test Case ID: Test6
describe('Invalid Sign In Displays Generic Message', () => {
    it('displays generic message if password is invalid"', () => {
        cy.visit('http://localhost:3000/')

        cy.get('[placeholder="Username"]').type(Cypress.env("test1_username"))
        cy.get('[placeholder="Password"]').type("invalidPassword")
        cy.get('.amplify-button').contains("Sign in").click()

        cy.get(".amplify-alert__body").should("have.text", "Incorrect username or password.")
    })
})

describe('Login Is Successful', () => {
    it("displays the homepage with the welcome message and the user's name", () => {
        cy.visit('http://localhost:3000/')

        cy.get('[placeholder="Username"]').type(Cypress.env("test1_username"))
        cy.get('[placeholder="Password"]').type(Cypress.env("test1_password"))
        cy.get('.amplify-button').contains("Sign in").click()

        cy.get("#welcomeMessage").should("have.text", "Welcome J K")
    })
})