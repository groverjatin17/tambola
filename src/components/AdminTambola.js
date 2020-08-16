import React, { Component, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Howl } from 'howler';

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

import React from 'react'

export default function AdminTambola() {

    const [tambolaNumbers, setTambolaNumbers] = useState(Array.from({ length: 90 }, (x, i) => i + 1))
    const [callingDuration, setCallingDuration] = useState()
    const [disableStarter, setDisableStarter] = useState(Array.from({ length: 90 }, (x, i) => i + 1))
    // this.state = {
    //   disableStarter: Array.from({ length: 90 }, (x, i) => i + 1),
    //   callingDuration: 2000,
    //   disableStarter: false,
    // };
    this.randomNumber = 'start';
    return (
        <div>
            
        </div>
    )
}

// export default class Tambola extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       tambolaNumbers: Array.from({ length: 90 }, (x, i) => i + 1),
//       callingDuration: 2000,
//       disableStarter: false,
//     };
//     this.randomNumber = 'start';
//   }

//   componentDidMount() {
//     this.postTambolaNumbers();
//   }

//   componentWillUnmount = () => {
//     clearInterval(this.myInterval);
//   };

//   postTambolaNumbers = () => {
//     const { tambolaNumbers } = this.state;
//     const {
//       match: {
//         params: { gameNumber },
//       },
//     } = this.props;
//     fetch('http://localhost:8080/tambola/number', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         gameId: gameNumber,
//         tambolaNumbers: tambolaNumbers.join(),
//       }),
//     }).then((response) => response.json());
//   };

//   generateRandomNumber = () => {
//     const { tambolaNumbers } = this.state;
//     if (tambolaNumbers.length > 0) {
//       const tempTambolaNumbers = [...tambolaNumbers];
//       const randomNum =
//         tempTambolaNumbers[
//           Math.floor(Math.random() * tempTambolaNumbers.length)
//         ];
//       this.randomNumber = randomNum;
//       const index = tempTambolaNumbers.findIndex((item) => item === randomNum);
//       tempTambolaNumbers.splice(index, 1);
//       this.setState(
//         { tambolaNumbers: tempTambolaNumbers },
//         this.postTambolaNumbers
//       );
//       const sound = new Howl({
//         src: require(`../assets/audio/${randomNum}.wav`),
//       });
//       sound.play();
//     } else {
//       clearInterval(this.myInterval);
//     }
//   };

//   start = () => {
//     const { callingDuration } = this.state;
//     this.setState((prevState) => ({
//       disableStarter: !prevState.disableStarter,
//     }));
//     this.myInterval = setInterval(
//       () => this.generateRandomNumber(),
//       callingDuration
//     );
//   };

//   pause = () => {
//     clearInterval(this.myInterval);
//     this.myInterval = null;
//     this.setState((prevState) => ({
//       disableStarter: !prevState.disableStarter,
//     }));
//   };

//   changeDuration = (duration) => {
//     clearInterval(this.myInterval);
//     this.setState(
//       { callingDuration: Number(duration) },
//       () => this.myInterval && this.start()
//     );
//   };

//   render() {
//     const { callingDuration, tambolaNumbers, disableStarter } = this.state;
//     const { location } = this.props;
//     const { challenges } = location.state || {
//       challenges: ['Early 7', 'Corner', 'All Lines', 'House', 'Bamboo'],
//     };

//     return (
//       <div className="master-container">
//         <p style={{ fontSize: '50px' }}>{this.randomNumber}</p>
//         <div className="primary-container">
//           <div className="childContainer">
//             {challenges.length > 0 &&
//               challenges.map((challenge) => (
//                 <span key={challenge} className="childElement">
//                   {challenge}
//                 </span>
//               ))}
//           </div>
//           <div className="tambola-board-container">
//             <TambolaBoard
//               tambolaNumbersOrigin={tambolaNumbersOrigin}
//               tambolaNumbers={tambolaNumbers}
//             />
//             <span>
//               <button
//                 type="button"
//                 disabled={disableStarter}
//                 onClick={this.start}
//               >
//                 Start
//               </button>
//               <button type="button" onClick={this.pause}>
//                 Pause
//               </button>
//             </span>
//             <form>
//               <RenderRadioInput
//                 name="4 seconds"
//                 value="4000"
//                 callingDuration={callingDuration}
//                 callback={this.changeDuration}
//               />
//               <RenderRadioInput
//                 name="5 seconds"
//                 value="5000"
//                 callingDuration={callingDuration}
//                 callback={this.changeDuration}
//               />
//               <RenderRadioInput
//                 name="7 seconds"
//                 value="7000"
//                 callingDuration={callingDuration}
//                 callback={this.changeDuration}
//               />
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
