import BasePage from './basePage'
import SearchBar from '../components/searchBar'

const searchBar = new SearchBar()

const selectors = {
  groupBySelector: '#clientGroupSelect .select > input',
  groupByAllCompanies: '#optionallclients',
  groupByAlphabetical: '#optionalphabetical',
  groupByStatus: '#optionstatus',
  groupByCountry: '#optioncountry',
  groupBySector: '#optionsector',
  favorite_icon: 'div.client-action-btn',
  clientCard: '#client-',
  clientCardHeader: '#clientCardHeader',
  clientCardCountryBadge: '#countryBadge',
  clientCardRegulatedStatus: '#regBadge',
  clientCardStatus: '#statusBadge'
}

const groupBySelectors = {
  // Favorites
  separatorFavorites: '#cardGroupSectionFavorites',

  // All Companies
  separatorAllCompanies: '#cardGroupSectionAllCompanies',

  // Alphabetical
  separator0_9: '#cardGroupSection0_9',
  separatorA: '#cardGroupSectionA',
  separatorB: '#cardGroupSectionB',
  separatorC: '#cardGroupSectionC',

  // Status
  separatorActive: '#cardGroupSectionActive',
  separatorDemo: '#cardGroupSectionDemo',
  separatorImplementation: '#cardGroupSectionImplementation',
  separatorTerminated: '#cardGroupSectionTerminated',

  // Country
  separatorAustralia: '#cardGroupSectionAustralia',
  separatorAustria: '#cardGroupSectionAustria',
  separatorAzerbaijan: '#cardGroupSectionAzerbaijan',
  separatorBahrain: '#cardGroupSectionBahrain',

  // Sector
  separatorUnknown: '#cardGroupSectionUnknown'
}

class HomePage extends BasePage {
  /**
   * Check if the current page is the home URL
   */
  checkHomeUrl() {
    this.checkUrl(Cypress.env('homePageURL'))
  }

  // --------------------------------------- GETS --------------------------------------------- //

  /**
   * Get client from the cards list
   *
   * @param {Number} clientId Client name to search
   */
  getClientCard(clientId) {
    return cy.get(`${selectors.clientCard}${clientId}`)
  }

  // --------------------------------- ASSERTIONS ----------------------------------- //

  /**
   * Assert if the client is favorite
   *
   * @param {Number} clientId Client id to be checked
   * @param {Boolean} favorite True fo assert the client is favorite, false otherwise
   */
  assertClientIsFavorite(clientId, favorite = true) {
    favorite ? cy.get(groupBySelectors.separatorFavorites).should('exist') : true

    if (favorite) {
      cy.get(`${selectors.clientCard}${clientId}.favoriteVisible`).should('be.visible')
    } else {
      cy.get(`${selectors.clientCard}${clientId}.favoriteVisible`).should('not.exist')
    }
  }

  /**
   * Validate basic information for the client. This information is the one displayed in the home page for each client
   * Example: Ex: 7digital => {GBR, REGULATED, ACTIVE}
   *
   * @param {Number} clientId Client id to verify the summary information
   * @param {String} clientName Client name to verify the summary information
   * @param {String} location Client location, example 'GBR' for UK clients
   * @param {String} regulated Client information about if it is regulated. Accepted parameters: 'Regulated' and 'Not Regulated'
   * @param {String} status Client status. Accepted parameters includes: 'Active', 'NOT SET', 'Terminated', 'Implementation'
   *
   * @example validateClientCardSummaryInformation('144', 'GBR', 'Regulated', 'Active')
   */
  assertClientCardSummaryInformation(clientId, clientName, location = 'GBR', regulated = 'Regulated', status = 'Active') {
    return (
      cy
        .get(selectors.clientCard + clientId + ' ' + selectors.clientCardHeader + clientId)
        .scrollIntoView()
        .contains(clientName) &&
      cy
        .get(selectors.clientCard + clientId + ' ' + selectors.clientCardCountryBadge + clientId)
        .scrollIntoView()
        .contains(location) &&
      cy
        .get(selectors.clientCard + clientId + ' ' + selectors.clientCardRegulatedStatus + clientId)
        .scrollIntoView()
        .contains(regulated) &&
      cy
        .get(selectors.clientCard + clientId + ' ' + selectors.clientCardStatus + clientId)
        .scrollIntoView()
        .contains(status)
    )
  }

  // ------------------------------------- OTHERS----------------------------------- //

  /**
   * Search for a client by ID
   *
   * @param {Number} clientId Client name to search
   */
  selectClientById(clientId) {
    this.getClientCard(clientId)
      .scrollIntoView()
      .click()
  }

  /**
   * Click in a client after using the search engine first
   *
   * @param {String} clientName Client name to search
   */
  selectClientFromTheListBySearch(clientName) {
    searchBar.search(clientName)
    searchBar.clearSearchBox()
    cy.contains(clientName) // avoid element detached from the DOM
    cy.xpath(`//gs-card//h4[normalize-space(text()) = '${clientName}']`).click()
  }

  /**
   * Favorite/Unfavorite a client from the home client list
   *
   * @param {Number} clientId Client id to be favored
   */
  favoriteUnfavoriteClient(clientId) {
    cy.get(`${selectors.clientCard}${clientId} ${selectors.favorite_icon}`)
      .first()
      .click({ force: true })
  }

  /**
   * Group the clients in the home page by the option chosen in the Group By selector.
   *
   * @param {String} groupBy The option to group the clients, it can be: alphabetical, status, country, or sector. If groupBy is not given, the default group method is All Companies
   */
  SelectGroupByOptionForCompanies(groupBy = '') {
    cy.get(selectors.groupBySelector).click()

    switch (groupBy.toLowerCase()) {
      case 'alphabetical':
        cy.get(selectors.groupByAlphabetical).click()
        break
      case 'status':
        cy.get(selectors.groupByStatus).click()
        break
      case 'country':
        cy.get(selectors.groupByCountry).click()
        break
      case 'sector':
        cy.get(selectors.groupBySector).click()
        break
      default:
        cy.get(selectors.groupByAllCompanies).click()
    }
  }

  /**
   * Check if the client list is correctly organized in the home page.
   *
   * @param {String} groupBy The group by to be validated. It can be: alphabetical, status, country, or sector. If groupBy is not given, the default group method to validate is All Companies
   *
   * Change this solution as soon as an ID is provided
   */
  assertCompaniesGroupByOrderIsCorrect(groupBy = '') {
    switch (groupBy.toLowerCase()) {
      case 'alphabetical':
        cy.get(groupBySelectors.separator0_9).should('exist')
        cy.get(groupBySelectors.separatorA).should('exist')
        cy.get(groupBySelectors.separatorB).should('exist')
        cy.get(groupBySelectors.separatorC).should('exist')
        break

      case 'status':
        cy.get(groupBySelectors.separatorActive).should('exist')
        cy.get(groupBySelectors.separatorDemo).should('exist')
        cy.get(groupBySelectors.separatorImplementation).should('exist')
        cy.get(groupBySelectors.separatorTerminated).should('exist')
        break

      case 'country':
        cy.get(groupBySelectors.separatorAustralia).should('exist')
        cy.get(groupBySelectors.separatorAustria).should('exist')
        cy.get(groupBySelectors.separatorAzerbaijan).should('exist')
        cy.get(groupBySelectors.separatorBahrain).should('exist')
        break

      case 'sector':
        cy.get(groupBySelectors.separatorUnknown).should('exist')
        break

      // All Companies
      default:
        cy.get(groupBySelectors.separatorAllCompanies).should('exist')
    }
  }
}

export default HomePage
