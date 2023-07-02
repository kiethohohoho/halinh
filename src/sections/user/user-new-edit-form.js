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
import FormProvider, {
  RHFAutocomplete,
  RHFTextField
} from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { useResponsive } from 'src/hooks/use-responsive';
import { RouterLink } from 'src/routes/components';
import axiosInstance, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export default function UserNewEditForm({ currentUser }) {
  const { enqueueSnackbar } = useSnackbar();
  const lgUp = useResponsive('up', 'lg');

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Bắt buộc điền Họ tên'),
    sdt: Yup.string().required('Bắt buộc điền Số điện thoại'),
    role: Yup.string().required('Bắt buộc điền Chức danh'),
    shift: Yup.string().required('Bắt buộc điền Ca làm việc'),
    belong: Yup.string().required('Bắt buộc điền Chi nhánh'),
    account: Yup.string().required('Bắt buộc điền Tài khoản'),
    password: Yup.string().required('Bắt buộc điền Mật khoản'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      sdt: currentUser?.sdt || '',
      role: currentUser?.role || '',
      shift: currentUser?.role || '',
      belong: currentUser?.belong || '',
      account: currentUser?.account || '',
      password: currentUser?.password || '',
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
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
      
      if (data.shift === "Tối")
        data.belong = true;
      else
        data.belong = false;

      if (currentUser) {
        delete data.account;
        delete data.password;
        await axiosInstance.patch(endpoints.user.update, data);
      } else {
        await axiosInstance.post(endpoints.user.create, data);
      }
      enqueueSnackbar(currentUser ? 'Cập nhật thành công!' : 'Tạo thành công!');
    } catch (error) {
      console.error(error);
    }
  });

  // const handleDrop = useCallback(
  //   (acceptedFiles) => {
  //     const file = acceptedFiles[0];

  //     const newFile = Object.assign(file, {
  //       preview: URL.createObjectURL(file),
  //     });

  //     if (file) {
  //       setValue('avatarUrl', newFile, { shouldValidate: true });
  //     }
  //   },
  //   [setValue]
  // );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {/* <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {currentUser && (
              <Label
                color={
                  (values.status === 'active' && 'success') ||
                  (values.status === 'banned' && 'error') ||
                  'warning'
                }
                sx={{ position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatarUrl"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>

            {currentUser && (
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value !== 'active'}
                        onChange={(event) =>
                          field.onChange(event.target.checked ? 'banned' : 'active')
                        }
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Banned
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Apply disable account
                    </Typography>
                  </>
                }
                sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
              />
            )}

            <RHFSwitch
              name="isVerified"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Email Verified
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Disabling this will automatically send the user a verification email
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            />

            {currentUser && (
              <Stack justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
                <Button variant="soft" color="error">
                  Delete User
                </Button>
              </Stack>
            )}
          </Card>
        </Grid> */}

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

              {/* <RHFAutocomplete
                name="country"
                label="Country"
                options={countries.map((country) => country.label)}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
                renderOption={(props, option) => {
                  const { code, label, phone } = countries.filter(
                    (country) => country.label === option
                  )[0];

                  if (!label) {
                    return null;
                  }

                  return (
                    <li {...props} key={label}>
                      <Iconify
                        key={label}
                        icon={`circle-flags:${code.toLowerCase()}`}
                        width={28}
                        sx={{ mr: 1 }}
                      />
                      {label} ({code}) +{phone}
                    </li>
                  );
                }}
              /> */}

              <RHFAutocomplete
                name="role"
                label="Chức danh"
                options={["Admin", "Thu ngân", "Phục vụ"]}
                getOptionLabel={(option) => option}
              />

              <RHFAutocomplete
                name="shift"
                label="Ca làm việc"
                options={["Tối", "Sáng"]}
                getOptionLabel={(option) => option}
              />

              <RHFAutocomplete
                name="belong"
                label="Chi nhánh"
                options={["Linh Hà 1", "Linh Hà 2"]}
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
              {!lgUp && <Button
                component={RouterLink}
                href="/"
                variant="contained"
                sx={{ mt: "auto" }}>
                Trở về trang chủ
              </Button>}

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
