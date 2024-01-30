import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import Home from "./Home";
import Login from "./login";
import "../css/App.css";
import Blog from "./Blog";
import Fairs from "./Fairs";
import Register from "./Register";
import RecruiterLanding from "./recruiterLanding";
import JobseekerLanding from "./jobseekerLanding";
import EventHostDashboard from './EventHostDashboard';
import ForgotPassword from "./ForgotPassword";
import RecruiterMeetings from "./RecruiterMeetings";
import JobSeekerMeetings from "./JobseekerMeetings";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ITEM_HEIGHT = 48;

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (option) => { 
    setAnchorEl(null);
      switch (option) {
        case 'My Dashboard':
            if(designation == 'jobSeeker')
              navigate('/jobSeekerMeetings'); 
            else if(designation == 'recruiter') 
              navigate('/recruiterMeetings');// Adjust the route as needed
            break;
        case 'View Companies':
          navigate('/companies'); // Adjust the route as needed
          break;
        case 'View Candidates':
          navigate('/jobSeekers'); // Adjust the route as needed
          break;
        case 'Logout':
          handleLogout();
          console.log("Logged out");
          navigate('/login');
          break;
        default:
          break;
      }
  };
  const storedUserEmail = localStorage.getItem('userEmail');
  const [userEmail, setUserEmail] = useState(storedUserEmail || '');
  const storedUserName = localStorage.getItem('userName');
  const [userName, setUserName] = useState(storedUserName || '');
  const storedUserPassword = localStorage.getItem('userPassword');
  const [userPassword, setUserPassword] = useState(storedUserPassword || '');
  const storedUserId= localStorage.getItem('userId');
  const [userId, setUserId] = useState(storedUserId || '');

  const storedLoggedInState = localStorage.getItem('isLoggedIn');
  const [isLoggedIn, setIsLoggedIn] = useState(storedLoggedInState === 'true');
  const storedDesignationState = localStorage.getItem('designation');
  const [designation, setDesignation] = useState(storedDesignationState || '');

  const [options, setOptions] = useState(() => {
    if (designation == 'jobSeeker') {
      return ['My Dashboard', 'View Companies', 'Logout'];
    } else if (designation == 'recruiter') {
      return ['My Dashboard', 'View Candidates', 'Logout'];
    } else {
      return ['Logout'];
    }
  });

  // ... (other state variables)

  useEffect(() => {
    // Fetch the designation and other user details
    if (window.location.pathname === '/') {
      // If it is, set isLoggedIn to false
      setIsLoggedIn(false);
      localStorage.setItem('isLoggedIn', 'false');
    }
  },[]);

  

  useEffect(() => {
    // Update options state when designation changes
    if (designation == 'jobSeeker') {
      setOptions(['My Dashboard', 'View Companies', 'Logout']);
    } else if (designation == 'recruiter') {
      setOptions(['My Dashboard', 'View Candidates', 'Logout']);
    } else {
      setOptions(['Logout']);
    }
  }, [designation]);

  
  const handleLogin = (user) => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    setDesignation(user.designation);
    localStorage.setItem('designation', user.designation); // Corrected this line
    setUserEmail(user.email);
    localStorage.setItem('userEmail', user.email);
    setUserName(user.firstName);
    localStorage.setItem('userName', user.firstName);
    setUserPassword(user.password);
    localStorage.setItem('userPassword', user.password); 
    setUserId(user._id);
    localStorage.setItem('userId', user._id);
    // setUserId(user.timeSlots);
    // localStorage.setItem('userId', user._id);
    // setUserId(user._id);
    // localStorage.setItem('userId', user._id);
    // Corrected this line
    if (user.designation === 'jobSeeker') {
      setOptions(['My Dashboard', 'View Companies', 'Logout']);
    } else if (user.designation === 'recruiter') {
      setOptions(['My Dashboard', 'View Candidates', 'Logout']);
    } else {
      setOptions(['Logout']);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    // You can perform any additional search-related logic here
    if (e.key === 'Enter') {
      // Perform any additional search-related logic here
      navigate(`/companies?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div>
      <header >
        <div style={{ color: "white", fontWeight: "bold" }}>EasyHire</div>
        <nav style={{ display: "flex", justifyContent:"space-evenly"}}>
        {isLoggedIn && location.pathname.includes('/companies')? (
          <div className="searchBarContainer" style={{ marginRight: "200px", marginTop:"6px" }}>
            <input
              className="searchBarInput"
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
              style={{width:"350px", textAlign:"center", color:"black", border:"2px solid black"}}
            />
          </div>
        ):<></>}
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
          </ul>
          {isLoggedIn? (
            <div>
            <IconButton
              class = "three_dots"
              aria-label="more"
              id="long-button"
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon style={{ color: "white", marginTop: "6px"}}/>
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={() => handleClose('')}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '20ch',
                },
              }}
            >
              {options.map((option) => (
                <MenuItem key={option} selected={option === 'Pyxis'} onClick={() => handleClose(option)}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>

          ):<ul>
              <li
                style={{ marginRight: "5px", color: "white", fontWeight: "bold" }}
              >
                <Link to="/login"> Login |</Link>
              </li>
              <li style={{ fontWeight: "bold" }}>
                <Link to="/register"> Register</Link>
              </li>
          </ul>
          }
          
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/jobSeekerMeetings" element={<JobSeekerMeetings id={userId} name={userName} />} />
        <Route path='/recruiterMeetings' element={<RecruiterMeetings id={userId} name={userName} />} />
        <Route path="/fairs" element={<Fairs />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobSeekers" element={<RecruiterLanding id={userId} name={userName} />} />
        <Route path="/companies" element={<JobseekerLanding searchTerm={searchTerm} email={userEmail} name={userName} id={userId} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/EventHostDashboard" element={<EventHostDashboard />} />
      </Routes>

      <footer>
        <section>
          <p> &copy; 2023 EasyHire, Inc</p>
        </section>
        <section>
          <p> About Us | Directions | Contact Us</p>
        </section>
        <section>
          <p> Privacy Policy </p>
        </section>
      </footer>
    </div>
  );
}

export default App;
