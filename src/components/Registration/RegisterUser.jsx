/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { COUNTRIES } from "./CountryCode";
import { useState } from "react";
import axios from "axios";

const baseURL = "http://192.168.1.209:3000/api/v1/registration";

const RegisterUser = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [countryCode, setCountryCode] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    validate,
  } = useForm();

  const onSubmit = (data) => {
    data.countryCode = countryCode;
    console.log(data);
    setSuccessMessage("User Registered Succesfully");
  };

  const onSubmitData = async (data) => {
    const userData = {
      email: data.email,
      password: data.password,
      countryCode: data.mobileCode,
      mobileNo: data.mobileNo,
    };
    console.log(userData);
    try {
      const response = await axios.post(baseURL, userData, {
        headers: {
          // "Content-Type": "multipart/form-data",
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      setSuccessMessage("User Registered Succesfully");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div>
      {/* Container for Logo and Title  */}
      <div className="flex ">
        <div className="flex items-center justify-center">
          <img
            src="src/assets/1496979457.svg"
            alt="logo"
            height="80px"
            width="80px"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold font-mono my-7">Ride Mate</h1>
        </div>
      </div>

      {/* Container for Register Now  Text */}

      <p style={{ color: "orange" }}>{successMessage}</p>

      {/* Container for image and form */}
      <div className="inline-flex">
        <div className="">
          <img
            src="src/assets/banner_car.png"
            alt="Volkswagen"
            className="h-80 w-100  my-16"
          />
        </div>

        <div className="flex flex-col items-center ">
          <div className="my-6">
            <h1 className=" font-mono mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Register
            </h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmitData)}
            className="flex flex-col gap-3 w-72"
          >
            {/* Email Input Field */}
            <label htmlFor="email" className="text-sm font-mono">
              Email:
            </label>
            <input
              type="email"
              name="email"
              {...register("email", {
                required: true,
                pattern:
                  /[^-|_`''''"\\|+()&*%^#$@=/\d/g]+[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              })}
              className={` rounded-md border-2  border-slate-400  hover:border-slate-800 h-9 w-30 ${
                errors.email ? "border-red-500" : ""
              }`}
            />

            {errors.email && errors.email?.type === "required" && (
              <p style={{ color: "red" }}>Email is Required</p>
            )}
            {errors.email && errors.email?.type === "pattern" && (
              <p style={{ color: "red" }}> Email Adddress invalid</p>
            )}

            {/* Password input field */}
            <label htmlFor="password" className="text-sm font-mono">
              Password:
            </label>
            <input
              type="password"
              name="password "
              {...register("password", {
                required: true,
                pattern:
                  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                minLength: 8,
              })}
              className={` rounded-md border-2  border-slate-400  hover:border-slate-800 h-9 w-30 ${
                errors.password ? "border-red-500" : ""
              }`}
            />

            {errors.password && errors.password?.type === "required" && (
              <p style={{ color: "red" }}>Password is Required</p>
            )}
            {errors.password && errors.password?.type === "minLength" && (
              <p style={{ color: "red" }}>
                Password should be atleast 8 characters
              </p>
            )}
            {errors.password && errors.password?.type === "pattern" && (
              <p style={{ color: "red" }}>
                Password should atleast contain one uppercase character, one
                digit, one lowercase character, one letter and one special
                symbol
              </p>
            )}

            <div className="flex gap-4 items-center">
              {/* Select Country Code */}
              <div className="w-1/4">
                <label htmlFor="mobileCode" className="text-sm font-mono">
                  Country:
                </label>
                <select
                  onChange={(e) => {
                    const selectedCountry = COUNTRIES.find(
                      (country) => country.name === e.target.value
                    );
                    setCountryCode(selectedCountry.mobileCode);
                  }}
                  name="mobileCode"
                  {...register("mobileCode", {
                    required: "Required",
                  })}
                  className={` rounded-md border-2 border-slate-400 hover:border-slate-800 h-9 w-full ${
                    errors.mobileCode ? "border-red-500" : ""
                  }`}
                >
                  <option>Select Country</option>
                  {COUNTRIES.map((item) => (
                    <option
                      key={item.mobileCode + item.name}
                      value={item.mobileCode}
                    >
                     {item.name} - {item.mobileCode}  
                    </option>
                  ))}
                </select>
                {/* {errors.countryCode && errors.countryCodetype === "required" && (<p>Select</p>)} */}
                {errors.mobileCode && <p style={{ color: "red" }}>Select </p>}
              </div>

              {/* Mobile Number Input Field */}

              <div className="w-3/4">
                <label htmlFor="mobileNo" className="font-mono text-sm">
                  Mobile Number:
                </label>
                <input
                  type="text"
                  name="mobileNo"
                  {...register("mobileNo", {
                    required: true,
                    pattern:
                      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
                    minLength: 10,
                  })}
                  className={` rounded-md border-2  border-slate-400  hover:border-slate-800 h-9 w-full ${
                    errors.mobileNo ? "border-red-500" : ""
                  }`}
                />

                {errors.mobileNo && errors.mobileNo?.type === "required" && (
                  <p style={{ color: "red" }}>Mobile Number is Required</p>
                )}
                {errors.mobileNo && errors.mobileNo?.type === "pattern" && (
                  <p style={{ color: "red" }}>
                    Mobile Number should contained 10 digits
                  </p>
                )}
              </div>
            </div>

            {/* Sign Up Submit Button */}
            <div className="font-mono my-6   bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md">
              <button type="submit">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
