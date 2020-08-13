import React, { createContext, useReducer } from 'react';

export const StoreContext = createContext({});

const initialState = {
  currentuser: null,
};
const reducer = (currentState, action) => {
  switch (action.type) {
    case 'CURRENT_USER':
      return { ...currentState, currentUser: action.payload };
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
