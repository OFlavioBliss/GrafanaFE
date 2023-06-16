import BasePage from '../../basePage'

const selectors = {
    nextBtn: 'gs-button[size="large"]',
    closeBtn: ''
}

class salesWizOrderTypePage extends BasePage {
    methodsHere(){
        //FIXME Example
        cy.get(selectors.nextBtn).contains('Next')
    }
}
export default salesWizOrderTypePage