import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import { StoreContext } from '../AppReducer';

import '../styles/Homepage.css';
import {
  createUserProfileDocument,
  signInWithGoogle,
  auth,
} from '../firebase/firebase.utils';

const initialValue = ['Early 7', 'Corner', 'All Lines', 'House', 'Bamboo'];
let unsubscribeFromAuth = null;

export default function Homepage() {
  const [showHomepage, setHomepageToggle] = useState(true);
  const [container1, setContainer1] = useState(initialValue);
  const [container2, setContainer2] = useState([]);
  const [openModal, toggleModal] = useState(false);

  const [state, dispatch] = useContext(StoreContext);

  const { currentUser } = state;

  const goToTambola = () => {
    toggleModal((prevState) => !prevState);
    // setHomepageToggle(false);
  };

  const moveItemFromContainer1 = (challengeType) => {
    const tempContainer1 = [...container1];
    const tempContainer2 = [...container2];
    const itemIndex = tempContainer1.findIndex(
      (item) => item === challengeType
    );
    const selectedItem = tempContainer1.splice(itemIndex, 1);
    tempContainer2.push(selectedItem);
    setContainer1(tempContainer1);
    setContainer2(tempContainer2);
  };

  const moveItemFromContainer2 = (challengeType) => {
    const tempContainer1 = [...container1];
    const tempContainer2 = [...container2];
    const itemIndex = tempContainer2.findIndex(
      (item) => item === challengeType
    );
    const selectedItem = tempContainer2.splice(itemIndex, 1);
    tempContainer1.push(selectedItem);
    setContainer1(tempContainer1);
    setContainer2(tempContainer2);
  };

  useEffect(() => {
    unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
      toggleModal(false);
      dispatch({ type: 'CURRENT_USER', payload: user });
      createUserProfileDocument(user);
      console.log('user', user);
      return () => {
        unsubscribeFromAuth();
      };
    });
  }, []);

  console.log('TCL: Homepage -> currentUser', currentUser);

  return (
    <>
      <Modal open={openModal} onClose={() => toggleModal(false)}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Card>
            <button type="button" onClick={signInWithGoogle}>
              Sign In with Google
            </button>
            <button type="button" onClick={() => auth.signOut()}>
              Sign Off
            </button>
          </Card>
        </div>
      </Modal>
      {showHomepage ? (
        <div className="topContainer">
          <p>Lets play tambola</p>
          <div className="appContainerStyle">
            <div className="childContainer">
              {container1.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="childElement"
                  onClick={() => moveItemFromContainer1(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="childContainer">
              {container2.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="childElement"
                  onClick={() => moveItemFromContainer2(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button type="button" onClick={goToTambola}>
            Go to Tambola
          </button>
        </div>
      ) : (
        <Redirect
          push
          to={{
            pathname: `/gameon/${Math.random().toString(36).substring(7)}`,
            state: { challenges: container2 },
          }}
        />
      )}
    </>
  );
}
