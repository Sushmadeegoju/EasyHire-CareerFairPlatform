import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Login from "./login";
import "../css/App.css";
import Blog from "./Blog";
import Fairs from "./Fairs";
import Register from "./Register";
import RecruiterLanding from "./recruiterLanding";
import JobseekerLanding from "./jobseekerLanding";

function App() {
  return (
    <Router>
      <header>
        <div style={{ color: "white", fontWeight: "bold" }}>EasyHire</div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li style={{ marginRight: "40px" }}>
              <Link to="/fairs">Fairs</Link>
            </li>
            <li
              style={{ marginRight: "5px", color: "white", fontWeight: "bold" }}
            >
              <Link to="/login"> Login |</Link>
            </li>
            <li style={{ fontWeight: "bold" }}>
              <Link to="/register"> Register</Link>
            </li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/fairs" element={<Fairs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobSeekers" element={<RecruiterLanding />} />
        <Route path="/recruiters" element={<JobseekerLanding />} />
      </Routes>

      <footer>
        <section>
          <p> &copy; 2023 EasyHire, Inc</p>
        </section>

        <section>
          <p> About | Directions | Contact Us</p>
        </section>

        <section>
          <p> Privacy Policy </p>
        </section>
      </footer>
    </Router>
  );
}

export default App;
