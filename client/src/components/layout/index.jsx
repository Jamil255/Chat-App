import React from 'react'
import Header from './Header'
import Tittle from '../shared/tittle'
import { Grid } from '@mui/material'
// it is HOC high order components take a component as a argument and return a new component
const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    return (
      <>
        <Tittle />
        <Header />
        <Grid container height="100vh" alignItems="stretch">
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: 'none', sm: 'block' },
              height: '100%',
            }}
          >
            first
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} sx={{ height: '100%' }}>
            <WrappedComponent {...props} />
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            sx={{
              display: { xs: 'none', md: 'block' },
              height: '100%',
              bgcolor: 'rgba(0,0,0,0.85)',
              padding: '4rem',
            }}
          >
            third
          </Grid>
        </Grid>
      </>
    )
  }
}

export default AppLayout
