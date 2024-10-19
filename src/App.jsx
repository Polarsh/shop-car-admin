import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { AppProvider } from './context/AppContext'
import { AuthProvider } from './context/AuthProvider'

import PageLayout from './layout/PageLayout'
import ProtectedRoute from './components/others/ProtectedRoute'

import LoginPage from './pages/Login'
import DashboardPage from './pages/Dashboard'
import DefaultPage from './pages/Default'

import AdminMenuPage from './modules/users/admin/pages/Menu'
import AdminAddPage from './modules/users/admin/pages/Add'
import AdminEditPage from './modules/users/admin/pages/Edit'
import AdminViewPage from './modules/users/admin/pages/View'

import LogsMenuPage from './modules/logs/pages/LogsMenu'
import ViewLogPage from './modules/logs/pages/ViewLog'

import BrandMenuPage from './modules/products-config/brand/pages/Menu'
import BrandAddPage from './modules/products-config/brand/pages/Add'
import BrandEditPage from './modules/products-config/brand/pages/Edit'
import BrandViewPage from './modules/products-config/brand/pages/View'

import FeatureMenuTabs from './modules/products-config/features/FeatureMenu'

import BodyMenuPage from './modules/products-config/features/body/pages/Menu'
import BodyAddPage from './modules/products-config/features/body/pages/Add'
import BodyEditPage from './modules/products-config/features/body/pages/Edit'
import BodyViewPage from './modules/products-config/features/body/pages/View'

import FuelMenuPage from './modules/products-config/features/fuel/pages/Menu'
import FuelAddPage from './modules/products-config/features/fuel/pages/Add'
import FuelEditPage from './modules/products-config/features/fuel/pages/Edit'
import FuelViewPage from './modules/products-config/features/fuel/pages/View'

import DriveTrainMenuPage from './modules/products-config/features/drivetrain/pages/Menu'
import DriveTrainAddPage from './modules/products-config/features/drivetrain/pages/Add'
import DriveTrainEditPage from './modules/products-config/features/drivetrain/pages/Edit'
import DriveTrainViewPage from './modules/products-config/features/drivetrain/pages/View'

import TransmissionMenuPage from './modules/products-config/features/transmission/pages/Menu'
import TransmissionAddPage from './modules/products-config/features/transmission/pages/Add'
import TransmissionEditPage from './modules/products-config/features/transmission/pages/Edit'
import TransmissionViewPage from './modules/products-config/features/transmission/pages/View'

import DisplacementMenuPage from './modules/products-config/features/displacement/pages/Menu'
import DisplacementViewPage from './modules/products-config/features/displacement/pages/View'
import DisplacementEditPage from './modules/products-config/features/displacement/pages/Edit'
import DisplacementAddPage from './modules/products-config/features/displacement/pages/Add'

import AccessoryMenuPage from './modules/products-config/accessories/pages/Menu'
import AccessoryAddPage from './modules/products-config/accessories/pages/Add'
import AccessoryEditPage from './modules/products-config/accessories/pages/Edit'
import AccessoryViewPage from './modules/products-config/accessories/pages/View'

