/* eslint-disable no-unused-vars */
import { useState } from "react"

  // first name
  // last name
  // email
  // password
  // re-enter password 

  //  | id |
  // | email |
  // | password |
  // | first_name |
  // | last_name |
  // | mobile_no |
  // | account_status | 
  // | user_type |
  

const Register = () => {
  // states for input fields
  const [formValues, setFormValues] = useState({
    firstName : '',
    lastName : '',
    email : '',
    password : '',
    mobileNumber : ''
  })

  const handleChange =(e) =>{
    const {firstname, lastname,email, password,mobileNo, value} = e.target
    setFormValues({...formValues,
       [firstname] : value,
       [lastname] :value ,
       [email] : value ,
       [password] : value,
       [mobileNo]: value})
  }

// i cant enter any values in this. whatz

//   import React, { useState } from 'react';

// function YourComponent() {
//   const [formValues, setFormValues] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     mobileNumber: ''
//   })

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
//   }

//   return (
//     // your JSX here
//   );
// }

  // when i type something in firstname input field , all the other fields also get the same value


  // const [firstName, setFirstName] = useState('')
  // const [lastName, setLastName] = useState('')
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [mobileNumber, setMobileNumber] = useState('')
  // const [errorMessage, setErrorMessage] = useState('')
  // const [errorEmailMessage, setErrorEmailMessage] = useState('')

  // state for errors
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)

  // validation for input fields
  const emailRegex =/[^-|_`''''"\\|+()&*%^#$@=/\d/g]+[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const isValidEmail = emailRegex.test(formValues.email);

  const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
  const isValidPassword = passwordRegex.test(formValues.password);

  const firstNameRegex =  /^[a-z ,.'-]+$/i;
  const isValidFirstName = firstNameRegex.test(formValues.firstName)

  const lastNameRegex =  /^[a-z ,.'-]+$/i;
  const isValidLastName = lastNameRegex.test(formValues.lastName)

  const mobileNumberRegex =  /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im
  const isValidMobileNumber = mobileNumberRegex.test(formValues.mobileNumber)

  // functions for controlled input
  // const handleFirstNameChange = (e)=>{
  //   setFirstName(e.target.value)
  //   setSubmitted(false)
  // }

  // const handleLastNameChange = (e)=>{
  //   setLastName(e.target.value)
  //   setSubmitted(false)
  // }

  // const handleEmailChange = (e)=>{
  //   setEmail(e.target.value)
  //   setSubmitted(false)
  // }

  // const handlePasswordChange=(e)=>{
  //   setPassword(e.target.value)
  //   setSubmitted(false)
  // }

  // const handleMobileNumberChange = (e)=>{
  //   setMobileNumber(parseInt(e.target.value, 10))
  //   setSubmitted(false)
  // }

  // submit function
  const handleSubmit = ()=>{
    if(!isValidEmail){
      // setErrorMessage('Email is invalid')
      console.log("email is required")
    }
    if(!isValidPassword){
      // setErrorMessage('Password is Invalid')
      console.log("password is required")
    }
    if(!isValidFirstName){
      // setErrorMessage('First Name is Invalid')
      console.log('First Name is Required')
    }

    if(!isValidLastName){
      // setErrorMessage('Last Name is Invalid')
    }

    if(!isValidMobileNumber){
      // setErrorMessage('Mobile Number is Invalid')
    }
  }

  return (
    <div>
      <h1>Register Form</h1>

      <form onSubmit={handleSubmit} className="register-form">
        <label htmlFor="firstname">First Name:</label>
        <input type="text" id="firstname" onChange={handleChange} value={formValues.firstName} required/>

        <label htmlFor="lastname">Last Name:</label>
        <input type="text" id="lastname" onChange={handleChange} value={formValues.lastName} required />

        <label htmlFor="mobileNo">Mobile Number:</label>
        <input type="tel" id="mobileNo"  onChange={handleChange} value={formValues.mobileNumber} required/>

        <label htmlFor="email">Email:</label>
        <input type="email" id="email"  onChange={handleChange} value={formValues.email} required/>

        <label htmlFor="password">Password:</label>
        <input type="password"  id="password" onChange={handleChange} value={formValues.password} required/>

        <button type="submit" >Sign Up</button>
      </form>

    </div>
  )
}

export default Register