import BaseManagementPage from './baseManagementPage'
import Utils from '../../../../utils'

const properties = {
  pageURL: '/settings/role-management'
}

const selectors = {
  noRoleSelectedMsg: '#noRoleSelectedContainer div.content',
  activeRolesList: 'gs-tab[data-test-id=activeTab] #roleList gs-list',
  inactiveRolesList: 'gs-tab[data-test-id=inactiveTab] #roleList gs-list',
  rolesDisplayed: '#roleList gs-list a[id*="role_',
  newRoleBtn: 'gs-button[data-test-id=create-role]',
  roleId: '*[id*=role_',
  activateRoleBtn: 'gs-button[data-test-id=activateBtn]',
  allPermissionsHeaders: 'thead th a',
  roleTableNotEditable: 'hearth-role-details table.view-only',
  columnHeaderView: 'thead th[name=column_view]',
  columnHeaderUpdate: 'thead th[name=column_update]',
  columnHeaderCreate: 'thead th[name=column_create]',
  columnHeaderDelete: 'thead th[name=column_delete]',
  searchResultForPermissions: '//div[@class="permission-header"]//div'
}

const apiInterceptions = {
  roleActivated: '/api/Roles/**/Activate',
  rolesLoading: '/api/Roles?**'
}

const utils = new Utils()

