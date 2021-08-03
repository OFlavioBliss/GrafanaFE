const selectors = {
  inputBar: 'gs-global-search .input-bar input',
  searchClientButton: '.search-action',
  clearXButton: 'gs-global-search div.clear-action gs-svg-icon'
}

class SearchBar {
  /**
   * Search bar
   *
   * @param {any} textToSearch Param to search in the search bar
   * @param {Number} delay Delay in milliseconds to wait. Sometimes, there are no XHR requests to intercept, so it is necessary to have a quick delay after using the search engine.
   */
  search(textToSearch, delay = 500) {
    this.clearSearchBox()
    cy.waitFor(selectors.inputBar)
    cy.get(selectors.inputBar).type(textToSearch)
    cy.get(selectors.searchClientButton).click()

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(delay)
  }

  /**
   * Clear the search bar content.
   */
  clearSearchBox() {
    cy.get(selectors.inputBar).clear()
    // cy.get(selectors.inputBar).type('{selectall}{backspace}{selectall}{backspace}')
  }

  /**
   * Clear the search bar by pressing the X icon
   */
  clearSearchBoxByXIcon() {
    cy.get(selectors.clearXButton).click()
  }
}

export default SearchBar
