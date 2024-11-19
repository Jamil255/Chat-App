import React, { lazy, Suspense, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import {
  Backdrop,
  Box,
  boxClasses,
  Button,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from '@mui/icons-material'
import { bgGradient, matBlack } from '../../constants/color'
import GroupList from '../../components/shared/groupList'
import { samepleChats, sampleUsers } from '../../constants/sampleData'
import UserItem from '../../components/shared/userItem'
const ConfirmDeleteDialog = lazy(() =>
  import('../../components/ConfirmDeleteDialog')
)
const AddMemberDialog = lazy(() => import('../../components/AddMemberDialog'))
const isAddMember = false
const Group = () => {
  const [isMobileOpenMenu, setIsMobileOpenMenu] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [groupName, setGroupName] = useState('')
  const [groupNameUpdatedValue, setGroupNameUpdateValue] = useState('')
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false)
  const chatId = useSearchParams()[0].get('group')
  const navigate = useNavigate()
  const navigateToBack = () => navigate('/')
  const handleMobile = () => {
    setIsMobileOpenMenu((prve) => !prve)
  }
  const handleMobileClose = () => {
    setIsMobileOpenMenu(false)
  }
  const updateGroupNameHandler = () => {
    console.log(groupNameUpdatedValue)
    setIsEdit(false)
    setGroupNameUpdateValue('')
  }
  const openConfirmDelete = () => {
    setConfirmDeleteDialog(true)
  }
  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false)
  }
  const openConfirmAddMember = () => {}
  const deleteHandler = () => {
    console.log('delete member')
  }
  const removeMemberHandler = (id) => {
    console.log(id)
  }
  useEffect(() => {
    if (chatId) {
      setGroupName(`groupName${chatId}`)
      setGroupNameUpdateValue(`groupName${chatId}`)
    }
    return () => {
      setGroupName('')
      setGroupNameUpdateValue('')
      setIsEdit(false)
    }
  }, [chatId])
  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: 'block',
            sm: 'none',
            position: 'fixed',
            top: '1rem',
            right: '1rem',
          },
        }}
      >
        <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Tooltip title="back">
        <IconButton
          sx={{
            position: 'absolute',
            top: '2rem',
            left: '2rem',
            backgroundColor: matBlack,
            color: 'white',
            ':hover': {
              bgcolor: 'rgba(0,0,0,0.7)',
            },
          }}
          onClick={navigateToBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  )
  const GroupName = (
    <>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        spacing={'1rem'}
        padding={'3rem'}
      >
        {isEdit ? (
          <>
            <TextField
              placeholder="edit the group name"
              variant="filled"
              value={groupNameUpdatedValue}
              onChange={(e) => setGroupNameUpdateValue(e.target.value)}
            />
            <IconButton onClick={updateGroupNameHandler}>
              <DoneIcon />
            </IconButton>
          </>
        ) : (
          <>
            <Typography variant="h4">{groupName}</Typography>
            <IconButton onClick={(e) => setIsEdit(true)}>
              <EditIcon />
            </IconButton>
          </>
        )}
      </Stack>
    </>
  )
  const ButtonGroup = (
    <>
      <Stack
        direction={{
          sm: 'row',
          xs: 'column-reverse',
        }}
        marginTop={'4px'}
        spacing={'1rem'}
        p={{
          sm: '1rem',
          xs: '0',
          md: '1rem,4rem',
        }}
      >
        <Button
          size={'larger'}
          variant="text"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={openConfirmDelete}
        >
          Delete
        </Button>
        <Button
          size={'larger'}
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openConfirmAddMember}
        >
          Add Member
        </Button>
      </Stack>
    </>
  )
  return (
    <Grid container height={'100vh'}>
      <Grid
        item
        sx={{
          display: {
            xs: 'none',
            sm: 'block',
          },
          backgroundImage: bgGradient,
        }}
        sm={4}
      >
        <GroupList myGroups={samepleChats} chatId={chatId} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {IconBtns}
        {groupName && (
          <>
            {' '}
            {GroupName}
            <Typography
              margin={'2rem'}
              alignSelf={'flex-start'}
              variant="body1"
            >
              {' '}
              Members
            </Typography>
            <Stack
              maxWidth={'30rem'}
              width={'100%'}
              boxSizing={'border-box'}
              padding={{
                sm: '1rem',
                xs: '0',
                md: '1rem, 4rem',
              }}
              spacing={'2rem'}
              height={'55vh'}
              overflow={'auto'}
            >
              {sampleUsers?.map((i) => (
                <UserItem
                  key={i._id}
                  user={i}
                  isAdded
                  styling={{
                    boxShadow: '0 0 0.5rem rgba(0,0,0,0.2)',
                    padding: '1rem 2rem',
                    borderRadius: '1rem',
                  }}
                  handler={removeMemberHandler}
                />
              ))}
            </Stack>
            {ButtonGroup}
          </>
        )}
      </Grid>
      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog />
        </Suspense>
      )}
      {confirmDeleteDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialog
            open={confirmDeleteDialog}
            handleClose={closeConfirmDeleteHandler}
            deleteHandler={deleteHandler}
          />
        </Suspense>
      )}
      <Drawer
        sx={{
          display: {
            xs: 'block',
            sm: 'none',
          },
        }}
        open={isMobileOpenMenu}
        onClose={handleMobileClose}
      >
        <GroupList width={'50vw'} myGroups={samepleChats} chatId={chatId} />
      </Drawer>
    </Grid>
  )
}

export default Group
