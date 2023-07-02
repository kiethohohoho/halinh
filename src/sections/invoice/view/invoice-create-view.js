// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import InvoiceNewEditForm from '../invoice-new-edit-form';

// ----------------------------------------------------------------------

export default function InvoiceCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Tạo hóa đơn"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Quản lý hóa đơn',
            href: paths.dashboard.invoice.root,
          },
          {
            name: 'Tạo hóa đơn',
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <InvoiceNewEditForm />
    </Container>
  );
}
