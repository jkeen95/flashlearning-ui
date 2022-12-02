//Test Case ID: Test1
describe('Sign Up Is Successful', () => {
    it("displays the homepage with the welcome message and the new user's name", () => {
        cy.visit('https://main.d38j7hxrca4p4q.amplifyapp.com/')

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

//Test Case ID: Test19
describe('Sign Up with Invalid Birthdate is Rejected', () => {
    it("displays the error message ", () => {
        cy.visit('https://main.d38j7hxrca4p4q.amplifyapp.com/')

        cy.contains("Create Account").click()
        cy.get('[placeholder="Username"]').type("invalidBirthdate")
        cy.get('[placeholder="Password"]').type("p@ssw0rD")
        cy.get('[placeholder="Confirm Password"]').type("p@ssw0rD")
        cy.get('[placeholder="Birthdate"]').type("3000-12-12")
        cy.get('[placeholder="Email"]').type("jak5879@psu.edu")
        cy.get('[placeholder="Name"]').type("New User")
        cy.get('.amplify-button').contains("Create Account").click()

        cy.get(".amplify-alert__body").should("have.text", "PreSignUp failed with error User's age must be 13 years or older.")
    })
})

