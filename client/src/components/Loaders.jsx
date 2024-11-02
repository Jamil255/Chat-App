import { Grid, Skeleton, Stack } from '@mui/material'
import React from 'react'

const AppLayoutLoader = () => {
  return (
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
        <Skeleton variant="rectangular" height={'100vh'} spacing={"1rem"} />
      </Grid>
      <Grid item xs={12} sm={8} md={5} lg={6} sx={{ height: '100%' }}>
        <Stack spacing={'1rem'}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} variant="rounded" height={'5rem'} />
          ))}
        </Stack>{' '}
      </Grid>
      <Grid
        item
        md={4}
        lg={3}
        sx={{
          display: { xs: 'none', md: 'block' },
          height: '100%',
        }}
      >
        <Skeleton variant="rectangular" height={'100vh'} spacing={"1rem"} />
      </Grid>
    </Grid>
  )
}

export default AppLayoutLoader
