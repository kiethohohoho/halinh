import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
// utils
// routes
// assets
// components
import FormProvider, { RHFAutocomplete, RHFCheckbox, RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { useResponsive } from 'src/hooks/use-responsive';
import { RouterLink } from 'src/routes/components';
import axiosInstance, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export default function UserNewEditForm({ currentInvoice }) {
  const { enqueueSnackbar } = useSnackbar();
  const lgUp = useResponsive('up', 'lg');

  const NewInvoiceSchema = Yup.object().shape({
    voucher: Yup.string(),
    customername: Yup.string().required('Bắt buộc điền Tên khách hàng'),
    typeservice: Yup.string().required('Bắt buộc điền Loại dịch vụ'),
    price: Yup.number().required('Bắt buộc điền Giá tiền'),
    phone: Yup.string(),
    customergroup: Yup.number(),
    customerodd: Yup.boolean(),
    notedvoucher: Yup.string(),
    notedcustomer: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      voucher: currentInvoice?.voucher || '',
      customername: currentInvoice?.customername || '',
      typeservice: currentInvoice?.typeservice || '',
      price: currentInvoice?.price || '',
      phone: currentInvoice?.phone || '',
      customergroup: currentInvoice?.customergroup || '',
      customerodd: currentInvoice?.customerodd || '',
      notedvoucher: currentInvoice?.notedvoucher || '',
      notedcustomer: currentInvoice?.notedcustomer || '',
    }),
    [currentInvoice]
  );

  const methods = useForm({
    resolver: yupResolver(NewInvoiceSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {

      data.notedvoucher = data.notedvoucher.slice(0, -1) * 1;
      if (currentInvoice) {
        await axiosInstance.patch(endpoints.user.update, data);
      } else {
        await axiosInstance.post(endpoints.invoice.create, data);
      }
      enqueueSnackbar(currentInvoice ? 'Cập nhật thành công!' : 'Tạo thành công!');
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="voucher" label="Code giảm giá" />
              <RHFTextField name="customername" label="Tên khách hàng" />

              <RHFAutocomplete
                name="typeservice"
                label="Loại dịch vụ"
                options={['Vip combo', 'v5', 'v7', 'v9', 'v14', 'v18', 'v25']}
                getOptionLabel={(option) => option}
              />

              <RHFTextField name="price" type="number" label="Giá tiền" />

              <RHFTextField name="phone" label="Số điện thoại" />

              <RHFTextField name="customergroup" label="Khách nhóm" />

              <RHFCheckbox name="customerodd" label="Khách lẻ" />

              <RHFAutocomplete
                name="notedvoucher"
                label="Ghi chú khuyến mãi"
                options={['20%', '30%', '50%', '100%']}
              />

              <RHFTextField name="notedcustomer" label="Ghi chú khách hàng" />
            </Box>

            <Stack
              alignItems="flex-end"
              direction="row"
              justifyContent="flex-end"
              gap={2}
              sx={{ mt: 3 }}
            >
              {!lgUp && (
                <Button component={RouterLink} href="/" variant="contained" sx={{ mt: 'auto' }}>
                  Trở về trang chủ
                </Button>
              )}

              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
                sx={{ backgroundColor: 'rgb(0, 167, 111)' }}
              >
                {!currentInvoice ? 'Tạo' : 'Cập nhật'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

UserNewEditForm.propTypes = {
  currentInvoice: PropTypes.object,
};
