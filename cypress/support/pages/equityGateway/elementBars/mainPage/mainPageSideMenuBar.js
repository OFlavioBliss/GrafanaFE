import BasePage from '../../../basePage'

const selectors = {
  pages: 'ul > :nth-child',
  shareInfo: '.pb-8 > eg-price-card',
  shareDerivation: '.lg\\:mr-8 > .flex',
  support: '.eg-sidebar > .flex-column'
}

class MainPageSideMenuBar extends BasePage {
  mainPages(position, name) {
    cy.get(selectors.pages + '(' + position + ')').contains(name)
  }
  shareInfo(name, amount, currency, date, sharesPositiveColor, sharesNegativeColor, sharesPositiveReg, sharesNegativeReg) {
    cy.get(selectors.shareInfo).contains(name)
    cy.get(selectors.shareInfo).contains(amount)
    cy.get(selectors.shareInfo).contains(currency)
    cy.get(selectors.shareInfo).contains(date)

    cy.get(selectors.shareDerivation)
      .should('have.css', 'color')
      .then((color) => {
        const colorValue = String(color) // Convert color to string

        if (colorValue === sharesPositiveColor) {
          cy.get(selectors.shareDerivation).invoke('text').should('match', sharesPositiveReg)
        } else if (colorValue === sharesNegativeColor) {
          cy.get(selectors.shareDerivation).invoke('text').should('match', sharesNegativeReg)
        } else {
          cy.wrap(false).should('be.true', 'Unexpected color value')
        }
      })
  }

  support(label) {
    cy.get(selectors.support).should('contain.text', label)
  }
}
export default MainPageSideMenuBar