import HomePage from '../../../support/pages/homePage'
import RoleManagementPage from '../../../support/pages/globalSettingsPages/userManagementPages/roleManagementPage'

import LeftMenuNavBar from '../../../support/components/leftMenuNavBar'
import SearchBar from '../../../support/components/searchBar'

import Utils from '../../../support/utils'

describe('Role Management tests over User Management settings', () => {
  const homePage = new HomePage()
  const roleManagementPage = new RoleManagementPage()

  const leftMenuNavBar = new LeftMenuNavBar()
  const searchBar = new SearchBar()

  const utils = new Utils()

  beforeEach(() => {
    // @ts-ignore
    cy.login() && cy.loginSuccessfulXHRWaits()
    leftMenuNavBar.accessGlobalSettingsMenu('user', 'role')
    roleManagementPage.checkRoleManagementUrl()
  })

  // ************************************************ TESTS AS ADMIN TENANT ************************************************** //

  it('C7544080_Check_Behavior_When_Closing_The_Settings', () => {
    leftMenuNavBar.closeGlobalSettingsLeftBar()
    homePage.checkHomeUrl()
  })

  /**
   *
   * SkIPPING due to https://globalshares.atlassian.net/browse/PB-873
   *
   * @missing_data Need to have some roles in both active and inactive tabs
   */
  it.skip('C7544081_Search_Engine_Search_For_Role_With_Different_Combinations_In_Active_And_Inactive_Tabs', () => {
    let role = 'ROLE'
    searchBar.search(role)
    roleManagementPage.assertAmountOfSearchResults(3)
    roleManagementPage.assertSearchResultListAccuracy([1400, 1401, 1402])

    role = 'role'
    searchBar.search(role)
    roleManagementPage.assertAmountOfSearchResults(3)
    roleManagementPage.assertSearchResultListAccuracy([1400, 1401, 1402])

    role = 'rOlE1'
    searchBar.search(role)
    roleManagementPage.assertAmountOfSearchResults(1)
    roleManagementPage.assertSearchResultListAccuracy([1400])

    role = 'randomName'
    searchBar.search(role)
    roleManagementPage.assertNoResultFoundIsVisible()

    role = 'SELECT * FROM groups'
    searchBar.search(role)
    roleManagementPage.assertNoResultFoundIsVisible()

    roleManagementPage.selectTabByName('Inactive') // Inactive TAB

    role = 'ZZZ'
    searchBar.search(role)
    roleManagementPage.assertAmountOfSearchResults(2)
    roleManagementPage.assertSearchResultListAccuracy([1403, 1405])

    role = 'zzz'
    searchBar.search(role)
    roleManagementPage.assertAmountOfSearchResults(2)
    roleManagementPage.assertSearchResultListAccuracy([1403, 1405])

    role = 'ZzZ'
    searchBar.search(role)
    roleManagementPage.assertAmountOfSearchResults(2)
    roleManagementPage.assertSearchResultListAccuracy([1403, 1405])

    role = 'randomName'
    searchBar.search(role)
    roleManagementPage.assertNoResultFoundIsVisible()

    role = 'SELECT * FROM roles'
    searchBar.search(role)
    roleManagementPage.assertNoResultFoundIsVisible()
  })

  /**
   * @missing_data Need to have some roles in both active and inactive tabs
   */
  it.skip('C7499688_Groups_Happy_Path_Active_And_Inactive_Roles', () => {
    roleManagementPage.assertActiveRolesAreDisplayed()
    roleManagementPage.assertRolesInAlphabeticalOrder()

    roleManagementPage.selectTabByName('Inactive')
    roleManagementPage.assertInactiveRolesAreDisplayed()
    roleManagementPage.assertRolesInAlphabeticalOrder()
  })

  /**
   * @missing_data For test this scenario there should be no Active nor Inactive roles.
   */
  it.skip('C7499690_Empty_State_Active_And_Inactive_Roles)', () => {
    roleManagementPage.assertEmptyStateMessageIsVisible()
    roleManagementPage.selectTabByName('Inactive')
    roleManagementPage.assertEmptyStateMessageIsVisible()
  })

  /**
   * @missing_data Need to have some roles in the active tab
   */
  it.skip('C7499693_List_Roles_Navigation_Issues)', () => {
    roleManagementPage.reloadPage()
    roleManagementPage.checkRoleManagementUrl()
    roleManagementPage.assertActiveRolesAreDisplayed()

    leftMenuNavBar.clickLogoToGoToHomePage()
    roleManagementPage.goBackOrForwardInBrowser('back')
    roleManagementPage.checkRoleManagementUrl()
    roleManagementPage.assertActiveRolesAreDisplayed()

    leftMenuNavBar.clickLogoToGoToHomePage()
    cy.visit('/tenant/1/settings/role-management', { failOnStatusCode: false })
    roleManagementPage.checkRoleManagementUrl()
    roleManagementPage.assertActiveRolesAreDisplayed()
  })

  it('C7499700_Create_A_New_Role_Happy_Path)', () => {
    const roleName = 'Create new role ' + utils.getRandomNumber()

    roleManagementPage.clickToCreateRoleWithNewName(roleName)
    roleManagementPage.insertOrRemoveAccessFiltersPermissions('accessfilters', ['view', 'update', 'create', 'delete'])
    roleManagementPage.insertOrRemoveAccessFiltersPermissions('api', ['view'])
    roleManagementPage.insertOrRemoveAccessFiltersPermissions('settings', ['update'])
    roleManagementPage.insertOrRemoveAccessFiltersPermissions('accessfilters', ['create'], false)
    roleManagementPage.insertOrRemoveAccessFiltersPermissions('settings', ['update'], false)
    roleManagementPage.insertOrRemoveAccessFiltersPermissions('settings', ['delete'])
    roleManagementPage.insertOrRemoveAccessFiltersPermissions('groups', ['view', 'update', 'create', 'delete'])

    roleManagementPage.saveEntityInformation()
    roleManagementPage.assertToastNotificationMessageIsDisplayed('Role updated successfully')
    roleManagementPage.assertActiveRolesAreDisplayed()
    roleManagementPage.assertEntityIsDisplayedInTheList(roleName)
  })

  // ************************************************ TESTS AS CLIENTS ************************************************** //
})
