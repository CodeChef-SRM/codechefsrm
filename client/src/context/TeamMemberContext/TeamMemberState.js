import React from 'react'
import { useContext } from 'react'
import { useState } from 'react/cjs/react.development'
import AlertContext from '../AlertContext/AlertContext'
import TeamMemberContext from './TeamMemberContext'

const TeamMemberState = (props) => {

    const url = 'https://codechefsrm.herokuapp.com'

    const [team, setTeam] = useState([])

    const alertcontext = useContext(AlertContext);
    const { handleAlert } = alertcontext;

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


    const getTeam = async (number) => {
        meRequest();
        const request = await fetch(`${url}/api/admin/team?page=${number}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('ccscadminaccesstokenadmin')
            }
        })
        const response = await request.json();
        console.log(response);
        setTeam(response);
    }

    const addTeamMember = async (name, image, designation, tagline, linkedIn, github) => {
        meRequest();
        const Team_json = {
            "name": name,
            "social": {
                "linkedIn": linkedIn,
                "Github": github
            },
            "designation": designation,
            "tag_line": tagline,
            "image_url": image
        }
        setTeam(team.concat(Team_json))
        const response = await fetch(`${url}/api/admin/add-team`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('ccscadminaccesstokenadmin')
            },
            body: JSON.stringify({
                "name": name,
                "social": {
                    "linkedIn": linkedIn,
                    "Github": github
                },
                "designation": designation,
                "tag_line": tagline,
                "image_url": image
            })
        })
        const json = await response.json();
        console.log(json);
        if (json.success) {
            handleAlert('Team Member Added Successfully !!', 'success');
        } else {
            handleAlert('Some Error in Adding Please Add Again !!', 'danger');
        }
    }

    const deleteTeamMember = async (id) => {
        meRequest();
        let newTeam = team.filter((t) => { return t._id !== id });
        setTeam(newTeam);
        const response = await fetch(`${url}/api/admin/delete-team`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('ccscadminaccesstokenadmin')
            },
            body: JSON.stringify({
                "id": id
            })
        })
        const json = await response.json();
        console.log(json);
        if (json.success) {
            handleAlert('Team Member Deleted Successfully !!', 'success');
        } else {
            handleAlert('Error While Deleting. Try Refreshing and do it again !!', 'success');
        }
    }

    const editTeamMember = async (id, name, image, designation, tagline, linkedIn, github) => {
        meRequest();
        console.log(id);
        const response = await fetch(`${url}/api/admin/update-team`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('ccscadminaccesstokenadmin')
            },
            body: JSON.stringify(
                {
                    "id": id,
                    "name": name,
                    "social": {
                        "linkedIn": linkedIn,
                        "Github": github
                    },
                    "designation": designation,
                    "tag_line": tagline,
                    "image_url": image
                }
            )
        })
        const json = await response.json();
        console.log(json);
        if (json.success) {
            handleAlert('Team Member Edited Successfully !!', 'success');
        } else {
            handleAlert('Error While Editing Please try again !!', 'success');
        }
    }

    return (
        <TeamMemberContext.Provider value={{ team, getTeam, addTeamMember, deleteTeamMember, editTeamMember }}>
            {props.children}
        </TeamMemberContext.Provider>
    )
}

export default TeamMemberState