import CarMenuPage from './modules/cars/pages/Menu'
import CarAddPage from './modules/cars/pages/Add'
import CarEditPage from './modules/cars/pages/Edit'
import CarViewPage from './modules/cars/pages/View'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          <Route path='/iniciar-sesion' element={<LoginPage />} />
          <Route element={<ProtectedRoute redirectPath={'/iniciar-sesion'} />}>
            <Route path='/' element={<PageLayout />}>
              <Route index element={<Navigate to='/dashboard' />} />
              <Route path='dashboard' element={<DashboardPage />} />
              {/* Usuarios */}
              <Route path='gestion-usuarios'>
                <Route path='administradores'>
                  <Route index element={<AdminMenuPage />} />
                  <Route path='agregar' element={<AdminAddPage />} />
                  <Route path='editar/:adminId' element={<AdminEditPage />} />
                  <Route path='ver/:adminId' element={<AdminViewPage />} />
                </Route>
              </Route>
              {/* Vehículos */}
              <Route path='gestion-autos'>
                <Route index element={<CarMenuPage />} />
                <Route path='agregar' element={<CarAddPage />} />
                <Route path='editar/:carId' element={<CarEditPage />} />
                <Route path='ver/:carId' element={<CarViewPage />} />
              </Route>
              {/* Gestión vehículos */}
              <Route path='configuracion-autos'>
                <Route path='marcas'>
                  <Route index element={<BrandMenuPage />} />
                  <Route path='agregar' element={<BrandAddPage />} />
                  <Route path='editar/:brandId' element={<BrandEditPage />} />
                  <Route path='ver/:brandId' element={<BrandViewPage />} />
                </Route>
                <Route path='caracteristicas' element={<FeatureMenuTabs />}>
                  <Route path='carroceria'>
                    <Route index element={<BodyMenuPage />} />
                    <Route path='agregar' element={<BodyAddPage />} />
                    <Route path='editar/:bodyId' element={<BodyEditPage />} />
                    <Route path='ver/:bodyId' element={<BodyViewPage />} />
                  </Route>
                  <Route path='combustible'>
                    <Route index element={<FuelMenuPage />} />
                    <Route path='agregar' element={<FuelAddPage />} />
                    <Route path='editar/:fuelId' element={<FuelEditPage />} />
                    <Route path='ver/:fuelId' element={<FuelViewPage />} />
                  </Route>
                  <Route path='traccion'>
                    <Route index element={<DriveTrainMenuPage />} />
                    <Route path='agregar' element={<DriveTrainAddPage />} />
                    <Route
                      path='editar/:drivetrainId'
                      element={<DriveTrainEditPage />}
                    />
                    <Route
                      path='ver/:drivetrainId'
                      element={<DriveTrainViewPage />}
                    />
                  </Route>
                  <Route path='transmision'>
                    <Route index element={<TransmissionMenuPage />} />
                    <Route path='agregar' element={<TransmissionAddPage />} />
                    <Route
                      path='editar/:transmissionId'
                      element={<TransmissionEditPage />}
                    />
                    <Route
                      path='ver/:transmissionId'
                      element={<TransmissionViewPage />}
                    />
                  </Route>
                  <Route path='cilindrada'>
                    <Route index element={<DisplacementMenuPage />} />
                    <Route path='agregar' element={<DisplacementAddPage />} />
                    <Route
                      path='editar/:displacementId'
                      element={<DisplacementEditPage />}
                    />
                    <Route
                      path='ver/:displacementId'
                      element={<DisplacementViewPage />}
                    />
                  </Route>
                </Route>
                <Route path='accesorios'>
                  <Route index element={<AccessoryMenuPage />} />
                  <Route path='agregar' element={<AccessoryAddPage />} />
                  <Route
                    path='editar/:accessoryId'
                    element={<AccessoryEditPage />}
                  />
                  <Route
                    path='ver/:accessoryId'
                    element={<AccessoryViewPage />}
                  />
                </Route>
              </Route>
              {/* Ejemplo           
              <Route
                path='configuracion-autos'
                element={<MenuProductsConfigTabs />}>
                <Route path='marcas'>
                  <Route index element={<BrandMenuPage />} />
                  <Route path='agregar' element={<BrandAddPage />} />
                  <Route path='editar/:adminId' element={<BrandEditPage />} />
                  <Route path='ver/:adminId' element={<BrandViewPage />} />
                </Route>
              </Route> */}
              {/* Logs */}
              <Route path='registro-actividades'>
                <Route index element={<LogsMenuPage />} />
                <Route path='ver/:logId' element={<ViewLogPage />} />
              </Route>
              <Route path='*' element={<DefaultPage />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </AppProvider>
  )
}
