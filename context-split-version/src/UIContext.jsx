import React, { createContext, useReducer, useContext, useMemo } from 'react';

export const UI_ACTIONS = {
  TOGGLE_THEME: 'TOGGLE_THEME',
  SET_NOTIFICATION: 'SET_NOTIFICATION'
};

const UIContext = createContext();

const initialUIState = {
  theme: 'light',
  notification: null
};

function uiReducer(state, action) {
  switch (action.type) {
    case UI_ACTIONS.TOGGLE_THEME:
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    case UI_ACTIONS.SET_NOTIFICATION:
      return { ...state, notification: action.payload };
    default:
      return state;
  }
}

export const UIProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialUIState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
};

export const useUIContext = () => useContext(UIContext);
