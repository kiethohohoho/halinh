import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
// hooks
import { useMemo } from 'react';
import { useAuthContext } from 'src/auth/hooks';
import FormProvider, {
  RHFAutocomplete,
  RHFTextField
} from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import axiosInstance, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuthContext();

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string().required('Bắt buộc điền Họ tên'),
    sdt: Yup.string().required('Bắt buộc điền Số điện thoại'),
    role: Yup.string().required('Bắt buộc điền Chức danh'),
    belong: Yup.string().required('Bắt buộc điền Chi nhánh'),
  });

  const defaultValues = useMemo(
    () => ({
      name: user?.fullname || '',
      sdt: user?.sdt || '',
      role: user?.role || '',
      belong: user?.belong === "LH1" ? "Linh Hà 1" : "Linh Hà 2" || '',
    }),
    [user]
  );

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (data.belong === "Linh Hà 1")
        data.belong = "LH1"
      else
        data.belong = "LH2";

      await axiosInstance.patch(endpoints.user.updateProfile, data);
      enqueueSnackbar('Cập nhật thành công!');
    } catch (error) {
      enqueueSnackbar('Cập nhật thất bại!', { variant: 'error' });
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
              <RHFTextField name="name" label="Họ tên" />
              <RHFTextField name="sdt" label="Số điện thoại" />

              <RHFAutocomplete
                name="role"
                label="Chức danh"
                options={["Admin", "Thu ngân", "Nhân viên"]}
                getOptionLabel={(option) => option}
              />

              <RHFAutocomplete
                name="belong"
                label="Chi nhánh"
                options={["Linh Hà 1", "Linh Hà 2"]}
              />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Cập nhật
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
