import { useState } from 'react';
import './style.css'
import { useAuthContext } from '../../contexts/AuthContext';
import OfferService from '../../services/OfferService';

function CancelOfferButton({card, setRefresh}){
    const {user, token} = useAuthContext();

    if(!user){
        return null;
    }

    async function handleClick(){
        const data = await OfferService.cancel(card._id, token)
        if(setRefresh){
            setRefresh();
        }
    }

    return (
        <>
            <button className='transmute-button' onClick={handleClick}>
                Cancel offer
            </button>
        </>
        
    )
}

export default CancelOfferButton;