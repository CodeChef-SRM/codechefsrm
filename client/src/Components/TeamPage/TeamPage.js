import React from 'react'
import { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import './TeamPage.css';


const TeamPage = () => {
    return (
        <div className='team__main'>
            <Navbar />
            <TeamHeader />
            <TeamSection />
        </div>
    )
}

const TeamHeader = () => {
    return (
        <div className="team__header">
            <h1>Meet our Team..</h1>
            <div className='underline'></div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mollis urna sed nibh luctus varius. Etiam ligula libero, vestibulum in risus ut, lacinia consectetur metus. Aliquam laoreet urna sapien, sit amet varius magna rhoncus in. Sed laoreet, nisi a commodo condimentum, risus turpis porttitor ex, tempus finibus velit ligula et nisi. Praesent dapibus ultrices quam sit amet accumsan. Vestibulum quis varius leo. Fusce laoreet mauris lacus, in volutpat leo luctus vitae. Aliquam erat volutpat.

                Morbi condimentum urna vitae nisi aliquam, sed pretium dui accumsan. Aenean ac dolor sit amet lorem efficitur finibus ut sed risus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam erat volutpat. Nulla condimentum velit enim, eu eleifend risus dictum id. Sed a est quis turpis ultrices sagittis.</p>
        </div>
    )
}

const TeamSection = () => {

    const [members, setMembers] = useState([]);
    const [page, setPage] = useState(1);
    const [loader, setLoader] = useState(false);
    const url = 'https://codechefsrm.herokuapp.com'

    const getMembersData = async (id) => {
        setLoader(true);
        const response = await fetch(`${url}/api/team?page=${id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        const json = await response.json();
        console.log(json);
        setLoader(false);
        setMembers(json);
    }

    useEffect(() => {
        getMembersData(page);
    }, [page])

    return (
        <>
            <div className='team__section'>
                {(loader) ? <div className='flex__center'>
                    <div className='loader'>
                    </div>
                </div> :
                    (members.length !== 0) ?
                        members.map((member) => {
                            return (
                                <div className='team__member__card flex__center flex__flow__down'>
                                    <img src={member.image_url} className='member__image' alt='alternate' width="300" height="300"></img>
                                    <h2>{member.name}</h2>
                                    <p>{member.tag_line}</p>
                                    <h4>{member.designation}</h4>
                                    <div className='social__section'>
                                        <a href={member.social.Github} target='_blank' rel="noreferrer">
                                            <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" width='25px' height='25px' fill='#fff'><path d="M12,2.2467A10.00042,10.00042,0,0,0,8.83752,21.73419c.5.08752.6875-.21247.6875-.475,0-.23749-.01251-1.025-.01251-1.86249C7,19.85919,6.35,18.78423,6.15,18.22173A3.636,3.636,0,0,0,5.125,16.8092c-.35-.1875-.85-.65-.01251-.66248A2.00117,2.00117,0,0,1,6.65,17.17169a2.13742,2.13742,0,0,0,2.91248.825A2.10376,2.10376,0,0,1,10.2,16.65923c-2.225-.25-4.55-1.11254-4.55-4.9375a3.89187,3.89187,0,0,1,1.025-2.6875,3.59373,3.59373,0,0,1,.1-2.65s.83747-.26251,2.75,1.025a9.42747,9.42747,0,0,1,5,0c1.91248-1.3,2.75-1.025,2.75-1.025a3.59323,3.59323,0,0,1,.1,2.65,3.869,3.869,0,0,1,1.025,2.6875c0,3.83747-2.33752,4.6875-4.5625,4.9375a2.36814,2.36814,0,0,1,.675,1.85c0,1.33752-.01251,2.41248-.01251,2.75,0,.26251.1875.575.6875.475A10.0053,10.0053,0,0,0,12,2.2467Z" /></svg>
                                        </a>
                                        <a href={member.social.linkedIn} target='_blank' rel="noreferrer">
                                            <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" width='25px' height='25px' fill='#fff'><path d="M20.47,2H3.53A1.45,1.45,0,0,0,2.06,3.43V20.57A1.45,1.45,0,0,0,3.53,22H20.47a1.45,1.45,0,0,0,1.47-1.43V3.43A1.45,1.45,0,0,0,20.47,2ZM8.09,18.74h-3v-9h3ZM6.59,8.48h0a1.56,1.56,0,1,1,0-3.12,1.57,1.57,0,1,1,0,3.12ZM18.91,18.74h-3V13.91c0-1.21-.43-2-1.52-2A1.65,1.65,0,0,0,12.85,13a2,2,0,0,0-.1.73v5h-3s0-8.18,0-9h3V11A3,3,0,0,1,15.46,9.5c2,0,3.45,1.29,3.45,4.06Z" /></svg>
                                        </a>
                                    </div>
                                </div>
                            )
                        }) : <p style={{ color: '#fff' }}>No Events here !!</p>
                }
            </div>
            <div className="pagination flex__center">
                <button className="flex__center" onClick={() => {
                    if (page - 1 === 0) {
                        console.log('limit_reached');
                    } else {
                        setPage(page - 1);
                    }
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" fill="#fff"><path d="M11.29,12l3.54-3.54a1,1,0,0,0,0-1.41,1,1,0,0,0-1.42,0L9.17,11.29a1,1,0,0,0,0,1.42L13.41,17a1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41Z"></path></svg>
                </button>
                <p style={{ color: '#fff' }}>{page}</p>
                <button className="flex__center" onClick={() => setPage(page + 1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" fill="#fff" style={{ transform: 'rotate(180deg)' }}><path d="M11.29,12l3.54-3.54a1,1,0,0,0,0-1.41,1,1,0,0,0-1.42,0L9.17,11.29a1,1,0,0,0,0,1.42L13.41,17a1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41Z"></path></svg>
                </button>
            </div>
        </>
    )
}

export default TeamPage
