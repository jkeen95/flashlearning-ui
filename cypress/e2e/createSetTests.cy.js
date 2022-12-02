//Test Case ID: Test22
describe('Builds a set with only complete flashcards', () => {
    it("checks that a set with only completed flashcards are created when a new set is made while there are empty flashcard input fields", () => {
        cy.visit('https://main.d38j7hxrca4p4q.amplifyapp.com/')

        cy.get('[placeholder="Username"]').type(Cypress.env("test1_username"))
        cy.get('[placeholder="Password"]').type(Cypress.env("test1_password"))
        cy.get('.amplify-button').contains("Sign in").click()
        cy.wait(2000)
        cy.visit('https://main.d38j7hxrca4p4q.amplifyapp.com/create/set')
        cy.get('[placeholder="Set Name"]').type("SetFor22")
        cy.get('[placeholder="Description"]').type("Test Description!!")
        cy.get('[placeholder="Title"]').last().type("A")
        cy.get('[placeholder="Definition"]').last().type("1")
        cy.contains("Add Flashcard").click()
        cy.get('[placeholder="Title"]').last().type("B")
        cy.get('[placeholder="Definition"]').last().type("2")
        cy.contains("Add Flashcard").click()
        cy.contains("Add Flashcard").click()
        cy.contains("Add Flashcard").click()
        cy.get('[type="submit"').click()
        cy.contains("ID:").should("exist")
        cy.contains("Name: SetFor22").should("exist")
        cy.contains("Description: Test Description!!").should("exist")
        cy.contains("A").should("exist")
        cy.contains("1 / 2").should("exist")
        cy.contains("Next").click()
        cy.contains("B").should("exist")
        cy.contains("2 / 2").should("exist")
        cy.wait(1000)
        cy.visit('https://main.d38j7hxrca4p4q.amplifyapp.com/')
        cy.get('.deleteButton').last().click()
    })
})

//Test Case ID: Test23
describe('Builds a set with only complete flashcards when some titles are empty', () => {
    it("checks that a set with only completed flashcards are created when a new set is made while there are empty flashcard title input fields", () => {
        cy.visit('https://main.d38j7hxrca4p4q.amplifyapp.com/')

        cy.get('[placeholder="Username"]').type(Cypress.env("test1_username"))
        cy.get('[placeholder="Password"]').type(Cypress.env("test1_password"))
        cy.get('.amplify-button').contains("Sign in").click()
        cy.wait(2000)
        cy.visit('https://main.d38j7hxrca4p4q.amplifyapp.com/create/set')
        cy.get('[placeholder="Set Name"]').type("SetFor23")
        cy.get('[placeholder="Description"]').type("Test Description!!")
        cy.get('[placeholder="Title"]').last().type("A")
        cy.get('[placeholder="Definition"]').last().type("1")
        cy.contains("Add Flashcard").click()
        cy.get('[placeholder="Definition"]').last().type("2")
        cy.get('[type="submit"').click()
        cy.contains("ID:").should("exist")
        cy.contains("Name: SetFor23").should("exist")
        cy.contains("Description: Test Description!!").should("exist")
        cy.contains("A").should("exist")
        cy.contains("1 / 1").should("exist")
        cy.wait(1000)
        cy.visit('https://main.d38j7hxrca4p4q.amplifyapp.com/')
        cy.get('.deleteButton').last().click()
    })
})

//Test Case ID: Test24
describe('Builds a set with only complete flashcards when some definitions are empty', () => {
    it("checks that a set with only completed flashcards are created when a new set is made while there are empty flashcard definition input fields", () => {
        cy.visit('https://main.d38j7hxrca4p4q.amplifyapp.com/')

        cy.get('[placeholder="Username"]').type(Cypress.env("test1_username"))
        cy.get('[placeholder="Password"]').type(Cypress.env("test1_password"))
        cy.get('.amplify-button').contains("Sign in").click()
        cy.wait(2000)
        cy.visit('https://main.d38j7hxrca4p4q.amplifyapp.com/create/set')
        cy.get('[placeholder="Set Name"]').type("SetFor24")
        cy.get('[placeholder="Description"]').type("Test Description!!")
        cy.get('[placeholder="Title"]').last().type("A")
        cy.get('[placeholder="Definition"]').last().type("1")
        cy.contains("Add Flashcard").click()
        cy.get('[placeholder="Title"]').last().type("B")
        cy.get('[type="submit"').click()
        cy.contains("ID:").should("exist")
        cy.contains("Name: SetFor24").should("exist")
        cy.contains("Description: Test Description!!").should("exist")
        cy.contains("A").should("exist")
        cy.contains("1 / 1").should("exist")
        cy.wait(1000)
        cy.visit('https://main.d38j7hxrca4p4q.amplifyapp.com/')
        cy.get('.deleteButton').last().click()
    })
})

//Test Case ID: Test25
describe('Requires At Least One Complete Title-Def Pair', () => {
    it("displays the homepage with the welcome message and the user's name", () => {
        cy.visit('https://main.d38j7hxrca4p4q.amplifyapp.com/')

        cy.get('[placeholder="Username"]').type(Cypress.env("test1_username"))
        cy.get('[placeholder="Password"]').type(Cypress.env("test1_password"))
        cy.get('.amplify-button').contains("Sign in").click()
        cy.wait(2000)
        cy.visit('https://main.d38j7hxrca4p4q.amplifyapp.com/create/set')
        cy.get('[placeholder="Set Name"]').type("SetFromTest")
        cy.get('[placeholder="Description"]').type("Test Description!!")
        cy.get('[placeholder="Title"]').type("Test Title")
        cy.get('[placeholder="Definition"]').type("Test Def")
        cy.get('[type="submit"').click()
        cy.contains("ID:").should("exist")
        cy.contains("Name: SetFromTest").should("exist")
        cy.contains("Description: Test Description!!").should("exist")
        cy.contains("Test Title").should("exist")
        cy.wait(1000)
        cy.visit('https://main.d38j7hxrca4p4q.amplifyapp.com/')
        cy.get('.deleteButton').last().click()
    })
})

//Test Case ID: Test4
describe('Saves 50 flashcards in under 10 seconds', () => {
    it("validates that a newly created set with 50 flashcards is saved in under 10 seconds", () => {
        const fiftyCardData = [{"title": "A", "def": "1"},{"title": "B", "def": "1"},{"title": "C", "def": "1"},{"title": "D", "def": "1"},{"title": "E", "def": "1"},{"title": "F", "def": "1"},{"title": "G", "def": "1"},{"title": "H", "def": "1"},
            {"title": "I", "def": "1"},{"title": "J", "def": "1"},{"title": "K", "def": "1"},{"title": "L", "def": "1"},{"title": "M", "def": "1"},{"title": "N", "def": "1"},{"title": "O", "def": "1"},{"title": "P", "def": "1"},{"title": "Q", "def": "1"},
            {"title": "R", "def": "1"},{"title": "S", "def": "1"},{"title": "T", "def": "1"},{"title": "U", "def": "1"},{"title": "V", "def": "1"},{"title": "W", "def": "1"},{"title": "X", "def": "1"},{"title": "Y", "def": "1"},{"title": "Z", "def": "1"},
            {"title": "AA", "def": "1"},{"title": "BB", "def": "1"},{"title": "CC", "def": "1"},{"title": "DD", "def": "1"},{"title": "EE", "def": "1"},{"title": "FF", "def": "1"},{"title": "GG", "def": "1"},{"title": "HH", "def": "1"},
            {"title": "II", "def": "1"},{"title": "JJ", "def": "1"},{"title": "KK", "def": "1"},{"title": "LL", "def": "1"},{"title": "MM", "def": "1"},{"title": "NN", "def": "1"},{"title": "OO", "def": "1"},{"title": "PP", "def": "1"},
            {"title": "QQ", "def": "1"},{"title": "RR", "def": "1"},{"title": "SS", "def": "1"},{"title": "TT", "def": "1"},{"title": "UU", "def": "1"},{"title": "VV", "def": "1"},{"title": "WW", "def": "1"},{"title": "XX", "def": "1"}]

        cy.visit('https://main.d38j7hxrca4p4q.amplifyapp.com/create/set')

        cy.get('[placeholder="Username"]').type(Cypress.env("test1_username"))
        cy.get('[placeholder="Password"]').type(Cypress.env("test1_password"))
        cy.get('.amplify-button').contains("Sign in").click()
        cy.wait(1000)
        cy.get('[placeholder="Set Name"]').type("50CardSet")
        cy.get('[placeholder="Description"]').type("Test Description!!")
        cy.fill50Flashcards(0, fiftyCardData)

        let started
        cy.contains("Submit").should("be.visible").then(() => {
            started = +new Date()
        }).click()
        cy.contains("1 / 50").then(() => {
            const finished = +new Date()
            const elapsed = finished - started
            expect(elapsed).to.be.lessThan(10000)
        })

        cy.visit('https://main.d38j7hxrca4p4q.amplifyapp.com/')
        cy.get('.deleteButton').last().click()
    })
})