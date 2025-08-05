import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import './style.css'



function Profile(){

    const {user} = useAuthContext();
    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
    });

    const handleSubmit = async (e) => {
        
    };

    if(!user){
        return null;
    }

    return editMode ? (
        <section className="user-info">
            <h1>Editing profile</h1>
            <form onSubmit={handleSubmit}></form>

            <button onClick={()=>{setEditMode(false)}}>back</button>
        </section>
    ) : (
    
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
            <button onClick={()=>{setEditMode(true)}}>edit</button>
        </section>
    );
    
}


export default Profile;