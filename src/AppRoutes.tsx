import { BrowserRouter, Route, Routes } from 'react-router';
import { AppLayout, MainLayout } from './layouts';
import { LoginPage } from './features/auth/pages';
import { RouteGuardian } from './features/auth/components';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Login */}
          <Route path="/login" element={<LoginPage />} />

          {/* Other routes */}
          <Route path="/" element={<RouteGuardian />}>
            <Route path="/" element={<AppLayout />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
