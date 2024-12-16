import { Grid, Skeleton, Stack } from '@mui/material';
import React from 'react';

const AppLayoutLoader = () => {
  return (
    <Grid container height="100vh" alignItems="stretch">
      {/* Left Sidebar */}
      <Grid
        item
        sm={4}
        md={3}
        sx={{
          display: { xs: 'none', sm: 'block' },
          height: '900px',
        }}
      >
        <Skeleton variant="rectangular" height="100%" />
      </Grid>

      {/* Main Content */}
      <Grid item xs={12} sm={8} md={6} lg={6} sx={{ height: '100vh', padding: '1rem' }}>
        <Stack spacing={2}>
          {Array.from({ length: 11}).map((_, index) => (
            <Skeleton key={index} variant="rounded" height="4rem" />
          ))}
        </Stack>
      </Grid>

      {/* Right Sidebar */}
      <Grid
        item
        md={3}
        lg={3}
        sx={{
          display: { xs: 'none', md: 'block' },
          height: "900px",
        }}
      >
        <Skeleton variant="rectangular" height="100%" />
      </Grid>
    </Grid>
  );
};

export default AppLayoutLoader;
