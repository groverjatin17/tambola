import React, { useContext } from 'react';
import '../styles/Homepage.css';
import { StoreContext } from '../AppReducer';

export default function SelectPatterns() {
  const [state, dispatch] = useContext(StoreContext);

  const { patterns, selectedPatterns } = state;

  const patternsContainer = (challengeType) => {
    const patternsCopy = [...patterns];
    const selectedPatternsCopy = [...selectedPatterns];
    const itemIndex = patternsCopy.findIndex((item) => item === challengeType);
    const selectedItem = patternsCopy.splice(itemIndex, 1);
    selectedPatternsCopy.push(selectedItem);
    dispatch({ type: 'PATTERNS', payload: patternsCopy });
    dispatch({ type: 'SELECTED_PATTERNS', payload: selectedPatternsCopy });
  };

  const selectedPatternsContainer = (challengeType) => {
    const patternsCopy = [...patterns];
    const selectedPatternsCopy = [...selectedPatterns];
    const itemIndex = selectedPatternsCopy.findIndex(
      (item) => item === challengeType
    );
    const selectedItem = selectedPatternsCopy.splice(itemIndex, 1);
    patternsCopy.push(selectedItem);
    dispatch({ type: 'PATTERNS', payload: patternsCopy });
    dispatch({ type: 'SELECTED_PATTERNS', payload: selectedPatternsCopy });
  };

  return (
    <div className="appContainerStyle">
      <div className="childContainer">
        {patterns.map((item) => (
          <button
            key={item}
            type="button"
            className="childElement"
            onClick={() => patternsContainer(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="childContainer">
        {selectedPatterns.map((item) => (
          <button
            key={item}
            type="button"
            className="childElement"
            onClick={() => selectedPatternsContainer(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
