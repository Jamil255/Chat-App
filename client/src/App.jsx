import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
              <Route index element={<p>helloo</p>} />
        <Route />
        <Route />
      </Routes>
    </BrowserRouter>
  )
}

export default App
