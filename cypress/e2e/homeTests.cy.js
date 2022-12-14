//Test Case ID: Test105
describe('Checks Homepage Browse Link', () => {
    it("validates that the browse link on the homepage takes the user to the browse page for the set", () => {
        cy.visit('https://main.d38j7hxrca4p4q.amplifyapp.com/create/set')

        cy.get('[placeholder="Username"]').type(Cypress.env("test1_username"))
        cy.get('[placeholder="Password"]').type(Cypress.env("test1_password"))
        cy.get('.amplify-button').contains("Sign in").click()
        cy.wait(1000)
        cy.get('[placeholder="Set Name"]').type("HomeSet")
        cy.get('[placeholder="Title"]').last().type("A")
        cy.get('[placeholder="Definition"]').last().type("1")
        cy.get('[type="submit"').click()
        cy.wait(1000)
        cy.contains("Home").click()
        cy.contains("HomeSet").click()
        cy.contains("Name: HomeSet").should("exist")
        cy.url().should("include", "/browse")
    })
})

//Test Case ID: Test106
describe('Checks Homepage Edit Link', () => {
    it("validates that the edit link on the homepage takes the user to the edit page for the set", () => {
        cy.visit('https://main.d38j7hxrca4p4q.amplifyapp.com/')
        cy.get('[placeholder="Username"]').type(Cypress.env("test1_username"))
        cy.get('[placeholder="Password"]').type(Cypress.env("test1_password"))
        cy.get('.amplify-button').contains("Sign in").click()
        cy.wait(1000)

        cy.get('a:contains("Edit")').last().click()
        cy.get('[value="HomeSet"]').should("exist")
        cy.url().should("include", "/edit")
    })
})

//Test Case ID: Test107
describe('Checks Homepage Delete Link', () => {
    it("validates that the delete link on the homepage deletes the set entry", () => {
        cy.visit('https://main.d38j7hxrca4p4q.amplifyapp.com/')
        cy.get('[placeholder="Username"]').type(Cypress.env("test1_username"))
        cy.get('[placeholder="Password"]').type(Cypress.env("test1_password"))
        cy.get('.amplify-button').contains("Sign in").click()
        cy.wait(1000)

        cy.contains("HomeSet").should("exist")
        cy.get('.deleteButton').last().click()
        cy.contains("HomeSet").should("not.exist")
    })
})