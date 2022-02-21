// ------------------------------------------------------------- Components -------------------------------------------------------//
import ClientSwitchMenu from '../components/equityAdmin/clientSwitchMenu'
import ApplicationLeftMenuBar from '../components/equityAdmin/applicationLeftMenuBar'
import ProfileMenuNavBar from '../components/equityAdmin/profileMenuNavBar'
import SearchEngine from '../components/equityAdmin/searchEngine'
import SettingsMenuNavBar from '../components/equityAdmin/settingsMenuNavBar'

// ----------------------------------------------------------------Pages -----------------------------------------------------------//
// Statement Management
import ClientStatementsPage from './equityAdmin/globalSettingsPages/statementManagementPages/clientStatementsPage'
import ClientParticipantStatementsPage from './equityAdmin/globalSettingsPages/statementManagementPages/clientParticipantStatementsPage'
import ParticipantRegulatoryLinkagePage from './equityAdmin/globalSettingsPages/statementManagementPages/participantRegulatoryLinkagePage'
import ClientParticipantStatementDetailL4Page from './equityAdmin/globalSettingsPages/statementManagementPages/clientParticipantStatementDetailL4Page'

// User Management - Settings
import DapManagementPage from './equityAdmin/globalSettingsPages/userManagementPages/dapManagementPage'
import GroupManagementPage from './equityAdmin/globalSettingsPages/userManagementPages/groupManagementPage'
import RoleManagementPage from './equityAdmin/globalSettingsPages/userManagementPages/roleManagementPage'
import UserManagementPage from './equityAdmin/globalSettingsPages/userManagementPages/userManagementPage'
import UserDetailL4Page from './equityAdmin/globalSettingsPages/userManagementPages/userDetailL4Page'
import UserInfoL4Page from './equityAdmin/globalSettingsPages/userManagementPages/userInfoL4Page'
import SelectSettingsL4Page from './equityAdmin/globalSettingsPages/userManagementPages/selectSettingsL4Page'

// Profile
import PersonalInformationPage from './equityAdmin/profilePages/personalInformationPage'
import PreferencesPage from './equityAdmin/profilePages/preferencesPage'
import SecurityPage from './equityAdmin/profilePages/securityPage'

// People Participants
import ClientPeoplePage from './equityAdmin/clientPeoplePages/clientPeoplePage'
import QuickEditParticipantDetailL4Page from './equityAdmin/clientPeoplePages/quickEditParticipantDetailL4Page'
import PersonalProfileOverviewPage from './equityAdmin/clientPeoplePages/peopleParticipantPages/personalProfilePages/personalProfileOverviewPage'
import PersonalProfileAddressAndContactPage from './equityAdmin/clientPeoplePages/peopleParticipantPages/personalProfilePages/personalProfileAddressAndContactPage'
import CompanyProfileOverviewPage from './equityAdmin/clientPeoplePages/peopleParticipantPages/companyProfilePages/companyProfileOverviewPage'
import PrimarySettingsSalesPage from './equityAdmin/clientPeoplePages/peopleParticipantPages/primarySettingsPages/primarySettingsSalesPage'
import SaleAndDividendPage from './equityAdmin/clientPeoplePages/peopleParticipantPages/saleAndDividendPage'
import TaxAndCommissionPage from './equityAdmin/clientPeoplePages/peopleParticipantPages/taxAndCommissionPage'

// Others
import LoginPage from './equityAdmin/loginPage'
import HomePage from './equityAdmin/homePage'
import UnauthorizedPage from './equityAdmin/unauthorizedPage'

/**
 * This is the main class the encapsulates all pages regarding the Equity Admin portal (Except base pages since they are not meant to be directly called).
 *
 * Because of this class, you don't need to import and create objects to all the pages, so you can just call this EquityAdmin class instead.
 *
 * All new pages regarding Equity Admin need to be added in here
 */
class EquityAdmin {
  constructor() {
    // -------------------------------------------------------------------------- Components --------------------------------------------------------------------//
    this.clientSwitchMenu = new ClientSwitchMenu()
    this.applicationLeftMenuBar = new ApplicationLeftMenuBar()
    this.profileMenuNavBar = new ProfileMenuNavBar()
    this.searchEngine = new SearchEngine()
    this.settingsMenuNavBar = new SettingsMenuNavBar()

    // --------------------------------------------------------------------------------Pages ----------------------------------------------------------------------//
    // Statement Management
    this.clientStatementsPage = new ClientStatementsPage()
    this.clientParticipantStatementsPage = new ClientParticipantStatementsPage()
    this.participantRegulatoryLinkagePage = new ParticipantRegulatoryLinkagePage()
    this.clientParticipantStatementDetailL4Page = new ClientParticipantStatementDetailL4Page()

    // User Management - Settings
    this.dapManagementPage = new DapManagementPage()
    this.groupManagementPage = new GroupManagementPage()
    this.roleManagementPage = new RoleManagementPage()
    this.userManagementPage = new UserManagementPage()
    this.userDetailL4Page = new UserDetailL4Page()
    this.userInfoL4Page = new UserInfoL4Page()
    this.selectSettingsL4Page = new SelectSettingsL4Page()

    // Profile
    this.personalInformationPage = new PersonalInformationPage()
    this.preferencesPage = new PreferencesPage()
    this.securityPage = new SecurityPage()

    // People - Client and Participants
    this.clientPeoplePage = new ClientPeoplePage()
    this.quickEditParticipantDetailL4Page = new QuickEditParticipantDetailL4Page()
    this.personalProfileOverviewPage = new PersonalProfileOverviewPage()
    this.personalProfileAddressAndContactPage = new PersonalProfileAddressAndContactPage()
    this.companyProfileOverviewPage = new CompanyProfileOverviewPage()
    this.primarySettingsSalesPage = new PrimarySettingsSalesPage()
    this.saleAndDividendPage = new SaleAndDividendPage()
    this.taxAndCommissionPage = new TaxAndCommissionPage()

    // Others
    this.loginPage = new LoginPage()
    this.homePage = new HomePage()
    this.unauthorizedPage = new UnauthorizedPage()
  }
}

export default EquityAdmin
