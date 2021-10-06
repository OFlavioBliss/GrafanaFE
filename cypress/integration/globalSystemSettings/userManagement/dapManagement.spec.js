import DapManagementPage from '../../../support/pages/globalSettingsPages/userManagementPages/dapManagementPage'
import GroupManagementPage from '../../../support/pages/globalSettingsPages/userManagementPages/groupManagementPage'

import LeftMenuNavBar from '../../../support/components/leftMenuNavBar'
import SearchBar from '../../../support/components/searchBar'

import Utils from '../../../support/utils'

describe('Data Access Profiles tests over User Management settings', () => {
  // Pages
  const dapManagementPage = new DapManagementPage()
  const groupManagementPage = new GroupManagementPage()

  // Components
  const leftMenuNavBar = new LeftMenuNavBar()
  const searchBar = new SearchBar()

  // Others
  const utils = new Utils()

  beforeEach(() => {
    cy.log(Cypress.currentTest.title)

    cy.login()
    cy.visit('/') && cy.reload()
    cy.loginSuccessfulXHRWaits()
    leftMenuNavBar.accessGlobalSettingsMenu('user', 'dap')
    dapManagementPage.checkDapManagementUrl()
  })

  // ************************************************ TESTS AS ADMIN TENANT ************************************************** //

  /**
   * Verify if the settings send the user back to the home screen when the user closes the settings
   *
   * Waiting for @IDS
   */
  it('C7564741_DAP_Check_The_System_Behavior_When_Closing_The_Settings_Nav_Bar', () => {
    leftMenuNavBar.closeGlobalSettingsLeftBar()
    dapManagementPage.checkDapManagementUrl()
  })

  /**
   * @missing_data Need to have an active DAP available. Need to have at least two groups available
   */
  it.skip('C7592112_DAP_Add_remove_And_Discard_A_Group_From_A_Data_Access_Profile', () => {
    const dapId = 34
    const dapName = 'Add, remove, and discard a Group'
    const groupName = ['Add 1', 'Add 2']
    const groupIds = [1124, 1090]

    dapManagementPage.clickDapById(dapId)
    dapManagementPage.addGroupsToDap(groupName, groupIds)
    dapManagementPage.saveEntityInformation()
    dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved', true, true)
    dapManagementPage.assertGroupAssociatedWithDap(groupIds[0])
    dapManagementPage.assertGroupAssociatedWithDap(groupIds[1])

    dapManagementPage.removeGroupFromDap([groupIds[0]])
    dapManagementPage.saveEntityInformation()
    dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved', true, true)
    dapManagementPage.assertGroupAssociatedWithDap(groupIds[0], false)

    dapManagementPage.removeGroupFromDap([groupIds[1]])
    dapManagementPage.assertGroupAssociatedWithDap(groupIds[1], false)
    dapManagementPage.discardEntityInformation()
    dapManagementPage.assertGroupAssociatedWithDap(groupIds[1])
    dapManagementPage.assertToastNotificationMessageIsDisplayed('Changes to data access profile were discard', true, true)

    dapManagementPage.addGroupsToDap([groupName[0]], [groupIds[0]])
    dapManagementPage.discardEntityInformation()
    dapManagementPage.assertGroupAssociatedWithDap(groupIds[0], false)
    dapManagementPage.assertToastNotificationMessageIsDisplayed('Changes to data access profile were discard')

    //teardown
    dapManagementPage.removeGroupFromDap([groupIds[1]])
    dapManagementPage.saveEntityInformation()
  })

  /**
   * @missing_data Need to have at least 1 active and 1 inactive DAP created
   */
  it.skip('C7544057_DAP_Happy_Path_List_Active_And_Inactive_Data_Access_Profile(s)', () => {
    dapManagementPage.assertActiveDapsAreDisplayed()
    dapManagementPage.clickTabByTitle('Inactive')
    dapManagementPage.assertInactiveDapsAreDisplayed()
  })

  /**
   * @missing_data There are no DAPs neither in active nor inactive status
   */
  it.skip('C7544059_DAP_Empty_State_Active_And_Inactive_Data_Access_Profile(s)', () => {
    // Active tab
    dapManagementPage.assertActiveDapsAreDisplayed(false)
    dapManagementPage.assertNoDapExistsMessageIsDisplayed()

    //Inactive tab
    dapManagementPage.clickTabByTitle('Inactive')
    dapManagementPage.assertInactiveDapsAreDisplayed(false)
    dapManagementPage.assertNoDapExistsMessageIsDisplayed()
  })

  /**
   * @missing_data Need to have a DAP with 3 groups associated
   */
  it.skip('C9277649_DAP_View_Groups_Linked_To_DAP', () => {
    const dapId = 7
    const groupIdAssociated = [963, 964, 965]

    dapManagementPage.clickDapById(dapId)
    dapManagementPage.assertNumberOfGroupRecordsAssociatedWithDap(3)
    dapManagementPage.assertGroupAssociatedWithDap(groupIdAssociated[0])
    dapManagementPage.assertGroupAssociatedWithDap(groupIdAssociated[1])
    dapManagementPage.assertGroupAssociatedWithDap(groupIdAssociated[2])
  })

  /**
   * @missing_data Need to have a DAP and 2 groups available to be added. These groups should only be used in this test
   */
  it.skip('C9277650_DAP_Link_Groups_To_DAP', () => {
    const dapId = 11
    const dapName = 'Add groups'
    const groupName = ['Group to be added in DAP 1', 'Group to be added in DAP 2']
    const groupIdsToAssociate = [966, 967]

    dapManagementPage.clickDapById(dapId)
    dapManagementPage.addGroupsToDap(groupName, groupIdsToAssociate)
    dapManagementPage.saveEntityInformation()

    dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved')
    dapManagementPage.assertNumberOfGroupRecordsAssociatedWithDap(2)
    dapManagementPage.assertGroupAssociatedWithDap(groupIdsToAssociate[0])
    dapManagementPage.assertGroupAssociatedWithDap(groupIdsToAssociate[1])

    // So go to groups and see if the association is made
    leftMenuNavBar.accessGlobalSettingsMenu('', 'group', false)
    groupManagementPage.clickGroupById(groupIdsToAssociate[0])
    groupManagementPage.assertDapAssociatedWithGroup(dapId)
    groupManagementPage.clickGroupById(groupIdsToAssociate[1])
    groupManagementPage.assertDapAssociatedWithGroup(dapId)
  })

  /**
   * @missing_data Need to have a DAP and any 2 groups available to be added and discarded
   */
  it.skip('C9277651_DAP_Discard_Daft_Linked_Groups', () => {
    const dapId = 13
    const groupName = ['Group to be added in DAP 1', 'Group to be added in DAP 2']
    const groupIdsToAssociate = [966, 967]

    dapManagementPage.clickDapById(dapId)
    dapManagementPage.addGroupsToDap(groupName, groupIdsToAssociate)
    dapManagementPage.discardEntityInformation()

    dapManagementPage.assertToastNotificationMessageIsDisplayed('Changes to data access profile were discard')
    dapManagementPage.assertNumberOfGroupRecordsAssociatedWithDap(0)
    dapManagementPage.assertGroupAssociatedWithDap(groupIdsToAssociate[0], false)
    dapManagementPage.assertGroupAssociatedWithDap(groupIdsToAssociate[1], false)
  })

  /**
   * @missing_data Need to have a DAP and any 2 groups available with 2 existing groups linked
   *
   * @chrome_only
   */
  it.skip('C9277652_DAP_Error_Linked_Groups_To_DAPs_Cannot_Connect_API_Timeout', { browser: '!firefox' }, () => {
    const dapId = 14
    const groupName = ['Group to be added in DAP 1', 'Group to be added in DAP 2']
    const groupIdsToAssociate = [966, 967]

    dapManagementPage.clickDapById(dapId)
    dapManagementPage.addGroupsToDap(groupName, groupIdsToAssociate)

    cy.network({ offline: true }) && cy.assertNetworkOnline({ online: false })

    dapManagementPage.saveEntityInformation()
    dapManagementPage.assertNotificationErrorDisplayed()
    cy.network({ offline: false }) && cy.assertNetworkOnline({ online: true })
  })

  /**
   * @missing_data Need to have a user with more than 1 client assigned (to make sure the landing page is the home page) and 1 DAP with the proper given access to this user
   *
   */
  it.skip('C9277653_DAP_User_Does_Not_Have_Permission_Needed_To_Link_A_Group_To_The_DAP', () => {
    // Login as view only before proceeds
    cy.login(Cypress.env('VIEW_ONLY_DEFAULT_USER_AUTH'))
    cy.visit('/')
    cy.loginSuccessfulXHRWaits()

    const dapId = 14

    leftMenuNavBar.accessGlobalSettingsMenu('user', 'dap')
    dapManagementPage.checkDapManagementUrl()

    dapManagementPage.clickDapById(dapId)
    dapManagementPage.assertAddGroupsButtonIsVisible(false)
  })

  it('C8981124_DAP_Create_DAP_With_No_Nested_Conditions', () => {
    const dapName = 'Create new DAP no nested ' + utils.getRandomNumber()

    dapManagementPage.clickCreateNewDap()
    dapManagementPage.modifyEntityName(dapName)
    dapManagementPage.modifyCondition([], [1, 'Client id'], [2, '11'])
    dapManagementPage.saveEntityInformation()

    dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved')
    dapManagementPage.assertEntityIsDisplayedInTheList(dapName)

    dapManagementPage.reloadPage()
    dapManagementPage.clickEntityByName(dapName)
    dapManagementPage.assertConditionValue(1, 'Client id')
    dapManagementPage.assertConditionValue(2, '11')
  })

  it('C8981125_DAP_Create_DAP_With_Nested_Conditions', () => {
    const dapName = 'Create new DAP NESTED ' + utils.getRandomNumber()

    dapManagementPage.clickCreateNewDap()
    dapManagementPage.modifyEntityName(dapName)
    dapManagementPage.modifyCondition([], [1, 'Client id'], [2, '11'])
    dapManagementPage.addCondition(1, 2)
    dapManagementPage.modifyCondition([3, 'or'], [4, 'Client id'], [5, '11'])
    dapManagementPage.saveEntityInformation()

    dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved')
    dapManagementPage.assertEntityIsDisplayedInTheList(dapName)

    dapManagementPage.reloadPage()
    dapManagementPage.clickEntityByName(dapName)
    dapManagementPage.assertConditionValue(1, 'Client id')
    dapManagementPage.assertConditionValue(2, '11')
    dapManagementPage.assertConditionValue(3, 'or')
    dapManagementPage.assertConditionValue(4, 'Client id')
    dapManagementPage.assertConditionValue(5, '11')
  })

  it('C8981126_DAP_Discard_Unsaved_DAP', () => {
    const dapName = 'Create and Discard DAP ' + utils.getRandomNumber()

    dapManagementPage.clickCreateNewDap()
    dapManagementPage.modifyEntityName(dapName)
    dapManagementPage.modifyCondition([], [1, 'Client id'], [2, '11'])
    dapManagementPage.discardEntityInformation()

    dapManagementPage.assertDapDetailsContainerDisplayed(false)
    dapManagementPage.assertToastNotificationMessageIsDisplayed('New data access profile was discarded')
    dapManagementPage.assertEntityIsDisplayedInTheList(dapName, false)
  })

  /**
   * SKIPPING DUE TO: https://globalshares.atlassian.net/browse/PB-920
   */
  it.skip('C8981127_DAP_Save_Without_Conditions', () => {
    const dapName = 'Create without conditions '

    dapManagementPage.clickCreateNewDap()
    dapManagementPage.modifyEntityName(dapName)
    dapManagementPage.saveEntityInformation()

    dapManagementPage.assertNotificationErrorDisplayed('A DAP cannot be saved with no conditions')
  })

  /**
   * @missing_data Need to have a DAP with one group and one condition associated
   */
  it.skip('C7564743_DAP_Load_Current_Conditions', () => {
    const dapId = 10
    const dapName = 'Dap1'
    const groupIds = [957]

    dapManagementPage.clickDapById(dapId)
    dapManagementPage.assertEntityHeaderIsDisplayedAsExpected(dapName)
    dapManagementPage.assertConditionsContainerDisplayedWithExpectedValues()
    dapManagementPage.assertGroupAssociatedWithDap(groupIds[0])
  })

  /**
   * @missing_data Need to have a simple DAP created
   */
  it.skip('C7564744_DAP_Rename_DAP', () => {
    const dapId = 20
    const newDapName = 'DAP was renamed'

    dapManagementPage.clickDapById(dapId)
    dapManagementPage.modifyEntityName(newDapName)
    dapManagementPage.assertEntityHeaderIsDisplayedAsExpected(newDapName)
    dapManagementPage.saveEntityInformation()
    dapManagementPage.assertToastNotificationMessageIsDisplayed(newDapName + ' Saved')
  })

  /**
   * @missing_data Need to have a simple DAP created with a single condition
   */
  it.skip('C7564745_DAP_Change_An_Existing_Condition', () => {
    const dapId = 30
    const dapName = 'Change condition'

    dapManagementPage.clickDapById(dapId)
    dapManagementPage.modifyCondition([], [1, 'Client id'], [2, '11'])
    dapManagementPage.saveEntityInformation()

    dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved')
    dapManagementPage.reloadPage()
    dapManagementPage.assertConditionValue(1, 'Client id')
    dapManagementPage.assertConditionValue(2, '11')
  })

  /**
   * @missing_data Need to have a simple DAP created with a single condition
   */
  it.skip('C7564746_DAP_Add_Condition_On_Same_Level', () => {
    const dapId = 3
    const dapName = 'Add condition same level'

    dapManagementPage.clickDapById(dapId)

    dapManagementPage.addCondition(1, 1)
    dapManagementPage.modifyCondition([3, 'or'], [4, 'Client id'], [5, '11'])
    dapManagementPage.saveEntityInformation()
    dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved')

    dapManagementPage.reloadPage()
    dapManagementPage.clickDapById(dapId)
    dapManagementPage.assertConditionValue(3, 'or')
    dapManagementPage.assertConditionValue(4, 'Client id')
    dapManagementPage.assertConditionValue(5, '11')
  })

  /**
   * @missing_data Need to have a simple DAP created with a single condition
   */
  it.skip('C7564747_DAP_Add_Nested_Condition', () => {
    const dapId = 4
    const dapName = 'Add nested condition'

    dapManagementPage.clickDapById(dapId)

    dapManagementPage.addCondition(1, 2)
    dapManagementPage.modifyCondition([], [4, 'Client id'], [5, '11'])
    dapManagementPage.saveEntityInformation()
    dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved')

    dapManagementPage.reloadPage()
    dapManagementPage.clickDapById(dapId)
    dapManagementPage.assertConditionValue(4, 'Client id')
    dapManagementPage.assertConditionValue(5, '11')
  })

  /**
   * @missing_data Need to have a simple DAP created with two conditions created
   */
  it.skip('C7564748_DAP_Remove_Condition', () => {
    const dapId = 5
    const dapName = 'Remove condition'

    dapManagementPage.clickDapById(dapId)

    dapManagementPage.removeCondition(2)
    dapManagementPage.saveEntityInformation()
    dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved')

    dapManagementPage.reloadPage()
    dapManagementPage.clickDapById(dapId)
    dapManagementPage.assertConditionValue(4, 'Client id', false)
    dapManagementPage.assertConditionValue(5, '11', false)
  })

  /**
   * @missing_data Need to have a simple DAP created with only one condition created
   */
  it.skip('C7564749_DAP_Discard_Changes_Condition', () => {
    const dapId = 6

    dapManagementPage.clickDapById(dapId)

    dapManagementPage.addCondition(1, 2)
    dapManagementPage.modifyCondition([], [4, 'Client id'], [5, '11'])
    dapManagementPage.discardEntityInformation()
    dapManagementPage.assertToastNotificationMessageIsDisplayed('Changes to data access profile were discard')
  })

  /**
   * @missing_data Need to have a two simple DAPs created
   *
   */
  it.skip('C7564750_DAP_Try_To_Leave_Existing_DAP_Name_Blank', () => {
    const dapId = 47
    const dapName = 'Existing DAP name blank'
    const dapIdToChangeFocus = 8

    dapManagementPage.clickDapById(dapId)
    dapManagementPage.modifyEntityName('{backspace}')
    dapManagementPage.saveEntityInformation()
    dapManagementPage.assertNotificationErrorDisplayed('Name should not be empty.')

    dapManagementPage.clickDapById(dapIdToChangeFocus)
    dapManagementPage.assertEntityHeaderIsDisplayedAsExpected() // This assertion in here just make sure the second dap was loaded
    dapManagementPage.clickDapById(dapId)
    dapManagementPage.assertEntityHeaderIsDisplayedAsExpected(dapName)
  })

  /**
   * @missing_data Need to have an active DAP created in the active tab
   *
   * @Waiting also for https://globalshares.atlassian.net/wiki/spaces/~338817290/pages/3384774689/ids+missing+report+2 so the method clickToDeactivateEntity() will work
   *
   */
  it.skip('C7568176_DAP_Deactivate_And_Activate_DAP', () => {
    const dapId = 20
    const dapName = 'Deactivate me'

    // Deactivate DAP
    dapManagementPage.clickDapById(dapId)
    //dapManagementPage.clickToDeactivateEntity() // uncomment as soon as ids missing report 2 is finished
    cy.get('gs-button[data-test-id=more-actions-button]').click() // temporarily placed until the ids missing report 2 is finished
    cy.get('gs-action-panel-option[data-test-id=deactivate-button]').click() // temporarily placed until the ids missing report 2 is finished

    dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Deactivated', true, true)
    dapManagementPage.assertInactiveDapsAreDisplayed()
    dapManagementPage.assertEntityIsDisplayedInTheList(dapName)
    dapManagementPage.assertDapEditable(false)

    // Activate DAP
    dapManagementPage.activateDap()

    dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Activated')
    dapManagementPage.assertActiveDapsAreDisplayed()
    dapManagementPage.assertEntityIsDisplayedInTheList(dapName)
    dapManagementPage.assertDapEditable()
  })

  /**
   * @missing_data Need to have some 3 daps called 'dap to search Nº' in each active and inactive tabs. Also need to have another dap called 'other group dap' in both active and inactive tab.
   *               All daps must have just one 'Business Unit' conditions added
   */
  it.skip('C7592109_DAP_Search_Functionality', () => {
    let dap = 'DAP TO SEARCH'
    const dapIds = [6, 8, 10]
    const dapInactiveIds = [12, 14, 16]
    const dapCondition = 'Business'

    // ACTIVE TAB
    searchBar.search(dap)
    dapManagementPage.assertAmountOfSearchResultsInTheList(3)
    dapManagementPage.assertSearchResultListAccuracy(dapIds)

    dap = 'dap to search'
    searchBar.search(dap)
    dapManagementPage.assertAmountOfSearchResultsInTheList(3)
    dapManagementPage.assertSearchResultListAccuracy(dapIds)

    dap = 'dAp To SEarch 1'
    searchBar.search(dap)
    dapManagementPage.assertAmountOfSearchResultsInTheList(1)
    dapManagementPage.assertSearchResultListAccuracy([dapIds[0]])

    dap = 'randomName' + utils.getRandomNumber()
    searchBar.search(dap)
    dapManagementPage.assertNoResultFoundIsVisible()

    dap = 'SELECT * FROM daps'
    searchBar.search(dap)
    dapManagementPage.assertNoResultFoundIsVisible()

    // Verify conditions in a selected active dap
    searchBar.clearSearchBoxByXIcon()
    dapManagementPage.clickDapById(dapIds[0])
    searchBar.search(dapCondition)
    dapManagementPage.assertAmountOfSearchedConditionResults(1)

    // INACTIVE TAB
    dapManagementPage.clickTabByTitle('Inactive')

    dap = 'DAP TO SEARCH'
    searchBar.search(dap)
    dapManagementPage.assertAmountOfSearchResultsInTheList(3)
    dapManagementPage.assertSearchResultListAccuracy(dapInactiveIds)

    dap = 'dap to search'
    searchBar.search(dap)
    dapManagementPage.assertAmountOfSearchResultsInTheList(3)
    dapManagementPage.assertSearchResultListAccuracy(dapInactiveIds)

    dap = 'dAp To SEarch 4'
    searchBar.search(dap)
    dapManagementPage.assertAmountOfSearchResultsInTheList(1)
    dapManagementPage.assertSearchResultListAccuracy([dapInactiveIds[0]])

    dap = 'randomName'
    searchBar.search(dap)
    dapManagementPage.assertNoResultFoundIsVisible()

    dap = 'SELECT * FROM daps'
    searchBar.search(dap)
    dapManagementPage.assertNoResultFoundIsVisible()

    // Verify conditions in a selected active dap
    searchBar.clearSearchBoxByXIcon()
    dapManagementPage.clickDapById(dapInactiveIds[0])
    searchBar.search(dapCondition)
    dapManagementPage.assertAmountOfSearchedConditionResults(1)
  })

  /**
   *
   * @missing_data Need to have two DAPs, one in each active and inactive tabs, with special symbols in the profile name
   */
  it.skip('C7592110_DAP_Negative_Scenarios', () => {
    let dap = '1$¨(*&!¨_}º]+£`¬'
    let dapId = 45

    cy.log(' ---------------- ACTIVE TAB --------------------- ')

    searchBar.search(dap)
    dapManagementPage.assertAmountOfSearchResultsInTheList(1)
    dapManagementPage.assertSearchResultListAccuracy([dapId])

    dap = '1$¨'
    searchBar.search(dap)
    dapManagementPage.assertAmountOfSearchResultsInTheList(1)
    dapManagementPage.assertSearchResultListAccuracy([dapId])

    dap = '£`¬'
    searchBar.search(dap)
    dapManagementPage.assertAmountOfSearchResultsInTheList(1)
    dapManagementPage.assertSearchResultListAccuracy([dapId])

    dap = '[d]'
    searchBar.search(dap)
    dapManagementPage.assertNoResultFoundIsVisible()

    dap = '1$¨(*&!¨_}º]+£`¬'.repeat(25) // huge amount of chars to search
    searchBar.search(dap)
    dapManagementPage.assertNoResultFoundIsVisible()

    cy.log(' ---------------- INACTIVE TAB --------------------- ')

    // INACTIVE TAB
    dapManagementPage.clickTabByTitle('Inactive')

    dap = '(*&!¨_}º]'
    dapId = 46
    searchBar.search(dap)
    dapManagementPage.assertAmountOfSearchResultsInTheList(1)
    dapManagementPage.assertSearchResultListAccuracy([dapId])

    dap = '(*&'
    searchBar.search(dap)
    dapManagementPage.assertAmountOfSearchResultsInTheList(1)
    dapManagementPage.assertSearchResultListAccuracy([dapId])

    dap = '}º]'
    searchBar.search(dap)
    dapManagementPage.assertAmountOfSearchResultsInTheList(1)
    dapManagementPage.assertSearchResultListAccuracy([dapId])

    dap = '[d]'
    searchBar.search(dap)
    dapManagementPage.assertNoResultFoundIsVisible()

    dap = '(*&!¨_}º]'.repeat(40) // huge amount of chars to search
    searchBar.search(dap)
    dapManagementPage.assertNoResultFoundIsVisible()
  })

  /**
   * @missing_data Need to have an active DAP created with a condition and with a group attached
   *
   * @Waiting also for https://globalshares.atlassian.net/wiki/spaces/~338817290/pages/3384774689/ids+missing+report+2 so the method clickToDeactivateEntity() will work
   *
   */
  it.skip('C7568169_DAP_Duplicate_DAP', () => {
    const dapId = 64
    const dapName = 'Duplicate me'
    const newDapName = 'Duplicated DAP ' + utils.getRandomNumber()
    const groupIdAssociated = 957

    // Duplicate DAP
    dapManagementPage.clickDapById(dapId)
    dapManagementPage.assertNumberOfGroupRecordsAssociatedWithDap(1)
    dapManagementPage.assertNumberOfGroupCardsAssociatedWithDap(1)
    // dapManagementPage.clickToDuplicateEntity() // uncomment as soon as ids missing report 2 is finished
    cy.get('gs-button[data-test-id=more-actions-button]').click() // temporarily placed until the ids missing report 2 is finished
    cy.get('gs-action-panel-option[data-test-id=duplicate-button]').click() // temporarily placed until the ids missing report 2 is finished

    dapManagementPage.assertEntityIsFocused()
    dapManagementPage.assertEntityHeaderIsDisplayedAsExpected('Copy of ' + dapName)

    dapManagementPage.modifyEntityName(newDapName)
    dapManagementPage.saveEntityInformation()

    dapManagementPage.assertToastNotificationMessageIsDisplayed(newDapName + ' Saved', true, true)
    dapManagementPage.assertEntityIsDisplayedInTheList(newDapName)
    dapManagementPage.assertConditionValue(1, 'Business Unit')
    dapManagementPage.assertConditionValue(2, '1')
    dapManagementPage.assertGroupAssociatedWithDap(groupIdAssociated, false)
    dapManagementPage.assertNumberOfGroupRecordsAssociatedWithDap(0)
    dapManagementPage.assertNumberOfGroupCardsAssociatedWithDap(0)
    dapManagementPage.assertEntityIsFocused(false)
  })

  /**
   * @missing_data Need to have a DAP with 1 role at least 8 Groups linked to a this DAP
   *
   * SKIPPING DUE TO https://globalshares.atlassian.net/browse/PB-949
   */
  it.skip('C9446198_Groups_Expand_And_Collapse_DAP_With_Many_Groups_added', () => {
    const dapId = 58

    dapManagementPage.clickDapById(dapId)
    dapManagementPage.assertNumberOfGroupCardsDisplayedInASection(13, true)
    dapManagementPage.clickHide('groups')
    dapManagementPage.assertNumberOfGroupCardsDisplayedInASection(8)
  })

  // ************************************************ TESTS AS CLIENTS ************************************************** //
})
