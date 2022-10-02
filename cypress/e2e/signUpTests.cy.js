//Test Case ID: Test1
describe('Sign Up Is Successful', () => {
    it("displays the homepage with the welcome message and the new user's name", () => {
        cy.visit('http://localhost:3000/login')

        cy.contains("Create Account").click()
        cy.get('[placeholder="Username"]').type("signUpUser")
        cy.get('[placeholder="Password"]').type("p@ssw0rD")
        cy.get('[placeholder="Confirm Password"]').type("p@ssw0rD")
        cy.get('[placeholder="Birthdate"]').type("2000-12-12")
        cy.get('[placeholder="Email"]').type("jak5879@psu.edu")
        cy.get('[placeholder="Name"]').type("New User")
        cy.get('.amplify-button').contains("Create Account").click()

        cy.wait(1000)

        cy.get("#welcomeMessage").should("have.text", "Welcome New User")

        cy.deleteCurrentUser()
    })
})