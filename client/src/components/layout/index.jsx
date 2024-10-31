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
        <Grid sx={{ display: 'flex',gap:55, height: 'calc(100vh - 4rem)' }}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{ display: { xs: 'none', sm: 'block' } }}
            height={'100%'}
          >
            frist
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={12} height={'100%'}>
            <WrappedComponent {...props} />
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            height={'100%'}
            sx={{
              display: { xs: 'none', md: 'block' },
              bgcolor: 'rgba(0,0,0,0.85)',
              padding: '4rem',
            }}
          >
            thrid
          </Grid>
        </Grid>
      </>
    )
  }
}

export default AppLayout
