import { Helmet } from 'react-helmet-async';
// sections
import { InvoiceCreateView } from 'src/sections/invoice/view';

// ----------------------------------------------------------------------

export default function InvoiceCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Tạo hóa đơn</title>
      </Helmet>

      <InvoiceCreateView />
    </>
  );
}
