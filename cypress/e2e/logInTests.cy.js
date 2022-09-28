describe('Invalid Sign In Displays Generic Message', () => {
    it('displays generic message if password is invalid"', () => {
        cy.visit('http://localhost:3000/login')

        cy.get('[placeholder="Username"]').type("test1")
        cy.get('[placeholder="Password"]').type("invalidPassword")
        cy.get('.amplify-button').contains("Sign in").click()

        cy.get(".amplify-alert__body").should("have.text", "Incorrect username or password.")
    })
})