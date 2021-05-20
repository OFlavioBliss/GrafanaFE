// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
// References for autocomplete
/// <reference types="cypress"/>
// @ts-nocheck

// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-plugin-snapshots/commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
require('cypress-xpath')
require('@cypress/skip-test/support')

const addContext = require('mochawesome/addContext')

Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    const screenshotFileName = `${runnable.parent.title} -- ${test.title} (failed).png`
    addContext({ test }, `assets/${Cypress.spec.name}/${screenshotFileName}`)
  }
})

// eslint-disable-next-line no-unused-vars
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})
