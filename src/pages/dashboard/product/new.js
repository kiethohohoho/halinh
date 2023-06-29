import { Box, IconButton, Tooltip } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import { primaryPresets } from 'src/theme/options/presets';
import axiosInstance, { endpoints } from 'src/utils/axios';
// sections
// import { ProductCreateView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export default function ProductCreatePage() {
  const { themeColorPresets } = useSettingsContext();
  const color = primaryPresets.filter((c) => c.name === themeColorPresets)[0].main;
  const { enqueueSnackbar } = useSnackbar();
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
        <title> Dashboard: Generate a new voucher</title>
      </Helmet>

      <Box>
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

        {/* <ProductCreateView /> */}
      </Box >
    </>
  )
}
