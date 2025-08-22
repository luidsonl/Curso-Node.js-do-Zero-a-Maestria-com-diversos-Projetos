import { useState } from 'react';
import './style.css'
import TransmuteModal from './TransmuteModal';

function TransmuteButton(){
    const[showModal, setShowModal] = useState(false);

    function modalToggle(){
        setShowModal(prev=>!prev)
    }

    return (
        <>
            <button className='transmute-button' onClick={modalToggle}>
                Transmute
            </button>
            {showModal && (
                <TransmuteModal/>
            )}
        </>
        
    )
}

export default TransmuteButton;