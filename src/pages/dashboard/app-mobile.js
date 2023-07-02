import { Helmet } from 'react-helmet-async';
// sections
import { LHMobileAppView } from 'src/sections/overview/app/view';

// ----------------------------------------------------------------------

export default function OverviewAppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Trang chủ</title>
      </Helmet>

      <LHMobileAppView />
    </>
  );
}
