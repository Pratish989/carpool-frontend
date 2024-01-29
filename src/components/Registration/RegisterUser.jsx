/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { COUNTRIES } from "./CountryCode";
import { useState } from "react";


const RegisterUser = () => {
 const [search,setSearch] = useState('')
 const { register, handleSubmit, watch, formState : {errors}, validate} = useForm()

 const onSubmit = data => console.log(data)

  return (
    <div>

     <div className="flex" >
      <img src="src/assets/car.png" alt="logo"  height="50px" width="50px"/>
       <h1 className="text-3xl font-bold font-mono">
         Ride Mate 
       </h1>
     </div>


    <h1 className="bg-orange-400">Sign Up</h1>
    
    <div className="flex flex-col items-center  border-separate border" >


    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-72" >

     {/* First Name Field */}
     <label htmlFor="firstName">First Name:</label>
     <input type="text" name="firstName" {...register('firstName', {
      required : true,
      pattern : /^[a-z ,.'-]+$/i,
     }) }  className="border-2 border-slate-400  hover:border-slate-800 h-10 w-30"/>
     {errors.firstName && errors.firstName?.type === "required" && (<p style={{color : "red"}}>First Name is Required</p>) }
     {errors.firstName && errors.firstName?.type === "pattern" && (<p style={{color : "red"}}>First Name is  Invalid</p>)}
    

     {/* Last Name Field */}
     <label htmlFor="lastName">Last Name:</label>
     <input type="text" name="lastName" {...register('lastName', {
      required: true,
      pattern : /^[a-z ,.'-]+$/i
     })} className="border-2  border-slate-400  hover:border-slate-800 h-10 w-30" />
     { errors.lastName &&errors.lastName?.type === "required" && (<p style={{color : "red"}}>Last Name is Required</p>)}
     {errors.lastName && errors.lastName?.type === "pattern" && (<p style={{color : "red"}}>Last name is Invalid</p>)}


     {/* Mobile Number Field */}
     <label htmlFor="mobileNo">Mobile Number:</label>

     {/* Select Mobile Number Corresponding to  Country Code */}

     {/* <select onChange={e => setSearch(e.target.value)}>
      {COUNTRIES.map(item => <option key={`${item.mobileCode} ${item.name}`}> {item.mobileCode} {item.name} </option>)}
     </select> */}

     <input list="data"  onChange={e => setSearch(e.target.value)} placeholder="Country Code" className="border-2  border-slate-400  hover:border-slate-800 h-10 w-30"/>
     <datalist id="data">
    {COUNTRIES.map(item => <option key={`${item.mobileCode} ${item.name}`}> {item.mobileCode} {item.name} </option>)}
     </datalist>
     <br />
     
     <input  type="text" name="mobileNo" {...register('mobileNo', {
      required : true,
      pattern : /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
      minLength : 10
     })} className="border-2  border-slate-400  hover:border-slate-800 h-10 w-30" />
     {errors.mobileNo && errors.mobileNo?.type === "required" && (<p style={{color : "red"}}>Mobile Number is Required</p>)}
     { errors.mobileNo && errors.mobileNo?.type === "pattern" && (<p style={{color : "red"}}>Mobile Number should contained 10 digits</p>)}
 

     {/* Email Input Field */}
     <label htmlFor="email">Email:</label>
     <input type="email"  name="email"  {...register('email' , {
      required: true,
      pattern : /[^-|_`''''"\\|+()&*%^#$@=/\d/g]+[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
     }) }  className="border-2  border-slate-400  hover:border-slate-800 h-10 w-30"/>
     {errors.email && errors.email?.type === "required" && (<p style={{color : "red"}}>Email  is Required</p>)}
     {errors.email && errors.email?.type === "pattern" && (<p style={{color : "red"}}> Email Adddress invalid</p>)}


      {/* Password input field */}
     <label htmlFor="password">Password:</label>
     <input  type="password" name="password "{...register('password',{
      required : true,
      pattern : /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
      minLength : 8
     })}  className="border-2  border-slate-400  hover:border-slate-800 h-10 w-30"/>
     {errors. password && errors.password?.type === "required" && (<p style={{color : "red"}}>Password is Required</p>)}
     {errors. password && errors.password?.type === "minLength" && (<p style={{color : "red"}}>Password should be atleast 8 characters</p>)}
     {errors. password && errors.password?.type === "pattern" && (<p style={{color : "red"}}>Password should atleast contain one uppercase character, one digit, one lowercase character, one letter and one special symbol</p>)}
    

     {/* Sign Up Submit Button */}
     <button type="submit" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Sign Up</button>
   
    </form>

    </div>
     </div>
  )
}

export default RegisterUser