import React from "react";
import Homepage from "./Components/Homepage/Homepage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Aboutpage from "./Components/Aboutpage/Aboutpage";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/about" element={<Aboutpage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
