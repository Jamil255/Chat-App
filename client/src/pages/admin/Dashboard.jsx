import {
    AdminPanelSettings as AdminPanelSettingsIcon,
    Group as GroupIcon,
    Message as MessageIcon,
    Notifications as NotificationsIcon,
    Person as PersonIcon,
} from '@mui/icons-material'
import { Box, Container, Paper, Stack, Typography } from '@mui/material'
import moment from 'moment'
import React from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { DoughnutChart, LineChart } from '../../components/shared/chartjs'
import {
    CurveButton,
    SearchField,
} from '../../components/styles/StyleComponent'
import { matBlack } from '../../constants/color'
import { useErrors } from '../../hook'
import { useGetAllStatsQuery } from '../../redux/api/api'
const Dashboard = () => {
  const { data, isLoading, error, isError } = useGetAllStatsQuery()
  useErrors([{ isError, error }])

  const Appbar = (
    <Paper
      elevation={3}
      sx={{ padding: '2rem', margin: '2rem 0', borderRadius: '1rem' }}
    >
      <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
        <AdminPanelSettingsIcon sx={{ fontSize: '3rem' }} />

        <SearchField placeholder="Search..." />

        <CurveButton>Search</CurveButton>
        <Box flexGrow={1} />
        <Typography
          display={{
            xs: 'none',
            lg: 'block',
          }}
          color={'rgba(0,0,0,0.7)'}
          textAlign={'center'}
        >
          {moment().format('dddd, D MMMM YYYY')}
        </Typography>

        <Stack
          sx={{
            display: 'block', // Default display
            '@media (max-width: 425px)': {
              display: 'none', // Hide when screen width is 425px or smaller
            },
          }}
        >
          <NotificationsIcon />
        </Stack>
      </Stack>
    </Paper>
  )

  const Widgets = (
    <Stack
      direction={{
        xs: 'column',
        sm: 'row',
      }}
      spacing="2rem"
      justifyContent="space-between"
      alignItems={'center'}
      margin={'2rem 0'}
    >
      <Widget title={'Users'} value={data?.userCount} Icon={<PersonIcon />} />
      <Widget title={'Groups'} value={data?.groupCount} Icon={<GroupIcon />} />
      <Widget
        title={'Messages'}
        value={data?.messageCount}
        Icon={<MessageIcon />}
      />
    </Stack>
  )

  return (
    <AdminLayout>
      <Container component={'main'}>
        {Appbar}

        <Stack
          direction={{
            xs: 'column',
            lg: 'row',
          }}
          flexWrap={'wrap'}
          justifyContent={'center'}
          alignItems={{
            xs: 'center',
            lg: 'stretch',
          }}
          sx={{ gap: '2rem' }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: '2rem 3.5rem',
              borderRadius: '1rem',
              width: '100%',
              maxWidth: '45rem',
            }}
          >
            <Typography margin={'2rem 0'} variant="h4">
              Last Messages
            </Typography>

            <LineChart value={data?.messageChart || 0} />
          </Paper>

          <Paper
            elevation={3}
            sx={{
              padding: '1rem ',
              borderRadius: '1rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: { xs: '100%', sm: '50%' },
              position: 'relative',
              maxWidth: '25rem',
            }}
          >
            <DoughnutChart
              labels={['Single Chats', 'Group Chats']}
              value={[
                data?.totalChatsCount - data?.groupCount || 0,
                data?.groupCount || 0,
              ]}
            />

            <Stack
              position={'absolute'}
              direction={'row'}
              justifyContent={'center'}
              alignItems={'center'}
              spacing={'0.5rem'}
              width={'100%'}
              height={'100%'}
            >
              <GroupIcon /> <Typography>Vs </Typography>
              <PersonIcon />
            </Stack>
          </Paper>
        </Stack>

        {Widgets}
      </Container>
    </AdminLayout>
  )
}

const Widget = ({ title, value, Icon }) => (
  <Paper
    elevation={3}
    sx={{
      padding: '2rem',
      margin: '2rem 0',
      borderRadius: '1.5rem',
      width: '20rem',
    }}
  >
    <Stack alignItems={'center'} spacing={'1rem'}>
      <Typography
        sx={{
          color: 'rgba(0,0,0,0.7)',
          borderRadius: '50%',
          border: `5px solid ${matBlack}`,
          width: '5rem',
          height: '5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {value}
      </Typography>
      <Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
        {Icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
)

export default Dashboard
