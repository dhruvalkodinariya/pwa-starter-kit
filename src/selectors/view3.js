import { createSelector } from "reselect";

export const user = (state, userId) => {
  return state.view3.users[userId];
}

// export const userSelector = () => {
//   user,
//   (u)=>{
//     return {
//       ...u,
//       email: u.email.toLowerCase()
//     }
//   }
// }

export const userFactory = (userId) => {
  return createSelector(
    (state)=>{
      return user(state, userId)
    },
    (user)=>{
      return {
        ...user,
        email: user.email.toLowerCase()
      }
    }
  )
}