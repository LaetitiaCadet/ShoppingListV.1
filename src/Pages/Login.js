import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../components/Nav"
import Footer from "../components/Footer";
import "../Scss/pages/Login.scss"


const Login = () =>{
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('')
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('')
    const [error, setError] = useState('');
    const [token, setToken] = useState('')

    const navigate = useNavigate()

    const userObject = {
        email: email,
        password: password,
    } 

    const loginUser = async () => {
        try {
            await fetch("http://localhost:5000/login", {
                method: "POST",
                headers:{
                    'Accept': 'application/json',
                    "Content-Type": "application/json",   
                },
                body: JSON.stringify(userObject),
            })
            .then(response => response.json())
            .then(data => {
                const resData = data
                    setToken(sessionStorage.setItem('user', resData.token))
                    if (resData.status === 200){
                        navigate(`/Profil?id=${resData._id}`)
                    }
                    setError(resData.message)
            })
        } catch (response) {
            console.log(response)
        }
    }

    const onButtonClick = () => {
        setEmailError('')
        setPasswordError('')

        if ('' === email){
            setEmailError('Veuillez saisir votre email')  
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
            setEmailError('Veuillez saisir une adresse email valide')
        } else if('' === password){
            setPasswordError('Veuillez saisir votre mot de passe')
        } else if(password.length < 7){
            setPasswordError('Votre mot de passe doit contenir 8 characters minimum')
        } else {
            loginUser() 
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
                        <div className="input-remember">
                            <input
                                type="checkbox"
                                id="remember-me"
                            />
                            <label htmlFor="remember-me">Se souvenir de moi</label>
                        </div>
                        <div className="not-account">
                            <p>Vous n'avez pas de compte ? <Link to="/register">S'inscrire</Link></p>
                            
                        </div>
                        <span className="errorLabel">{error}</span>
                        <input type="button" className="login_button" onClick={onButtonClick} value={'Connection'} placeholder="Connection"/>
                    </form>
                </section>
            </header>
            <Footer/>
        </div>
    )
}

export default Login;