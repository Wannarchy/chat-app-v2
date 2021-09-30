import React, {useState} from 'react';

import axios from 'axios';

import './Auth.css';

import signinImage from '../assets/signup.jpg';
import Cookies from 'universal-cookie';

const cookies = new Cookies()

const initialState = {
    fullName : '',
    username : '',
    password : '',
    confirmPassword : '',
    phoneNumber : '',
    avatarURL : '',
}

const Auth = () => {

    const [isSignup, setIsSignup] = useState(true);
    const [form , setForm] = useState(initialState);

    const handleChange = (e) => {
        setForm({... form, [e.target.name]: e.target.value});

        
    }


const handleSubmit = async (e) => {
    e.preventDefault();
    
   const {fullName, username, password, phoneNumber, avatarURL} = form;

   const URL = 'http://localhost:5000/auth';

   const {data: {token, userId, hashedPassword}} = await axios.post(`${URL}/${isSignup ? 'signup'  : 'login'}`,{
       username,password,fullName,phoneNumber,avatarURL,
   });

   cookies.set('token',token);
   cookies.set('username',username);
   cookies.set('fullName',fullName);
   cookies.set('userId',userId);


   if(isSignup) {
    cookies.set('phoneNumber',phoneNumber);
    cookies.set('avatarURL',avatarURL);
    cookies.set('hashedPassword',hashedPassword);
   }

   window.location.reload();

}


    const switchMode = () => {
       setIsSignup((previIsSignup) => !previIsSignup);
    }

    return (
        <div className="auth-form-container">
            <div className="auth-form-container-fields">
                <div className="auth-form-container-fields-content">
                    <p>{isSignup ? "S'inscrire" : 'Se Connecter'}</p>
                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                             <div className="auth-form-container-fields-content-input">
                                 <label htmlFor="fullName">Prénom & Nom</label>
                                 <input
                                 name="fullName"
                                 type="text"
                                 placeholder="Prénom & Nom"
                                 onChange={handleChange}
                                 required
                                 />
                             </div>
                             
                        )}
                         <div className="auth-form-container-fields-content-input">
                                 <label htmlFor="username">Nom d'utilisateur</label>
                                 <input
                                 name="username"
                                 type="text"
                                 placeholder="Nom d'utilisateur"
                                 onChange={handleChange}
                                 required
                                 />
                             </div>
                             {isSignup && (
                             <div className="auth-form-container-fields-content-input">
                                 <label htmlFor="phoneNumber">Numéro de télephone</label>
                                 <input
                                 name="phoneNumber"
                                 type="text"
                                 placeholder="Numéro de télephone"
                                 onChange={handleChange}
                                 required
                                 />
                             </div>
                             
                        )}
                          {isSignup && (
                             <div className="auth-form-container-fields-content-input">
                                 <label htmlFor="avatarURL">Lien image Avatar</label>
                                 <input
                                 name="avatarURL"
                                 type="text"
                                 placeholder="https://example.com"
                                 onChange={handleChange}
                                 required
                                 />
                             </div>
                             
                        )}
                        <div className="auth-form-container-fields-content-input">
                                 <label htmlFor="password">Mot de passe</label>
                                 <input
                                 name="password"
                                 type="password"
                                 placeholder="Mot de passe"
                                 onChange={handleChange}
                                 required
                                 />
                             </div>
                             {isSignup && (
                             <div className="auth-form-container-fields-content-input">
                                 <label htmlFor="confirmPassword">Confirmez le mot de passe</label>
                                 <input
                                 name="confirmPassword"
                                 type="password"
                                 placeholder="Confirmez le mot de passe"
                                 onChange={handleChange}
                                 required
                                 />
                             </div>
                              )}
                        <div className="auth-form-container-fields-content-button">
                            <button>  {isSignup ? "S'inscrire" : "Se connecter "}</button>
                        </div>
                    </form>
                    <div className="auth-form-container-fields-account">
                        <p>
                            {isSignup ? "Vous avez déjà un compte ? " : "Vous n'avez pas encore de compte ? "}
                            <span onClick={switchMode}>
                            {isSignup ? "Se Connecter" : "S'inscrire "}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="auth-form-container-image">
                <img src={signinImage} alt="se connecter"/>
            </div>
        </div>
    )
}

export default Auth
