import PersonalInformationPage from '../../support/pages/profilePages/personalInformationPage'
import HomePage from '../../support/pages/homePage'
import LeftMenuNavBar from '../../support/components/leftMenuNavBar'

describe('Personal Information tests', () => {
  const leftMenuNavBar = new LeftMenuNavBar()
  const personalInformationPage = new PersonalInformationPage()
  const homePage = new HomePage()

  beforeEach(() => {
    // @ts-ignore
    cy.login() && cy.loginSuccessfulXHRWaits()
    leftMenuNavBar.openProfilePersonalInformationPage()
  })

  /**
   * Test if the menu link sends to the correct page and it gets back to the home screen if closed
   */
  it('C1234567_Check_URL_Access_Over_The_Menu', () => {
    personalInformationPage.checkProfilePersonalInformationUrl()
    leftMenuNavBar.closeProfileLeftBar()
    homePage.checkUrl('home')
  })

  /**
   * Edit personal information by sending name, contact number, and email
   */
  it('C1234567_Edit_Personal_Information', () => {
    personalInformationPage.editPersonalInfo('Test name', '+1 555 555 555', 'test email')
  })
})
