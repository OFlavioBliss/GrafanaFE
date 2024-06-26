/**
 * ALL COMMANDS IN THIS FILE ARE LOCATED IN: cypress/support/commands.js
 * THIS FILE IS JUST AN ALIAS TO AVOID THE TS-2339 error cause by the TypeScript compiler
 *
 * THEREFORE, FOR EACH COMMAND CREATED IN cypress/support/commands.js, we need to add the respective interface in here with the same method name and parameters.
 */

declare namespace Cypress {
  interface Chainable {
    interceptHomeSystemInitializedAPICalls(interceptPermissions = false, fixtureFileNameContainingPermissions = ''): Chainable<Element>
  }

  interface Chainable {
    waitForHomeSystemInitializedApiCalls(): Chainable<Element>
  }

  interface Chainable {
    changeNetworkLatency(latencyTime: Number = -1): Chainable<Element>
  }

  interface Chainable {
    network(options: Object): Chainable<Element>
  }

  interface Chainable {
    assertNetworkOnline(options: Object): Chainable<Element>
  }

  interface Chainable {
    forcedWait(time: Number): Chainable<Element>
  }

  interface Chainable {
    getBearerToken(): Chainable<Element>
  }

  interface Chainable {
    purgeClient(clientId: Number): Chainable<Element>
  }

  interface Chainable {
    realHover(): Chainable<Element>
  }

  interface TestConfigOverrides {
    tags?: string | string[]
  }
}
