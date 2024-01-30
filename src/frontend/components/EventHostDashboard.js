import React, { useState, useEffect } from 'react';
import '../css/EventHost.css'

const Dashboard = () => {
    const [selectedOption,setSelectedOption] = useState('companies');
    const [jobSeekers, setJobSeekers] = useState([]);
    const [sponsors, setSponsors] = useState([]);

    useEffect(() => {
        // Fetch data when the component mounts
        fetchRecruitersData();
        fetchSponsorsData();
      }, []);

    // const jobSeekers = [
    //     { name: 'Alice', email: 'alice@email.com' },
    //     { name: 'Bob', email: 'bob@email.com' },
    //     // ... add more job seekers here
    // ];

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const fetchRecruitersData = async () => {
        try {
          const response = await fetch("/jobSeekersData", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          if (response.ok) {
            const userData = await response.json();
            console.log("userData: " + userData);
            setJobSeekers(userData); // Update the state with the fetched data
          } else {
            const errorMessage = await response.text();
            alert(`Error: ${errorMessage}`);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

      const fetchSponsorsData = async () => {
        try {
            const response = await fetch('/sponsors', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
                const sponsorData = await response.json();
                setSponsors(sponsorData); // Update the state with the fetched data
            } else {
                const errorMessage = await response.text();
                alert(`Error: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    return (

        <div className='EventHost'>
            <div className='head'>
                <h1 style={{ textAlign:"center" }}>VT CS Career Fair 2023</h1>
                <h3 style={{ textAlign:"center" }}>Location: Squires CommonWealth Ballroom</h3>
                <h4 style={{ textAlign:"center" }}>Please select an option to view</h4>
            </div>
            <div className='select-dropdown'>
            <select onChange={handleSelectChange}>
                <option value="companies">Companies</option>
                <option value="jobSeekers">Job Seekers</option>
            </select>
            </div>

            {selectedOption === 'companies' && (
                <div>
                    <h2>Companies attending:</h2>
                    {/* <ul>
                        {sponsors.map((company, index) => (
                            <li key={index}>{`${company.name}, Booth: ${company.boothNum}`}</li>
                        ))}
                    </ul> */}
                    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                        <thead>
                        <tr style={{ border: '1px solid #ddd', padding: '8px' }}>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Company Name</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Booth No.</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sponsors.map((company, index) => (
                            <tr key={index} style={{ border: '1px solid #ddd', padding: '8px' }}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{company.name}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{company.boothNum}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {selectedOption === 'jobSeekers' && (
                <div>
                    <h2>Job Seekers attending:</h2>
                    {/* <ul>
                        {jobSeekers.map((jobSeeker, index) => (
                            <li key={index}>{`${jobSeeker.firstName} ${jobSeeker.lastName}, Email: ${jobSeeker.email}`}</li>
                        ))}
                    </ul> */}
                    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                        <thead>
                        <tr style={{ border: '1px solid #ddd', padding: '8px' }}>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
                        </tr>
                        </thead>
                        <tbody>
                        {jobSeekers.map((jobSeeker, index) => (
                            <tr key={index} style={{ border: '1px solid #ddd', padding: '8px' }}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                {`${jobSeeker.firstName} ${jobSeeker.lastName}`}
                            </td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{jobSeeker.email}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
