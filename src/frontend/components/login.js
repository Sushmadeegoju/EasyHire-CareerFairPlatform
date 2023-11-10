import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-use-history';
import '../css/login.css';

function Login() {
    const history = useHistory(); // Get the history object from React Router

    const handleSuccessfulLogin = (user) => {
        console.log(`Hello ${user[0].firstName}! You are successfully logged in!`);
        if(user[0].designation == 'Job Seeker') {
            history.push('/recruiters'); 
        }
        else if(user[0].designation == 'recruiter') {
            history.push('/jobSeekers'); 
        }
        // Perform the routing to the 'jobSeekers' component after successful login
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = document.getElementById('email-txt').value;
        const password = document.getElementById('password').value;

        // Do something with the email and password, for example, log them to the console
        console.log('Email:', email);
        console.log('Password:', password);

        try {
            const response = await fetch('/api/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const userData = await response.json();
                alert(`Hello ${userData[0].firstName}`);
                handleSuccessfulLogin(userData);
            } else {
                const errorMessage = await response.json();
                alert(`Error: ${errorMessage["error"]}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert(`Error: ${error}`);
        }
    };

    return (
        <div>
            <div className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <h2>Welcome Back</h2>
                    </div>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <input type="email" id='email-txt' placeholder="Email Address" required />
                        <input type="password" id='password' placeholder="Password" required />
                        <br/><br/>
                        <button type="submit">LOG IN</button>
                    </form>
                    <br/>
                    <a href="#" className="forgot-password">FORGOT PASSWORD?</a>
                </div>
            </div>
        </div>
    );
}

export default Login;
