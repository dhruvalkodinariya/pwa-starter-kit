import { VIEW3_TEST } from "../actions/view3";

const INITIAL_STATE = {
  "users": {
    "u1":{
      "name":"USER 1",
      "email":"USER1@gmail.com"
    },
    "u2":{
      "name":"USER 2",
      "email":"USER2@gmail.com"
    }
  }
};

const view3 = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case VIEW3_TEST:
      let user = {...state.users[action.userId]};
      let users = {...state.users};
      users[action.userId] = {
        ...user,
        name: action.name
      };
      return {
        ...state,
        users
      };
    default:
      return state;
    }
  };

export default view3;