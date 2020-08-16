import React, { createContext, useReducer } from 'react';
import _ from 'lodash';

export const StoreContext = createContext({});

const initialState = {
  currentUser: null,
  patterns: ['Early 7', 'Corner', 'All Lines', 'House', 'Bamboo'],
  selectedPatterns: [],
  tambolaNumbers: Array.from({ length: 90 }, (x, i) => i + 1),
};

const reducer = (currentState, action) => {
  const calculateTambolaNumber = (number) => {
    const { tambolaNumbers } = currentState;
    const tempNumbers = [...tambolaNumbers];
    _.remove(tempNumbers, (item) => item === number);
    return tempNumbers;
  };

  switch (action.type) {
    case 'CURRENT_USER':
      return { ...currentState, currentUser: action.payload };
    case 'PATTERNS':
      return { ...currentState, patterns: action.payload };
    case 'SELECTED_PATTERNS':
      return { ...currentState, selectedPatterns: action.payload };
    case 'TAMBOLA_NUMBERS':
      return {
        ...currentState,
        tambolaNumbers: calculateTambolaNumber(action.payload),
      };
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
