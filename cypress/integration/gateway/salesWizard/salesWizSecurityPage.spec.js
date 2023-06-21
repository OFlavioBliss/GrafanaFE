import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()
describe('Sales Wizard Security Page Tests', () => {
    beforeEach(() => {
        //NOT NECESSARY YET  - equityGateway.LoginPage.login()
        equityGateway.SalesWizBase.gotoSalesWiz()
        equityGateway.SalesWizTopBar.nextBtn('click')
    })
    context('General Page Validations', () => {
        /** Related to User Stories
         * EGVFOUR-140
         **/
        it('C30639260 - Verify Page Title and Info', () => {
            equityGateway.SalesWizSecurityPage.pageTitle('Security')
            equityGateway.SalesWizSecurityPage.pageInfo('Please select your security below.')
        })
    })

    context('Validate Security Cards Elements', () => {
        /** Related to User Stories
         * EGVFOUR-140
         **/
        it('C30639260 - Card 1 validation', () => {
            cy.fixture('gateway/salesWizard/securityCards').then((jsonObject) => {
                const { firstShare } = jsonObject
                const shareArray = Object.values(firstShare)
                equityGateway.SalesWizSecurityPage.cardValidation(
                    1,
                    shareArray,
                    'USD',
                    '60.40',
                    'UP'
                )
            })
        })

        it('C30639260 - Card 2 validation', () => {
            cy.fixture('gateway/salesWizard/securityCards').then((jsonObject) => {
                const { secondShare } = jsonObject
                const shareArray = Object.values(secondShare)
                equityGateway.SalesWizSecurityPage.cardValidation(
                    2,
                    shareArray,
                    'USD',
                    '60.40',
                    'UP'
                )
            })
        })

        it('C30639260 - Card 3 validation', () => {
            cy.fixture('gateway/salesWizard/securityCards').then((jsonObject) => {
                const { thirdShare } = jsonObject
                const shareArray = Object.values(thirdShare)
                equityGateway.SalesWizSecurityPage.cardValidation(
                    3,
                    shareArray,
                    'USD',
                    '60.40',
                    'UP'
                )
            })
        })
    })

    context('Verify if Security Cards are all clickable', () => {
        /** Related to User Stories
         * EGVFOUR-140
         **/
        /*
        const activityElements = [
            'Sage Group Plc',
            'St James Place'
         ] */
        it('C30639260 - Cards Click Verify', () => {
            //TODO when Utils are develop
        })
    })
})
