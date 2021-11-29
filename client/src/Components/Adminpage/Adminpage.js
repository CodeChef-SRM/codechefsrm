import React, { useContext } from 'react'
import './Adminpage.css'
import Logo from '../../Assets/BlueWithBrackets.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import AlertContext from '../../context/AlertContext/AlertContext';


const Adminpage = () => {

    const url = 'https://4db7-103-121-204-224.ngrok.io'

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const alertContext = useContext(AlertContext);
    const { handleAlert } = alertContext;

    const history = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
            handleAlert('Empty Credentials !!', 'danger');
            return;
        }
        const response = await fetch(`${url}/api/admin/login`, {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        const json = await response.json()
        console.log(json);
        if (json.access_token != null) {
            localStorage.setItem('ccscadminaccesstokenadmin', json.access_token)
            localStorage.setItem('ccscadminaccesstokenrefresh', json.refresh_token)
            history("/adminccsc")
            handleAlert('Login Successful !!', 'success');
        } else {
            console.log('Wrong credentials');
            handleAlert('Wrong credentials :)', 'danger');
        }
    }

    return (
        <div className="admin__page__main flex__center">
            <div className="admin__page__main__block flex__center flex__flow__down">
                <img src={Logo} alt='ccsc__logo' width="70"></img>
                <h2>Admin Page Login</h2>
                <form className="style__form flex__center flex__flow__down" onSubmit={(e) => handleSubmit(e)}>
                    <input type='email' className='form__input' placeholder='Enter your E-mail' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <input type='password' className='form__input' placeholder='Enter your Password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    <button type='submit' className="form__submit__btn">Log In</button>
                </form>
                <p>New User - <Link to="/signup">Sign Up</Link></p>
            </div>
        </div>
    )
}

export default Adminpage
