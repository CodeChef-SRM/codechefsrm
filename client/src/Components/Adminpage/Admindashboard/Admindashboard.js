import React, { useContext, useEffect } from 'react'
import { Link as NavLink } from 'react-scroll';
import { useState } from 'react/cjs/react.development';
import CCSCLogo from '../../../Assets/BlueWithBrackets.png'
import EventsContext from '../../../context/EventsContext/EventsContext';
import TeamMemberContext from '../../../context/TeamMemberContext/TeamMemberContext';

import './Admindashboard.css'
import EventsCard from './EventsCard/EventsCard';
import TeamCard from './TeamCard/TeamCard';

const Admindashboard = () => {
    const EventContext = useContext(EventsContext);
    const { events, getEvents, addEvent } = EventContext;

    const TeamContext = useContext(TeamMemberContext);
    const { team, getTeam, addTeamMember } = TeamContext;

    useEffect(() => {
        getEvents();
        getTeam();
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <AdminNavbar />
            <EventsSection events={events} addEvent={addEvent} />
            <TeamSection team={team} addTeamMember={addTeamMember} />
        </>
    )
}


const AdminNavbar = () => {
    return (
        <div className="admin__nav__main flex__center flex__space__between">
            <div className="flex__center">
                <img src={CCSCLogo} alt="ccsc__logo" width="70"></img>
                <NavLink to="events" smooth={true} className="link">
                    EVENTS
                </NavLink>
                <NavLink to="about" smooth={true} className="link">
                    TEAM
                </NavLink>
            </div>
            <div className="flex__center">
                <p>Welcome <b>UserName</b></p>
                <button className="prim__button">Log Out</button>
            </div>
        </div>
    )
}

const EventsSection = ({ events, addEvent }) => {
    const [addEventModal, setAddEventModal] = useState(false);
    return (
        <div className="events__section__main" id="events">
            <div className="events__heading flex__center flex__space__between">
                <h2>Events</h2>
                <button className="prim__button flex__center flex__space__between" onClick={() => setAddEventModal(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px" fill='#fff' style={{ marginRight: '10px' }} className='add__svg'><g data-name="Layer 2"><g data-name="plus"><rect width="24" height="24" opacity="0" transform="rotate(180 12 12)" /><path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z" /></g></g></svg>
                    Add Event
                </button>
            </div>
            <AddEventModal addEventModal={addEventModal} setAddEventModal={setAddEventModal} addEvent={addEvent} />
            <div className="events__section">
                {
                    events.map((event) => {
                        return <EventsCard key={event.id} event={event} />
                    })
                }
            </div>
        </div>
    )
}

const AddEventModal = ({ addEventModal, setAddEventModal, addEvent }) => {

    const [name, setName] = useState('');
    const [poster, setPoster] = useState('');
    const [info, setInfo] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [register, setRegister] = useState('');


    const HandleSubmit = (e) => {
        e.preventDefault();
        addEvent(name, poster, info, startDate, startTime, endDate, endTime, register)
        setAddEventModal(false);
        setName('')
        setPoster('')
        setInfo('')
        setStartDate('')
        setStartTime('')
        setEndDate('')
        setEndTime('')
        setRegister('')
    }

    return (
        <div className={(addEventModal) ? "add__event__modal translated" : "add__event__modal"}>
            <h1>Add Event</h1>
            <form className="flex__center flex__flow__down" onSubmit={(e) => HandleSubmit(e)}>
                <input type='text' className='form__input' placeholder='Enter Event Name' value={name} onChange={(e) => setName(e.target.value)}></input>
                <input type='text' className='form__input' placeholder='Enter Event Poster Image Link' value={poster} onChange={(e) => setPoster(e.target.value)}></input>
                <textarea className="form__input" placeholder="Enter the info" value={info} onChange={(e) => setInfo(e.target.value)}></textarea>
                <br></br>
                <div className="flex__center flex__flow__down flex__left">
                    <p>Start Date</p>
                    <input type='text' className='form__input' placeholder='Enter Event Start Date - (dd/mm/yyyy)' value={startDate} onChange={(e) => setStartDate(e.target.value)}></input>
                    <p>Start Time</p>
                    <input type='text' className='form__input' placeholder='Enter Event Start Time - (hh:mm AM/PM)' value={startTime} onChange={(e) => setStartTime(e.target.value)}></input>
                </div>
                <br></br>
                <div className="flex__center flex__flow__down flex__left">
                    <p>End Date</p>
                    <input type='text' className='form__input' placeholder='Enter Event End Date - (dd/mm/yyyy)' value={endDate} onChange={(e) => setEndDate(e.target.value)}></input>
                    <p>End Time</p>
                    <input type='text' className='form__input' placeholder='Enter Event End Time - (hh:mm AM/PM)' value={endTime} onChange={(e) => setEndTime(e.target.value)}></input>
                </div>
                <input type='text' className='form__input' placeholder='Enter Event Registration Link' value={register} onChange={(e) => setRegister(e.target.value)}></input>
                <br></br>
                <button className="prim__button" type='submit'>Submit</button>
            </form>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25px" height="25px" className="close__button" onClick={() => setAddEventModal(false)} fill='#000'><g data-name="Layer 2"><g data-name="plus"><rect width="24" height="24" opacity="0" transform="rotate(180 12 12)" /><path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z" /></g></g></svg>
        </div>
    )
}

const TeamSection = ({ team, addTeamMember }) => {
    const [addMemberModal, setAddMemberModal] = useState(false);
    return (
        <div className="events__section__main" id="events">
            <div className="events__heading flex__center flex__space__between">
                <h2>Team</h2>
                <button className="prim__button flex__center flex__space__between" onClick={() => setAddMemberModal(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px" fill='#fff' style={{ marginRight: '10px' }} className='add__svg'><g data-name="Layer 2"><g data-name="plus"><rect width="24" height="24" opacity="0" transform="rotate(180 12 12)" /><path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z" /></g></g></svg>
                    Add Member
                </button>
            </div>
            <div className="events__section">
                {
                    team.map((member) => {
                        return <TeamCard member={member} />
                    })
                }
            </div>
            <AddTeamMemberModal addTeamMember={addTeamMember} addMemberModal={addMemberModal} setAddMemberModal={setAddMemberModal} />
        </div>
    )
}

const AddTeamMemberModal = ({ addTeamMember, addMemberModal, setAddMemberModal }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [designation, setDesignation] = useState('');
    const [tagline, setTagline] = useState('');
    const [linkedIn, setLinkedIn] = useState('');
    const [github, setGithub] = useState('');
    const HandleSubmit = (e) => {
        e.preventDefault();
        addTeamMember(name, image, designation, tagline, linkedIn, github);
        setName('');
        setImage('');
        setDesignation('');
        setTagline('');
        setLinkedIn('');
        setGithub('');
    }

    return (
        <div className={(addMemberModal) ? "add__event__modal translated" : "add__event__modal"}>
            <h1>Add Member</h1>
            <form className="flex__center flex__flow__down" onSubmit={(e) => HandleSubmit(e)}>
                <input type='text' className='form__input' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}></input>
                <input type='text' className='form__input' placeholder='Enter Image Link' value={image} onChange={(e) => setImage(e.target.value)}></input>
                <input type='text' className='form__input' placeholder='Enter Designation' value={designation} onChange={(e) => setDesignation(e.target.value)}></input>
                <input type='text' className='form__input' placeholder='Enter Tagline' value={tagline} onChange={(e) => setTagline(e.target.value)}></input>
                <input type='text' className='form__input' placeholder='Enter LinkedIn Profile Link' value={linkedIn} onChange={(e) => setLinkedIn(e.target.value)}></input>
                <input type='text' className='form__input' placeholder='Enter Github Profile Link' value={github} onChange={(e) => setGithub(e.target.value)}></input>
                <button className="prim__button" type='submit'>Submit</button>
            </form>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25px" height="25px" className="close__button" onClick={() => setAddMemberModal(false)} fill='#000'><g data-name="Layer 2"><g data-name="plus"><rect width="24" height="24" opacity="0" transform="rotate(180 12 12)" /><path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z" /></g></g></svg>
        </div>
    )
}

export default Admindashboard
