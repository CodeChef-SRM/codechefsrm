import React from 'react'
import { useContext } from 'react';
import AlertContext from '../../context/AlertContext/AlertContext'
import './Alert.css'

const Alert = () => {

    const context = useContext(AlertContext);
    const { alert, message, type } = context;
    return (
        <div className={(alert) ? `${type === "success" ? `alert__main visible success` : `alert__main visible danger`}` : "alert__main"}>
            <h2>{type === "success" ? "Success" : "Alert"}</h2>
            <p>{message}</p>
        </div>
    )
}

export default Alert
