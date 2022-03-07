import EquityAdmin from '../../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe('Statement Management - Participant Statements tests', () => {
  beforeEach(() => {
    equityAdmin.loginPage.login()
    equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('statement')
    equityAdmin.clientStatementsPage.checkPageUrl()
  })

  /**
   * @missing_data Need to have a clients for each possible status: INITIATED, RECONCILED, PendingValidation, PUBLISHED, and PARTIALLY PUBLISHED
   */
  it.skip('C7394241_Statements_Download_Button_Visibility_Behavior', () => {
    // INITIATED
    equityAdmin.clientStatementsPage.filterClientStatements('Velocys PLC')
    equityAdmin.clientStatementsPage.clickClientTable(103)
    equityAdmin.clientParticipantStatementsPage.assertSummaryButtonDisplayed(false)
    equityAdmin.clientParticipantStatementsPage.clickBackToManageStatements()

    // RECONCILED
    equityAdmin.clientStatementsPage.clearAllFilters()
    equityAdmin.clientStatementsPage.filterClientStatements('Mercari')
    equityAdmin.clientStatementsPage.clickClientTable(84)
    equityAdmin.clientParticipantStatementsPage.assertSummaryButtonDisplayed(false)
    equityAdmin.clientParticipantStatementsPage.clickBackToManageStatements()

    // Pending Validation
    equityAdmin.clientStatementsPage.clearAllFilters()
    equityAdmin.clientStatementsPage.filterClientStatements('Kerry Logistics')
    equityAdmin.clientStatementsPage.clickClientTable(97)
    equityAdmin.clientParticipantStatementsPage.assertSummaryButtonDisplayed()
    equityAdmin.clientParticipantStatementsPage.clickBackToManageStatements()

    // PUBLISHED
    equityAdmin.clientStatementsPage.clearAllFilters()
    equityAdmin.clientStatementsPage.filterClientStatements('Interxion')
    equityAdmin.clientStatementsPage.clickClientTable(76)
    equityAdmin.clientParticipantStatementsPage.assertSummaryButtonDisplayed()
    equityAdmin.clientParticipantStatementsPage.clickBackToManageStatements()

    // PARTIALLY PUBLISHED
    equityAdmin.clientStatementsPage.clearAllFilters()
    equityAdmin.clientStatementsPage.filterClientStatements('Cavotec')
    equityAdmin.clientStatementsPage.clickClientTable(78)
    equityAdmin.clientParticipantStatementsPage.assertSummaryButtonDisplayed()
  })

  /**
   * @firefox_limited because Firefox does not save the downloaded file in the default cypress download folder:
   * It works only in the pipeline with Linux machines. You will face an issue (running this test locally.) while this issue is not resolved by the Cypress team.
   * Issue raised in https://github.com/cypress-io/cypress/issues/17896
   *
   * @missing_data Client with "Pending Validation", PUBLISHED, or PARTIALLY PUBLISHED statement
   */
  it.skip('C7394242_Download_Summary_Report_Functionality', { browser: '!firefox' }, () => {
    // Pending Validation
    const clientStatementName = 'Interxion'
    const clientStatementId = 76

    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementName)
    equityAdmin.clientStatementsPage.clickClientTable(clientStatementId)
    equityAdmin.clientParticipantStatementsPage.assertSummaryButtonDisplayed()
    equityAdmin.clientParticipantStatementsPage.clickSummaryDownloadButtonToDownloadCSVFile()
    equityAdmin.clientParticipantStatementsPage.assertProgressBarDisplayed()
    equityAdmin.clientParticipantStatementsPage.assertFileWasDownloadedSuccessfully(clientStatementName + '_Summary.csv')
  })

  /**
   * TODO: @missing_steps scroll not working properly. Need to investigate why it does not work in our website
   *
   * @missing_data Need a client statement
   */
  it.skip('C7394265_View_Statements', () => {
    const clientStatementName = 'Keywords Studios plc'
    const clientStatementId = 87
    const idsParticipantsList = [1, 2]

    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementName)
    equityAdmin.clientStatementsPage.clickClientTable(clientStatementId)
    equityAdmin.clientParticipantStatementsPage.checkPageUrl()
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatementsTableContainsExpectedColumnsInOrder()
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatementsTableInOrderById(idsParticipantsList)
  })

  /**
   * @missing_data Need to have a client statement
   * @mocks_used
   */
  it.skip('C7395182_Select_Client_Without_Participants_To_Check_Empty_State', () => {
    const clientStatementName = 'Repsol'
    const clientStatementId = 638

    // Intercept the request to force a empty list in Participant Statements
    equityAdmin.clientParticipantStatementsPage.interceptAndMockParticipantStatementsLoadingRequest('participantStatements_EmptyList.json')

    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementName)
    equityAdmin.clientStatementsPage.clickClientTable(clientStatementId)
    equityAdmin.clientParticipantStatementsPage.assertNoDataMessageFoundDisplayed()
  })

  /**
   * @missing_data Need to have a client with some participants that meets the searches you want to do.
   */
  it.skip('C7394707_Participant_Filter_Behavior', () => {
    const clientStatementName = 'Amadeus'
    const clientStatementId = 81
    const participantID = 273850
    const participantName = 'Cisneros'
    const participantStatus = 'Published'
    const participantExternalId = '49071'

    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementName)
    equityAdmin.clientStatementsPage.clickClientTable(clientStatementId)
    equityAdmin.clientStatementsPage.getNumberOfRecordsDisplayed()

    // By Participant Name
    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements(participantName)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatementDisplayed(participantID)
    equityAdmin.clientParticipantStatementsPage.assertNumberOfRecordsDisplayedTable(4)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    // By Internal Id
    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantID)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatementDisplayed(participantID)
    equityAdmin.clientParticipantStatementsPage.assertNumberOfRecordsDisplayedTable(1)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    // By External Id
    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', -1, '', participantExternalId)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatementDisplayed(participantID)
    equityAdmin.clientParticipantStatementsPage.assertNumberOfRecordsDisplayedTable(1)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    // By Status
    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', -1, participantStatus)
    equityAdmin.clientParticipantStatementsPage.assertNumberOfRecordsDisplayedTable(908)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    // By Name and Internal Id
    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements(participantName, participantID)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatementDisplayed(participantID)
    equityAdmin.clientParticipantStatementsPage.assertNumberOfRecordsDisplayedTable(1)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    // By Name External Id
    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements(participantName, -1, '', participantExternalId)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatementDisplayed(participantID)
    equityAdmin.clientParticipantStatementsPage.assertNumberOfRecordsDisplayedTable(1)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    // By Name and Status
    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements(participantName, -1, participantStatus)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatementDisplayed(participantID)
    equityAdmin.clientParticipantStatementsPage.assertNumberOfRecordsDisplayedTable(1)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    // By Internal Id and External Id
    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantID, '', participantExternalId)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatementDisplayed(participantID)
    equityAdmin.clientParticipantStatementsPage.assertNumberOfRecordsDisplayedTable(1)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    // By Internal Id and Status
    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantID, participantStatus)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatementDisplayed(participantID)
    equityAdmin.clientParticipantStatementsPage.assertNumberOfRecordsDisplayedTable(1)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    // By External Id and Status
    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', -1, participantStatus, participantExternalId)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatementDisplayed(participantID)
    equityAdmin.clientParticipantStatementsPage.assertNumberOfRecordsDisplayedTable(1)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    // By Name, Internal Id, Status, and External Id
    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements(participantName, participantID, participantStatus, participantExternalId)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatementDisplayed(participantID)
    equityAdmin.clientParticipantStatementsPage.assertNumberOfRecordsDisplayedTable(1)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    // Check empty state
    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('SomeRandomWordToBringTheNoDataMessageDisplayed')
    equityAdmin.clientParticipantStatementsPage.assertNoDataMessageFoundDisplayed()
  })

  /**
   *
   * @missing_data Need to have one client with Pending Validation status. This client needs to have some participants with Pending Validation
   *
   */
  it.skip('C9309233_Statements_User_Puts_Statements_On_Hold', () => {
    const clientStatementName = 'SJP'
    const clientStatementId = 133
    const participantIDs = [166106, 354141, 169181, 202976]
    const participantStatusBefore = 'Pending Validation'
    const participantStatusAfter = 'On Hold'

    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementName)
    equityAdmin.clientStatementsPage.clickClientTable(clientStatementId)

    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantIDs[0])
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantIDs[0])
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantIDs[0], participantStatusBefore)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantIDs[1])
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantIDs[1])
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantIDs[1], participantStatusBefore)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantIDs[2])
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantIDs[2])
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantIDs[2], participantStatusBefore)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantIDs[3])
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantIDs[3])
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantIDs[3], participantStatusBefore)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    equityAdmin.clientParticipantStatementsPage.clickInTableHeaderToPerformActions('on hold', participantIDs.length)

    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantIDs[0], participantStatusAfter)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantIDs[1], participantStatusAfter)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantIDs[2], participantStatusAfter)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantIDs[3], participantStatusAfter)
    equityAdmin.clientParticipantStatementsPage.assertToastNotificationMessageIsDisplayed('Success')
  })

  /**
   *
   * @missing_data Need to have one client with Pending Validation status. This client needs to have some participants with Pending Validation and other with other statuses
   *
   */
  it.skip('C9309234_User_Tries_To_Move_Statements_Not_In_Pending_Validation_To_On_Hold', () => {
    const clientStatementName = 'SJP'
    const clientStatementId = 133
    const participantOnHoldIDs = [354141, 169181, 202976]
    const participantPendingValidationIDs = [233223]
    const participantStatusBefore = 'Pending Validation'
    const participantStatusAfter = 'On Hold'

    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementName)
    equityAdmin.clientStatementsPage.clickClientTable(clientStatementId)

    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantOnHoldIDs[0])
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantOnHoldIDs[0])
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldIDs[0], participantStatusAfter)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantOnHoldIDs[1])
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantOnHoldIDs[1])
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldIDs[1], participantStatusAfter)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantOnHoldIDs[2])
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantOnHoldIDs[2])
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldIDs[2], participantStatusAfter)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantPendingValidationIDs[0])
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantPendingValidationIDs[0])
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantPendingValidationIDs[0], participantStatusBefore)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    equityAdmin.clientParticipantStatementsPage.clickInTableHeaderToPerformActions('on hold', participantPendingValidationIDs.length)

    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldIDs[0], participantStatusAfter)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldIDs[1], participantStatusAfter)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldIDs[2], participantStatusAfter)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantPendingValidationIDs[0], participantStatusAfter)
    equityAdmin.clientParticipantStatementsPage.assertToastNotificationMessageIsDisplayed('Success')
  })

  /**
   * @missing_data Need to have one client with any status but Pending Validation nor Published.
   */
  it.skip('C9324997_Try_To_Recall_Single_Participant_Statement_Not_In_Published_Status', () => {
    const clientStatementReconciledName = 'Veloxis Pharmaceuticals'
    const clientStatementReconciledId = 80
    const participantOnHoldId = 251656
    const participantPendingValidationId = 251654

    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementReconciledName)
    equityAdmin.clientStatementsPage.clickClientTable(clientStatementReconciledId)

    // Participant with On Hold status
    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantOnHoldId)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldId, 'On Hold')
    equityAdmin.clientParticipantStatementsPage.assertRecallButtonDisplayedForParticipant(participantOnHoldId, false)
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    //Participant with Pending Validation status
    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantPendingValidationId)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantPendingValidationId, 'Pending Validation')
    equityAdmin.clientParticipantStatementsPage.assertRecallButtonDisplayedForParticipant(participantPendingValidationId, false)
  })

  /**
   *
   * @missing_data Need to have one client with PARTIALLY PUBLISHED status and at least 3 participants into it with ON HOLD status and 3 with other statuses
   *
   * TODO: @missing_steps
   *
   */
  it.skip('C9324992_Publish_Participant_Statements_Not_On_Hold', () => {
    const clientStatementPartiallyPublishedName = 'Veloxis'
    const clientStatementPartiallyPublishedId = 80
    const participantOnHoldIds = [251656, 251597, 251654]
    const participantOtherStatusesIds = [251593, 251613, 251629]

    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementPartiallyPublishedName)
    equityAdmin.clientStatementsPage.clickClientTable(clientStatementPartiallyPublishedId)

    // Assert approve button displayed only for specific participants
    equityAdmin.clientParticipantStatementsPage.assertApproveButtonDisplayedForParticipant(participantOnHoldIds[0])
    equityAdmin.clientParticipantStatementsPage.assertApproveButtonDisplayedForParticipant(participantOnHoldIds[1])
    equityAdmin.clientParticipantStatementsPage.assertApproveButtonDisplayedForParticipant(participantOnHoldIds[2])
    equityAdmin.clientParticipantStatementsPage.assertApproveButtonDisplayedForParticipant(participantOtherStatusesIds[0], false)
    equityAdmin.clientParticipantStatementsPage.assertApproveButtonDisplayedForParticipant(participantOtherStatusesIds[1], false)
    equityAdmin.clientParticipantStatementsPage.assertApproveButtonDisplayedForParticipant(participantOtherStatusesIds[2], false)

    // Select participants to approve
    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantOnHoldIds[0])
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantOnHoldIds[0])
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldIds[0], 'On Hold')
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantOnHoldIds[1])
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantOnHoldIds[1])
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldIds[1], 'On Hold')
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantOnHoldIds[2])
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantOnHoldIds[2])
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldIds[2], 'On Hold')
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()
  })

  /**
   * @missing_data We need a client with at least one participant with Pending Validation status
   */
  it.skip('C7592120_Statements_Rerun_Button_Behavior_Over_On_Hold_Status', () => {
    const clientStatementPendingValidationName = 'Keywords Studios plc'
    const clientStatementPendingValidationId = 87
    const participantPendingValidationId = 226084

    // Pick client
    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementPendingValidationName)
    equityAdmin.clientStatementsPage.clickClientTable(clientStatementPendingValidationId)

    // Pick participant and ensure correct status
    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantPendingValidationId)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantPendingValidationId, 'Pending Validation')

    // On Hold behavior
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantPendingValidationId)
    equityAdmin.clientParticipantStatementsPage.assertActionButtonDisplayedInTableHeader('on hold')
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantPendingValidationId)
    equityAdmin.clientParticipantStatementsPage.assertActionButtonDisplayedInTableHeader('on hold', false)

    // On hold participant
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantPendingValidationId)
    equityAdmin.clientParticipantStatementsPage.clickInTableHeaderToPerformActions('on hold', 1)

    // Verify rerun button
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantPendingValidationId, 'On Hold')
    equityAdmin.clientParticipantStatementsPage.assertButtonIsDisplayedInParticipantActions(participantPendingValidationId, 'rerun')
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantPendingValidationId)
    equityAdmin.clientParticipantStatementsPage.clickInTableHeaderToPerformActions('rerun', 1)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantPendingValidationId, 'Pending Validation')
  })

  /**
   * @missing_data We need a client with at least 3 participants with On Hold status
   */
  it.skip('C7592122_Statements_Rerun_Multiple_Statements', () => {
    const clientStatementPendingValidationName = 'Keywords Studios plc'
    const clientStatementPendingValidationId = 87
    const participantOnHoldId = [226084, 226072, 2260865]

    // Pick client
    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementPendingValidationName)
    equityAdmin.clientStatementsPage.clickClientTable(clientStatementPendingValidationId)

    // Select participant 1
    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantOnHoldId[0])
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldId[0], 'On Hold')
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantOnHoldId[0])
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    // Select participant 2
    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantOnHoldId[1])
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldId[1], 'On Hold')
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantOnHoldId[1])
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    // Select participant 3
    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantOnHoldId[2])
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldId[2], 'On Hold')
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantOnHoldId[2])
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    // Rerun participants
    equityAdmin.clientParticipantStatementsPage.clickInTableHeaderToPerformActions('rerun', participantOnHoldId.length)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldId[0], 'Pending Validation')
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldId[1], 'Pending Validation')
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantOnHoldId[2], 'Pending Validation')
  })

  /**
   * @missing_data We need a client that has participants statements as Pending Validation
   *
   */
  it.skip('C15581309 - Audit Log -  Pending Validation', () => {
    const clientStatementPendingValidationName = 'SJP Partners'
    const clientStatementPendingValidationId = 641

    // Pending Validation data
    const participantPendingValidationId = 222713
    const participantPendingValidationName = 'Barrera'
    const participantPendingValidationAsOfDate = '2020'
    const participantPendingValidationCurrentStatus = 'Pending Validation'
    const participantPendingValidationAuditTrailStatuses = [participantPendingValidationCurrentStatus, 'On Hold', 'Pending Validation', 'Initiated']
    const participantPendingValidationAuditTrailUsers = ['UK_205_52d0ee01-555e-44ba-8ee6-3b38bfae3dc6', 'UK_205_52d0ee01-555e-44ba-8ee6-3b38bfae3dc6', 'system', 'system']
    const participantPendingValidationAuditTrailTimestamps = ['21/02/2022 • 11:42:11', '21/02/2022 • 11:42:06', '08/02/2022 • 08:56:31', '08/02/2022 • 08:56:30']

    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementPendingValidationName)
    equityAdmin.clientStatementsPage.clickClientTable(clientStatementPendingValidationId)

    // Pending Validation
    equityAdmin.clientParticipantStatementsPage.clickOnParticipantById(participantPendingValidationId)
    equityAdmin.clientParticipantStatementsPage.assertRightL4BarIsDisplayed()
    equityAdmin.clientParticipantStatementDetailL4Page.assertParticipantStatementDetails(
      participantPendingValidationName,
      participantPendingValidationAsOfDate,
      participantPendingValidationCurrentStatus,
      participantPendingValidationAuditTrailStatuses,
      participantPendingValidationAuditTrailUsers,
      participantPendingValidationAuditTrailTimestamps
    )
    equityAdmin.clientParticipantStatementsPage.clickOutsideToCloseL4RightBar()
  })

  /**
   * @missing_data We need a client that has participants statements as On Hold
   *
   */
  it.skip('C15581310_Audit Log - On Hold', () => {
    const clientStatementPendingValidationName = 'Keywords Studios plc'
    const clientStatementPendingValidationId = 87

    // On Hold data
    const participantOnHoldId = 229042
    const participantOnHoldName = 'Ramirez'
    const participantOnHoldAsOfDate = '2020'
    const participantOnHoldCurrentStatus = 'On Hold'
    const participantOnHoldAuditTrailStatuses = [participantOnHoldCurrentStatus, ' Pending Validation', 'On Hold', 'Initiated']
    const participantOnHoldAuditTrailUsers = ['lmello@globalshares.com', 'UK_311_44b4e03f-7c57-4c65-aa53-e63604d57775', 'UK_148_812dcf25-2f02-4400-a563-6692bd440b84', 'system']
    const participantOnHoldAuditTrailTimestamps = ['17/11/2021 • 08:54:05', '09/11/2021 • 02:54:04', '07/09/2021 • 10:24:42', '11/05/2021 • 05:13:30']

    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementPendingValidationName)
    equityAdmin.clientStatementsPage.clickClientTable(clientStatementPendingValidationId)

    // On Hold
    equityAdmin.clientParticipantStatementsPage.clickOnParticipantById(participantOnHoldId)
    equityAdmin.clientParticipantStatementsPage.assertRightL4BarIsDisplayed()
    equityAdmin.clientParticipantStatementDetailL4Page.assertParticipantStatementDetails(
      participantOnHoldName,
      participantOnHoldAsOfDate,
      participantOnHoldCurrentStatus,
      participantOnHoldAuditTrailStatuses,
      participantOnHoldAuditTrailUsers,
      participantOnHoldAuditTrailTimestamps
    )
    equityAdmin.clientParticipantStatementsPage.clickOutsideToCloseL4RightBar()
  })

  /**
   * @missing_data We need clients with all the possible statuses
   *
   */
  it.skip('C7623837_Statements_Reject_Button_Displayed_Only_For_Pending_Validation_Status', () => {
    const clientStatementPendingValidationName = 'Keywords Studios plc'
    const clientStatementPendingValidationId = 87
    const clientStatementReconcilingName = 'Shelf Drilling Ltd'
    const clientStatementReconcilingId = 83
    const clientStatementPartiallyPublishedName = 'Cavotec'
    const clientStatementPartiallyPublishedId = 78
    const clientStatementPublishedName = 'Sanne Group PLC'
    const clientStatementPublishedId = 85
    const clientStatementInitiatedName = 'Skanska'
    const clientStatementInitiatedId = 119

    // Pending Validation
    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementPendingValidationName)
    equityAdmin.clientStatementsPage.clickClientTable(clientStatementPendingValidationId)
    equityAdmin.clientParticipantStatementsPage.checkPageUrl()
    equityAdmin.clientParticipantStatementsPage.assertRejectButtonDisplayed()
    equityAdmin.clientParticipantStatementsPage.clickBackToManageStatements()
    equityAdmin.clientStatementsPage.clearAllFilters()

    // Reconciling
    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementReconcilingName)
    equityAdmin.clientStatementsPage.clickClientTable(clientStatementReconcilingId)
    equityAdmin.clientParticipantStatementsPage.checkPageUrl()
    equityAdmin.clientParticipantStatementsPage.waitForClientParticipantStatementsToBeLoaded() // wait until the page is loaded to avoid a false positive
    equityAdmin.clientParticipantStatementsPage.assertRejectButtonDisplayed(false)
    equityAdmin.clientParticipantStatementsPage.clickBackToManageStatements()
    equityAdmin.clientStatementsPage.clearAllFilters()

    // Partially Published
    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementPartiallyPublishedName)
    equityAdmin.clientStatementsPage.clickClientTable(clientStatementPartiallyPublishedId)
    equityAdmin.clientParticipantStatementsPage.checkPageUrl()
    equityAdmin.clientParticipantStatementsPage.waitForClientParticipantStatementsToBeLoaded() // wait until the page is loaded to avoid a false positive
    equityAdmin.clientParticipantStatementsPage.assertRejectButtonDisplayed(false)
    equityAdmin.clientParticipantStatementsPage.clickBackToManageStatements()
    equityAdmin.clientStatementsPage.clearAllFilters()

    // Published
    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementPublishedName)
    equityAdmin.clientStatementsPage.clickClientTable(clientStatementPublishedId)
    equityAdmin.clientParticipantStatementsPage.checkPageUrl()
    equityAdmin.clientParticipantStatementsPage.waitForClientParticipantStatementsToBeLoaded() // wait until the page is loaded to avoid a false positive
    equityAdmin.clientParticipantStatementsPage.assertRejectButtonDisplayed(false)
    equityAdmin.clientStatementsPage.clearAllFilters()

    // Initiated
    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementInitiatedName)
    equityAdmin.clientStatementsPage.clickClientTable(clientStatementInitiatedId)
    equityAdmin.clientParticipantStatementsPage.checkPageUrl()
    equityAdmin.clientParticipantStatementsPage.waitForClientParticipantStatementsToBeLoaded() // wait until the page is loaded to avoid a false positive
    equityAdmin.clientParticipantStatementsPage.assertRejectButtonDisplayed(false)
    equityAdmin.clientParticipantStatementsPage.clickBackToManageStatements()
  })

  /**
   * @missing_data A client with Pending Validation status
   *
   */
  it.skip('C7623838_Statements_Reject_Function_Behavior', () => {
    const clientStatementPendingValidationName = 'Generali Share Save Plan'
    const clientStatementPendingValidationId = 94
    const clientStatus = 'Pending Validation'
    const clientNewStatus = 'Initiated'

    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementPendingValidationName)
    equityAdmin.clientStatementsPage.clickClientTable(clientStatementPendingValidationId)
    equityAdmin.clientParticipantStatementsPage.assertClientStatus(clientStatus)
    equityAdmin.clientParticipantStatementsPage.clickToRejectStatement()
    equityAdmin.clientParticipantStatementsPage.assertClientStatus(clientNewStatus)
    equityAdmin.clientParticipantStatementsPage.assertRejectButtonDisplayed(false)
  })

  /**
   * @missing_data We need clients with all statuses available, such as Initiated, Pending Validation, On Hold, Approved, Published, Recalled...
   *
   * TODO: @missing_steps Waiting for https://globalshares.atlassian.net/browse/PB-954
   *
   */
  it.skip('C7623839_Statements_Partially_Published_Or_Published_States_Can_Be_Recalled', () => {
    const clientStatementPublishedName = 'Tokyo Electron'
    const clientStatementPublishedId = 1387
    const participantsRecalledSample1 = [589008, 589119, 589124]

    const clientStatementPartiallyPublishedName = 'GSK'
    const clientStatementPartiallyPublishedId = 926
    const participantsRecalledSample2 = [180932, 85568, 86582]

    const clientStatementPendingValidationName = 'Amadeus'
    const clientStatementPendingValidationId = 653

    const clientStatementInitiatedName = 'Global Ports'
    const clientStatementInitiatedId = 655

    const clientStatementReconcilingName = 'Lenovo'
    const clientStatementReconcilingId = 1702

    // Published
    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementPublishedName)
    equityAdmin.clientStatementsPage.clickClientTable(clientStatementPublishedId)
    equityAdmin.clientParticipantStatementsPage.checkPageUrl()
    equityAdmin.clientParticipantStatementsPage.waitForClientParticipantStatementsToBeLoaded() // wait until the page is loaded to avoid a false positive
    equityAdmin.clientParticipantStatementsPage.assertRecallButtonDisplayed()
    equityAdmin.clientParticipantStatementsPage.clickToRecallStatement()
    equityAdmin.clientParticipantStatementsPage.assertClientStatus('Initiated')
    // Participants changed changed to recalled.
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantsRecalledSample1[0], 'Recalled')
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantsRecalledSample1[1], 'Recalled')
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantsRecalledSample1[2], 'Recalled')
    equityAdmin.clientParticipantStatementsPage.clickBackToManageStatements()
    equityAdmin.clientStatementsPage.clearAllFilters()

    // Partially Published
    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementPartiallyPublishedName)
    equityAdmin.clientStatementsPage.clickClientTable(clientStatementPartiallyPublishedId)
    equityAdmin.clientParticipantStatementsPage.checkPageUrl()
    equityAdmin.clientParticipantStatementsPage.waitForClientParticipantStatementsToBeLoaded() // wait until the page is loaded to avoid a false positive
    equityAdmin.clientParticipantStatementsPage.assertRecallButtonDisplayed()
    equityAdmin.clientParticipantStatementsPage.clickToRecallStatement()
    equityAdmin.clientParticipantStatementsPage.assertClientStatus('Initiated')
    // Participants changed changed to recalled.
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantsRecalledSample2[0], 'Recalled')
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantsRecalledSample2[1], 'Recalled')
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantsRecalledSample2[2], 'Recalled')
    equityAdmin.clientParticipantStatementsPage.clickBackToManageStatements()
    equityAdmin.clientStatementsPage.clearAllFilters()

    // Pending Validation
    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementPendingValidationName)
    equityAdmin.clientStatementsPage.clickClientTable(clientStatementPendingValidationId)
    equityAdmin.clientParticipantStatementsPage.checkPageUrl()
    equityAdmin.clientParticipantStatementsPage.assertRecallButtonDisplayed(false)
    equityAdmin.clientParticipantStatementsPage.clickBackToManageStatements()
    equityAdmin.clientStatementsPage.clearAllFilters()

    // Initiated
    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementInitiatedName)
    equityAdmin.clientStatementsPage.clickClientTable(clientStatementInitiatedId)
    equityAdmin.clientParticipantStatementsPage.checkPageUrl()
    equityAdmin.clientParticipantStatementsPage.waitForClientParticipantStatementsToBeLoaded() // wait until the page is loaded to avoid a false positive
    equityAdmin.clientParticipantStatementsPage.assertRecallButtonDisplayed(false)
    equityAdmin.clientParticipantStatementsPage.clickBackToManageStatements()
    equityAdmin.clientStatementsPage.clearAllFilters()

    // Reconciling
    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementReconcilingName)
    equityAdmin.clientStatementsPage.clickClientTable(clientStatementReconcilingId)
    equityAdmin.clientParticipantStatementsPage.checkPageUrl()
    equityAdmin.clientParticipantStatementsPage.waitForClientParticipantStatementsToBeLoaded() // wait until the page is loaded to avoid a false positive
    equityAdmin.clientParticipantStatementsPage.assertRecallButtonDisplayed(false)
  })

  /**
   * @missing_data Client statement with status Pending Validation. Also, it needs to have 3 participant statements with Pending Validation and 2 with any other status
   *
   */
  it.skip('C7627257_Statements_User_Puts_Multiple_Statements_On_Hold_For_Only_Pending_Validation_Status', () => {
    const clientStatementPendingValidationName = 'Keywords Studios plc'
    const clientStatementPendingValidationId = 87
    const participantsPendingValidationIds = [226330, 226625, 226331]
    const participantsOtherStatusIds = [229042, 226082]

    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementPendingValidationName)
    equityAdmin.clientStatementsPage.clickClientTable(clientStatementPendingValidationId)

    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantsPendingValidationIds[0])
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantsPendingValidationIds[0])
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantsPendingValidationIds[1])
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantsPendingValidationIds[1])
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantsPendingValidationIds[2])
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantsPendingValidationIds[2])
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantsOtherStatusIds[0])
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantsOtherStatusIds[0])
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    equityAdmin.clientParticipantStatementsPage.filterParticipantStatements('', participantsOtherStatusIds[1])
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantsOtherStatusIds[1])
    equityAdmin.clientParticipantStatementsPage.clearAllFilters()

    equityAdmin.clientParticipantStatementsPage.clickInTableHeaderToPerformActions('on hold', 3)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantsPendingValidationIds[0], 'On Hold')
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantsPendingValidationIds[1], 'On Hold')
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantsPendingValidationIds[2], 'On Hold')
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantsOtherStatusIds[0], 'On Hold')
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantsOtherStatusIds[1], 'On Hold')
  })

  /**
   * @missing_data Clients statements with Pending Validation status and with participants with Pending Validation status inside it.
   */
  it.skip('C15166057_Verify bulk approval when selecting multiple participants with an "On Hold" status in Statement Management', () => {
    const clientStatementPendingValidationName = 'Renesas'
    const clientStatementPendingValidationId = 688
    const participantsPendingValidationIds = [546452, 546400]

    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementPendingValidationName)
    equityAdmin.clientStatementsPage.clickClientTable(clientStatementPendingValidationId)

    // On Hold participants
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantsPendingValidationIds[0])
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantsPendingValidationIds[1])
    equityAdmin.clientParticipantStatementsPage.clickInTableHeaderToPerformActions('on hold', participantsPendingValidationIds.length)
    equityAdmin.clientParticipantStatementsPage.assertToastNotificationMessageIsDisplayed('Success', true, true)

    // Approve participants
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantsPendingValidationIds[0])
    equityAdmin.clientParticipantStatementsPage.clickOnTheCheckboxToSelectParticipant(participantsPendingValidationIds[1])
    equityAdmin.clientParticipantStatementsPage.clickInTableHeaderToPerformActions('Approve', participantsPendingValidationIds.length)
  })

  /**
   * @missing_data A client statement with Pending Validation status and with some Participants Statements inside it.
   */
  it.skip('C7623840_Statements - Publish action', () => {
    const clientStatementPendingValidationName = 'Irish Life'
    const clientStatementPendingValidationId = 1248
    const clientStatus = 'Pending Validation'
    const clientNewStatus = 'Publishing'
    const participantsPendingValidationIds = [131918, 126400, 128153]
    const participantStatusBeforePublishing = 'Pending Validation'
    const participantStatusAfterPublishing = 'Approved'
    const participantStatusAfterSomeTime = 'Published'

    equityAdmin.clientStatementsPage.filterClientStatements(clientStatementPendingValidationName)
    equityAdmin.clientStatementsPage.clickClientTable(clientStatementPendingValidationId)

    // Before publishing
    equityAdmin.clientParticipantStatementsPage.assertClientStatus(clientStatus)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantsPendingValidationIds[0], participantStatusBeforePublishing)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantsPendingValidationIds[1], participantStatusBeforePublishing)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantsPendingValidationIds[2], participantStatusBeforePublishing)

    // Right after publishing
    equityAdmin.clientParticipantStatementsPage.clickToPublish()
    equityAdmin.clientParticipantStatementsPage.assertClientStatus(clientNewStatus)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantsPendingValidationIds[0], participantStatusAfterPublishing)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantsPendingValidationIds[1], participantStatusAfterPublishing)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantsPendingValidationIds[2], participantStatusAfterPublishing)

    // After some time
    equityAdmin.clientParticipantStatementsPage.waitSpecificTime(15000) // Wait until it is completely published
    equityAdmin.clientParticipantStatementsPage.reloadPage()
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantsPendingValidationIds[0], participantStatusAfterSomeTime)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantsPendingValidationIds[1], participantStatusAfterSomeTime)
    equityAdmin.clientParticipantStatementsPage.assertParticipantStatus(participantsPendingValidationIds[2], participantStatusAfterSomeTime)
  })
})
