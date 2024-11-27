export const getOtherMember = (members, userId) => {
//   console.log(members)
 return members?.find((member) => member._id.toString() !== userId.toString())
}
