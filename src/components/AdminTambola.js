import React, { useContext, useEffect, useState, useRef } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Howl } from 'howler';
import _ from 'lodash';
import { StoreContext } from '../AppReducer';

import '../styles/Tambola.css';
import TambolaBoard from './TambolaBoard';

const tambolaNumbersOrigin = Array.from({ length: 90 }, (x, i) => i + 1);
const RenderRadioInput = ({ name, value, callingDuration, callback }) => (
  <>
    <input
      type="radio"
      name={name}
      value={value}
      checked={callingDuration === Number(value)}
      onChange={(e) => {
        callback(e.target.value);
      }}
    />
    <label htmlFor={name}>{name}</label>
  </>
);
export default function AdminTambola(props) {
  console.log('TCL: AdminTambola -> props', props);
  const [callingDuration, setCallingDuration] = useState(2000);
  const [disableStarter, setDisableStarter] = useState(false);

  const [state, dispatch] = useContext(StoreContext);

  const { tambolaNumbers } = state;

  const myInterval = useRef(0);
  const randomNumber = useRef('start');

  const postTambolaNumbers = () => {
    console.log('TCL: postTambolaNumbers -> randomNumber', randomNumber);
    console.log('TCL: postTambolaNumbers -> myInterval', myInterval.current);
    console.log('In postTambolaNumbers');
  };

  const generateRandomNumber = () => {
    if (tambolaNumbers.length > 0) {
      // const tempTambolaNumbers = [...tambolaNumbers];
      const randomNum =
        tambolaNumbers[Math.floor(Math.random() * tambolaNumbers.length)];
      randomNumber.current = randomNum;
      dispatch({ type: 'TAMBOLA_NUMBERS', payload: randomNum });
      const sound = new Howl({
        src: require(`../assets/audio/${randomNum}.wav`),
      });
      sound.play();
    } else {
      clearInterval(myInterval.current);
    }
  };

  const start = () => {
    setDisableStarter((previousValue) => !previousValue);
    myInterval.current = setInterval(
      () => generateRandomNumber(),
      callingDuration
    );
  };

  useEffect(() => {
    postTambolaNumbers();
  }, [tambolaNumbers]);

  useEffect(() => {
    if (myInterval.current) {
      start();
    }
  }, [callingDuration]);

  const pause = () => {
    clearInterval(myInterval.current);
    myInterval.current = null;
    setDisableStarter((previousValue) => !previousValue);
  };

  const changeDuration = (duration) => {
    clearInterval(myInterval.current);
    setCallingDuration(Number(duration));
  };

  const { location } = props;
  const challenges = location.state.challenges || [
    'Early 7',
    'Corner',
    'All Lines',
    'House',
    'Bamboo',
  ];

  return (
    <div className="master-container">
      <p style={{ fontSize: '50px' }}>{randomNumber.current}</p>
      <div className="primary-container">
        <div className="childContainer">
          {challenges.length > 0 &&
            challenges.map((challenge) => (
              <span key={challenge} className="childElement">
                {challenge}
              </span>
            ))}
        </div>
        <div className="tambola-board-container">
          <TambolaBoard
            tambolaNumbersOrigin={tambolaNumbersOrigin}
            tambolaNumbers={tambolaNumbers}
          />
          <span>
            <button type="button" disabled={disableStarter} onClick={start}>
              Start
            </button>
            <button type="button" onClick={pause}>
              Pause
            </button>
          </span>
          <form>
            <RenderRadioInput
              name="4 seconds"
              value="4000"
              callingDuration={callingDuration}
              callback={changeDuration}
            />
            <RenderRadioInput
              name="5 seconds"
              value="5000"
              callingDuration={callingDuration}
              callback={changeDuration}
            />
            <RenderRadioInput
              name="7 seconds"
              value="7000"
              callingDuration={callingDuration}
              callback={changeDuration}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
