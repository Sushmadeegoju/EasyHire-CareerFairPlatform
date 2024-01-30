import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-use-history';
import '../css/Candidateform.css';

function Recruiterform() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
  });

  useEffect(() => {
    // You can perform actions after the state has been updated, for instance:
    console.log('Form data has been cleared:', formData);
  }, [formData]); // Watching for changes in formData

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file && file.type === 'application/pdf') {
//       setFormData({ ...formData, resume: file });
//       setErrors({ ...errors, resume: null });
//     } else {
//       setErrors({ ...errors, resume: 'Only PDF files are allowed.' });
//     }
//   };
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const validateForm = () => {
    let tempErrors = {};

    
    if (!formData.firstName) tempErrors.firstName = 'First name is required.';
    if (!formData.lastName) tempErrors.lastName = 'Last name is required.';
    if (!formData.email.includes('@')) tempErrors.email = 'Email is invalid.';
    if (formData.password.length < 8) tempErrors.password = 'Password should be at least 8 characters.';
    if (formData.password !== formData.confirmPassword) tempErrors.confirmPassword = 'Passwords do not match.';
    // if (!formData.resume) tempErrors.resume = 'Resume is required.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0; // Returns true if no errors
  };

  const postFormData = async (formData) => {
    // const firstName = formData.firstName;
    console.log("formData: " + formData);
    // JSON.stringify(formData);

    try {
      const dataToSend = { ...formData, designation: "recruiter" };
        const response = await fetch('/addRecruiter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( dataToSend )
        });

        if (response.ok) {
            alert(`Registration Successful`);
        } else {
            const errorMessage = await response.json();
            alert(`Error: ${errorMessage["error"]}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert(`Error: ${error}`);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log('Form data submitted:', formData);
      // Process your form data here (e.g., send to an API)
      if (validateForm()) {
        await postFormData(formData);
        console.log('Form data submitted:', formData);
        // Clear the form
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            companyName:'',
        });
        // setSubmissionStatus('Form submitted successfully!');
        {submissionStatus && <div className="submission-status">{submissionStatus}</div>}
        history.push('/login'); 
        // Process your form data here (e.g., send to an API)
        
        
    }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstName" placeholder="First Name" onChange={handleInputChange} />
      {errors.firstName && <div>{errors.firstName}</div>}

      <input name="lastName" placeholder="Last Name" onChange={handleInputChange} />
      {errors.lastName && <div>{errors.lastName}</div>}

      <input name="email" placeholder="Email ID" onChange={handleInputChange} />
      {errors.email && <div>{errors.email}</div>}

      <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
      {errors.password && <div>{errors.password}</div>}

      <input type="password" name="confirmPassword" placeholder="Re-enter Password" onChange={handleInputChange} />
      {errors.confirmPassword && <div>{errors.confirmPassword}</div>}
      <input type="companyName" name="companyName" placeholder="Company Name" onChange={handleInputChange} />
      {errors.confirmPassword && <div>{errors.confirmPassword}</div>}

      {/* <input name="degree" placeholder="Degree" onChange={handleInputChange} /> */}

      {/* <textarea name="workExperience" placeholder="Work Experience (if any)" onChange={handleInputChange}></textarea> */}

      {/* <input type="file" onChange={handleFileChange} />
      {errors.resume && <div>{errors.resume}</div>} */}

      <button type="submit">Submit</button>
    </form>
  );
}

export default Recruiterform;
