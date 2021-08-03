import {combineReducers} from 'redux'

// initialState = {
//     name : 'prawito Huduro'
// }

const User = {};
const UserReducer = (state = User, action) => {
  if (action.type === 'SET_DATA_USER') {
    state = action.value
    // console.log('action user',action.value);
  };
  return state; 
};


const Token = '';

const TokenReducer = (state = Token, action) => {
  if (action.type === 'SET_DATA_TOKEN') {
    state = action.value
    // console.log('action token',action.value);
  }
  return state; 
};

const Role = '';

const RoleReducer = (state = Role, action) => {
  if (action.type === 'SET_DATA_ROLE') {
    state = action.value
    // console.log('action token',action.value);
  }
  return state; 
};


const reducer = combineReducers({
    UserReducer,
    TokenReducer,
    RoleReducer
})

export default reducer;