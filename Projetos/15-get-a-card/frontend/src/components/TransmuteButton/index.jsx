import { useState } from 'react';
import './style.css'
import TransmuteModal from './TransmuteModal';
import { useAuthContext } from '../../contexts/AuthContext';

function TransmuteButton(){
    const {user} = useAuthContext();
    const[showModal, setShowModal] = useState(false);

    if(!user){
        return null;
    }

    function modalToggle(){
        setShowModal(prev=>!prev)
    }

    return (
        <>
            <button className='transmute-button' onClick={modalToggle}>
                Transmute
            </button>
            {showModal && (
                <TransmuteModal modalToggle={modalToggle}/>
            )}
        </>
        
    )
}

export default TransmuteButton;