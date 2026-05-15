import React, { createContext, useReducer, useContext } from 'react';

const UserContext = createContext();

const initialUserState = {
  name: 'Jane Doe',
  isLoggedIn: true
};

function userReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
