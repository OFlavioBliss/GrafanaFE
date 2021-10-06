import PreferencesPage from '../../support/pages/profilePages/preferencesPage'
import LeftMenuNavBar from '../../support/components/leftMenuNavBar'

describe('Preferences tests', () => {
  const leftMenuNavBar = new LeftMenuNavBar()
  const preferencesPage = new PreferencesPage()

  beforeEach(() => {
    cy.login()
    cy.visit('/') && cy.reload()
    cy.loginSuccessfulXHRWaits()
    leftMenuNavBar.openProfileMenuBar()
    leftMenuNavBar.openProfilePreferencesPage()
  })

  /**
   * Test if the menu link sends to the correct page and it gets back to the home screen if closed
   */
  it('C1234567_Check_URL_Access_Over_The_Menu', () => {
    preferencesPage.checkProfilePreferencesUrl()
    leftMenuNavBar.closeProfileLeftBar()
    preferencesPage.checkProfilePreferencesUrl()
  })

  /**
   * Change language to PORTUGUESE and verify some random texts around the system
   *
   */
  it('C1234567_Change_Language_Successfully_To_Portuguese', () => {
    preferencesPage.changeLanguage('portuguese')
    leftMenuNavBar.clickLogoToGoToHomePage()

    leftMenuNavBar.openSettingsMenuBar()
    leftMenuNavBar.getElementByText('Gestão de Utilizadores').should('be.visible')
    leftMenuNavBar.getElementByText('Gestão de Declaração').should('be.visible')
    leftMenuNavBar.closeGlobalSettingsLeftBar()

    leftMenuNavBar.accessGlobalSettingsMenu('user')
    leftMenuNavBar.getElementByText('Gestão de Utilizadores').should('be.visible')
    leftMenuNavBar.getElementByText('Gestão de Grupos').should('be.visible')
    leftMenuNavBar.getElementByText('Gestão de Funções').should('be.visible')
    leftMenuNavBar.getElementByText('Filtros para Acesso de Dados').should('be.visible')
    leftMenuNavBar.closeGlobalSettingsLeftBar()

    leftMenuNavBar.openProfileMenuBar()
    leftMenuNavBar.getElementByText('Informações pessoais').should('be.visible')
    leftMenuNavBar.getElementByText('Segurança').should('be.visible')
    leftMenuNavBar.getElementByText('Preferências').should('be.visible')
    leftMenuNavBar.closeProfileLeftBar()

    // teardown
    leftMenuNavBar.openProfileMenuBar()
    leftMenuNavBar.openProfilePreferencesPage()
    preferencesPage.changeLanguage()
    leftMenuNavBar.closeProfileLeftBar()
  })
})
