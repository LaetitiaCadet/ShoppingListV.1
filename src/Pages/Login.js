import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../components/Nav"
import Footer from "../components/Footer";
import "../Scss/pages/Login.scss"

const Login = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate()

    const onButtonClick =() => {
        setEmailError('')
        setPasswordError('')

        if ('' === email){
            setEmailError('Veuillez saisir votre email')
            return
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
            setEmailError('Veuillez saisir une adresse email valide')
            return
        }

        if('' === password){
            setPasswordError('Veuillez saisir votre mot de passe')
            return 
        }

        if(password.length < 7){
            setPasswordError('Votre mot de passe doit contenir 8 characters minimum')
            return 
        }
    }

    return (
        <div className="App">
            <Nav/>
            <header>
                <section className="login-content">
                    <h1>Se connecter</h1>
                    <form method="POST" >
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
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Entrez votre mot de passe"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span className="errorLabel">{passwordError}</span>
                        </div>
                        <div className="input-remember">
                            <input
                                type="checkbox"
                                id="remember-me"
                            />
                            <label htmlFor="remember-me">Se souvenir de moi</label>
                        </div>
                        <input type="button" className="login_button" onClick={onButtonClick} value={'Connection'} placeholder="Connection"/>
                    </form>
                </section>
            </header>
            <Footer/>
        </div>
    )
}

export default Login;