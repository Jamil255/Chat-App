import React, { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import ProtectedRoute from './routes'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import AppLayoutLoader from './components/Loaders'
import { userExists, userNotExists } from './redux/slice/auth/signupSlice'
import { server } from './constants/confing'
import { SocketProvider } from './socket'
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
const data = false
const App = () => {
  const dispatch = useDispatch()
  const { data, isLoading } = useSelector((state) => state.signup)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${server}/user/me`, {
          withCredentials: true,
        })
        dispatch(userExists(data?.data))
      } catch (error) {
        console.log(
          'Error fetching user data:',
          error?.response?.data || error.message
        )
        dispatch(userNotExists())
      }
    }

    fetchData()
  }, [dispatch])

  return isLoading ? (
    <AppLayoutLoader />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<AppLayoutLoader />}>
        <Routes>
          <Route
            element={
              <SocketProvider>
                <ProtectedRoute user={data} />
              </SocketProvider>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/group" element={<Group />} />
          </Route>
          <Route
            path="/login"
            element={
              <ProtectedRoute user={!data} redirect="/">
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
      <Toaster position="top-right" />
    </BrowserRouter>
  )
}

export default App
