import React, { useEffect, useState } from 'react'
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

    const url = 'https://codechefsrm.herokuapp.com'

    const [about, setAbout] = useState([{ para1: '', para2: '', para3: '' }]);

    const aboutData = async () => {
        const response = await fetch(`${url}/api/about-us`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            }
        })
        const json = await response.json();
        console.log(json);
        setAbout(json);
    }

    useEffect(() => {
        aboutData();
    }, [])

    return (
        <div className="main__abt__div">
            <div className='flex__center abt__section flex__flow__down'>
                <div className='flex__center abt__section flex__flow__down'>
                    <h1>Let us introduce ourselves</h1>
                    <div className='underline'></div>
                    <p className='about__top__right'>{about[0].para1}</p>
                </div>
                <div className='about__div__middle flex__center'>
                    <div className='left__div__middle'>
                        <img src={Abt} alt='abt'></img>
                    </div>
                    <div className='right__div__middle'>
                        <h1>Why we do ?</h1>
                        <h1>What we do ?</h1>
                        <p>
                            {about[0].para2}
                        </p>
                    </div>
                </div>
                <br></br>
                <div className='flex__center abt__section flex__flow__down'>
                    <h1>What we believe in:</h1>
                    <h1>Our Motto</h1>
                    <div className='underline'></div>
                    <p className='about__top__right'>{about[0].para3}</p>
                </div>
            </div>
        </div>
    )
}

export default Aboutpage
