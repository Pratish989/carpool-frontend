/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { COUNTRIES } from "./CountryCode";
import { useState } from "react";
import axios from "axios";

const baseURL = "http://192.168.1.209:3000/api/v1/registration";

const RegisterUser = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  const [countryCode, setCountryCode] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({mode : 'onBlur'});

  const onSubmit = (data) => {
    data.countryCode = countryCode;
    console.log(data);
    setSuccessMessage("User Registered Succesfully");
  };

  const onSubmitData = async (data) => {
    const userData = {
      email: data.email,
      password : data.password,
      country_code : data.mobileCode,
      mobile_no : data.mobileNo
     }
    console.log(userData)
    try {
      const response = await axios.post(baseURL, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      setSuccessMessage("User Registered Succesfully");
    } catch (error) {
      console.log(error.response);
      if(error.response.status === 409){
        setErrorMessage(error.response.data.error)
      }else{
        setErrorMessage('')
      }
    }
  };

  console.log(errors, 'errors')

  return (
    <div>

      {/* Container for Logo and Title  */}
        <div className="flex ">      
          <div className="flex items-center justify-center">
          <img src="src/assets/1496979457.svg" alt="logo" height="80px" width="80px" />
          </div>
          <div>
          <h1 className="text-4xl font-bold font-mono my-7">Ride Mate</h1>
          </div>
        </div>


    {/* Container for image and form */}
    <div className="inline-flex"> 
      <div className="">
        <img src="src/assets/banner_car.png" alt="Volkswagen" className="h-80 w-100  my-16"/>
      </div>

      <div className="flex flex-col items-center ">
      <p className="text-red-600">{errorMessage}</p>
      <p className="text-orange-600">{successMessage}</p>

            {/* Container for Register Now  Text */}

            <div className="my-6">
          <h1 className=" font-mono mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register</h1>
          <p>Begin your Journey with us Today!</p>
          </div>

        <form
          onSubmit={handleSubmit(onSubmitData)}
          className="flex flex-col gap-3 w-72"
        >
         {/* {console.log(errors, "error msg of")} */}
          {/* Email Input Field */}
          <label htmlFor="email" className="text-sm font-mono ">Email:</label>
          <input
            type="email"
            name="email"
            {...register("email", {
              required: true,
              pattern:
                /[^-|_`''''"\\|+()&*%^#$@=/\d/g]+[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            })}
            className={`rounded-md border-2  border-slate-400  hover:border-slate-800 h-9 w-30 ${(errors.email?.type === 'required' || errors.email?.type === 'pattern') ? 'border-red-600' : ''} `}
          />

            {console.log(errors.email?.type === 'required')}

          {errors.email && errors.email?.type === "required" && (
            <p className="text-red-500">Email is Required</p>
          )}
          {errors.email && errors.email?.type === "pattern" && (
            <p className="text-red-500"> Email Address invalid</p>
          )}

          {/* Password input field */}
          <label htmlFor="password" className="text-sm font-mono">Password:</label>
          <input
            type="password"
            name="password "
            {...register("password", {
              required: true,
              pattern:
                /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
              minLength: 8,
            })}
            className={` rounded-md border-2  border-slate-400  hover:border-slate-800 h-9 w-30 ${(errors.password?.type === 'required' || errors.password?.type === 'pattern' || errors.password?.type === 'minLength') ? 'border-red-600' : ''}`}
            maxLength={12}
          />

          {errors.password && errors.password?.type === "required" && (
            <p className="text-red-500">Password is Required</p>
          )}
          {errors.password && errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password should be atleast 8 characters
            </p>
          )}
          {errors.password && errors.password?.type === "pattern" && (
            <p className="text-red-500">
              Password should atleast contain one uppercase character, one
              digit, one lowercase character, one letter and one special symbol
            </p>
          )}

        <div className="flex gap-4 items-center">
            {/* Select Country Code */}
            <div className="w-1/4">
              <label htmlFor="mobileCode" className="text-sm font-mono">Country:</label>
              <select
                  type='text'
                  name="mobileCode"
                  {...register("mobileCode", { required: true}, {

                  })}
                  onClick={(e) => {
                    console.log(e.target.value)
                    const selectedCountry = COUNTRIES.find(country => country.mobileCode === e.target.value)
                    console.log(selectedCountry)
                    setCountryCode(selectedCountry.mobileCode)
                    clearErrors('mobileCode')
                  }}
                  className={`rounded-md border-2 border-slate-400 hover:border-slate-800 h-9 w-full ${ errors.mobileCode?.type === 'required' ? 'border-red-600' : ''}`}
                >
                  <option></option>
                  {COUNTRIES.map((item) => (
                    <option
                      key={item.mobileCode + item.name}
                      value={item.mobileCode}
                    >
                     {item.name} - {item.mobileCode}  
                    </option>
                  ))}
                </select> 
                    {(errors.mobileCode && errors.mobileCode?.type=== 'required') ?  <p className="text-red-500">Select</p> : ''}
            </div>            
                {/* <div>
                      <datalist>
                      {COUNTRIES.map((item) => (
                    <option
                      key={item.mobileCode + item.name}
                      value={item.mobileCode}
                    >
                     {item.name} - {item.mobileCode}  
                    </option>
                  ))}
                      </datalist>
                </div> */}


            {/* Mobile Number Input Field */}

            <div className="w-3/4">
              <label htmlFor="mobileNo" className="font-mono text-sm">Mobile Number:</label>
              <input              
                type="text"
                name="mobileNo"
                {...register("mobileNo", {
                  required: true,
                  pattern: "[1-9]{1}[0-9]{12}",
                })}
                className={` rounded-md border-2  border-slate-400  hover:border-slate-800 h-9 w-full ${
                 (errors.mobileNo?.type === 'required' || errors.mobileNo?.type === 'pattern')  ? 'border-red-600' : ''
                }`}
                maxLength={12}
              />

              {errors.mobileNo && errors.mobileNo?.type === "required" && (
                <p className="text-red-500">Mobile Number is Required</p>
              )}
              {errors.mobileNo && errors.mobileNo?.type === "pattern" && (
                <p className="text-red-500">
                  Mobile Number should contain only 10 digits
                </p>
              )}
            </div>
          </div>

          {/* Sign Up Submit Button */}
          <div className="font-mono my-6   bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md">
          <button
            type="submit"
            >
            Sign Up
          </button>
          </div>
        </form>

        <div>
        <h3 >Already Signed Up? <a href="" className="font-bold font-mono">Click Here</a></h3>
      </div>
      </div>
    </div>


    </div>
  );
};

export default RegisterUser;




// select input error -> when user has not selected any value from the drop down list of countries then it should throw error
// but it is not showing the error. when i print out the errors object given by useForm() then it is not showing that entry/data.
// maybe that is why the error is happening. how to fix this? 


// when there are error, in any of the input fields then it is should turn the border to red but it is not happening.
// i have taken the errors object given by the useForm and that is tricky and maybe due to that it is happening, how to fix this? fix this.
