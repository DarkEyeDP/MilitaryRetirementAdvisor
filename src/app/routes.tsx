import { createBrowserRouter, Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import StateDetail from './pages/StateDetail';
import ComparisonPage from './pages/ComparisonPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (sessionStorage.getItem('preserveScroll') === '1') {
      sessionStorage.removeItem('preserveScroll');
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname]);
  return <Outlet />;
}

export const router = createBrowserRouter([
  {
    Component: ScrollToTop,
    children: [
      { path: '/', Component: Landing },
      { path: '/dashboard', Component: Dashboard },
      { path: '/state/:stateId', Component: StateDetail },
      { path: '/compare', Component: ComparisonPage },
    ],
  },
]);
