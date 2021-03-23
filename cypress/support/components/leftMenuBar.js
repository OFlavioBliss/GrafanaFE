const selectors = {
  logo: 'li.ng-tns-c119-1',
  settingsButton: '#settingsLink',
  closeBar: '//h2//gs-svg-icon',
  profileAvatar: '#profile-item',
  signOut: 'a.logout'
}

class LeftMunuBar {
  /**
   * Closes the menu left page
   */
  closeMenuLeftBar() {
    cy.xpath(selectors.closeBar).click()
  }

  /**
   * Opens the settings menu left bar
   */
  openSettingsMenuBar() {
    cy.get(selectors.settingsButton).click()
  }

  /**
   * Navigation menu
   * @param {string} item Main menu item
   * @param {string} subItem Submenu item if avaiable. If not, passes nothing like: accessMenuItem("Statement Management")
   *
   */
  accessGlobalSettingsMenu(item, subItem) {
    this.openSettingsMenuBar()
    cy.contains(item) // avoid element detached from the DOM
    cy.xpath(`(//a[normalize-space(text()) = '${item}'])[1]`).click()

    if (subItem) {
      cy.xpath(`(//a[normalize-space(text()) = '${subItem}'])[1]`).click()
    }
  }
}

export default LeftMunuBar