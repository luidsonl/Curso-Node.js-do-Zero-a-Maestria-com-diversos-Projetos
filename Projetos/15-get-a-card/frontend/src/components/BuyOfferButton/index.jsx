import { useState } from 'react';
import './style.css'
import { useAuthContext } from '../../contexts/AuthContext';
import OfferService from '../../services/OfferService';

function BuyOfferButton({offer, setRefresh}){
    const {user, token} = useAuthContext();
    console.log(user)

    if(!user){
        return null;
    }

    async function handleClick(){
        if(offer){
            await OfferService.execute(offer, token)
            if(setRefresh){
                setRefresh();
            }
        }
        
    }

    if(!offer){
        return null;
    }

    return (
        <>
            <button className='transmute-button' onClick={handleClick}>
                Buy for {offer.price} alchemy
            </button>
        </>
        
    )
}

export default BuyOfferButton;