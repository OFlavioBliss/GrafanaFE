import BasePage from '../pages/basePage'

const selectors = {
  logo: '#clientsLink',
  userEnvironment: 'div .user-environment',
  settingsButton: '#settingsLink',
  profileAvatar: '#profile-item #profileLink',
  leftMenuOpen: 'hearth-settings-navigation-bar[class*=open]',

  navBarHeaderClientName: '#navBarHeader',
  closeNavBarIcon: '#collapse',

  profileLargeAvatar: '#profileLargeAvatar',
  profileName: '#profileFullName',
  profileEmail: '#profileEmail',
  profilePersonalInformation: '#navBarLinkList #personalInformationItem',
  profileSecurity: '#navBarLinkList #securityItem',
  profilePreferences: '#navBarLinkList #preferencesItem',
  signOut: '#logoutButton',
  closeBarArrow: '#closeProfileMenuButton'
}

const globalSettingsMenuSelectors = {
  userManagementMenuItem: '#userManagementItem',
  statementManagementMenuItem: '#statementManagementItem',
  userManagementSubMenuItem: '#userManagementChild',
  groupManagementSubMenuItem: '#groupManagementChild',
  roleManagementSubMenuItem: '#roleManagementChild',
  dapSubMenuItem: '#dapManagementChild'
}

class LeftMenuNavBar extends BasePage {
  // --------------------------------------- CLICKS  --------------------------------------------- //

  /**
   * Click in the logo to go to the home page
   */
  clickLogoToGoToHomePage() {
    cy.get(selectors.logo).click()
    this.checkUrl(Cypress.env('homePageURL'))
  }

  // --------------------------------------- ASSERTIONS  --------------------------------------------- //

  /**
   * Check if the leftBar is open in the Global Settings menu
   *
   * @param {Boolean} open True to assert the menu is open, false otherwise
   */
  assertGlobalSettingsMenuOpen(open = true) {
    open ? cy.get(selectors.leftMenuOpen).should('be.visible') : cy.get(selectors.leftMenuOpen).should('not.exist')
  }

  /**
   * This method can be used to assert the Sign Out button is always visible across the menus in the left nav bar
   * @param {Boolean} visible True (Default) to be visible and false to not visible
   */
  assertSignOutButtonIsVisible(visible = true) {
    if (visible) {
      cy.get(selectors.signOut).should('be.visible')
    } else {
      cy.get(selectors.signOut).should('not.exist')
    }
  }

  /**
   * Assert the User Management menu is displayed in the left menu bar
   *
   * @param {Boolean} displayed True to validate the User Management menu is available. False, otherwise.
   */
  assertUserManagementDisplayed(displayed = true) {
    displayed ? cy.get(globalSettingsMenuSelectors.userManagementMenuItem).should('be.visible') : cy.get(globalSettingsMenuSelectors.userManagementMenuItem).should('not.exist')
  }

  // --------------------------------------- OTHERS  --------------------------------------------- //

  /**
   * Closes the Global Setting menu located in the left menu
   *
   * @missing_ids
   */
  closeGlobalSettingsLeftBar() {
    cy.get(selectors.closeNavBarIcon).click()
  }

  /**
   * Closes the Profile menu located in the left menu
   */
  closeProfileLeftBar() {
    cy.get(selectors.closeBarArrow).click()
  }

  /**
   * Opens the settings menu left bar
   */
  openSettingsMenuBar() {
    cy.get(selectors.settingsButton).as('settingsBtn') // using alias in this case to avoid element to get too attached
    cy.get('@settingsBtn').click()
  }

  /**
   * Opens profile menu left bar
   */
  openProfileMenuBar() {
    cy.get(selectors.profileAvatar).as('profileBtn') // using alias in this case to avoid element to get too attached
    cy.get('@profileBtn').click()
  }

  /**
   * Navigation menu
   *
   * @param {String} item Main menu item, available options are: user, statement
   * @param {String} subItem Submenu item if available. If not, passes nothing like the examples provided
   * @param {Boolean} openLeftBar True is the default value to open the left bar. Send False in case it is already open
   *
   * @example: accessGlobalSettingsMenu("user", "dap")
   * @example: accessGlobalSettingsMenu("statement")
   *
   */
  accessGlobalSettingsMenu(item, subItem = '', openLeftBar = true) {
    item = item.toLowerCase()
    subItem = subItem.toLowerCase()

    openLeftBar ? this.openSettingsMenuBar() : true

    // Menus
    if (item === 'user') {
      cy.get(globalSettingsMenuSelectors.userManagementMenuItem).as('btnMenu')
      cy.get('@btnMenu').click()
    } else if (item === 'statement') {
      cy.get(globalSettingsMenuSelectors.statementManagementMenuItem).as('btnMenu')
      cy.get('@btnMenu').click()
    }

    // Submenu inside a menu
    if (subItem != '') {
      switch (subItem) {
        case 'user':
          cy.get(globalSettingsMenuSelectors.userManagementSubMenuItem).as('btnSubMenu')
          cy.get('@btnSubMenu').click()
          break

        case 'group':
          cy.get(globalSettingsMenuSelectors.groupManagementSubMenuItem).as('btnSubMenu')
          cy.get('@btnSubMenu').click()
          break

        case 'role':
          cy.get(globalSettingsMenuSelectors.roleManagementSubMenuItem).as('btnSubMenu')
          cy.get('@btnSubMenu').click()
          break

        case 'dap':
          cy.get(globalSettingsMenuSelectors.dapSubMenuItem).as('btnSubMenu')
          cy.get('@btnSubMenu').click()
          break
      }
    }
  }

  /**
   * Open Personal Information page through left nav bar
   */
  openProfilePersonalInformationPage() {
    cy.get(selectors.profilePersonalInformation).as('btnPersonalInformation')
    cy.get('@btnPersonalInformation').click()
  }

  /**
   * Open Security page through left nav bar
   */
  openProfileSecurityPage() {
    cy.get(selectors.profileSecurity).as('btnSecurity')
    cy.get('@btnSecurity').click()
  }

  /**
   * Open Preferences page through left nav bar
   */
  openProfilePreferencesPage() {
    cy.get(selectors.profilePreferences).as('btnPreferences')
    cy.get('@btnPreferences').click()
  }
}

export default LeftMenuNavBar
