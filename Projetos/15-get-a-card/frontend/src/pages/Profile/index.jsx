import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import './style.css'
import { ROUTES } from "../../routes/appRoutes";
import MediaService from "../../services/MediaService";


function Profile(){

    const {user} = useAuthContext();
    const navigate = useNavigate();

    if(!user){
        return null;
    }
    return(
        <section className="user-info">
            <h1>{user.name}</h1>
            {user.profilePicture&&(
                <img src={MediaService.getUrl(user.profilePicture.filePath)} alt="" />
            )}
            <h2>email:</h2>
            <p>{user.email}</p>

            {user.phone && (
                <>
                    <h2>Phone:</h2>
                    <p>{user.phone}</p>
                </>
            )}
            <button onClick={()=>navigate(ROUTES.EDIT_PROFILE)}>edit</button>
        </section>
    )
}


export default Profile;