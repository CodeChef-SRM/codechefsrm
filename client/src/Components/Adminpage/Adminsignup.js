import React from 'react'
import './Adminpage.css'
import Logo from '../../Assets/BlueWithBrackets.png';
import { Link } from 'react-router-dom';

const Adminsignup = () => {

    const handleSubmitSignUp = (e) => {
        e.preventDefault();
    }

    return (
        <div className="admin__page__main flex__center">
            <div className="admin__page__main__block flex__center flex__flow__down">
                <img src={Logo} alt='ccsc__logo' width="70"></img>
                <h2>Admin Page Sign Up</h2>
                <form className="style__form flex__center flex__flow__down" onSubmit={(e) => handleSubmitSignUp(e)}>
                    <input type='text' className='form__input' placeholder='Enter your Name'></input>
                    <input type='email' className='form__input' placeholder='Enter your E-mail'></input>
                    <input type='password' className='form__input' placeholder='Enter your Password'></input>
                    <input type='text' className='form__input' placeholder='Enter the Token'></input>
                    <button type='submit' className="form__submit__btn">Sign Up</button>
                </form>
                <p>Have a Account - <Link to="/admin">Sign In</Link></p>
            </div>
        </div>
    )
}

export default Adminsignup
