import { Helmet } from 'react-helmet-async';
// sections
import { InvoiceListView } from 'src/sections/invoice/view';

// ----------------------------------------------------------------------

export default function InvoiceListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Danh sách hóa đơn</title>
      </Helmet>

      <InvoiceListView />
    </>
  );
}
