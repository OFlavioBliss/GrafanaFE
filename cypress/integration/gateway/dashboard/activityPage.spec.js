import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()

/**
 * https://globalshares.testrail.net/index.php?/suites/view/18820&group_by=cases:section_id&group_order=asc&display_deleted_cases=0&group_id=1006706
 * Activity Page Test Suite
 */
describe('Activity Page Tests', () => {
  beforeEach(() => {
    equityGateway.LoginPage.login()
    equityGateway.ActivityPage.gotoActivity()
  })

  context('General Validations', () => {
    /** Related to User Stories
     * EGVFOUR-113
     */
    it('C30092745/.746 - Go to DashboardPage trough ActivityPage', () => {
      equityGateway.ActivityPage.breadcrumbNavi()
      cy.url().should('include', '/dashboard')
    })

    it('C30092744 - ActivityPage Page Validation', () => {
      equityGateway.ActivityPage.pageValidation('Activity', 'In progress', 'Upcoming', 'History')
    })
  })

  context('In Progress Content', () => {
    it('C30092747 - Check Showing Counter', () => {
      //Showing X elements of a total Y elements
      equityGateway.ActivityPage.progressCounter(3, 6)
    })

    it('C30092747/.748/.750/.752/.753 - Verify Transactions Elements', () => {
      //Verify Collapsed Elements
      equityGateway.ActivityPage.button('Show all')
      equityGateway.ActivityPage.progressElements(6)
      //Verify Total Elements
      equityGateway.ActivityPage.button('Show less')
      equityGateway.ActivityPage.progressElements(3)
    })

    it('C30092751 - If no Content does not Display', () => {
      //TODO need new test accounts for testing
    })
  })

  context('Upcoming Content', () => {
    it('General Validations', () => {
      const expectedFooterItems = ['Date', 'Activity type']
      equityGateway.ActivityPage.tabsBarElements(expectedFooterItems)
    })
    //TODO no data to test it yet
  })

  context('History Content', () => {
    it('General Validations', () => {
      cy.get('.tabs-bar').contains('History').click({ force: true })
      const expectedFooterItems = ['Date', 'Activity type']
      equityGateway.ActivityPage.tabsBarElements(expectedFooterItems)
    })
    //TODO no data to test it yet
  })
})