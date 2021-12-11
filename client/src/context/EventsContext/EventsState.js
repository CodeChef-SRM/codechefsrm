import React, { useState } from 'react'
import { useContext } from 'react';
import AlertContext from '../AlertContext/AlertContext';
import EventContext from './EventsContext';

const EventsState = (props) => {

    const url = 'https://codechefsrm.herokuapp.com'

    const [events, setEvents] = useState([]);

    const alertContext = useContext(AlertContext);
    const { handleAlert } = alertContext;


    const meRequest = async () => {
        const request = await fetch(`${url}/me`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('ccscadminaccesstokenadmin')
            }
        })

        const response = await request.status;
        if (response === 403) {
            const refresh = await fetch(`${url}/api/admin/refresh-token`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('ccscadminaccesstokenrefresh')
                }
            })
            const response_refresh = await refresh.status;
            if (response_refresh === 200) {
                console.log(response_refresh);
                const tokens = await refresh.json();
                localStorage.setItem('ccscadminaccesstokenadmin', tokens.access_token)
                localStorage.setItem('ccscadminaccesstokenrefresh', tokens.refresh_token)
            } else {
                console.log(response_refresh);
                localStorage.setItem('ccscadminaccesstokenadmin', "null")
                localStorage.setItem('ccscadminaccesstokenrefresh', "null")
            }
        }
        console.log(response);
    }

    const getEvents = async (id) => {

        meRequest();

        const response = await fetch(`${url}/api/admin/events?page=${id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('ccscadminaccesstokenadmin')
            }
        })
        const json = await response.json();
        console.log(json);
        setEvents(json);
    }

    const addEvent = async (name, poster, info, startDate, endDate, registerLink) => {

        meRequest();

        const Event_json = {
            name: name,
            poster: poster,
            info: info,
            startDate: startDate,
            endDate: endDate,
            registerLink: registerLink
        }
        setEvents(events.concat(Event_json))

        const response = await fetch(`${url}/api/admin/add-event`, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('ccscadminaccesstokenadmin')
            },
            body: JSON.stringify({
                "event_name": name,
                "event_info": info,
                "event_start_date": startDate,
                "event_end_date": endDate,
                "image_url": poster,
                "registration_url": registerLink
            })
        })
        const json = await response.json();
        console.log(json);
        if (json.success) {
            handleAlert('Event Added Successfully !!', 'success');
        } else {
            handleAlert('Error in Adding Event Please try again!!', 'danger');
        }
    }

    const deleteEvent = async (id) => {

        meRequest();

        const response = await fetch(`${url}/api/admin/delete-event`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('ccscadminaccesstokenadmin')
            },
            body: JSON.stringify({
                "id": id,
            })
        })
        const json = await response.json();
        console.log(json);

        let newEvents = events.filter((event) => { return event._id !== id });
        setEvents(newEvents);
        if (json.success) {
            handleAlert('Event Deleted Successfully !!', 'success');
        } else {
            handleAlert('Error in Deleting Please try again !!', 'danger');
        }
    }
    //https://oauth.net/2/
    const editEvent = async (id, name, info, startDate, endDate, registerLink, poster) => {

        meRequest();

        const response = await fetch(`${url}/api/admin/update-event`, {
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('ccscadminaccesstokenadmin')
            },
            body: JSON.stringify({
                "id": id,
                "event_name": name,
                "event_info": info,
                "event_start_date": startDate,
                "event_end_date": endDate,
                "image_url": poster,
                "registration_url": registerLink
            })
        })
        const json = await response.json();
        if (json.success) {
            handleAlert('Event Edited Successfully !!', 'success');
        } else {
            handleAlert('Error in Editing Please try again !!', 'danger');
        }
    }

    return (
        <EventContext.Provider value={{ events, addEvent, deleteEvent, editEvent, getEvents }}>
            {props.children}
        </EventContext.Provider>
    )
}

export default EventsState
