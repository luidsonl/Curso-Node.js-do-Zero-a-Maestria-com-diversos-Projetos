import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import './style.css'


function Profile(){

    const {user} = useAuthContext();
    

    if(!user){
        return null;
    }
    return(
        <section className="user-info">
            <h1>{user.name}</h1>
            <h2>email:</h2>
            <p>{user.email}</p>

            {user.phone && (
                <>
                    <h2>Phone:</h2>
                    <p>{user.phone}</p>
                </>
            )}
            <button>edit</button>
        </section>
    )
}


export default Profile;