class RoleManagementPage extends BaseManagementPage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrl(properties.pageURL)
  }

  // -------------------------------------------------------------------------------------- GETS ---------------------------------------------------------------------------------------- //

  /**
   * Get a role by sending the role ID.
   *
   * @param {number} roleId role id number.
   *
   * @returns The role element
   */
  getRoleById(roleId) {
    return cy.get(selectors.roleId + roleId)
  }

  /**
   * Get the new role button element
   */
  getNewRoleButton() {
    return cy.get(selectors.newRoleBtn)
  }

  /**
   * Get all types of permissions [view, update ...] associated with a permission
   *
   * @param {string} permissionName name of the permission
   * @returns array of type of permissions associated with the given permissionName
   */
  getPermissionsByName(permissionName) {
    // Choose permission name
    cy.log('PERMISSION CHOSEN WAS: ' + permissionName)
    switch (permissionName) {
      case 'accessfilters':
        return cy.get('tr[name=permission_accessfilters] td')

      case 'api':
        return cy.get('tr[name=permission_api]')

      case 'bi':
        return cy.get('tr[name=permission_bi]')

      case 'categories':
        return cy.get('tr[name=permission_categories]')

      case 'clients':
        return cy.get('tr[name=permission_clients]')

      case 'clients_modules':
        return cy.get('tr[name=permission_clients_modules]')

      case 'companysecurity':
        return cy.get('tr[name=permission_companysecurity]')

      case 'companysecuritycurrentvalue':
        return cy.get('tr[name=permission_companysecuritycurrentvalue]')

      case 'contents':
        return cy.get('tr[name=permission_contents]')

      case 'contributions':
        return cy.get('tr[name=permission_contributions]')

      case 'emails':
        return cy.get('tr[name=permission_emails]')

      case 'grants':
        return cy.get('tr[name=permission_grants]')

      case 'groups':
        return cy.get('tr[name=permission_groups]')

      case 'mobile':
        return cy.get('tr[name=permission_mobile]')

      case 'participants':
        return cy.get('tr[name=permission_participants]')

      case 'participants_account':
        return cy.get('tr[name=permission_participants_account]')

      case 'participants_bankaccounts':
        return cy.get('tr[name=permission_participants_bankaccounts]')

      case 'participants_compliance':
        return cy.get('tr[name=permission_participants_compliance]')

      case 'participants_dividends':
        return cy.get('tr[name=permission_participants_dividends]')

      case 'participants_events':
        return cy.get('tr[name=permission_participants_events]')

      case 'participants_financialreporting':
        return cy.get('tr[name=permission_participants_financialreporting]')

      case 'participants_gateway':
        return cy.get('tr[name=permission_participants_gateway]')

      case 'participants_linkage':
        return cy.get('tr[name=permission_participants_linkage]')

      case 'participants_onbehalf':
        return cy.get('tr[name=permission_participants_onbehalf]')

      case 'participants_partners':
        return cy.get('tr[name=permission_participants_partners]')

      case 'participants_restrictions':
        return cy.get('tr[name=permission_participants_restrictions]')

      case 'participants_sharemanagement':
        return cy.get('tr[name=permission_participants_sharemanagement]')

      case 'participants_sharetransactions':
        return cy.get('tr[name=permission_participants_sharetransactions]')

      case 'participants_tax':
        return cy.get('tr[name=permission_participants_tax]')

      case 'participants_trading':
        return cy.get('tr[name=permission_participants_trading]')

      case 'partner_account':
        return cy.get('tr[name=permission_partner_account]')

      case 'partner_custodyaccountmovement':
        return cy.get('tr[name=permission_partner_custodyaccountmovement]')

      case 'partners':
        return cy.get('tr[name=permission_partners]')

      case 'payrollschedules':
        return cy.get('tr[name=permission_payrollschedules]')

      case 'plans':
        return cy.get('tr[name=permission_plans]')

      case 'purchaseplans':
        return cy.get('tr[name=permission_purchaseplans]')

      case 'roles':
        return cy.get('tr[name=permission_roles]')

      case 'settings':
        return cy.get('tr[name=permission_settings]')

      case 'shareissuances':
        return cy.get('tr[name=permission_shareissuances]')

      case 'sms':
        return cy.get('tr[name=permission_sms]')

      case 'tags':
        return cy.get('tr[name=permission_tags]')

      case 'tenants':
        return cy.get('tr[name=permission_tenants]')

      case 'terminationrequests':
        return cy.get('tr[name=permission_terminationrequests]')

      case 'terminationtypes':
        return cy.get('tr[name=permission_terminationtypes]')

      case 'termsandconditions':
        return cy.get('tr[name=permission_termsandconditions]')

      case 'transactions':
        return cy.get('tr[name=permission_transactions]')

      case 'transactionwindows':
        return cy.get('tr[name=permission_transactionwindows]')

      case 'users':
        return cy.get('tr[name=permission_users]')

      case 'vestingschedules':
        return cy.get('tr[name=permission_vestingschedules]')

      default:
        throw new Error(permissionName + ' is not valid. Please, provide a valid permission name!')
    }
  }

  // --------------------------------------------------------------------------------------- CLICKS ----------------------------------------------------------------------------- //

  /**
   * Click in the "new role" button and change the current default role name
   *
   * @param {string} roleName Name given to replace the default 'New Role' name that comes by default
   */
  clickToCreateRoleWithNewName(roleName) {
    this.getNewRoleButton().click()

    // Make sure the default value is 'New Role' before renaming it
    this.assertEntityHeaderIsDisplayedAsExpected('New Role')
    this.modifyEntityName(roleName)
  }

  /**
   * Click in a role by sending the role ID.
   *
   * @param {number} roleId Role id number.
   */
  clickRoleById(roleId) {
    this.getRoleById(roleId).scrollIntoView().click()
  }

  // --------------------------------------------------------------------------------------- ASSERTIONS ---------------------------------------------------------------------------- //

  /**
   * Assert the message about no role selected is displayed
   *
   * @param {boolean} displayed True to verify if the message is displayed. False otherwise.
   */
  assertNoRoleSelectedMessageIsDisplayed(displayed = true) {
    displayed ? cy.get(selectors.noRoleSelectedMsg).should('be.visible') : cy.get(selectors.noRoleSelectedMsg).should('not.exist')
  }

  /**
   * Assert a list of roles is displayed under the correlated Active tab.
   */
  assertActiveRolesAreDisplayed() {
    cy.get(selectors.activeRolesList).should('be.visible')
  }

  /**
   * Assert a list of roles is displayed under the correlated Inactive tab.
   */
  assertInactiveRolesAreDisplayed() {
    cy.get(selectors.inactiveRolesList).should('be.visible')
  }

  /**
   * Assert if the roles are being displayed in alphabetical order by default
   */
  assertRolesInAlphabeticalOrder() {
    this.assertElementsInAlphabeticalOrNumericalOrder(selectors.rolesDisplayed)
  }

  /**
   * Assert the Activate button is displayed
   *
   * @param {boolean} displayed Send false to verify the Activate Button is not displayed. True is the default for otherwise
   */
  assertActivateButtonDisplayed(displayed = true) {
    displayed ? cy.get('@activateBtn').should('be.visible') : cy.get('@activateBtn').should('not.exist')
  }

  /**
   * Assert if a selected role is editable or not
   *
   * @param {boolean} editable True is the default value to assert the role is editable, false otherwise
   *
   */
  assertRoleIsEditable(editable = true) {
    // header not editable
    editable ? this.assertEntityNameEditable(true) : this.assertEntityNameEditable(false)

    // table not editable
    editable ? cy.get(selectors.roleTableNotEditable).should('not.exist') : cy.get(selectors.roleTableNotEditable).should('be.visible')
  }

  /**
   * Assert if the CRUD columns with the permissions (View, Update, Create, and Delete) are displayed
   *
   */
  assertCRUDColumnsDisplayed() {
    cy.get(selectors.columnHeaderView).should('be.visible')
    cy.get(selectors.columnHeaderUpdate).should('be.visible')
    cy.get(selectors.columnHeaderCreate).should('be.visible')
    cy.get(selectors.columnHeaderDelete).should('be.visible')
  }

  // ------------------------------------------------------------------------------------- PERMISSIONS -------------------------------------------------------------------------- //

  /**
   * Add or remove permissions of a selected role
   *
   * @param {string} permissionName Permission name of a role
   * @param {array} permissionsType Array containing the permissions, for this permission are allowed ['view', 'update', 'create', 'delete']
   * @param {boolean} insertPermission True to insert permission, false to remove
   *
   * @example:
   * addOrRemovePermissions('accessfilters', ['delete']) -> It inserts the permission Delete in the Access Filter permission
   * addOrRemovePermissions('settings', ['update'], false) -> It removes the permission Update in the Settings permission
   */
  addOrRemovePermissions(permissionName, permissionsType, insertPermission = true) {
    // Manipulate permissionName and permissionsType, so we do not need to be worried about capitalization nor blank spaces
    // @ts-ignore
    permissionName = permissionName.replaceAll(' ', '').toLowerCase()
    permissionsType = permissionsType.map((permission) => permission.replaceAll(' ', '').toLowerCase())

    // Verify array integrity
    if (utils.arrayHasDuplicates(permissionsType) || permissionsType.length > 4) {
      throw new Error('A permission type must be unique and the max amount of permissions is 4.')
    }

    // Variable to control if we are gonna insert or remove the permission
    let verifyActiveState = ''
    insertPermission ? (verifyActiveState = ':not([class*= active])') : (verifyActiveState = '[class*= active]')

    // Pick permission
    this.getPermissionsByName(permissionName).as('permission')

    // Insert or remove the permissions
    for (let i = 0; i < permissionsType.length; i++) {
      switch (permissionsType[i]) {
        case 'view':
          cy.get('@permission')
            .find('gs-checkbox[name = view]' + verifyActiveState)
            .scrollIntoView()
            .click()
          break

        case 'update':
          cy.get('@permission')
            .find('gs-checkbox[name = update]' + verifyActiveState)
            .scrollIntoView()
            .click()
          break

        case 'create':
          cy.get('@permission')
            .find('gs-checkbox[name = create]' + verifyActiveState)
            .scrollIntoView()
            .click()
          break

        case 'delete':
          cy.get('@permission')
            .find('gs-checkbox[name = delete]' + verifyActiveState)
            .scrollIntoView()
            .click()
          break

        default:
          throw new Error(permissionsType + ' is not valid. Please, provide a valid permission type for this one!')
      }
    }
  }

  /**
   * Insert or remove ALL permissions at once of a selected role
   *
   * @param {string} permissionsType Permissions type, in which are are allowed ['view', 'update', 'create', 'delete']
   *
   * @example:
   * insertOrRemoveAllPermissions('delete') -> It clicks on the Delete column header to insert or remove all delete permissions of all permissions
   */
  addOrRemoveAllPermissions(permissionsType) {
    // Manipulate permissionName and permissionsType, so we do not need to be worried about capitalization nor blank spaces
    // @ts-ignore
    permissionsType = permissionsType.replaceAll(' ', '').toLowerCase()

    cy.log('Permissions: ' + permissionsType)
    switch (permissionsType) {
      case 'view':
        cy.get(selectors.columnHeaderView).scrollIntoView().click()
        break

      case 'update':
        cy.get(selectors.columnHeaderUpdate).scrollIntoView().click()
        break

      case 'create':
        cy.get(selectors.columnHeaderCreate).scrollIntoView().click()
        break

      case 'delete':
        cy.get(selectors.columnHeaderDelete).scrollIntoView().click()
        break

      default:
        throw new Error(permissionsType + ' is not valid. Please, provide a valid permission type!')
    }
  }

  /**
   * Assert a given permission is active or not of a selected role
   *
   * @param {string} permissionName Permission name of a role
   * @param {array} permissionsType Array containing the permissions, for this permission are allowed ['view', 'update', 'create', 'delete']
   * @param {boolean} activeState True to assert the permission is selected, false otherwise
   *
   * @example:
   * assertPermissionState('accessfilters', ['delete'], true) -> It asserts the permission Delete in the Access Filter permission is active
   * assertPermissionState('settings', ['update'], false) -> It asserts the permission Update in the Settings permission is NOT active
   */
  assertPermissionState(permissionName, permissionsType, activeState) {
    // Manipulate permissionName and permissionsType, so we do not need to be worried about capitalization nor blank spaces
    // @ts-ignore
    permissionName = permissionName.replaceAll(' ', '').toLowerCase()
    permissionsType = permissionsType.map((permission) => permission.replaceAll(' ', '').toLowerCase())

    // Verify array integrity
    if (utils.arrayHasDuplicates(permissionsType) || permissionsType.length > 4) {
      throw new Error('A permission type must be unique and the max amount of permissions is 4.')
    }

    // Variable to control the expected permission state
    let verifyActiveState = ''
    activeState ? (verifyActiveState = '[class*= active]') : (verifyActiveState = ':not([class*= active])')

    // Pick permission
    this.getPermissionsByName(permissionName).as('permission')

    // Insert or remove the permissions
    for (let i = 0; i < permissionsType.length; i++) {
      switch (permissionsType[i]) {
        case 'view':
          cy.get('@permission')
            .find('gs-checkbox[name = view]' + verifyActiveState)
            .scrollIntoView()
            .should('be.visible')
          break

        case 'update':
          cy.get('@permission')
            .find('gs-checkbox[name = update]' + verifyActiveState)
            .scrollIntoView()
            .should('be.visible')
          break

        case 'create':
          cy.get('@permission')
            .find('gs-checkbox[name = create]' + verifyActiveState)
            .scrollIntoView()
            .should('be.visible')
          break

        case 'delete':
          cy.get('@permission')
            .find('gs-checkbox[name = delete]' + verifyActiveState)
            .scrollIntoView()
            .should('be.visible')
          break

        default:
          throw new Error(permissionsType + ' is not valid. Please, provide a valid permission type for this one!')
      }
    }
  }

  /**
   * Assert the permissions headers View, Update, Create, and Delete are displayed
   */
  assertPermissionsHeadersAreDisplayed() {
    cy.get(selectors.allPermissionsHeaders).each(($header) => {
      cy.wrap($header).should('be.visible')
    })
  }

  /**
   * Assert the 'New role' button is displayed or not
   *
   * @param {boolean} displayed True is the default value to assert the button is displayed. False otherwise
   */
  assertCreateNewRoleButtonDisplayed(displayed = true) {
    displayed ? cy.get(selectors.newRoleBtn).should('be.visible') : cy.get(selectors.newRoleBtn).should('not.exist')
  }

  /**
   *
   * @param {Number} number Number to be asserted in the Permissions Search Results after searching for a permission
   *
   * @example
   * Send number equals 1 to assert the text 1 SEARCH RESULT(S) alongside the Permissions header
   */
  assertNumberOfSearchResultsForPermissions(number) {
    cy.xpath(selectors.searchResultForPermissions + `[normalize-space(text()) = '${number} Search Result(s)']`).should('be.visible')
  }

  /**
   * Assert a permission is highlighted. It happens after a search for a permissions.
   *
   * @param {string} permissionName Permission name to validate. It is case sensitive
   * @param {number} numberOfPermissions 1 is the default value to validate only one permission is highlighted. Send a different number to validate many elements highlighted.
   *
   * @example
   * permissionName as 'email' to validate the permission email is highlighted.
   * permissionName as 'participants' and numberOfPermissions as 16 to validate the permission participants is highlighted in 16 elements.
   */
  assertPermissionHighlighted(permissionName, numberOfPermissions = 1) {
    cy.xpath(`//th[@name="permission_name"]//gs-highlighted-text//mark[normalize-space(text()) = '${permissionName}']`).should('be.visible').and('have.length', numberOfPermissions)
  }

  // --------------------------------------------------------------------------------------- OTHERS ------------------------------------------------------------------------------------//

  /**
   * Activate the selected role
   */
  activateRole() {
    cy.get(selectors.activateRoleBtn).click()
    this.waitRoleIsActivated()
    cy.forcedWait(300) // Necessary because the UI takes a very quick time to reload the data correctly
  }

  // ---------------------------------------------------------------------------------  INTERCEPTIONS -------------------------------------------------------------------------------- //

  /**
   * Intercept the rolesLoading request located in the object apiInterceptions and mock the data with a given fixture file.
   *
   * @param {string} fixtureFile name or path for the fixture file located inside the fixtures folder
   */
  interceptAndMockRolesLoadingRequest(fixtureFile) {
    cy.intercept('GET', apiInterceptions.rolesLoading, { fixture: fixtureFile }).as('emptyRoleList')
  }

  /**
   * Waits until the page is loaded. This is a specific behavior of this page
   */
  waitRoleIsActivated() {
    cy.intercept('PATCH', apiInterceptions.roleActivated).as('roleActivated')
    cy.wait('@roleActivated', { requestTimeout: 10000 })
  }
}

export default RoleManagementPage
