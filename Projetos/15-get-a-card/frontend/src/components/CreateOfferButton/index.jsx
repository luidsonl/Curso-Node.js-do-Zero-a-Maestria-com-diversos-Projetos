import { useState } from 'react';
import './style.css'
import CrerateOfferModal from './CreateOfferModal';
import { useAuthContext } from '../../contexts/AuthContext';

function CreateOfferButton(){
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
                Create Offer
            </button>
            {showModal && (
                <CrerateOfferModal modalToggle={modalToggle}/>
            )}
        </>
        
    )
}

export default CreateOfferButton;