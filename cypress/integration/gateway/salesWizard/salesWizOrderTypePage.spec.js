import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()
describe('Sales Wizard Order Type Page Tests', () => {
  context('Validate Order Type Page Interaction', () => {
    /** Related to User Stories
     * EGVFOUR-143
     **/
    beforeEach('User Defines the Amount to sell', () => {
      equityGateway.SalesWizBase.gotoSalesWiz()
      equityGateway.SalesWizTopBar.nextBtn('click')
      cy.contains('h5', 'St James Place').click().click()
      equityGateway.SalesWizTopBar.nextBtn('click')
      equityGateway.SalesWizShareGroupPage.selectShareGroupByName('SIP Issuances')
      equityGateway.SalesWizTopBar.nextBtn('click')
      // FIXME relates to ..\equityGateway\salesWizard\salesWizOrderTypePage.js[goToOrderType()]
      equityGateway.SalesWizOrderTypePage.goToOrderType()
      equityGateway.SalesWizTopBar.nextBtn('click')
    })
    it('C30639283 - Validate Page Elements and Interactability', () => {
      equityGateway.SalesWizOrderTypePage.validatePageStructure()
      equityGateway.SalesWizOrderTypePage.validatePageInteractability()
    })
    it('C30904119 - Selects Market Order - Order Type', () => {
      equityGateway.SalesWizOrderTypePage.selectOrderTypeByName('Market Order').click()
      equityGateway.SalesWizTopBar.nextBtn('click')
      equityGateway.SalesWizOrderTypePage.validateMenuAdvanced()
    })

    it('C30639283 - Selects Day limit order - Order Type', () => {
      equityGateway.SalesWizOrderTypePage.selectOrderTypeByName('Day limit order').click()
      //TBD After limit validation is done on the FE the tests need to incorporate that
      // ---> equityGateway.SalesWizOrderTypePage.validateDayLimitInputLimits()
      equityGateway.SalesWizOrderTypePage.fillDayLimitInput('Day Limit')
      equityGateway.SalesWizTopBar.nextBtn('click')
      equityGateway.SalesWizOrderTypePage.validateMenuAdvanced()
    })

    it('C30639287 - Selects Limit order (Good\' til cancelled - Order Type', () => {
      equityGateway.SalesWizOrderTypePage.selectOrderTypeByName('Limit Order - Good\' til cancelled').click()
      //TBD After limit validation is done on the FE the tests need to incorporate that
      // ---> equityGateway.SalesWizOrderTypePage.validateDayLimitInputLimits()
      equityGateway.SalesWizOrderTypePage.fillDayLimitInput('Limit Day Order')
      equityGateway.SalesWizTopBar.nextBtn('click')
      equityGateway.SalesWizOrderTypePage.validateMenuAdvanced()
    })
  })
})
