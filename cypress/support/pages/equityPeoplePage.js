import Common from './common'
import SearchBar from '../components/searchBar'

const selectors = {
  editIconButton: '.record-actions > .mini'
}

const properties = {
  peopleURL: '/people'
}

const searchBar = new SearchBar;

class EquityPeoplePage extends Common{

  /**
   * Checks if the current page is Participants/People URL
   */
  checkPeopleUrl(){
    this.checkUrl(properties.peopleURL)
  }

  /**
   * Checks the amount of records displayed in the people's table
   * 
   * @param {string} amount amount of people you want to check in the records
   * 
   * @example 'amount=1 record(s)' for '1 record(s)' beings displayed in the table 
   */
   checkAmountOfPeopleTable(amount){
    cy.xpath("//*[@id='peopleRecordCount' and normalize-space(text())='1 record(s)']")
  }

    /**
   * Search for a participant using the search bar
   * 
   * @param {string} participantId Participant id to be searched
   */
   selectParticipantFromTheListToGetDetails(participantId){
    searchBar.search(participantId)
    this.checkAmountOfPeopleTable('1 record(s)')
    this.clickDataByTextInTable(participantId)
  }

  /**
   * Edit a participant from the list
   * 
   * @param {string} participantId Participant id to be searched
   */
  openEditParticipantDetails(participantId){
    this.selectParticipantFromTheListToGetDetails(participantId)
    cy.get(selectors.editIconButton).click()
  }
      
}
  
export default EquityPeoplePage;
