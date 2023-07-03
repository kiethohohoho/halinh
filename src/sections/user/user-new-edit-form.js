import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
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
import FormProvider, { RHFAutocomplete, RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { useResponsive } from 'src/hooks/use-responsive';
import { RouterLink } from 'src/routes/components';
import { useRouter } from 'src/routes/hook';
import axiosInstance, { endpoints } from 'src/utils/axios';
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export default function UserNewEditForm({ currentUser }) {
  const { enqueueSnackbar } = useSnackbar();
  const lgUp = useResponsive('up', 'lg');
  const router = useRouter();
  const {
    user: { role: authUserRole, belong: authUserBelong },
  } = useAuthContext();
  const [isDisabledBelong, setIsDisabledBelong] = useState(false);

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Bắt buộc điền Họ tên'),
    sdt: Yup.string().required('Bắt buộc điền Số điện thoại'),
    role: Yup.string().required('Bắt buộc điền Chức danh'),
    // shift: Yup.string().required('Bắt buộc điền Ca làm việc'),
    belong: Yup.string().required('Bắt buộc điền Chi nhánh'),
    account: Yup.string().required('Bắt buộc điền Tài khoản'),
    password: Yup.string().required('Bắt buộc điền Mật khoản'),
  });

  const convertBelong = (belong) => {
    if (!belong) return '';
    return belong === 'LH1' ? 'Linh Hà 1' : 'Linh Hà 2';
  };

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      sdt: currentUser?.sdt || '',
      role: currentUser?.role || '',
      // shift: currentUser?.role || '',
      belong:
        authUserRole === 'Tổng quản lý chi nhánh'
          ? convertBelong(authUserBelong)
          : convertBelong(currentUser?.belong) || '',
      account: currentUser?.account || '',
      password: currentUser?.password || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser, authUserRole]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    watch,
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const watchRole = watch('role');

  useEffect(() => {
    if (watchRole === 'Admin' || watchRole === 'Tổng quản lý hệ thống') {
      setIsDisabledBelong(true);
      setValue('belong', '');
    } else {
      setIsDisabledBelong(false);
    }
  }, [setValue, watchRole]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (data.belong === 'Linh Hà 1') data.belong = 'LH1';
      else data.belong = 'LH2';

      if (currentUser) {
        delete data.account;
        delete data.password;
        await axiosInstance.patch(endpoints.user.update, data);
      } else {
        await axiosInstance.post(endpoints.user.create, data);
        reset();
        router.push('/');
      }
      enqueueSnackbar(currentUser ? 'Cập nhật thành công!' : 'Tạo thành công!', {
        anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
      });
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
              <RHFTextField name="name" label="Họ tên" />
              <RHFTextField name="sdt" label="Số điện thoại" />

              <RHFAutocomplete
                name="role"
                label="Chức danh"
                options={[
                  'Admin',
                  'Tổng quản lý hệ thống',
                  'Tổng quản lý chi nhánh',
                  'Quản lý ca sáng',
                  'Quản lý ca tối',
                  'Thu ngân ca sáng',
                  'Thu ngân ca tối',
                  'Phục vụ ca sáng',
                  'Phục vụ ca tối',
                ]}
                getOptionLabel={(option) => option}
              />

              {/* <RHFAutocomplete
                name="shift"
                label="Ca làm việc"
                options={['Tối', 'Sáng']}
                getOptionLabel={(option) => option}
              /> */}

              <RHFAutocomplete
                disabled={authUserRole === 'Tổng quản lý chi nhánh' || isDisabledBelong}
                name="belong"
                label="Chi nhánh"
                options={['Linh Hà 1', 'Linh Hà 2']}
              />

              <RHFTextField name="account" label="Tài khoản" />
              <RHFTextField name="password" label="Mật khẩu" />
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
                {!currentUser ? 'Tạo' : 'Cập nhật'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

UserNewEditForm.propTypes = {
  currentUser: PropTypes.object,
};
