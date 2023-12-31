import { Navigate, useRoutes } from 'react-router-dom';
// layouts
// config
// import { PATH_AFTER_LOGIN } from 'src/config-global';
//
// import { authDemoRoutes } from './auth-demo';
// import { componentsRoutes } from './components';
import { useAuthContext } from 'src/auth/hooks';
import { useResponsive } from 'src/hooks/use-responsive';
import { authRoutes } from './auth';
import { dashboardRoutes } from './dashboard';
import { mainRoutes } from './main';

// ----------------------------------------------------------------------

export default function Router() {
  const { user } = useAuthContext();

  const lgUp = useResponsive('up', 'lg');

  return useRoutes([
    // SET INDEX PAGE WITH SKIP HOME PAGE
    // {
    //   path: '/',
    //   element: <Navigate to={PATH_AFTER_LOGIN} replace />,
    // },

    // ----------------------------------------------------------------------

    // SET INDEX PAGE WITH HOME PAGE
    // {
    //   path: '/',
    //   element: (
    //     <MainLayout>
    //       <HomePage />
    //     </MainLayout>
    //   ),
    // },

    // Auth routes
    ...authRoutes,
    // ...authDemoRoutes,

    // Dashboard routes
    ...dashboardRoutes(user?.role, lgUp),

    // // Main routes
    ...mainRoutes,

    // // Components routes
    // ...componentsRoutes,

    // No match 404
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
