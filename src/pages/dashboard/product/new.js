import { Box, Container, IconButton, Tooltip } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import { paths } from 'src/routes/paths';
import axiosInstance, { endpoints } from 'src/utils/axios';
// sections
// import { ProductCreateView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export default function ProductCreatePage() {
  const { enqueueSnackbar } = useSnackbar();
  const settings = useSettingsContext();
  const [voucher, setVoucher] = useState()

  const handleGenerateVoucher = () => {
    axiosInstance.post(endpoints.product.gen)
      .then(({ data }) => {
        enqueueSnackbar('Generate success!');
        setVoucher(data);
      }).catch((err) => {
        enqueueSnackbar('Generate failed!', {
          variant: 'error'
        });
      })
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Tạo Voucher</title>
      </Helmet>

      <Box>
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
          <CustomBreadcrumbs
            heading="Tạo Voucher"
            links={[
              { name: 'Dashboard', href: paths.dashboard.root },
              {
                name: 'Voucher',
                href: paths.dashboard.product.root,
              },
              { name: 'Tạo' },
            ]}
            sx={{ mb: { xs: 3, md: 5 } }}
          />
        </Container>

        {/* <Card> */}
          <Tooltip title="Generate voucher">
            <IconButton
              color="warning"
              onClick={handleGenerateVoucher}
            >
              <Iconify width={30} icon="mdi:auto-mode" />
            </IconButton>
          </Tooltip>
          Generate voucher
          {
            voucher &&
            <Box sx={{ mt: 3 }}>
              {voucher.value}
            </Box>
          }
        {/* </Card> */}
        {/* <ProductCreateView /> */}
      </Box >
    </>
  )
}
