import React from 'react'
import Navbar from '../Navbar/Navbar'
import './Aboutpage.css'
import CCSCLogo from '../../Assets/BlueWithBrackets.png'


const Aboutpage = () => {
    return (
        <div className='about__main'>
            <Navbar />
            <AboutSection />
        </div>
    )
}

const AboutSection = () => {
    return (
        <div className="main__abt__div">
            <h1>About Us</h1>
            <div className='underline'></div>
            <div className='flex__center abt__section'>
                <div className='left__abt__div'>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mollis urna sed nibh luctus varius. Etiam ligula libero, vestibulum in risus ut, lacinia consectetur metus. Aliquam laoreet urna sapien, sit amet varius magna rhoncus in. Sed laoreet, nisi a commodo condimentum, risus turpis porttitor ex, tempus finibus velit ligula et nisi. Praesent dapibus ultrices quam sit amet accumsan. Vestibulum quis varius leo. Fusce laoreet mauris lacus, in volutpat leo luctus vitae. Aliquam erat volutpat.

                        Morbi condimentum urna vitae nisi aliquam, sed pretium dui accumsan. Aenean ac dolor sit amet lorem efficitur finibus ut sed risus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam erat volutpat. Nulla condimentum velit enim, eu eleifend risus dictum id. Sed a est quis turpis ultrices sagittis.</p>
                </div>
                <div className='right__abt__div'>
                    <img src={CCSCLogo} alt='ccsc logo'></img>
                </div>
            </div>
        </div>
    )
}

export default Aboutpage
