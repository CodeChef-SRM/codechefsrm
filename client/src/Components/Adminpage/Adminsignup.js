import React, { useContext, useState } from 'react'
import './Adminpage.css'
import Logo from '../../Assets/BlueWithBrackets.png';
import { Link, useNavigate } from 'react-router-dom';
import AlertContext from '../../context/AlertContext/AlertContext';

const Adminsignup = () => {

    const url = 'https://4db7-103-121-204-224.ngrok.io'

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [web_hook, setWeb_hook] = useState('');

    const alertContext = useContext(AlertContext);
    const { handleAlert } = alertContext;

    const history = useNavigate();

    const handleSubmitSignUp = async (e) => {
        e.preventDefault();
        const response = await fetch(`${url}/api/admin/register`, {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify({ name, email, password, web_hook })
        })
        const json = await response.json()
        console.log(json);
        if (json.error) {
            handleAlert("Invalid Credentials !!", "danger");
        } else {
            handleAlert("User Created Successfully", "success");
            history("/admin");
        }

    }

    return (
        <div className="admin__page__main flex__center">
            <div className="admin__page__main__block flex__center flex__flow__down">
                <img src={Logo} alt='ccsc__logo' width="70"></img>
                <h2>Admin Page Sign Up</h2>
                <form className="style__form flex__center flex__flow__down" onSubmit={(e) => handleSubmitSignUp(e)}>
                    <input type='text' className='form__input' placeholder='Enter your Name' value={name} onChange={(e) => setName(e.target.value)}></input>
                    <input type='email' className='form__input' placeholder='Enter your E-mail' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <input type='password' className='form__input' placeholder='Enter your Password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    <input type='text' className='form__input' placeholder='Enter the Token' value={web_hook} onChange={(e) => setWeb_hook(e.target.value)}></input>
                    <button type='submit' className="form__submit__btn">Sign Up</button>
                </form>
                <p>Have a Account - <Link to="/admin">Sign In</Link></p>
            </div>
        </div>
    )
}

export default Adminsignup
