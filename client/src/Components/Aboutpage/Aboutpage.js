import React from 'react'
import Navbar from '../Navbar/Navbar'
import './Aboutpage.css'
import Abt from '../../Assets/abt.svg';
import Footer from '../Footer/Footer';


const Aboutpage = () => {
    return (
        <div className='about__main'>
            <Navbar />
            <AboutSection />
            <Footer />
        </div>
    )
}

const AboutSection = () => {
    return (
        <div className="main__abt__div">
            <div className='flex__center abt__section flex__flow__down'>
                <div className='flex__center abt__section flex__flow__down'>
                    <h1>Let us introduce ourselves</h1>
                    <div className='underline'></div>
                    <p className='about__top__right'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mollis urna sed nibh luctus varius. Etiam ligula libero, vestibulum in risus ut, lacinia consectetur metus. Aliquam laoreet urna sapien, sit amet varius magna rhoncus in. Sed laoreet, nisi a commodo condimentum, risus turpis porttitor ex, tempus finibus velit ligula et nisi. Praesent dapibus ultrices quam sit amet accumsan. Vestibulum quis varius leo. Fusce laoreet mauris lacus, in volutpat leo luctus vitae. Aliquam erat volutpat.

                        Morbi condimentum urna vitae nisi aliquam, sed pretium dui accumsan. Aenean ac dolor sit amet lorem efficitur finibus ut sed risus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam erat volutpat. Nulla condimentum velit enim, eu eleifend risus dictum id. Sed a est quis turpis ultrices sagittis.</p>
                </div>
                <div className='about__div__middle flex__center'>
                    <div className='left__div__middle'>
                        <img src={Abt} alt='abt'></img>
                    </div>
                    <div className='right__div__middle'>
                        <h1>Why we do ?</h1>
                        <h1>What we do ?</h1>
                        <p>
                            Morbi condimentum urna vitae nisi aliquam, sed pretium dui accumsan. Aenean ac dolor sit amet lorem efficitur finibus ut sed risus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam erat volutpat. Nulla condimentum velit enim, eu eleifend risus dictum id. Sed a est quis turpis ultrices sagittis.
                            Morbi condimentum urna vitae nisi aliquam, sed pretium dui accumsan. Aenean ac dolor sit amet lorem efficitur finibus ut sed risus. Vestibulum ante ipsum primis in faucibus.
                        </p>
                    </div>
                </div>
                <br></br>
                <div className='flex__center abt__section flex__flow__down'>
                    <h1>What we believe in:</h1>
                    <h1>Our Motto</h1>
                    <div className='underline'></div>
                    <p className='about__top__right'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mollis urna sed nibh luctus varius. Etiam ligula libero, vestibulum in risus ut, lacinia consectetur metus. Aliquam laoreet urna sapien, sit amet varius magna rhoncus in. Sed laoreet, nisi a commodo condimentum, risus turpis porttitor ex, tempus finibus velit ligula et nisi. Praesent dapibus ultrices quam sit amet accumsan. Vestibulum quis varius leo. Fusce laoreet mauris lacus, in volutpat leo luctus vitae. Aliquam erat volutpat.

                        Morbi condimentum urna vitae nisi aliquam, sed pretium dui accumsan. Aenean ac dolor sit amet lorem efficitur finibus ut sed risus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam erat volutpat. Nulla condimentum velit enim, eu eleifend risus dictum id. Sed a est quis turpis ultrices sagittis.</p>
                </div>
            </div>
        </div>
    )
}

export default Aboutpage
