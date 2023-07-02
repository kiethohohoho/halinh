import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// _mock
// assets
// components
import FormProvider, { RHFAutocomplete, RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import axiosInstance, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export default function UserQuickEditForm({ currentUser, open, onClose, onQuickEditRow }) {
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Bắt buộc điền Họ tên'),
    sdt: Yup.string().required('Bắt buộc điền Số điện thoại'),
    role: Yup.string().required('Bắt buộc điền Chức danh'),
    belong: Yup.string().required('Bắt buộc điền Chi nhánh'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      sdt: currentUser?.sdt || '',
      role: currentUser?.role || '',
      belong: currentUser?.belong === "LH1" ? "Linh Hà 1" : "Linh Hà 2" || '',
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

      data.id = currentUser.id;
      await axiosInstance.patch(endpoints.user.update, data);
      enqueueSnackbar('Cập nhật thành công!');
      onQuickEditRow();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Cập nhật tài khoản</DialogTitle>

        <DialogContent>
          {/* <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
            Account is waiting for confirmation
          </Alert> */}

          <Box
            mt={1}
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
              options={["Admin", "Thu ngân", "Phục vụ"]}
              getOptionLabel={(option) => option}
            />

            <RHFAutocomplete
              name="belong"
              label="Chi nhánh"
              options={["Linh Hà 1", "Linh Hà 2"]}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Đóng
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Cập nhật
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

UserQuickEditForm.propTypes = {
  currentUser: PropTypes.object,
  onClose: PropTypes.func,
  onQuickEditRow: PropTypes.func,
  open: PropTypes.bool,
};
