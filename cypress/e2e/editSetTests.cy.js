//Test Case ID: Test77
describe('Edit Flashcard set name', () => {
    it("validate the set title is changed after editing", () => {
        cy.visit('https://main.d38j7hxrca4p4q.amplifyapp.com/')

        cy.get('[placeholder="Username"]').type(Cypress.env("test1_username"))
        cy.get('[placeholder="Password"]').type(Cypress.env("test1_password"))
        cy.get('.amplify-button').contains("Sign in").click()
        cy.wait(1000)
        cy.get('[href="https://main.d38j7hxrca4p4q.amplifyapp.com/set/4c3d5353-9d0d-4499-94ef-3bb49112f2b2/edit"]').click()
        cy.get('[value="TestSet77"]').clear().type("ChangedSet77")
        cy.contains('Submit').click()
        cy.wait(1000)
        cy.contains("ChangedSet77").should("exist")
        cy.contains("Home").click()
        cy.contains("ChangedSet77").should("exist")
        cy.contains("TestSet77").should("not.exist")
        cy.get('[href="https://main.d38j7hxrca4p4q.amplifyapp.com/set/4c3d5353-9d0d-4499-94ef-3bb49112f2b2/edit"]').click()
        cy.get('[value="ChangedSet77"]').clear().type("TestSet77")
        cy.contains('Submit').click()
    })
})

//Test Case ID: Test78
describe('Edit Flashcard set description', () => {
    it("validate the set description is changed after editing", () => {
        cy.visit('https://main.d38j7hxrca4p4q.amplifyapp.com/')

        cy.get('[placeholder="Username"]').type(Cypress.env("test1_username"))
        cy.get('[placeholder="Password"]').type(Cypress.env("test1_password"))
        cy.get('.amplify-button').contains("Sign in").click()
        cy.wait(1000)
        cy.get('[href="https://main.d38j7hxrca4p4q.amplifyapp.com/set/4c3d5353-9d0d-4499-94ef-3bb49112f2b2/edit"]').click()
        cy.get('[placeholder="Description"]').clear().type("Changed Description")
        cy.contains('Submit').click()
        cy.wait(1000)
        cy.contains("Changed Description").should("exist")
        cy.contains("Home").click()
        cy.get('[href="https://main.d38j7hxrca4p4q.amplifyapp.com/set/4c3d5353-9d0d-4499-94ef-3bb49112f2b2/edit"]').click()
        cy.get('[placeholder="Description"]').clear().type("Test Description")
        cy.contains('Submit').click()
    })
})

//Test Case ID: Test79
describe('Edit Flashcard set by Adding New Flashcard', () => {
    it("validate the new flashcards replace the old flashcards in the set after editing", () => {
        cy.visit('https://main.d38j7hxrca4p4q.amplifyapp.com/')

        cy.get('[placeholder="Username"]').type(Cypress.env("test1_username"))
        cy.get('[placeholder="Password"]').type(Cypress.env("test1_password"))
        cy.get('.amplify-button').contains("Sign in").click()
        cy.wait(1000)
        cy.get('[href="https://main.d38j7hxrca4p4q.amplifyapp.com/set/4c3d5353-9d0d-4499-94ef-3bb49112f2b2/edit"]').click()
        cy.contains("Add Flashcard").click()
        cy.get('[placeholder="Title"]').last().type("C")
        cy.get('[placeholder="Definition"]').last().type("3")
        cy.contains('Submit').click()
        cy.wait(1000)
        cy.contains("1 / 3").should("exist")
        cy.contains("Home").click()
        cy.get('[href="https://main.d38j7hxrca4p4q.amplifyapp.com/set/4c3d5353-9d0d-4499-94ef-3bb49112f2b2/edit"]').click()
        cy.get("button:contains(Delete Flashcard)").last().click()
        cy.contains('Submit').click()
    })
})

//Test Case ID: Test80
describe('Edit Flashcard set by Deleting Flashcard', () => {
    it("To validate the new flashcards replace the old flashcards in the set after editing/deleting", () => {
        cy.visit('https://main.d38j7hxrca4p4q.amplifyapp.com/')

        cy.get('[placeholder="Username"]').type(Cypress.env("test1_username"))
        cy.get('[placeholder="Password"]').type(Cypress.env("test1_password"))
        cy.get('.amplify-button').contains("Sign in").click()
        cy.wait(1000)
        cy.get('[href="https://main.d38j7hxrca4p4q.amplifyapp.com/set/4c3d5353-9d0d-4499-94ef-3bb49112f2b2/edit"]').click()
        cy.get("button:contains(Delete Flashcard)").last().click()
        cy.contains('Submit').click()
        cy.wait(1000)
        cy.contains("1 / 1").should("exist")
        cy.contains("Home").click()
        cy.get('[href="https://main.d38j7hxrca4p4q.amplifyapp.com/set/4c3d5353-9d0d-4499-94ef-3bb49112f2b2/edit"]').click()
        cy.contains("Add Flashcard").click()
        cy.get('[placeholder="Title"]').last().type("B")
        cy.get('[placeholder="Definition"]').last().type("2")
        cy.contains('Submit').click()
    })
})