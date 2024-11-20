import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './routes'
import { dividerClasses } from '@mui/material'
import AppLayoutLoader from './components/Loaders'
const Home = lazy(() => import('./pages/home/index'))
const Login = lazy(() => import('./pages/login'))
const Chat = lazy(() => import('./pages/chats/index'))
const Group = lazy(() => import('./pages/groups/index'))
const NotFound = lazy(() => import('./pages/notfound/index'))
const AdminLogin = lazy(() => import('./pages/admin login/index'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard'))
const AdminLayout = lazy(() => import('./components/layout/AdminLayout'))
const UserManangement = lazy(() => import('./pages/admin/UserManangement'))
const ChatManangement = lazy(() => import('./pages/admin/ChatManagement'))
const MessageManagement = lazy(() => import('./pages/admin/MessageManagement'))
const App = () => {
  let user = true
  return (
    <BrowserRouter>
      <Suspense fallback={<AppLayoutLoader />}>
        <Routes>
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/group" element={<Group />} />
          </Route>
          <Route
            path="/login"
            element={
              <ProtectedRoute user={!user} redirect="/">
                <Login />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<UserManangement />} />
          <Route path="/admin/chats" element={<ChatManangement />} />
          <Route path="/admin/messages" element={<MessageManagement />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
