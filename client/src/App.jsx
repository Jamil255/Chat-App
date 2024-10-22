import React, { lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
const Home = lazy(() => import('./pages/home/index'))
const Login = lazy(() => import('./pages/login'))
const Chat = lazy(() => import('./pages/chats/index'))
const Group = lazy(() => import('./pages/groups/index'))
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/chat/:chatId" element={<Chat />} />
        <Route path="/group" element={<Group />} />
        <Route />
      </Routes>
    </BrowserRouter>
  )
}

export default App
