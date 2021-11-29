import React, { useState } from 'react'
import AlertContext from "./AlertContext";


const AlertState = (props) => {

    const [alert, setAlert] = useState(false);
    const [message, setMessage] = useState('')
    const [type, setType] = useState('')

    const handleAlert = (message, type) => {
        setAlert(true);
        setMessage(message)
        setType(type)
        setTimeout(() => {
            setAlert(false)
            setMessage('')
            setType('')
        }, 2000)
    }

    return (
        <AlertContext.Provider value={{ alert, handleAlert, message, type }}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState
