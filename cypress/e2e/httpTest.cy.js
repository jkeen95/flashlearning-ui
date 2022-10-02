describe('HTTP Request should be rejected', () => {
    it("displays the homepage with the welcome message and the user's name", () => {
        cy.visit('http://main.d38j7hxrca4p4q.amplifyapp.com/')
        cy.get("#genericFlashLearn").should("not.exist")
    })
})