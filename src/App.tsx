import {
  AdminLayout,
  AuthProvider,
  DashboardPage,
  LandingPage,
  LoginPage,
  NotFoundPage,
  RequireAuth,
  SettingsPage,
  UsersPage,
} from '@/components'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export let App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminLayout />
              </RequireAuth>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
