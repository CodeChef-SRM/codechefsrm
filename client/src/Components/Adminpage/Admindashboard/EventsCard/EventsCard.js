import React from 'react'
import { useState } from 'react';
import './EventsCard.css'

const EventsCard = ({ event }) => {
    const [name, setName] = useState(event.name);
    const [eventPosterLink, setEventPosterLink] = useState(event.poster);
    const [info, setInfo] = useState(event.info);
    const [startDate, setStartDate] = useState(event.startDate);
    const [startTime, setStartTime] = useState(event.startTime);
    const [endDate, setEndDate] = useState(event.endDate);
    const [endTime, setEndTime] = useState(event.endTime);
    const [resgisterLink, setRegisterLink] = useState(event.registerLink);
    const [popup, setPopup] = useState(false);

    const handleDelete = (id) => {

    }

    return (
        <div className="events__card__main flex__center" style={{ background: `url(${eventPosterLink})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
            <h2>{name}</h2>
            <div className="event__card__footer flex__center flex__flow__down">
                <h2>{name}</h2>
                <p>{info}</p>
                <p className="date__event">{startDate} &#8226; {startTime}</p>
                <p className="date__event">{endDate} &#8226; {endTime}</p>
                <a href={resgisterLink}>
                    <button className="register__button">Register</button>
                </a>
                <div className="event__modify__section flex__center">
                    <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 32 32" viewBox="0 0 32 32" fill='#fff' width="20px" height="20px" onClick={() => setPopup(true)}><path d="M27.65002,0.94c-0.28003-0.28003-0.67004-0.44-1.06-0.44c-0.40002,0-0.78003,0.15997-1.06,0.44L14.06,12.39996C13.79999,12.65997,13.65002,13.01001,13.63,13.38l-0.20001,3.60999c-0.02002,0.41998,0.14001,0.83997,0.44,1.14001c0.28003,0.27997,0.66003,0.44,1.06,0.44h0.08002L18.62,18.37c0.35999-0.02002,0.71002-0.17999,0.97003-0.44L31.06,6.47998C31.34003,6.19,31.5,5.81,31.5,5.41998c0-0.40002-0.15997-0.77997-0.44-1.07001L27.65002,0.94z" /><path d="M5.56445,31.5h16.63477c2.79297,0,5.06445-2.27197,5.06445-5.06445V16.18115c0-0.82861-0.67188-1.5-1.5-1.5s-1.5,0.67139-1.5,1.5v10.25439c0,1.13818-0.92578,2.06445-2.06445,2.06445H5.56445C4.42578,28.5,3.5,27.57373,3.5,26.43555V9.80078c0-1.13818,0.92578-2.06445,2.06445-2.06445h10.25488c0.82813,0,1.5-0.67139,1.5-1.5s-0.67188-1.5-1.5-1.5H5.56445C2.77148,4.73633,0.5,7.0083,0.5,9.80078v16.63477C0.5,29.22803,2.77148,31.5,5.56445,31.5z" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#fff" viewBox="0 0 24 24" onClick={() => handleDelete()}><path fill="#fff" d="M15 3C15.5523 3 16 3.44772 16 4L18 4C18.5523 4 19 4.44772 19 5C19 5.55229 18.5523 6 18 6L6 6C5.44772 6 5 5.55228 5 5C5 4.44772 5.44772 4 6 4L8 4C8 3.44772 8.44772 3 9 3H15Z" /><path fill="#fff" fillRule="evenodd" d="M6 7H18V19C18 20.1046 17.1046 21 16 21H8C6.89543 21 6 20.1046 6 19V7ZM9.5 9C9.22386 9 9 9.22386 9 9.5V18.5C9 18.7761 9.22386 19 9.5 19C9.77614 19 10 18.7761 10 18.5V9.5C10 9.22386 9.77614 9 9.5 9ZM14.5 9C14.2239 9 14 9.22386 14 9.5V18.5C14 18.7761 14.2239 19 14.5 19C14.7761 19 15 18.7761 15 18.5V9.5C15 9.22386 14.7761 9 14.5 9Z" clipRule="evenodd" /></svg>
                </div>
            </div>
            {
                (popup) ?
                    <EventEditPopUp name={name} eventPosterLink={eventPosterLink} info={info} startDate={startDate} startTime={startTime} endDate={endDate} endTime={endTime} resgisterLink={resgisterLink} setName={setName} setEventPosterLink={setEventPosterLink} setInfo={setInfo} setStartDate={setStartDate} setStartTime={setStartTime} setEndDate={setEndDate} setEndTime={setEndTime} setRegisterLink={setRegisterLink} setPopup={setPopup} /> : ''
            }
        </div>
    )
}

const EventEditPopUp = ({ name, eventPosterLink, info, startDate, startTime, endDate, endTime, resgisterLink, setName, setEventPosterLink, setInfo, setStartDate, setStartTime, setEndDate, setEndTime, setRegisterLink, setPopup }) => {
    const [inputName, setInputName] = useState(name);
    const [inputPosterLink, setInputPosterLink] = useState(eventPosterLink);
    const [inputInfo, setInputInfo] = useState(info);
    const [inputStartDate, setInputStartDate] = useState(startDate);
    const [inputStartTime, setInputStartTime] = useState(startTime);
    const [inputEndDate, setInputEndDate] = useState(endDate);
    const [inputEndTime, setInputEndTime] = useState(endTime);
    const [inputRegisterLink, setInputRegisterLink] = useState(resgisterLink);

    const handleSubmit = (e) => {
        e.preventDefault();
        setName(inputName);
        setEventPosterLink(inputPosterLink);
        setInfo(inputInfo);
        setStartDate(inputStartDate);
        setStartTime(inputStartTime);
        setEndDate(inputEndDate);
        setEndTime(inputEndTime);
        setRegisterLink(inputRegisterLink);
        setPopup(false);
    }

    return (
        <div className="edit__event__popup flex__center">
            <form className="event__edit__form" onSubmit={(e) => handleSubmit(e)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25px" height="25px" className="close__button"><g data-name="Layer 2" fill='#000' onClick={() => setPopup(false)}><g data-name="plus"><rect width="24" height="24" opacity="0" transform="rotate(180 12 12)" /><path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z" /></g></g></svg>
                <h2>Edit Event - {name}</h2>
                <br></br>
                <p>Event Name</p>
                <input type='text' value={inputName} onChange={(e) => setInputName(e.target.value)} placeholder="Enter the Event Name" className='form__input'></input>
                <p>Event Poster Link</p>
                <input type='text' value={inputPosterLink} onChange={(e) => setInputPosterLink(e.target.value)} placeholder="Enter the Event Poster link" className='form__input'></input>
                <p>Event Info</p>
                <textarea type='text' value={inputInfo} onChange={(e) => setInputInfo(e.target.value)} placeholder="Enter the Event Info" className='form__input'></textarea>
                <p>Event Start Date</p>
                <input type='text' value={inputStartDate} onChange={(e) => setInputStartDate(e.target.value)} placeholder="Enter the Event Start Date (dd/mm/yyyy)" className='form__input'></input>
                <p>Event Start Time</p>
                <input type='text' value={inputStartTime} onChange={(e) => setInputStartTime(e.target.value)} placeholder="Enter the Event Start Time (hh:mm AM/PM)" className='form__input'></input>
                <p>Event End Date</p>
                <input type='text' value={inputEndDate} onChange={(e) => setInputEndDate(e.target.value)} placeholder="Enter the Event End Date (dd/mm/yyyy)" className='form__input'></input>
                <p>Event End Time</p>
                <input type='text' value={inputEndTime} onChange={(e) => setInputEndTime(e.target.value)} placeholder="Enter the Event End Time (hh:mm AM/PM)" className='form__input'></input>
                <p>Event Registration Link</p>
                <input type='text' value={inputRegisterLink} onChange={(e) => setInputRegisterLink(e.target.value)} placeholder="Enter the Event Registration Link" className='form__input'></input>
                <button type='submit' className='register__button' style={{ filter: 'invert(1)' }}>Save Changes</button>
            </form>
        </div>
    )
}

export default EventsCard
