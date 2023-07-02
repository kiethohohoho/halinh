import { Navigate, useRoutes } from 'react-router-dom';
// layouts
// config
// import { PATH_AFTER_LOGIN } from 'src/config-global';
//
// import { authDemoRoutes } from './auth-demo';
// import { componentsRoutes } from './components';
// import { mainRoutes } from './main';
import { useAuthContext } from 'src/auth/hooks';
import { authRoutes } from './auth';
import { dashboardRoutes } from './dashboard';

// ----------------------------------------------------------------------

export default function Router() {
  const { user } = useAuthContext();

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
    ...dashboardRoutes(user?.role),

    // // Main routes
    // ...mainRoutes,

    // // Components routes
    // ...componentsRoutes,

    // No match 404
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
