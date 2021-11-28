import React from 'react'
import { useState } from 'react/cjs/react.development'
import TeamMemberContext from './TeamMemberContext'

const TeamMemberState = (props) => {

    const [team, setTeam] = useState([])


    const TeamData = [
        {
            id: "1010323481",
            name: "Mukesh",
            image: "https://www.researchgate.net/profile/Tahir-Turk/publication/305402203/figure/fig1/AS:613946650288169@1523387696615/mages-from-the-Mukesh-Television-announcement-outdoor-and-print-materials-The-public_Q640.jpg",
            designation: "Corporate",
            tagline: "mera naam mukesh h",
            linkedIn: "http://www.google.co.in",
            github: "https://www.github.com"
        },
        {
            id: "1010323482",
            name: "Zomato wale bhaiya",
            image: "https://indianmemetemplates.com/wp-content/uploads/happy-zomato-delivery-guy-meme-template.jpg",
            designation: "Corporate",
            tagline: "apna sab shi h",
            linkedIn: "http://www.google.co.in",
            github: "https://www.github.com"
        },
        {
            id: "1010323483",
            name: "Hindustani bhau",
            image: "https://i2.wp.com/dignitaryunboxed.com/wp-content/uploads/2021/05/Hindustani-Bhau-Pictures.jpg?resize=708%2C809&ssl=1",
            designation: "Technical",
            tagline: "Nikal phli fursat me",
            linkedIn: "http://www.google.co.in",
            github: "https://www.github.com"
        }
    ]

    const getTeam = () => {
        setTeam(TeamData);
    }

    const addTeamMember = (name, image, designation, tagline, linkedIn, github) => {
        const Team_json = {
            name: name,
            image: image,
            designation: designation,
            tagline: tagline,
            linkedIn: linkedIn,
            github: github
        }
        setTeam(TeamData.concat(Team_json))
    }

    const deleteTeamMember = (id) => {
        let newTeam = team.filter((t) => { return t.id !== id });
        setTeam(newTeam);
    }

    const editTeamMember = (id, name, image, designation, tagline, linkedIn, github) => {

    }

    return (
        <TeamMemberContext.Provider value={{ team, getTeam, addTeamMember, deleteTeamMember, editTeamMember }}>
            {props.children}
        </TeamMemberContext.Provider>
    )
}

export default TeamMemberState
