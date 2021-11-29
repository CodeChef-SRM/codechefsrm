import React from 'react'
import './Adminpage.css'
import Logo from '../../Assets/BlueWithBrackets.png';
import { Link } from 'react-router-dom';

const Adminpage = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="admin__page__main flex__center">
            <div className="admin__page__main__block flex__center flex__flow__down">
                <img src={Logo} alt='ccsc__logo' width="70"></img>
                <h2>Admin Page Login</h2>
                <form className="style__form flex__center flex__flow__down" onSubmit={(e) => handleSubmit(e)}>
                    <input type='email' className='form__input' placeholder='Enter your E-mail'></input>
                    <input type='password' className='form__input' placeholder='Enter your Password'></input>
                    <button type='submit' className="form__submit__btn">Log In</button>
                </form>
                <p>New User - <Link to="/signup">Sign Up</Link></p>
            </div>
        </div>
    )
}

export default Adminpage
