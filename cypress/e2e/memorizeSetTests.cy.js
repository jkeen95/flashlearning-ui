//Test Case ID: Test92
describe('No Correct Guesses Remaining Message Shown Before First Guess', () => {
    it("validate that no message is shown when a flashcard has not been guessed during a memorization session with repetition", () => {
        cy.visit('https://main.d38j7hxrca4p4q.amplifyapp.com/set/74013da0-c900-40fb-9bef-addbd5cb7087/memorize')
        cy.get('[placeholder="Username"]').type(Cypress.env("test1_username"))
        cy.get('[placeholder="Password"]').type(Cypress.env("test1_password"))
        cy.get('.amplify-button').contains("Sign in").click()
        cy.wait(1000)
        cy.get('[name=Repetition]').click()
        cy.contains('Submit').click()
        cy.contains("Correct Guess").should("not.exist")
    })
})

//Test Case ID: Test95
describe('Run New Session Button', () => {
    it("validate that the Run New Session button displays the memorization settings", () => {
        cy.visit('https://main.d38j7hxrca4p4q.amplifyapp.com/set/74013da0-c900-40fb-9bef-addbd5cb7087/memorize')
        cy.get('[placeholder="Username"]').type(Cypress.env("test1_username"))
        cy.get('[placeholder="Password"]').type(Cypress.env("test1_password"))
        cy.get('.amplify-button').contains("Sign in").click()
        cy.wait(1000)
        cy.contains('Submit').click()
        cy.get('.next_button').click()
        cy.get('.next_button').click()
        cy.get('.next_button').click()
        cy.contains("Run New Session").click()
        cy.get('h2:contains("How do you want to memorize this flashcard set?")').should("exist")
    })
})

//Test Case ID: Test96
describe('Exit Session Button', () => {
    it("validate that the Exit Session button displays the browse page for a set", () => {
        cy.visit('https://main.d38j7hxrca4p4q.amplifyapp.com/set/74013da0-c900-40fb-9bef-addbd5cb7087/memorize')
        cy.get('[placeholder="Username"]').type(Cypress.env("test1_username"))
        cy.get('[placeholder="Password"]').type(Cypress.env("test1_password"))
        cy.get('.amplify-button').contains("Sign in").click()
        cy.wait(1000)
        cy.contains('Submit').click()
        cy.get('.next_button').click()
        cy.get('.next_button').click()
        cy.get('.next_button').click()
        cy.contains("Exit Session").click()
        cy.url().should("eq", "https://main.d38j7hxrca4p4q.amplifyapp.com/set/74013da0-c900-40fb-9bef-addbd5cb7087/browse")
    })
})

//Test Case ID: Test97
describe('Shows Correct Index after Incorrect Guesses', () => {
    it("validate that the correct index and amount of cards is shown when a card is inserted into the set being studied for a memorization session with repetition", () => {
        cy.visit('https://main.d38j7hxrca4p4q.amplifyapp.com/set/74013da0-c900-40fb-9bef-addbd5cb7087/memorize')
        cy.get('[placeholder="Username"]').type(Cypress.env("test1_username"))
        cy.get('[placeholder="Password"]').type(Cypress.env("test1_password"))
        cy.get('.amplify-button').contains("Sign in").click()
        cy.wait(1000)
        cy.get('[name=Repetition]').click()
        cy.contains('Submit').click()
        cy.contains("1 / 3").should("exist")
        cy.get('.prev_button').click()
        cy.contains("2 / 4").should("exist")
        cy.get('.prev_button').click()
        cy.contains("3 / 5").should("exist")
        cy.get('.prev_button').click()
        cy.contains("4 / 6").should("exist")
    })
})

//Test Case ID: Test98
describe('Finish Memorize Session in Original Order', () => {
    it("validates that a memorize session in original order can be finished", () => {
        cy.visit('https://main.d38j7hxrca4p4q.amplifyapp.com/set/74013da0-c900-40fb-9bef-addbd5cb7087/memorize')
        cy.get('[placeholder="Username"]').type(Cypress.env("test1_username"))
        cy.get('[placeholder="Password"]').type(Cypress.env("test1_password"))
        cy.get('.amplify-button').contains("Sign in").click()
        cy.wait(1000)
        cy.contains('Submit').click()
        cy.get('.prev_button').click()
        cy.get('.next_button').click()
        cy.get('.next_button').click()
        cy.contains("Finished Studying the Title side of the Flashcard Set, TestSet92, in Original order without Repetition!").should("exist")
    })
})

