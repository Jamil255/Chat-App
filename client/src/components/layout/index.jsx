import React from 'react'
import Header from './Header'
import Tittle from '../shared/tittle'
// it is HOC high order components take a component as a argument and return a new component
const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    return (
      <>
        <Tittle />
        <Header />
        <WrappedComponent {...props} />
        <div>Footer</div>
      </>
    )
  }
}

export default AppLayout
