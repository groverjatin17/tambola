import React, { Component } from "react";
import { Howl } from "howler";

import "../styles/Tambola.css";

const tambolaNumbersOrigin = Array.from({ length: 90 }, (x, i) => i + 1);
const RenderRadioInput = ({ name, value, callingDuration, callback }) => {
  return (
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
};

export default class Tambola extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tambolaNumbers: Array.from({ length: 90 }, (x, i) => i + 1),
      callingDuration: 2000,
    };
    this.randomNumber = "start";
  }

  componentWillUnmount =() => {
    clearInterval(this.myInterval);
    
  }
  generateRandomNumber = () => {
    if (this.state.tambolaNumbers.length > 0) {
      const tempTambolaNumbers = [...this.state.tambolaNumbers];
      const randomNum =
        tempTambolaNumbers[
          Math.floor(Math.random() * tempTambolaNumbers.length)
        ];
      this.randomNumber = randomNum;
      const index = tempTambolaNumbers.findIndex((item) => item === randomNum);
      tempTambolaNumbers.splice(index, 1);
      this.setState({ tambolaNumbers: tempTambolaNumbers });
      let sound = new Howl({
        src: require(`../assets/audio/${randomNum}.wav`),
      });
      sound.play();
    } else {
      clearInterval(this.myInterval);
    }
  };

  start = () => {
    this.myInterval = setInterval(
      () => this.generateRandomNumber(),
      this.state.callingDuration
    );
  };

  changeDuration = (duration) => {
    clearInterval(this.myInterval);
    this.setState({ callingDuration: Number(duration) }, () => (this.myInterval && this.start()));
  };

  render() {
    const { callingDuration } = this.state;
    const { challenges } = this.props.location.state;
    return (
      <div className="master-container">
        <p style={{ fontSize: "50px" }}>{this.randomNumber}</p>

        <div className="primary-container">
          <div className="childContainer">
            {challenges.length > 0 &&
              challenges.map((challenge) => (
                <span key={challenge} className="childElement">{challenge}</span>
              ))}
          </div>
          <div className="tambola-board-container">
            <div className="container">
              {tambolaNumbersOrigin.map((number) => (
                <span
                  key={number}
                  className={
                    this.state.tambolaNumbers.includes(number)
                      ? "spanStyle green"
                      : "spanStyle"
                  }
                >
                  {number}
                </span>
              ))}
            </div>
            <span>
              <button onClick={this.start}>Get</button>
              <button onClick={() => {clearInterval(this.myInterval); this.myInterval= null;}
              }>
                Pause
              </button>
            </span>
            <form>
              <RenderRadioInput
                name="4 seconds"
                value="4000"
                callingDuration={callingDuration}
                callback={this.changeDuration}
              />
              <RenderRadioInput
                name="5 seconds"
                value="5000"
                callingDuration={callingDuration}
                callback={this.changeDuration}
              />
              <RenderRadioInput
                name="7 seconds"
                value="7000"
                callingDuration={callingDuration}
                callback={this.changeDuration}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
