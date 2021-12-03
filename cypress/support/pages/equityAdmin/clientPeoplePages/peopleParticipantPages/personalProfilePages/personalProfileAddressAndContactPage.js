import BasePersonalProfilePage from './basePersonalProfilePage'

const properties = {
  pageURL: '/personal-profile/address-and-contact'
}

const addressOfResidenceSelectors = {
  stateInputField: ' #homeAddressField #stateField input'
}

class PersonalProfileAddressAndContactPage extends BasePersonalProfilePage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrl(properties.pageURL)
  }

  /**
   * Fill out all the section Address of Residence with given parameters
   *
   * @param {String} address Address field to be filled. Send '' for don't fill nothing in this field
   * @param {String} addressLine2 Address Line 2 field to be filled. Send '' for don't fill nothing in this field
   * @param {String} addressLine3 Address Line 3 field to be filled. Send '' for don't fill nothing in this field
   * @param {String} postCode Post Code field to be filled. Send '' for don't fill nothing in this field
   * @param {String} city City field to be filled. Send '' for don't fill nothing in this field
   * @param {String} state State field to be filled. Send '' for don't fill nothing in this field
   * @param {String} country Country field to be filled. Send '' for don't fill nothing in this field
   */
  fillOutAddressOfResidenceSection(address = '', addressLine2 = '', addressLine3 = '', postCode = '', city = '', state = '', country = '') {
    if (address != '') {
      cy.log('To be implemented')
    }

    if (addressLine2 != '') {
      cy.log('To be implemented')
    }

    if (addressLine3 != '') {
      cy.log('To be implemented')
    }

    if (postCode != '') {
      cy.log('To be implemented')
    }

    if (city != '') {
      cy.log('To be implemented')
    }

    if (state != '') {
      cy.get(addressOfResidenceSelectors.stateInputField).type(state)
    }

    if (country != '') {
      cy.log('To be implemented')
    }
  }
}

export default PersonalProfileAddressAndContactPage