//Test Case ID: Test99
describe('Finish Memorize Session in Random Order', () => {
    it("validates that a memorize session in random order can be finished", () => {
        cy.visit('https://main.d38j7hxrca4p4q.amplifyapp.com/set/74013da0-c900-40fb-9bef-addbd5cb7087/memorize')
        cy.get('[placeholder="Username"]').type(Cypress.env("test1_username"))
        cy.get('[placeholder="Password"]').type(Cypress.env("test1_password"))
        cy.get('.amplify-button').contains("Sign in").click()
        cy.wait(1000)
        cy.get('[name=Random]').click()
        cy.contains('Submit').click()
        cy.get('.prev_button').click()
        cy.get('.next_button').click()
        cy.get('.next_button').click()
        cy.get('h1:contains("Finished Studying the Title side of the Flashcard Set, TestSet92, in Randomized order without Repetition!")').should("exist")
    })
})

//Test Case ID: Test100
describe('Finish Memorize Session With Repetition', () => {
    it("validates that a memorize session with repetition can be finished", () => {
        cy.visit('https://main.d38j7hxrca4p4q.amplifyapp.com/set/74013da0-c900-40fb-9bef-addbd5cb7087/memorize')
        cy.get('[placeholder="Username"]').type(Cypress.env("test1_username"))
        cy.get('[placeholder="Password"]').type(Cypress.env("test1_password"))
        cy.get('.amplify-button').contains("Sign in").click()
        cy.wait(1000)
        cy.get('[name=Repetition]').click()
        cy.contains('Submit').click()
        cy.get('.prev_button').click()
        cy.get('.next_button').click()
        cy.get('.next_button').click()
        cy.get('.next_button').click()
        cy.get('.next_button').click()
        cy.get('h1:contains("Finished Studying the Title side of the Flashcard Set, TestSet92, in Original order with Repetition!")').should("exist")
    })
})

//Test Case ID: Test101
describe('Finish Memorize Session for Title Side', () => {
    it("validates that a memorize session for the title side can be finished", () => {
        cy.visit('https://main.d38j7hxrca4p4q.amplifyapp.com/set/74013da0-c900-40fb-9bef-addbd5cb7087/memorize')
        cy.get('[placeholder="Username"]').type(Cypress.env("test1_username"))
        cy.get('[placeholder="Password"]').type(Cypress.env("test1_password"))
        cy.get('.amplify-button').contains("Sign in").click()
        cy.wait(1000)
        cy.contains('Submit').click()
        cy.get(".front").contains("A")
        cy.get('.prev_button').click()
        cy.get(".front").contains("B")
        cy.get('.next_button').click()
        cy.get(".front").contains("C")
        cy.get('.next_button').click()
        cy.contains("Finished Studying the Title side of the Flashcard Set, TestSet92, in Original order without Repetition!").should("exist")
    })
})

//Test Case ID: Test102
describe('Finish Memorize Session for Definition Side', () => {
    it("validates that a memorize session for the definition side can be finished", () => {
        cy.visit('https://main.d38j7hxrca4p4q.amplifyapp.com/set/74013da0-c900-40fb-9bef-addbd5cb7087/memorize')
        cy.get('[placeholder="Username"]').type(Cypress.env("test1_username"))
        cy.get('[placeholder="Password"]').type(Cypress.env("test1_password"))
        cy.get('.amplify-button').contains("Sign in").click()
        cy.wait(1000)
        cy.get('[name=Definition]').click()
        cy.contains('Submit').click()
        cy.get(".front").contains("1")
        cy.get('.prev_button').click()
        cy.get(".front").contains("2")
        cy.get('.next_button').click()
        cy.get(".front").contains("3")
        cy.get('.next_button').click()
        cy.contains("Finished Studying the Definition side of the Flashcard Set, TestSet92, in Original order without Repetition!").should("exist")
    })
})
