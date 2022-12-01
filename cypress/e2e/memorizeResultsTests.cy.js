//Test Case ID: Test87
describe('Correct Results For Original Order Memorization Session', () => {
    it("validate the correct incorrectly guessed cards are shown when a memorization session in original order without repetition is finished", () => {
        cy.visit('http://localhost:3000/set/d903efca-896f-44dc-a6fe-99f20878cea3/memorize')

        cy.get('[placeholder="Username"]').type(Cypress.env("test1_username"))
        cy.get('[placeholder="Password"]').type(Cypress.env("test1_password"))
        cy.get('.amplify-button').contains("Sign in").click()
        cy.wait(1000)
        cy.contains('Submit').click()
        cy.get('.next_button').click()
        cy.get('.prev_button').click()
        cy.get('.next_button').click()
        cy.get('.prev_button').click()
        cy.get('p:contains("  - Card #2 = 1 time")').should("exist")
        cy.get('p:contains("  - Card #4 = 1 time")').should("exist")
    })
})

//Test Case ID: Test88
describe('Correct Results For Random Order Memorization Session', () => {
    it("validate the correct incorrectly guessed cards are shown when a memorization session in random order without repetition is finished", () => {
        cy.visit('http://localhost:3000/set/d903efca-896f-44dc-a6fe-99f20878cea3/memorize')

        cy.get('[placeholder="Username"]').type(Cypress.env("test1_username"))
        cy.get('[placeholder="Password"]').type(Cypress.env("test1_password"))
        cy.get('.amplify-button').contains("Sign in").click()
        cy.wait(1000)
        cy.get('[name=Random]').click()
        cy.contains('Submit').click()
        cy.test88RandomConditions()
        cy.test88RandomConditions()
        cy.test88RandomConditions()
        cy.test88RandomConditions()
        cy.get('p:contains("  - Card #2 = 1 time")').should("exist")
        cy.get('p:contains("  - Card #4 = 1 time")').should("exist")
    })
})

//Test Case ID: Test88
describe('Correct Results For Random Order Memorization Session', () => {
    it("validate the correct incorrectly guessed cards are shown when a memorization session in random order without repetition is finished", () => {
        cy.visit('http://localhost:3000/set/d903efca-896f-44dc-a6fe-99f20878cea3/memorize')

        cy.get('[placeholder="Username"]').type(Cypress.env("test1_username"))
        cy.get('[placeholder="Password"]').type(Cypress.env("test1_password"))
        cy.get('.amplify-button').contains("Sign in").click()
        cy.wait(1000)
        cy.contains('Submit').click()
        cy.get('.next_button').click()
        cy.get('.prev_button').click()
        cy.get('.next_button').click()
        cy.get('.prev_button').click()
        cy.get('h4:contains("Correct Percentage: 50%")').should("exist")
        cy.get('h4:contains("Incorrect Guesses: 2")').should("exist")
        cy.get('p:contains("  - Card #2 = 1 time")').should("exist")
        cy.get('p:contains("  - Card #4 = 1 time")').should("exist")
    })
})