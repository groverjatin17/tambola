import React, { useState } from 'react';
import {Redirect} from 'react-router-dom';

import '../styles/Homepage.css';

const initialValue = ['Early 7', 'Corner', 'All Lines', 'House', 'Bamboo']
export default function Homepage() {

    const [showHomepage, setHomepageToggle] = useState(true);
    const [container1, setContainer1] = useState(initialValue);
    const [container2, setContainer2] = useState([]);

    const goToTambola = () => {
        setHomepageToggle(false)
    }

    const moveItemFromContainer1 = (challengeType) => {
        const tempContainer1 = [...container1];
        const tempContainer2 = [...container2];
        const itemIndex = tempContainer1.findIndex(item => item === challengeType);
        const selectedItem = tempContainer1.splice(itemIndex,1);
        tempContainer2.push(selectedItem);
        setContainer1(tempContainer1);
        setContainer2(tempContainer2);
    }
    
    const moveItemFromContainer2 = (challengeType) => {
        const tempContainer1 = [...container1];
        const tempContainer2 = [...container2];
        const itemIndex = tempContainer2.findIndex(item => item === challengeType);
        const selectedItem = tempContainer2.splice(itemIndex,1);
        tempContainer1.push(selectedItem);
        setContainer1(tempContainer1);
        setContainer2(tempContainer2);
    }

    
    return (
        <>
        { showHomepage ? 
        (
        <div className='topContainer'>
            <p>Lets play tambola</p>
            <div className='appContainerStyle'>
                <div className='childContainer'>
                    {container1.map(item => <span key={item} className='childElement' onClick={() =>moveItemFromContainer1(item)}>{item}</span>)}
                </div>
                <div className='childContainer'>
                    {container2.map(item => <span key={item} className='childElement' onClick={() =>moveItemFromContainer2(item)}>{item}</span>)}
                </div>
            </div>
            <button onClick={goToTambola}>Go to Tambola</button>
        </div>
        ) : <Redirect push to={{
                            pathname: '/gameon',
                            state:{ challenges: container2}
                            }}
            />
        }
        </>
    )
}
