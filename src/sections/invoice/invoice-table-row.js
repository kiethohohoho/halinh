import { format } from 'date-fns';
import PropTypes from 'prop-types';
// @mui
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// utils
// components
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import Iconify from 'src/components/iconify';
import { vi } from 'date-fns/locale';

// ----------------------------------------------------------------------

export default function InvoiceTableRow({ row, selected, onViewRow, onEditRow, onDeleteRow }) {
  const {
    typeService,
    dateUsed,
    phone,
    codeKtv,
    customerGroup,
    customerOdd,
    voucher,
    customerName,
    notedVoucher,
    notedCustomer,
  } = row;

  const confirm = useBoolean();

  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell>{customerName}</TableCell>

        <TableCell>{phone}</TableCell>

        <TableCell>{voucher}</TableCell>

        <TableCell>
          <ListItemText
            primary={format(new Date(dateUsed), 'dd MMM yyyy', { locale: vi })}
            secondary={format(new Date(dateUsed), 'p', { locale: vi })}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell>

        <TableCell align="center">{typeService}</TableCell>

        <TableCell align="center">{codeKtv}</TableCell>

        <TableCell align="center">{customerGroup}</TableCell>

        <TableCell align="center" sx={{ color: '#5be584' }}>
          {customerOdd ? '✔' : ''}
        </TableCell>

        <TableCell align="center">{notedVoucher}</TableCell>

        <TableCell align="center">{notedCustomer}</TableCell>

        {/* <TableCell>
          <Label
            variant="soft"
            color={
              (status === 'paid' && 'success') ||
              (status === 'pending' && 'warning') ||
              (status === 'overdue' && 'error') ||
              'default'
            }
          >
            {status}
          </Label>
        </TableCell> */}

        {/* <TableCell align="right" sx={{ px: 1 }}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell> */}
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            onViewRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}

InvoiceTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
