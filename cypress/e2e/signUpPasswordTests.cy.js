//Test Case ID: Test3
describe('Sign up with password with less than 8 characters', () => {
  it('displays error message for password with less than 8 characters"', () => {
    cy.visit('http://localhost:3000/')

    cy.contains("Create Account").click()
    cy.get('[placeholder="Password"]').type("iE1#")
    cy.contains("Create Account").click()

    cy.get(".amplify-text--error").should("have.text", "Password must have at least 8 characters")
  })
})

//Test Case ID: Test16
describe('Sign up with password with no lower case characters', () => {
  it('displays error message for password with no lower case characters"', () => {
    cy.visit('http://localhost:3000/')

    cy.contains("Create Account").click()
    cy.get('[placeholder="Password"]').type("EE12#$FF")
    cy.contains("Create Account").click()

    cy.get(".amplify-text--error").should("have.text", "Password must have lower case letters")
  })
})

//Test Case ID: Test15
describe('Sign up with password with no upper case characters', () => {
  it('displays error message for password with no upper case characters"', () => {
    cy.visit('http://localhost:3000/')

    cy.contains("Create Account").click()
    cy.get('[placeholder="Password"]').type("ee12#$ff")
    cy.contains("Create Account").click()

    cy.get(".amplify-text--error").should("have.text", "Password must have upper case letters")
  })
})


//Test Case ID: Test13
describe('Sign up with password with no special characters', () => {
  it('displays error message for password with no special characters"', () => {
    cy.visit('http://localhost:3000/')

    cy.contains("Create Account").click()
    cy.get('[placeholder="Password"]').type("EE12efFF")
    cy.contains("Create Account").click()

    cy.get(".amplify-text--error").should("have.text", "Password must have special characters")
  })
})

//Test Case ID: Test14
describe('Sign up with password with no numbers', () => {
  it('displays error message for password with no numbers"', () => {
    cy.visit('http://localhost:3000/')

    cy.contains("Create Account").click()
    cy.get('[placeholder="Password"]').type("EEef#$FF")
    cy.contains("Create Account").click()

    cy.get(".amplify-text--error").should("have.text", "Password must have numbers")
  })
})

//Test Case ID: Test2
describe('Sign up with valid password', () => {
  it('displays no error messages when valid password is entered"', () => {
    cy.visit('http://localhost:3000/')

    cy.contains("Create Account").click()
    cy.get('[placeholder="Password"]').type("E@e1F#f2")
    cy.contains("Create Account").click()

    cy.get(".amplify-text--error").should("not.exist")
  })
})