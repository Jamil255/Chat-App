import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({ children, user, redirect = '/login' }) => {
//   console.log(children?.props, 'render')

  if (!user) return <Navigate to={redirect} />
  return children ? children : <Outlet />
}

export default ProtectedRoute
