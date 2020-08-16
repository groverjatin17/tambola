import React, { useState, useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import { StoreContext } from '../AppReducer';
import Register from './Register';
import Login from './Login';
import SelectPatterns from './SelectPatterns';
import '../styles/Homepage.css';

import { createUserProfileDocument, auth } from '../firebase/firebase.utils';

let unsubscribeFromAuth = null;

export default function Homepage() {
  const [gameOn, startGame] = useState(false);
  const [openModal, toggleModal] = useState(false);
  const [register, setRegistrationFlag] = useState(false);

  const [state, dispatch] = useContext(StoreContext);
  const { selectedPatterns } = state;

  const goToTambola = () => {
    toggleModal((prevState) => !prevState);
    // startGame(false);
  };

  useEffect(() => {
    unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
      dispatch({ type: 'CURRENT_USER', payload: user });
      await createUserProfileDocument(user);
      if (user) {
        startGame(true);
      }
    });
    return () => {
      console.log('Unsubscribing in Login');
      unsubscribeFromAuth();
    };
  }, []);

  return (
    <>
      <Modal
        open={openModal}
        onClose={() => {
          console.log('In close Modal function');
          setRegistrationFlag(false);
          toggleModal(false);
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {register ? (
            <Card>
              <Register />
            </Card>
          ) : (
            <Card>
              <Login />
              <button
                type="button"
                onClick={() => {
                  setRegistrationFlag(true);
                }}
              >
                Register
              </button>
            </Card>
          )}
        </div>
      </Modal>
      {gameOn ? (
        <Redirect
          push
          to={{
            pathname: `/admin/${Math.random().toString(36).substring(7)}`,
            state: { challenges: selectedPatterns },
          }}
        />
      ) : (
        <div className="topContainer">
          <p>Lets play tambola</p>
          <SelectPatterns />
          <button type="button" onClick={goToTambola}>
            Go to Tambola
          </button>
        </div>
      )}
    </>
  );
}
