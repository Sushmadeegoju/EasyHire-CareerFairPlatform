import React, { useState, useEffect } from 'react';
import SponsorsList from './SponsorsList';
import SponsorDetails from './SponsorDetails';
import '../css/jobseekerLanding.css';

function JobseekerLanding() {
    const [selectedSponsor, setSelectedSponsor] = useState(null);

    const [sponsors, setSponsers] = useState([]);

    useEffect(() => {
        // Fetch data when the component mounts
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/recruiters', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
                const sponsorData = await response.json();
                setSponsers(sponsorData); // Update the state with the fetched data
            } else {
                const errorMessage = await response.text();
                alert(`Error: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // const sponsors = [
    //     {name: 'Amazon', jobId:'AM98012', description: 'Amazon Freight (www.freight.amazon.com) is building the technology that enables shippers to ship their own freight using the same capabilities Amazon uses to reliably deliver millions of packages every day to its customers – on time, with low cost. If you are looking for an opportunity to solve technical problems, build innovative solutions, work with top notch software developers, delight our shippers, and help build a Billion dollar business - this might be the role for you.', requirements: ' 3+ years of non-internship professional software development experience. 2+ years of non-internship design or architecture (design patterns, reliability and scaling) of new and existing systems experience. Experience programming with at least one software programming language', prefered:'3+ years of full software development life cycle, including coding standards, code reviews, source control management, build processes, testing, and operations experience.Bachelor\'s degree in computer science or equivalent'},
    //     //... Add other sponsors here
    //     {name: 'Adobe', jobId:'AM98012', description: 'Amazon Freight (www.freight.amazon.com) is building the technology that enables shippers to ship their own freight using the same capabilities Amazon uses to reliably deliver millions of packages every day to its customers – on time, with low cost. If you are looking for an opportunity to solve technical problems, build innovative solutions, work with top notch software developers, delight our shippers, and help build a Billion dollar business - this might be the role for you.', requirements: ' 3+ years of non-internship professional software development experience. 2+ years of non-internship design or architecture (design patterns, reliability and scaling) of new and existing systems experience. Experience programming with at least one software programming language', prefered:'3+ years of full software development life cycle, including coding standards, code reviews, source control management, build processes, testing, and operations experience.Bachelor\'s degree in computer science or equivalent'},
    // ];

    return (
        <div className="app">
            <SponsorsList sponsors={sponsors} onSelect={setSelectedSponsor} />
            {selectedSponsor && <SponsorDetails sponsor={selectedSponsor} />}
        </div>
    );
}

export default JobseekerLanding;
