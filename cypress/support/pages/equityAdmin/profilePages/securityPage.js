import BasePage from '../../basePage'

const selectors = {
  currentPasswordInput: '#currentPassword input',
  newPasswordInput: '#newPassword input',
  confirmChangeButton: '#confirmChange'
}

const properties = {
  pageURL: '/profile/security'
}

class SecurityPage extends BasePage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrl(properties.pageURL)
  }

  // --------------------------------------------------------------------------------  OTHERS ----------------------------------------------------------------------- //

  /**
   * Change the password in Profile Security page
   *
   * @param {string} currentPassword Current password
   * @param {string} newPassword New password
   */
  changePassword(currentPassword = '', newPassword = '') {
    if (currentPassword != '') {
      cy.get(selectors.currentPasswordInput).clear()
      cy.get(selectors.currentPasswordInput).type(currentPassword)
    }

    if (newPassword != '') {
      cy.get(selectors.newPasswordInput).clear()
      cy.get(selectors.newPasswordInput).type(newPassword)
    }

    // uncomment only in future, because it changes the data permanently
    // cy.get(selectors.confirmChangeButton).click()
  }
}

export default SecurityPage
