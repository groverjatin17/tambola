import React, { createContext, useReducer } from 'react';

export const StoreContext = createContext({});

const initialState = {
  currentUser: null,
  patterns: ['Early 7', 'Corner', 'All Lines', 'House', 'Bamboo'],
  selectedPatterns: [],
};
const reducer = (currentState, action) => {
  switch (action.type) {
    case 'CURRENT_USER':
      return { ...currentState, currentUser: action.payload };
    case 'PATTERNS':
      return { ...currentState, patterns: action.payload };
    case 'SELECTED_PATTERNS':
      return { ...currentState, selectedPatterns: action.payload };
    default:
      return currentState;
  }
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};

export default Store;
