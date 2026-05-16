import React, { createContext, useReducer, useContext, useMemo } from 'react';

export const USER_ACTIONS = {
  SET_USER: 'SET_USER'
};

const UserContext = createContext();

const initialUserState = {
  name: 'Jane Doe',
  isLoggedIn: true
};

function userReducer(state, action) {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
