import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../components/Nav"
import Footer from "../components/Footer";
import "../Scss/pages/Register.scss"

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword]= useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [serverError, setServeurError] = useState('');

    const navigate = useNavigate()


    const registerUserObject = {
        name: name,
        email: email,
        password: password,
    }

    const registerUser = async () => {
        await fetch("http://localhost:5000/register", {
            method: "POST",
            headers:{
                'Accept': 'application/json',
                "Content-Type": "application/json",   
            },
            body: JSON.stringify(registerUserObject),
        })
        .then(response => {
            if (response.status === 200){
                console.log(response.status)
                console.log(registerUserObject)
                console.log(response)
                alert("Votre compte à été crée avec succès! Vous allez être redirigez sur la page de connection.")
                navigate("/login")
            } else {
                console.log(response.status)
                setServeurError('Une erreur est survenue veuillez réessayer plus tard.')
            } 
        })
    }
    
    const onButtonClick = () => {
        setEmailError('')
        setPasswordError('')
        setNameError('')

        if ('' === name || name.length < 3){
            setNameError('Veuillez saisir votre prénom')
        }
        else if ('' === email){
            setEmailError('Veuillez saisir votre email')  
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
            setEmailError('Veuillez saisir une adresse email valide')
        } else if('' === password){
            setPasswordError('Veuillez saisir votre mot de passe')
        } else if(password.length < 7){
            setPasswordError('Votre mot de passe doit contenir 8 characters minimum')
        } else if (password !== confirmPassword){
            setPasswordError('Les deux mots de passe sont différent')
        }
         else {
            registerUser() 
        }
          
    }
    return (
        <div>
            <header>
                <Nav/>
                <section className="register-content">
                        <h1>S'inscrire</h1>
                        <form method="POST" >
                            <div className="input-wrapper">
                                <label htmlFor="name">Prénom</label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Entrez votre adresse name"
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <span className="errorLabel">{nameError}</span>
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Entrez votre adresse email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <span className="errorLabel">{emailError}</span>
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="password">Mot de passe</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Entrez votre mot de passe"
                                    autoComplete="current-password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <span className="errorLabel">{passwordError}</span>
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="confirmPassword">Confirmez le mot de passe</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="Confirmation du mot de passe"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            {serverError ? <p className="errorLabel">{serverError}</p> : null}
                            <input type="button" className="register_button" onClick={onButtonClick} value={'Valider mon inscription'} placeholder="Valider mon inscription"/>
                        </form>
                </section>
            </header>
            <Footer/>
        </div>
    )
}

export default Register;