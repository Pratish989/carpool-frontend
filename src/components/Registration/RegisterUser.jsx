import { useForm } from "react-hook-form";
import { COUNTRIES } from "./CountryCode";
import { useState } from "react";

const RegisterUser = () => {
  const [search, setSearch] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(COUNTRIES);
  const {
    register,
    handleSubmit,
    formState: { errors },
    validate,
  } = useForm();

  const handleSearchChange = (e) => {
    const keyword = e.target.value;
    setSearch(keyword);
    const filtered = COUNTRIES.filter((country) =>
      country.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleCountrySelect = (e) => {
    const selectedCountry = COUNTRIES.find(
      (country) => country.name === e.target.value
    );
    if (selectedCountry) {
      setSelectedCountry(true); // Set selectedCountry to true when a country is selected
      setCountryCode(selectedCountry.mobileCode);
      setValue("mobileNo", ""); // Reset mobileNo field value when a country is selected
    }
  };

  const onSubmit = (data) => {
    // Include the selected country code in the data object
    data.countryCode = countryCode;
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center mt-8 mb-4">
        <img
          src="src/assets/car.png"
          alt="logo"
          height="50px"
          width="50px"
          className="mr-2"
        />
        <h1 className="text-3xl font-bold font-mono">Ride Mate</h1>
      </div>

      <h1 className="bg-orange-400 py-2 px-4 rounded-lg mb-4">Sign Up</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-96"
      >
        <div className="flex gap-4">
          {/* First Name Field */}
          <div className="w-1/2">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              {...register("firstName", {
                required: true,
                pattern: /^[a-z ,.'-]+$/i,
              })}
              className={`border-2 border-slate-400 hover:border-slate-800 h-10 w-full ${
                errors.firstName ? "border-red-500" : ""
              } `}
            />
            {errors.firstName && errors.firstName?.type === "required" && (
              <p style={{ color: "red" }}>First Name is Required</p>
            )}
            {errors.firstName && errors.firstName?.type === "pattern" && (
              <p style={{ color: "red" }}>First Name is Invalid</p>
            )}
          </div>

          {/* Last Name Field */}
          <div className="w-1/2">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              {...register("lastName", {
                required: true,
                pattern: /^[a-z ,.'-]+$/i,
              })}
              className={`border-2 border-slate-400 hover:border-slate-800 h-10 w-full ${
                errors.lastName ? "border-red-500" : ""
              } `}
            />
            {errors.lastName && errors.lastName?.type === "required" && (
              <p style={{ color: "red" }}>Last Name is Required</p>
            )}
            {errors.lastName && errors.lastName?.type === "pattern" && (
              <p style={{ color: "red" }}>Last name is Invalid</p>
            )}
          </div>
        </div>



        

        {/* Mobile Number Field */}
        <div className="flex gap-4 items-center">
          <div className="w-1/4">
            <label htmlFor="mobileCode">Country:</label>
            <select
              name="mobileCode"
              {...register("mobileCode", {
                required: true,
              })}
              onChange={handleCountrySelect}
              className={`border-2 border-slate-400 hover:border-slate-800 h-10 w-full ${
                errors.mobileCode ? "border-red-500" : ""
              }`}
            >
              <option value="">Select Country</option>
              {filteredCountries.map((item) => (
                <option key={item.mobileCode} value={item.name}>
                  {item.name} {item.mobileCode}
                </option>
              ))}
            </select>
            {errors.mobileCode && errors.mobileCode?.type === "required" && (
              <p style={{ color: "red" }}>Select</p>
            )}
          </div>
          <div className="w-3/4">
            <label htmlFor="mobileNo">Mobile Number:</label>
            <input
              type="text"
              name="mobileNo"
              placeholder="Enter your mobile number"
              {...register("mobileNo", {
                required: true,
                pattern:
                  /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
                minLength: 10,
              })}
              className={`border-2 border-slate-400 hover:border-slate-800 h-10 w-full ${
                errors.mobileNo ? "border-red-500" : ""
              } `}
            />
            {errors.mobileNo && errors.mobileNo?.type === "required" && (
              <p style={{ color: "red" }}>Mobile Number is Required</p>
            )}
            {errors.mobileNo && errors.mobileNo?.type === "pattern" && (
              <p style={{ color: "red" }}>
                Mobile Number should contain 10 digits
              </p>
            )}
          </div>
        </div>

        {/* Email Input Field */}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          {...register("email", {
            required: true,
            pattern:
              /[^-|_`''''"\\|+()&*%^#$@=/\d/g]+[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          })}
          className={`border-2 border-slate-400 hover:border-slate-800 h-10 w-full ${
            errors.email ? "border-red-500" : ""
          } `}
        />
        {errors.email && errors.email?.type === "required" && (
          <p style={{ color: "red" }}>Email is Required</p>
        )}
        {errors.email && errors.email?.type === "pattern" && (
          <p style={{ color: "red" }}> Email Adddress invalid</p>
        )}

        {/* Password input field */}
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          {...register("password", {
            required: true,
            pattern:
              /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
            minLength: 8,
          })}
          className={`border-2 border-slate-400 hover:border-slate-800 h-10 w-full ${
            errors.password ? "border-red-500" : ""
          } `}
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
            Password should atleast contain one uppercase character, one digit,
            one lowercase character, one letter and one special symbol
          </p>
        )}

        {/* Sign Up Submit Button */}
        <button
          type="submit"
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 self-center"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default RegisterUser;
