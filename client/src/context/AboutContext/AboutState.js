import React, { useContext, useState } from 'react'
import AlertContext from '../AlertContext/AlertContext';
import AboutContext from './AboutContext';

const AboutState = (props) => {

    const alertContext = useContext(AlertContext);
    const { handleAlert } = alertContext;

    const url = 'https://codechefsrm.herokuapp.com'
    const dataAbt = [{
        para1: '',
        para2: '',
        para3: ''
    }]
    const [about, setAbout] = useState(dataAbt);

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

    const getAbout = async () => {

        meRequest();

        const request = await fetch(`${url}/api/about-us`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        const response = await request.json();
        console.log(response);
        setAbout(response);
        console.log('updated about');
    }

    const editAboutText = async (para1, para2, para3) => {
        meRequest();

        const request = await fetch(`${url}/api/admin/about-us`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('ccscadminaccesstokenadmin')
            },
            body: JSON.stringify({
                "about_us": {
                    "para1": para1,
                    "para2": para2,
                    "para3": para3
                }
            })
        })

        const response = await request.json();
        console.log(response);
        if (response.success) {
            setAbout([{ para1, para2, para3 }]);
            handleAlert("About updated successfully", "success");
        }
    }


    return (
        <AboutContext.Provider value={{ about, getAbout, editAboutText }}>
            {props.children}
        </AboutContext.Provider>
    )
}

export default AboutState
