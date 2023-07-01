// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// _mock
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
//
import AccountGeneral from '../account-general';

// ----------------------------------------------------------------------

// const TABS = [
//   {
//     value: 'general',
//     label: 'General',
//     icon: <Iconify icon="solar:user-id-bold" width={24} />,
//   },
//   {
//     value: 'billing',
//     label: 'Billing',
//     icon: <Iconify icon="solar:bill-list-bold" width={24} />,
//   },
//   {
//     value: 'notifications',
//     label: 'Notifications',
//     icon: <Iconify icon="solar:bell-bing-bold" width={24} />,
//   },
//   {
//     value: 'social',
//     label: 'Social links',
//     icon: <Iconify icon="solar:share-bold" width={24} />,
//   },
//   {
//     value: 'security',
//     label: 'Security',
//     icon: <Iconify icon="ic:round-vpn-key" width={24} />,
//   },
// ];

// ----------------------------------------------------------------------

export default function AccountView() {
  const settings = useSettingsContext();

  // const [currentTab, setCurrentTab] = useState('general');

  // const handleChangeTab = useCallback((event, newValue) => {
  //   setCurrentTab(newValue);
  // }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Thông tin cá nhân"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Thông tin cá nhân' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {/* <Tabs
        value={currentTab}
        onChange={handleChangeTab}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {TABS.map((tab) => (
          <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
        ))}
      </Tabs> */}

      <AccountGeneral />

      {/* {currentTab === 'general' && <AccountGeneral />}

      {currentTab === 'billing' && (
        <AccountBilling
          plans={_userPlans}
          cards={_userPayment}
          invoices={_userInvoices}
          addressBook={_userAddressBook}
        />
      )}

      {currentTab === 'notifications' && <AccountNotifications />}

      {currentTab === 'social' && <AccountSocialLinks socialLinks={_userAbout.socialLinks} />}

      {currentTab === 'security' && <AccountChangePassword />} */}
    </Container>
  );
}
