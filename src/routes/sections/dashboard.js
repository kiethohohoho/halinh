import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/auth/guard';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// // OVERVIEW
const LHMobileIndexPage = lazy(() => import('src/pages/dashboard/app-mobile'));
// const OverviewEcommercePage = lazy(() => import('src/pages/dashboard/ecommerce'));
// const OverviewAnalyticsPage = lazy(() => import('src/pages/dashboard/analytics'));
// const OverviewBankingPage = lazy(() => import('src/pages/dashboard/banking'));
// const OverviewBookingPage = lazy(() => import('src/pages/dashboard/booking'));
// const OverviewFilePage = lazy(() => import('src/pages/dashboard/file'));
// // ORDER
// const OrderListPage = lazy(() => import('src/pages/dashboard/order/list'));
// const OrderDetailsPage = lazy(() => import('src/pages/dashboard/order/details'));
// // BLOG
// const BlogPostsPage = lazy(() => import('src/pages/dashboard/post/list'));
// const BlogPostPage = lazy(() => import('src/pages/dashboard/post/details'));
// const BlogNewPostPage = lazy(() => import('src/pages/dashboard/post/new'));
// const BlogEditPostPage = lazy(() => import('src/pages/dashboard/post/edit'));
// // JOB
// const JobDetailsPage = lazy(() => import('src/pages/dashboard/job/details'));
// const JobListPage = lazy(() => import('src/pages/dashboard/job/list'));
// const JobCreatePage = lazy(() => import('src/pages/dashboard/job/new'));
// const JobEditPage = lazy(() => import('src/pages/dashboard/job/edit'));
// // TOUR
// const TourDetailsPage = lazy(() => import('src/pages/dashboard/tour/details'));
// const TourListPage = lazy(() => import('src/pages/dashboard/tour/list'));
// const TourCreatePage = lazy(() => import('src/pages/dashboard/tour/new'));
// const TourEditPage = lazy(() => import('src/pages/dashboard/tour/edit'));
// // FILE MANAGER
// const FileManagerPage = lazy(() => import('src/pages/dashboard/file-manager'));
// // APP
// const ChatPage = lazy(() => import('src/pages/dashboard/chat'));
// const MailPage = lazy(() => import('src/pages/dashboard/mail'));
// const CalendarPage = lazy(() => import('src/pages/dashboard/calendar'));
// const KanbanPage = lazy(() => import('src/pages/dashboard/kanban'));
// // TEST RENDER PAGE BY ROLE
// const PermissionDeniedPage = lazy(() => import('src/pages/dashboard/permission'));
// // BLANK PAGE
// const BlankPage = lazy(() => import('src/pages/dashboard/blank'));
// PRODUCT
const ProductDetailsPage = lazy(() => import('src/pages/dashboard/product/details'));
const ProductListPage = lazy(() => import('src/pages/dashboard/product/list'));
const ProductCreatePage = lazy(() => import('src/pages/dashboard/product/new'));
const ProductEditPage = lazy(() => import('src/pages/dashboard/product/edit'));
// USER
// const UserProfilePage = lazy(() => import('src/pages/dashboard/user/profile'));
// const UserCardsPage = lazy(() => import('src/pages/dashboard/user/cards'));
const UserListPage = lazy(() => import('src/pages/dashboard/user/list'));
const UserAccountPage = lazy(() => import('src/pages/dashboard/user/account'));
const UserCreatePage = lazy(() => import('src/pages/dashboard/user/new'));
// const UserEditPage = lazy(() => import('src/pages/dashboard/user/edit'));
// INVOICE
const InvoiceListPage = lazy(() => import('src/pages/dashboard/invoice/list'));
const InvoiceDetailsPage = lazy(() => import('src/pages/dashboard/invoice/details'));
const InvoiceCreatePage = lazy(() => import('src/pages/dashboard/invoice/new'));
const InvoiceEditPage = lazy(() => import('src/pages/dashboard/invoice/edit'));

// ----------------------------------------------------------------------

