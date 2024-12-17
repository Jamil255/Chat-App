import React, { lazy, Suspense, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import GroupList from "../../components/shared/groupList";
import UserItem from "../../components/shared/userItem";
import { bgGradient, matBlack } from "../../constants/color";
import { useAsyncMutation, useErrors } from "../../hook";
import {
  useChatDetailsQuery,
  useGetMyGroupQuery,
  useLeaveGroupMutation,
  useRemoveGroupMemberMutation,
  useRenameGroupMutation,
} from "../../redux/api/api";
import { setIsAddMember } from "../../redux/slice/misc/misc";

const ConfirmDeleteDialog = lazy(() =>
  import("../../components/ConfirmDeleteDialog")
);
const AddMemberDialog = lazy(() => import("../../components/AddMemberDialog"));

const Group = () => {
  const [isMobileOpenMenu, setIsMobileOpenMenu] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdateValue] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [members, setMembers] = useState([]);
  const [loadingMemberId, setLoadingMemberId] = useState(null);

  const chatId = useSearchParams()[0].get("group");
  const { isAddMember } = useSelector((state) => state.misc);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToBack = () => navigate("/");

  // API Hooks
  const getMyGroup = useGetMyGroupQuery();
  const chatDetails = useChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  );
  const [updateGroup] = useAsyncMutation(useRenameGroupMutation);
  const [removeMember] = useAsyncMutation(useRemoveGroupMemberMutation);
  const [deleteGroup] = useAsyncMutation(useLeaveGroupMutation);

  // Handle errors
  useErrors([
    { isError: getMyGroup?.isError, error: getMyGroup?.error },
    { isError: chatDetails?.isError, error: chatDetails?.error },
  ]);

  useEffect(() => {
    const groupChat = chatDetails?.data;
    if (groupChat) {
      setGroupName(groupChat.chat.name);
      setGroupNameUpdateValue(groupChat.chat.name);
      setMembers(groupChat.chat.members);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdateValue("");
      setMembers([]);
      setIsEdit(false);
    };
  }, [chatDetails?.data]);

  // Handlers
  const handleMobile = () => setIsMobileOpenMenu((prev) => !prev);
  const handleMobileClose = () => setIsMobileOpenMenu(false);

  const updateGroupNameHandler = () => {
    setIsEdit(false);
    updateGroup("updating...", { chatId, name: groupNameUpdatedValue });
  };

  const openConfirmDelete = () => setConfirmDeleteDialog(true);
  const closeConfirmDeleteHandler = () => setConfirmDeleteDialog(false);
  const openConfirmAddMember = () => dispatch(setIsAddMember(true));

  const deleteHandler = () => {
    deleteGroup("delete group ..", chatId);
    setConfirmDeleteDialog(false);
    setGroupName("");
    navigate("/group");
  };

  const removeMemberHandler = async (userId) => {
    setLoadingMemberId(userId);
    await removeMember("member removed", { userId, chatId });
    setLoadingMemberId(null);
  };

  // Render elements
  const IconBtns = (
    <>
      <Box
        sx={{
          display: { xs: "block", sm: "none" },
          position: "fixed",
          top: "1rem",
          right: "1rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Tooltip title="Back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            backgroundColor: matBlack,
            color: "white",
            ":hover": { bgcolor: "rgba(0,0,0,0.7)" },
          }}
          onClick={navigateToBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  const GroupNameComponent = (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing="1rem"
      padding="3rem"
    >
      {isEdit ? (
        <>
          <TextField
            placeholder="Edit the group name"
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
          <IconButton onClick={() => setIsEdit(true)}>
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );

  const ButtonGroup = (
    <Stack direction={{ sm: "row", xs: "column-reverse" }} spacing="1rem" mt="4px">
      <Button variant="text" color="error" startIcon={<DeleteIcon />} onClick={openConfirmDelete}>
        Delete
      </Button>
      <Button variant="contained" startIcon={<AddIcon />} onClick={openConfirmAddMember}>
        Add Member
      </Button>
    </Stack>
  );

  return (
    <Grid container height="100vh">
      {/* Sidebar */}
      <Grid item sm={4} sx={{ display: { xs: "none", sm: "block" }, backgroundImage: bgGradient }}>
        <GroupList myGroups={getMyGroup?.data?.groups} chatId={chatId} />
      </Grid>

      {/* Main Content */}
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        {IconBtns}
        {groupName && (
          <>
            {GroupNameComponent}
            <Typography margin="2rem" alignSelf="flex-start" variant="body1">
              Members
            </Typography>
            <Stack spacing="2rem" height="55vh" overflow="auto" maxWidth="30rem" width="100%">
              {members.map((i) => (
                <Box key={i._id} position="relative">
                  {loadingMemberId === i._id ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="5rem">
                      <CircularProgress size={24} />
                    </Box>
                  ) : (
                    <UserItem
                      user={i}
                      isAdded
                      styling={{
                        boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
                        padding: "1rem 2rem",
                        borderRadius: "1rem",
                      }}
                      handler={() => removeMemberHandler(i._id)}
                    />
                  )}
                </Box>
              ))}
            </Stack>
            {ButtonGroup}
          </>
        )}
      </Grid>

      {/* Dialogs */}
      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog chatId={chatId} />
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
      {/* Mobile Drawer */}
      <Drawer open={isMobileOpenMenu} onClose={handleMobileClose}>
        <GroupList myGroups={getMyGroup?.data?.groups} chatId={chatId} width="50vw" />
      </Drawer>
    </Grid>
  );
};

export default Group;
