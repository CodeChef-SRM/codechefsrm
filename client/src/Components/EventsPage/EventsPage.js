import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import './EventsPage.css';

const EventsPage = () => {
    return (
        <div className="events__main flex__center flex__flow__down">
            <Navbar />
            <EventsSection />
            <Footer />
        </div>
    )
}

const EventsSection = () => {
    const [events, setEvents] = useState([]);
    const [page, setPage] = useState(1);
    const [loader, setLoader] = useState(false);

    const url = 'https://codechefsrm.herokuapp.com'

    const getEventsData = async (id) => {
        setLoader(true);
        const response = await fetch(`${url}/api/events?page=${id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        const json = await response.json();
        console.log(json);
        setLoader(false);
        setEvents(json);
    }

    useEffect(() => {
        getEventsData(page);
    }, [page])

    return (
        <div className="events__section__main flex__center">
            <h1>Events</h1>
            <div className="underline"></div>
            <div className="events__section__card">
                {
                    (loader) ? <div className='flex__center'>
                        <div className='loader'>
                        </div>
                    </div> :
                        (events.length !== 0) ?
                            events.map((event) => {
                                return (
                                    <div className='event__card' key={event.event_name} style={{ background: `url(${event.image_url})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
                                        <h1 className='event__card__heading'>{event.event_name}</h1>
                                        <div className='event__card__overlay flex__center flex__flow__down'>
                                            <div>
                                                <h2>{event.event_name}</h2>
                                                <p>{event.event_info}</p>
                                            </div>
                                            <div className='date__section'>
                                                <p>{event.event_start_date}</p>
                                                <p>{event.event_end_date}</p>
                                                <a href={event.registration_url}>
                                                    <button>Register</button>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : <p>No Events here !!</p>
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
                <p>{page}</p>
                <button className="flex__center" onClick={() => setPage(page + 1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" fill="#fff" style={{ transform: 'rotate(180deg)' }}><path d="M11.29,12l3.54-3.54a1,1,0,0,0,0-1.41,1,1,0,0,0-1.42,0L9.17,11.29a1,1,0,0,0,0,1.42L13.41,17a1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41Z"></path></svg>
                </button>
            </div>
        </div>
    )
}

export default EventsPage
