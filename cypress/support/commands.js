// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { Auth } from 'aws-amplify'

const awsconfig = {
    aws_user_pools_id: Cypress.env("userPoolId"),
    aws_user_pools_web_client_id: Cypress.env("clientId"),
};

Auth.configure(awsconfig);

Cypress.Commands.add('deleteCurrentUser', () => {
    try {
        const result = Auth.deleteUser();
        console.log(result);
    } catch (error) {
        console.log('Error deleting user', error);
    }
})

Cypress.Commands.add('test88RandomConditions', () => {
    cy.get('.front').then(($card) => {
        if ($card.text().includes('A')) {
            cy.get('.next_button').click()
        } else if($card.text().includes('B')) {
            cy.get('.prev_button').click()
        } else if($card.text().includes('C')) {
            cy.get('.next_button').click()
        } else if($card.text().includes('D')) {
            cy.get('.prev_button').click()
        }
    })
})

Cypress.Commands.add('fill50Flashcards', (count, data) => {
    if(count !== 50) {
        cy.get('[placeholder="Title"]').last().type(data[count]["title"])
        cy.get('[placeholder="Definition"]').last().type(data[count]["def"])
        cy.contains("Add Flashcard").click()
        cy.fill50Flashcards(count+1, data)
    }
})