export const dashboardRoutes = (role, lgUp) => {
  if (!role) return [
    {
      path: '',
      element: (
        <AuthGuard>
          <DashboardLayout>
            <Suspense fallback={<LoadingScreen />}>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </AuthGuard>
      )
    },
  ];

  let IndexPage = null;
  if (role === 'Admin')
    IndexPage = UserListPage
  else if (role === 'Phục vụ')
    IndexPage = ProductCreatePage
  else if (role === 'Thu ngân')
    IndexPage = InvoiceListPage

  if (!lgUp) {
    IndexPage = LHMobileIndexPage;
  }

  let IndexProductPage = null;
  if (role === 'Admin')
    IndexProductPage = ProductListPage
  else if (role === 'Phục vụ')
    IndexProductPage = ProductCreatePage

  return [
    {
      path: '',
      element: (
        <AuthGuard>
          <DashboardLayout>
            <Suspense fallback={<LoadingScreen />}>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </AuthGuard>
      ),
      children: [
        { element: <IndexPage />, index: true },
        // { path: 'ecommerce', element: <OverviewEcommercePage /> },
        // { path: 'analytics', element: <OverviewAnalyticsPage /> },
        // { path: 'banking', element: <OverviewBankingPage /> },
        // { path: 'booking', element: <OverviewBookingPage /> },
        // { path: 'file', element: <OverviewFilePage /> },
        {
          path: 'user',
          children: [
            (role === 'Admin' && { element: <UserListPage />, index: true }),
            // { path: 'profile', element: <UserProfilePage /> },
            // { path: 'cards', element: <UserCardsPage /> },
            (role === 'Admin' && { path: 'list', element: <UserListPage /> }),
            (role === 'Admin' && { path: 'new', element: <UserCreatePage /> }),
            // { path: ':id/edit', element: <UserEditPage /> },
            { path: 'account', element: <UserAccountPage /> },
          ],
        },
        (role !== 'Thu ngân' && {
          path: 'product',
          children: [
            { element: <IndexProductPage />, index: true },
            (role === 'Admin' && { path: 'list', element: <ProductListPage /> }),
            { path: ':id', element: <ProductDetailsPage /> },
            (role === 'Phục vụ' && { path: 'new', element: <ProductCreatePage /> }),
            { path: ':id/edit', element: <ProductEditPage /> },
          ].filter(a => !!a),
        }),
        (role === 'Thu ngân' && {
          path: 'invoice',
          children: [
            { element: <InvoiceListPage />, index: true },
            { path: 'list', element: <InvoiceListPage /> },
            { path: ':id', element: <InvoiceDetailsPage /> },
            { path: ':id/edit', element: <InvoiceEditPage /> },
            { path: 'new', element: <InvoiceCreatePage /> },
          ],
        }),
        // {
        //   path: 'order',
        //   children: [
        //     { element: <OrderListPage />, index: true },
        //     { path: 'list', element: <OrderListPage /> },
        //     { path: ':id', element: <OrderDetailsPage /> },
        //   ],
        // },
        // {
        //   path: 'post',
        //   children: [
        //     { element: <BlogPostsPage />, index: true },
        //     { path: 'list', element: <BlogPostsPage /> },
        //     { path: ':title', element: <BlogPostPage /> },
        //     { path: ':title/edit', element: <BlogEditPostPage /> },
        //     { path: 'new', element: <BlogNewPostPage /> },
        //   ],
        // },
        // {
        //   path: 'job',
        //   children: [
        //     { element: <JobListPage />, index: true },
        //     { path: 'list', element: <JobListPage /> },
        //     { path: ':id', element: <JobDetailsPage /> },
        //     { path: 'new', element: <JobCreatePage /> },
        //     { path: ':id/edit', element: <JobEditPage /> },
        //   ],
        // },
        // {
        //   path: 'tour',
        //   children: [
        //     { element: <TourListPage />, index: true },
        //     { path: 'list', element: <TourListPage /> },
        //     { path: ':id', element: <TourDetailsPage /> },
        //     { path: 'new', element: <TourCreatePage /> },
        //     { path: ':id/edit', element: <TourEditPage /> },
        //   ],
        // },
        // { path: 'file-manager', element: <FileManagerPage /> },
        // { path: 'mail', element: <MailPage /> },
        // { path: 'chat', element: <ChatPage /> },
        // { path: 'calendar', element: <CalendarPage /> },
        // { path: 'kanban', element: <KanbanPage /> },
        // { path: 'permission', element: <PermissionDeniedPage /> },
        // { path: 'blank', element: <BlankPage /> },
      ].filter(route => !!route),
    },
  ]
}
