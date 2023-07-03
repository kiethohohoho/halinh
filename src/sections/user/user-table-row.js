import PropTypes from 'prop-types';
// @mui
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
//
import UserQuickEditForm from './user-quick-edit-form';

// ----------------------------------------------------------------------

export default function UserTableRow({ row, selected, onEditRow, onQuickEditRow, onDeleteRow }) {
  const { name, role, belong, isDeleted, sdt } = row;

  const confirm = useBoolean();

  const quickEdit = useBoolean();

  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{name}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{sdt}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{role}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {belong === 'LH1' ? 'Linh Hà 1' : 'Linh Hà 2'}
        </TableCell>

        <TableCell>
          <Label variant="soft" color={isDeleted ? 'error' : 'success'}>
            {isDeleted ? 'Ngừng hoạt động' : 'Đang hoạt động'}
          </Label>
        </TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Tooltip title="Chỉnh sửa" placement="top" arrow>
            <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={quickEdit.onTrue}>
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Xóa" placement="top" arrow>
            <IconButton
              sx={{ color: 'error.main' }}
              onClick={() => {
                confirm.onTrue();
              }}
            >
              <Iconify icon="solar:trash-bin-trash-bold" />
            </IconButton>
          </Tooltip>

          {/* <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton> */}
        </TableCell>
      </TableRow>

      <UserQuickEditForm
        onQuickEditRow={onQuickEditRow}
        currentUser={row}
        open={quickEdit.value}
        onClose={quickEdit.onFalse}
      />

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Xóa
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Chỉnh sửa
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Xóa tài khoản"
        content={
          <div>
            Bạn có chắc muốn xóa <b>{row.name}</b> không?
          </div>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDeleteRow();
              confirm.onFalse();
            }}
          >
            Xóa
          </Button>
        }
      />
    </>
  );
}

UserTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onQuickEditRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
