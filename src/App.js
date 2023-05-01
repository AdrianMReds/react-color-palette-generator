import "./App.css";
import React from "react";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Generator from "./Components/Pages/Generator";
import Saved from "./Components/Pages/Saved";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/generator" element={<Generator />} />
            <Route path="/saved" element={<Saved />} />
          </Routes>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
