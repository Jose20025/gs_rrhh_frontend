import { BrowserRouter, Route, Routes } from 'react-router';
import { AppLayout, MainLayout } from './layouts';
import { LoginPage } from './features/auth/pages';
import { RouteGuardian } from './features/auth/components';
import { DepartamentosPage } from './features/departamentos/pages/DepartamentosPage';
import { CargosPage } from './features/cargos/pages/CargosPage';
import { ProfesionesPage } from './features/profesiones/pages';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Login */}
          <Route path="/login" element={<LoginPage />} />

          {/* Other routes */}
          <Route path="/" element={<RouteGuardian />}>
            <Route path="/" element={<AppLayout />}>
              {/* Departamentos */}
              <Route path="departamentos" element={<DepartamentosPage />} />

              {/* Cargos */}
              <Route path="cargos" element={<CargosPage />} />

              {/* Profesiones */}
              <Route path="profesiones" element={<ProfesionesPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
