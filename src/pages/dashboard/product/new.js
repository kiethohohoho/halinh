import { Box, Button, Container, IconButton, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import { useSnackbar } from 'src/components/snackbar';
import { useResponsive } from 'src/hooks/use-responsive';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import axiosInstance, { endpoints } from 'src/utils/axios';
// sections
// import { ProductCreateView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export default function ProductCreatePage() {
  const lgUp = useResponsive('up', 'lg');
  const { enqueueSnackbar } = useSnackbar();
  const settings = useSettingsContext();
  const [voucher, setVoucher] = useState();

  const handleGenerateVoucher = () => {
    axiosInstance
      .post(endpoints.product.gen)
      .then(({ data }) => {
        enqueueSnackbar('Lấy code giảm giá thành công!', {
          anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
        });
        setVoucher(data);
      })
      .catch((err) => {
        enqueueSnackbar('Lấy code giảm giá thất bại!', {
          anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
          variant: 'error',
        });
      });
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Lấy code giảm giá</title>
      </Helmet>

      <Box>
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
          <CustomBreadcrumbs
            heading="Lấy code giảm giá"
            links={[
              { name: '', href: paths.dashboard.root },
              // {
              //   name: 'Quản lý Voucher',
              //   href: paths.dashboard.product.root,
              // },
              // { name: 'Tạo voucher' },
            ]}
            sx={{ mb: { xs: 3, md: 5 } }}
          />
        </Container>

        <Tooltip title="Lấy code giảm giá">
          <IconButton color="warning" onClick={handleGenerateVoucher}>
            <Iconify width={30} icon="mdi:auto-mode" />
          </IconButton>
        </Tooltip>
        <Typography sx={{ cursor: 'pointer' }} variant="span" onClick={handleGenerateVoucher}>
          Lấy code giảm giá
        </Typography>
        {voucher && (
          <Box sx={{ mt: 2, px: 2, fontWeight: 'bold' }}>
            <span style={{ marginRight: 8 }}>{voucher.value}</span>
            <Tooltip title="Copy mã voucher">
              <IconButton
                color="info"
                onClick={() => {
                  navigator.clipboard.writeText(voucher.value);
                  enqueueSnackbar('Copy thành công!', {
                    anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
                  });
                }}
              >
                <Iconify icon="uiw:copy" width={20} />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        {/* <ProductCreateView /> */}
      </Box>

      {!lgUp && (
        <Button
          component={RouterLink}
          href="/"
          size="large"
          variant="contained"
          sx={{ mt: 'auto' }}
        >
          Trở về trang chủ
        </Button>
      )}
    </>
  );
}
