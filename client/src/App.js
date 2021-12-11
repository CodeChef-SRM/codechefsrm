import React from "react";
import Homepage from "./Components/Homepage/Homepage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Aboutpage from "./Components/Aboutpage/Aboutpage";
import Adminpage from "./Components/Adminpage/Adminpage";
import Adminsignup from "./Components/Adminpage/Adminsignup";
import Admindashboard from "./Components/Adminpage/Admindashboard/Admindashboard";
import EventsState from "./context/EventsContext/EventsState";
import TeamMemberState from "./context/TeamMemberContext/TeamMemberState";
import Alert from "./Components/Alert/Alert";
import EventsPage from "./Components/EventsPage/EventsPage";


const App = () => {
  return (
    <>
      <TeamMemberState>
        <EventsState>
          {
            <Alert />
          }
          <Router>
            <Routes>
              <Route exact path="/" element={<Homepage />} />
              <Route exact path="/about" element={<Aboutpage />} />
              <Route exact path="/admin" element={< Adminpage />} />
              <Route exact path="/signup" element={< Adminsignup />} />
              <Route exact path="/adminccsc" element={< Admindashboard />} />
              <Route exact path="/events" element={<EventsPage />}></Route>
            </Routes>
          </Router>
        </EventsState>
      </TeamMemberState>
    </>
  );
}

export default App;
