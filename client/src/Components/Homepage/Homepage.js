import React from 'react'
import Navbar from '../Navbar/Navbar'
import './Homepage.css'

const Homepage = () => {
    return (
        <div className="home__main">
            <Navbar />
            <Hero />
        </div>
    )
}

const Hero = () => {
    return (
        <div className="home__main__hero flex__center">
            <div className="hero__main__block flex__center flex__flow__down">
                <h1>CodeChef SRM KTR Chapter</h1>
                <p>Learn and Teach</p>
            </div>
            <svg width="46" height="26" viewBox="0 0 46 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="down__arrow">
                <path d="M43 3L23 23L3 3" stroke="white" stroke-width="5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </div>
    )
}

export default Homepage
