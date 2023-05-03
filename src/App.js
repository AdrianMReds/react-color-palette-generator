import "./App.css";
import React from "react";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Generator from "./Components/Pages/Generator";
import Saved from "./Components/Pages/Saved";
import About from "./Components/Pages/About";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <div className="pages" style={{ height: "90vh" }}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/generator" element={<Generator />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
