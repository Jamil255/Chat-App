import React, { lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './routes'
const Home = lazy(() => import('./pages/home/index'))
const Login = lazy(() => import('./pages/login'))
const Chat = lazy(() => import('./pages/chats/index'))
const Group = lazy(() => import('./pages/groups/index'))
const NotFound = lazy(() => import('./pages/notfound/index'))
const App = () => {
  let user = true
  return (
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
  )
}

export default App
