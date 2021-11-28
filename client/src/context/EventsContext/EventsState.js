import React, { useState } from 'react'
import EventContext from './EventsContext';

const EventsState = (props) => {

    const [events, setEvents] = useState([]);


    const EventsData = [
        {
            id: "101010101",
            name: "Event Name 1",
            poster: "https://images.unsplash.com/photo-1637958652838-665909a07e94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
            info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nisl ante, suscipit sit amet est vitae, congue convallis neque. Cras mollis, odio non ullamcorper luctus, augue eros commodo velit, non consequat eros dolor ac felis. Vestibulum sed mauris eleifend, pellentesque velit a, convallis nisl. Nulla id turpis lacinia, pharetra quam eu, condimentum massa",
            startDate: "10/2/2021",
            startTime: "10:30 AM",
            endDate: "12/2/2021",
            endTime: "11:00 PM",
            registerLink: "http://www.google.co.in/"
        },
        {
            id: "101010102",
            name: "Event Name 2",
            poster: "https://images.unsplash.com/photo-1638005906847-672f9fe8061d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
            info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nisl ante, suscipit sit amet est vitae, congue convallis neque. Cras mollis, odio non ullamcorper luctus, augue eros commodo velit, non consequat eros dolor ac felis. Vestibulum sed mauris eleifend, pellentesque velit a, convallis nisl. Nulla id turpis lacinia, pharetra quam eu, condimentum massa",
            startDate: "15/2/2021",
            startTime: "10:50 AM",
            endDate: "19/2/2021",
            endTime: "11:30 PM",
            registerLink: "http://www.google.co.in/"
        }
    ]

    const getEvents = () => {
        setEvents(EventsData);
    }

    const addEvent = (name, poster, info, startDate, startTime, endDate, endTime, registerLink) => {
        const Event_json = {
            id: "101010103",
            name: name,
            poster: poster,
            info: info,
            startDate: startDate,
            startTime: startTime,
            endDate: endDate,
            endTime: endTime,
            registerLink: registerLink
        }
        setEvents(events.concat(Event_json))
    }

    const deleteEvent = (id) => {
        let newEvents = events.filter((event) => { return event.id !== id });
        setEvents(newEvents);
    }

    const editEvent = (id, name, info, startDate, startTime, endDate, endTime, registerLink) => {

    }

    return (
        <EventContext.Provider value={{ events, addEvent, deleteEvent, editEvent, getEvents }}>
            {props.children}
        </EventContext.Provider>
    )
}

export default EventsState
