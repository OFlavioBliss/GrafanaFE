import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()
describe('My Account Profile Section', () => {
    beforeEach(() => {
        equityGateway.LoginPage.login() //Workaround for now
        //FIXME PROVISORY
        cy.window().then((win) => {
            // @ts-ignore
            win.location.href = 'https://eg-v4-alpha-25.gsapps.dev/my-account/profile/personal-information';
        });
    })

    context('Personal Information Validations', () => {
        /** Related to User Stories
         *  EGVFOUR-76
         */
        it('C30092720 - Profile name validation', () => {
            equityGateway.AccProfile.pageTitle('Personal Information')
            equityGateway.AccProfile.accName('Lorelei Hutchinson') //FIXME equityGateway.Profile.accName(Cypress.env('EQUITY_GATEWAY_DEFAULT_ACC_NAME')+'LAST NAME')
        })

        it('C30092720 - Profile and Demographic Content Titles', () => {
            const pageSections = [
                'Place of birth',
                'Date of birth',
                'Citizenship',
                'Nationality'
            ]
            equityGateway.AccProfile.profileContent(pageSections)
        })

        it('C30092720 - Profile and Demographic Content Info', () => {
            equityGateway.AccProfile.profileContent(
                null,
                'Rochford',
                '2003/01/21',
                'Portuguese, Italian',
                'Portuguese'
            )
        })
    })

    context('Tax identification Validations', () => {
        /** Related to User Stories
         *  EGVFOUR-77
         */
        it('C30092721 - Tax Content Titles', () => {
            const taxSections = [
                'Country of tax residence',
                'Primary tax ID type',
                'Primary tax ID number'
            ]
            equityGateway.AccProfile.taxContent(taxSections)
        })

        it('C30092721 - Tax Content Info', () => {
            equityGateway.AccProfile.taxContent(
                null,
                'United Kingdom of Great Britain',
                'National Insurance Number (NINO)',
                'VH997799A'
            )
        })
    })

    context('Identifiers Validations', () => {
        /** Related to User Stories
         *  EGVFOUR-78
         */
        it('C30092722 - Tax Content Titles', () => {
            const idSections = [
                'Stockholder ID',
                'Employee ID',
                'External Participant ID',
                'Tax ID',
                'Social Security Number'
            ]
            equityGateway.AccProfile.identifiersContent(idSections)
        })

        it('C30092722 - Tax Content Info', () => {
            equityGateway.AccProfile.identifiersContent(
                null,
                'SID24567',
                'GS_028',
                '29283820',
                '2873847',
                '12391829'
            )
        })
    })

    context('Contact Details Validations', () => {
        /** Related to User Stories
         *  EGVFOUR-79
         */
        it('C30092723 - Contact Details Content Titles', () => {
            const contactSections = [
                'Email',
                'Phone Number',
                'personalEmailAddress',
                'suppliedEmailAddress',
                'Preferred for email communications'
            ]
            equityGateway.AccProfile.contactContent(contactSections)
        })

        it('C30092723 - Contact Details Content Info', () => {
            equityGateway.AccProfile.contactContent(
                null,
                'PersonalEmailAddress_32198597_967649@myglobalshares.com',
                'SuppliedEmailAddress_29989189_967649@myglobalshares.com',
                '97733333733',
                '892227225'
            )
        })
    })

    context('Address Details Validations', () => {
        /** Related to User Stories
         *  EGVFOUR-80
         */
        it('C30092723 - Address Details Content', () => {
            const addressInfo = [
                'Residential',
                '2 Tennessee Avenue',
                'Block E Apartment 949',
                '16501 Erie',
                'United Kingdom of Great Britain'
            ]
            equityGateway.AccProfile.addressContent(addressInfo)
        })
    })
})