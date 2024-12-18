import { useFetchData } from '6pp'
import { Avatar, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { dashboardData } from '../../constants/sampleData'
import { transformImage } from '../../lib/feature'
import Table from '../../components/shared/table'
import { useGetAllUsersQuery } from '../../redux/api/api'
import { useErrors } from '../../hook'

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    headerClassName: 'table-header',
    width: 200,
  },
  {
    field: 'avatar',
    headerName: 'Avatar',
    headerClassName: 'table-header',
    width: 150,
    renderCell: (params) => (
      <Avatar alt={params.row.name} src={params.row.avatar} />
    ),
  },

  {
    field: 'name',
    headerName: 'Name',
    headerClassName: 'table-header',
    width: 200,
  },
  {
    field: 'userName',
    headerName: 'userName',
    headerClassName: 'table-header',
    width: 200,
  },
  {
    field: 'friends',
    headerName: 'Friends',
    headerClassName: 'table-header',
    width: 150,
  },
  {
    field: 'groups',
    headerName: 'Groups',
    headerClassName: 'table-header',
    width: 200,
  },
]
const UserManagement = () => {
  const [rows, setRows] = useState([])
  const { data, isLoading, error, isError } = useGetAllUsersQuery()
  console.log(data?.message)
  useErrors([{ error, isError }])
  useEffect(() => {
    setRows(
      data?.message?.map((i) => ({
        ...i,
        id: i._id,
        avatar: transformImage(i.avatar, 50),
      }))
    )
  }, [data])

  return (
    <AdminLayout>
      {isLoading ? (
        <Skeleton height={'100vh'} />
      ) : (
        <Table heading={'All Users'} columns={columns} rows={rows} />
      )}
    </AdminLayout>
  )
}

export default UserManagement
