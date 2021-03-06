import React from 'react';

export default function TambolaBoard({ tambolaNumbersOrigin, tambolaNumbers }) {
  console.log('TCL: TambolaBoard -> tambolaNumbers', tambolaNumbers);
  return (
    <div className="container">
      {tambolaNumbersOrigin.map((number) => (
        <span
          key={number}
          className={
            tambolaNumbers.includes(number) ? 'spanStyle green' : 'spanStyle'
          }
        >
          {number}
        </span>
      ))}
    </div>
  );
}
