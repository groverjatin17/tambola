import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Howl } from 'howler';

import TambolaBoard from './TambolaBoard';
import '../styles/Tambola.css';

export default function GuestTambola({
  match: {
    params: { id },
  },
}) {
  const tambolaNumbersOrigin = Array.from({ length: 90 }, (x, i) => i + 1);
  const [tambolaNumbers, setTambolaNumbers] = useState(tambolaNumbersOrigin);

  const getNumbers = () => {
    fetch(`http://localhost:8080/tambola/number/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.tambolaNumbers.split(',').length !== tambolaNumbers.length) {
          const currentNumber = _.difference(
            tambolaNumbers,
            data.tambolaNumbers.split(',').map(Number)
          );
          setTambolaNumbers(data.tambolaNumbers.split(',').map(Number));
          if (
            currentNumber.toString().length > 0 &&
            currentNumber.toString().length < 3
          ) {
            console.log('hi there');
            console.log('currentNumber', `${currentNumber}`);

            const sound = new Howl({
              src: require(`../assets/audio/${currentNumber}.wav`),
            });
            sound.play();
          }
        }
      });
  };

  useEffect(() => {
    const timerRef = setInterval(() => getNumbers(), 1000);
    return () => {
      clearInterval(timerRef);
    };
  }, [getNumbers]);

  return (
    <div>
      <TambolaBoard
        tambolaNumbersOrigin={tambolaNumbersOrigin}
        tambolaNumbers={tambolaNumbers}
      />
    </div>
  );
}
