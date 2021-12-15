import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css';
import CCSCLogo from '../../Assets/BlueWithBrackets.png'

const Navbar = () => {
    const [nav, setNav] = useState(false);
    return (
        <div className="nav__main flex__center">
            <div className="nav__links flex__center">
                <Link style={{ textDecoration: "none" }} to="/about" className="nav__link">
                    About
                </Link>
                <Link style={{ textDecoration: "none" }} to="/events" className="nav__link">
                    Events
                </Link>
                <Link to="/">
                    <img src={CCSCLogo} alt="ccsclogo" width="70" className='website__logo'></img>
                </Link>
                <Link style={{ textDecoration: "none" }} to="/team" className="nav__link">
                    Team
                </Link>
                <Link style={{ textDecoration: "none" }} to="/contact" className="nav__link">
                    Contact
                </Link>
                <div className="menu__toggle__mobile">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25px" height="25px" className="burger" fill="#fff" onClick={() => setNav(true)}><g data-name="Layer 2"><g data-name="menu"><rect width="24" height="24" opacity="0" transform="rotate(180 12 12)" /><rect width="18" height="2" x="3" y="11" rx=".95" ry=".95" /><rect width="18" height="2" x="3" y="16" rx=".95" ry=".95" /><rect width="18" height="2" x="3" y="6" rx=".95" ry=".95" /></g></g></svg>
                </div>
            </div>
            <div className={(!nav) ? "navbar__mobile__sidebar" : "navbar__mobile__sidebar translated"}>
                <Link style={{ textDecoration: "none" }} to="/" className="nav__link__m">
                    Home
                </Link>
                <Link style={{ textDecoration: "none" }} to="/about" className="nav__link__m">
                    About
                </Link>
                <Link style={{ textDecoration: "none" }} to="/events" className="nav__link__m">
                    Events
                </Link>
                <Link style={{ textDecoration: "none" }} to="/team" className="nav__link__m">
                    Team
                </Link>
                <Link style={{ textDecoration: "none" }} to="/contact" className="nav__link__m">
                    Contact
                </Link>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25px" height="25px" className="close__button" onClick={() => setNav(false)}><g data-name="Layer 2" fill='#fff'><g data-name="plus"><rect width="24" height="24" opacity="0" transform="rotate(180 12 12)" /><path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z" /></g></g></svg>
            </div>
        </div>
    )
}

export default Navbar
