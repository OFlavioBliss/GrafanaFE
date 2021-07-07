import HomePage from '../../../support/pages/homePage'
import GroupManagementPage from '../../../support/pages/globalSettingsPages/userManagementPages/groupManagementPage'

import LeftMenuNavBar from '../../../support/components/leftMenuNavBar'
import SearchBar from '../../../support/components/searchBar'

describe('Group Management tests over User Management settings', () => {
  const homePage = new HomePage()
  const groupManagementPage = new GroupManagementPage()

  const leftMenuNavBar = new LeftMenuNavBar()
  const searchBar = new SearchBar()

  beforeEach(() => {
    // @ts-ignore
    cy.login() && cy.loginSuccessfulXHRWaits()
    leftMenuNavBar.accessGlobalSettingsMenu('user', 'group')
  })

  // ************************************************ TESTS AS ADMIN TENANT ************************************************** //

  /**
   * Verify if the settings send the user back to the home screen when the user closes the settings menu
   *
   */
  it('C7412690_Check_The_System_Behavior_When_Closing_The_Settings_Nav_Bar', () => {
    groupManagementPage.checkGroupManagementUrl()
    leftMenuNavBar.closeGlobalSettingsLeftBar()
    homePage.checkHomeUrl()
  })

  /**
   *TODO: Steps for Inactive groups (waiting for data to be available).
   *
   * SkIPPING due to https://globalshares.atlassian.net/browse/PB-873
   *
   * @missing_data Need to have some groups in both active and inactive tabs
   */
  it('C7412691_Search_Engine_Search_for_Groups_With_Different_Combinations_In_Active_And_Inactive_Tabs', () => {
    groupManagementPage.assertNoGroupSelectedMessageState()

    let group = 'GLOBAL'
    searchBar.search(group)
    groupManagementPage.assertAmountOfSearchResults(1)
    groupManagementPage.assertSearchResultGroups([1])

    group = 'global'
    searchBar.search(group)
    groupManagementPage.assertAmountOfSearchResults(1)
    groupManagementPage.assertSearchResultGroups([1])

    group = 'GLObal'
    searchBar.search(group)
    groupManagementPage.assertAmountOfSearchResults(1)
    groupManagementPage.assertSearchResultGroups([1])

    group = 'randomName'
    searchBar.search(group)
    groupManagementPage.assertNoGroupsFoundIsVisible()

    group = 'SELECT * FROM groups'
    searchBar.search(group)
    groupManagementPage.assertNoGroupsFoundIsVisible()

    // Once data is given, uncomment the code with the new data
    /**
    groupManagementPage.selectTabByName('Inactive') // Inactive TAB

    group = 'ABC'
    searchBar.search(group)
    groupManagementPage.assertAmountOfSearchResults(2)
    groupManagementPage.assertSearchResultGroups([1122, 1125])

    group = 'abc'
    searchBar.search(group)
    groupManagementPage.assertAmountOfSearchResults(2)
    groupManagementPage.assertSearchResultGroups([1122, 1125])

    group = 'AbC'
    searchBar.search(group)
    groupManagementPage.assertAmountOfSearchResults(2)
    groupManagementPage.assertSearchResultGroups([1122, 1125])

    group = 'randomName'
    searchBar.search(group)
    groupManagementPage.assertNoGroupsFoundIsVisible()

    group = 'SELECT * FROM groups'
    searchBar.search(group)
    groupManagementPage.assertNoGroupsFoundIsVisible()
     */
  })

  it('C7499684_Groups_Happy_Path_Active_And_Inactive_Groups', () => {
    groupManagementPage.assertActiveGroupsAreDisplayed()
    groupManagementPage.selectTabByName('Inactive')
    groupManagementPage.assertInactiveGroupsAreDisplayed()
  })

  /**
   * @missing_data
   */
  it('C7499679_Groups_Deactivate_And_Activate_A_Group', () => {
    const groupId = 1122
    const groupName = 'Active and Inactive'

    groupManagementPage.deactivateGroup(groupId, groupName)
    groupManagementPage.activateGroup(groupId, groupName)
  })

  /**
   * SKIPPING DUE TO https://globalshares.atlassian.net/browse/PB-875
   *
   * @missing_data Need to have at least one group created and activated
   */
  it.skip('C7493036_Groups_Duplicate_A_Group', () => {
    const groupId = 1122
    const groupName = 'Active and Inactive'
    const newNameForDuplicatedGroup = 'Duplicated Group'

    groupManagementPage.duplicateGroup(groupId, groupName, newNameForDuplicatedGroup)
  })

  it('C7493034_Groups_Create_A_New_Group', () => {
    const groupName = 'Created Group From Automation'
    const roleName = 'View Only'
    const roleId = 1397
    const dapNames = ['Test', 'View']
    const dapIds = [60, 12]
    const userNames = ['carolyn', 'igor']
    const userIds = [754546, 754556]
    const companyName = ['7Digital', '9F Group']
    const companyIds = [144, 337]

    groupManagementPage.createGroup(groupName, roleName, roleId, dapNames, dapIds, userNames, userIds, companyName, companyIds)
  })

  /**
   * @missing_data Need to have a group with NO role associated. Also, it needs to have at least on role created in the environment.
   */
  it.skip('C7419661_Groups_Add_A_Role_To_A_Group', () => {
    const groupId = 1229
    const groupName = 'Add Role'
    const roleName = 'View Only'
    const roleId = 1397

    groupManagementPage.clickGroup(groupId)
    groupManagementPage.selectRoleToGroup(roleName, roleId)
    groupManagementPage.saveGroupInformation(groupName + ' Saved')

    groupManagementPage.assertRoleAssociatedWithGroup(roleId)
  })

  /**
   * @missing_data Need to have a group with an associated role created. Also, it needs to have at least two roles created in the environment.
   */
  it.skip('C7419662_Groups_Change_The_Role_Associated_With_A_Group', () => {
    const groupId = 1230
    const groupName = 'Change this role'
    const roleName = 'View Only'
    const roleId = 1397

    groupManagementPage.clickGroup(groupId)
    groupManagementPage.selectRoleToGroup(roleName, roleId)
    groupManagementPage.saveGroupInformation(groupName + ' Saved')

    groupManagementPage.assertRoleAssociatedWithGroup(roleId)
  })

  /**
   * @missing_data Need to have a group. Also, it needs to have at least on role created in the environment.
   */
  it.skip('C7419664_Groups_Discard_Without_Saving', () => {
    const groupId = 1317
    const roleName = 'View Only'
    const roleId = 1397

    groupManagementPage.clickGroup(groupId)
    groupManagementPage.selectRoleToGroup(roleName, roleId)
    groupManagementPage.discardGroupInformation()
  })

  // ************************************************ TESTS AS CLIENTS ************************************************** //
})
