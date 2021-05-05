import HomePage from '../support/pages/homePage'
import GroupManagementPage from '../support/pages/settingsPages/groupManagementPage'

import LeftMunuBar from '../support/components/leftMenuBar'

describe('Home page tests', () => {
  const homePage = new HomePage()
  const groupManagementPage = new GroupManagementPage()
  const leftMenuBar = new LeftMunuBar()

  beforeEach(() => {
    // @ts-ignore
    cy.login()
  })

  it('C1234567_Test_Settings_Menu_Behavior', () => {
    leftMenuBar.accessGlobalSettingsMenu('User Management', 'Group Management')

    groupManagementPage.checkGroupManagementUrl()
    groupManagementPage.selectTab('Inactive')

    leftMenuBar.closeMenuLeftBar()
    homePage.checkUrl('home')
  })
})