import { createHashRouter, Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import StateDetail from './pages/StateDetail';
import ComparisonPage from './pages/ComparisonPage';
import ErrorPage from './pages/ErrorPage';
import Sources from './pages/Sources';
import Sitemap from './pages/Sitemap';
import Footer from './components/Footer';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (sessionStorage.getItem('preserveScroll') === '1') {
      sessionStorage.removeItem('preserveScroll');
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

export const router = createHashRouter([
  {
    Component: ScrollToTop,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', Component: Landing },
      { path: '/dashboard', Component: Dashboard },
      { path: '/state/:stateId', Component: StateDetail },
      { path: '/compare', Component: ComparisonPage },
      { path: '/sources', Component: Sources },
      { path: '/sitemap', Component: Sitemap },
      { path: '*', Component: ErrorPage },
    ],
  },
]);
