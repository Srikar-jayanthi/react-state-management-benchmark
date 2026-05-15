import React, { createContext, useReducer, useContext } from 'react';

const UIContext = createContext();

const initialUIState = {
  theme: 'light',
  notification: null
};

function uiReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    default:
      return state;
  }
}

export const UIProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialUIState);
  return (
    <UIContext.Provider value={{ state, dispatch }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUIContext = () => useContext(UIContext);
