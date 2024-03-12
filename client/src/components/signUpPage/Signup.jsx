import Logo from "../assets/Registration_App_Logo.png";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useState, useCallback } from "react";
import Footer from '../Footer';

const apiUrl = import.meta.env.VITE_SOME_KEY; 

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#474787"),
  backgroundColor: "#474787",
  "&:hover": {
    backgroundColor: "#989898",
  },
}));

const ColorInput = styled(TextField)(({ theme }) => ({
  "& label.Mui-focused": {
    color: "#474787",
  },
  "& label": {
    color: "#666",
    zIndex: 2
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#474787",
      backgroundColor: "#fff",
      color: "#000",
    },
    "&:hover fieldset": {
      borderColor: "#474787",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#474787",
      backgroundColor: "#fff",
    },
  },
}));

function Signup() {
  
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')

  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const [errMessages, setErrMessages] = useState({
    usernameErr: '',
    emailErr: '',
    firstNameErr: '',
    lastNameErr: '',
    phoneNumErr: '',
    addressErr: '',
    cityErr: '',
    countryErr: '',
    passwordErr: '',
    passwordConfirmationErr: '',
  })

  function createAccount(){
    let allInfoIsVerified = true

    //you can comment this next line out so that you don't have to enter valid information when testing
    //allInfoIsVerified = checkValidity(true)

    if(allInfoIsVerified){
      fetch(`${apiUrl}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          firstName,
          lastName,
          phoneNum,
          address,
          city,
          country,
          password,
        }),
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.msg)
      });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      fetch(`${process.env.REACT_APP_FETCH_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          firstName,
          lastName,
          phoneNum,
          address,
          city,
          country,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.msg);
        });
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div
      id="SignupPage"
      className="w-full h-full relative flex justify-center items-center "
    >
      <header
        id="SignupHeader"
        className="w-full h-[75px] flex justify-center absolute top-0"
      >
        <img src={Logo} alt="logo" />
      </header>

      <div id="SignupInfo">
        <div className="flex flex-col text-center items-center w-1/2 gap-4">
          <h1 className="w-min text-left text-[60px]">
            Create
            <br />
            Your
            <br />
            Account!
          </h1>
          <p>
            Already have an account?{" "}
            <Link to={"/Login"}>
              <span className="underline">Log In</span>
            </Link>
          </p>
        </div>
        <div className=" w-[4px] h-5/6 bg-black">.</div>
        <form className="flex flex-col w-1/2 gap-10 relative" onSubmit={handleSubmit}>
          <div className="flex gap-5 mt-6 ">
            <div className="flex flex-col gap-3">
              <ColorInput
                variant="outlined"
                size="small"
                label="Username" 
                value={username}
                onBlur={() => checkValidity(['username'])}
                onChange={(e) => setUsername(e.target.value)}
              />
              <ColorInput
                variant="outlined"
                size="small"
                label="First Name"
                value={firstName}
                onBlur={() => checkValidity(['firstName'])}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <ColorInput
                variant="outlined"
                size="small"
                label="Phone"
                value={phoneNum}
                onBlur={() => checkValidity(['phoneNum'])}
                onChange={(e) => setPhoneNum(e.target.value)}
              />
              <ColorInput
                variant="outlined"
                size="small"
                label="City"
                value={city}
                onBlur={() => checkValidity(['city'])}
                onChange={(e) => setCity(e.target.value)}
              />
              <ColorInput
                variant="outlined"
                size="small"
                label="Password"
                type="password"
                value={password}
                onBlur={() => checkValidity(['password'])}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <ColorInput
                variant="outlined"
                size="small"
                label="Email"
                value={email}
                onBlur={() => checkValidity(['email'])}
                onChange={(e) => setEmail(e.target.value)}
              />
              <ColorInput
                variant="outlined"
                size="small"
                label="Last Name"
                value={lastName}
                onBlur={() => checkValidity(['lastName'])}
                onChange={(e) => setLastName(e.target.value)}
              />
              <ColorInput
                variant="outlined"
                size="small"
                label="Address"
                value={address}
                onBlur={() => checkValidity(['address'])}
                onChange={(e) => setAddress(e.target.value)}
              />
              <ColorInput
                variant="outlined"
                size="small"
                label="Country"
                value={country}
                onBlur={() => checkValidity(['country'])}
                onChange={(e) => setCountry(e.target.value)}
              />
              <ColorInput
                variant="outlined"
                size="small"
                label="Confirm Password"    
                value={passwordConfirmation}
                onBlur={() => checkValidity(['passwordConfirmation'])}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
              <div>{errMessages.passwordConfirmationErr}</div>
            </div>
          </div>
          <ColorButton className="self-start" onClick={createAccount}>
            Sign up
          </ColorButton>
        </form>
      </div>

      <div className="w-full h-[25px] flex justify-center items-center absolute bottom-0">
        <Footer />
      </div>
    </div>
  );



  function checkValidity(fields){ //fields is passed in as array of strings corresponding to the error that need to be checked
    if(fields){
      fields = ['username', 'email', 'firstName', 'lastName', 'phoneNum', 'address', 'city', 'country', 'password', 'passwordConfirmation']
    }
    let err = false
    let newErrMsgs = errMessages
    fields.forEach(field => {
      switch(field){
        case 'username':
          if(username === ''){
            newErrMsgs.usernameErr = 'Username is required to fill out'
            err=true
          } else {
            newErrMsgs.usernameErr = ''
          }
          break;

        case 'email':
          //email must contain word characters, ".", or "_" followed by "@" any combination of letters or digits, followed by a ".", then 3 more letters
          //example: "a@a.aaa"
          const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/
          const isValidEmail = emailRegex.test(email)
          if(email === ''){
            newErrMsgs.emailErr = 'Email is required to fill out'
            err=true
          } else if(isValidEmail){
            newErrMsgs.emailErr = ''
          } else {
            newErrMsgs.emailErr = 'invalid email'
            err=true
          }
          break;

        case 'firstName':
          if(firstName === ''){
            newErrMsgs.firstNameErr = 'First name is required to fill out'
            err=true
          } else {
            newErrMsgs.firstNameErr = ''
          }
          break;

        case 'lastName':
          if(lastName === ''){
            newErrMsgs.lastNameErr = 'Last name is required to fill out'
            err=true
          } else {
            newErrMsgs.lastNameErr = ''
          }
          break;


        case 'phoneNum':
          //phone number must contain 3 digits enclosed in optional parentheses followed by an optional space or hyphen, three more digits, another optional space/hyphen, then four digits
          //example: "(111)1111111", "(123)-123-1234", or "9999999999"
          const phoneNumRegex = /^\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/
          const isValidPhoneNum = phoneNumRegex.test(phoneNum)
          if(phoneNum === ''){
            newErrMsgs.phoneNumErr = 'Phone number is required to fill out'
          } else if(isValidPhoneNum){
            newErrMsgs.phoneNumErr = ''
          } else {
            newErrMsgs.phoneNumErr = 'Invalid phone number'
            err=true
          }
          break;


        case 'address':
          if(address === ''){
            newErrMsgs.addressErr = 'Adress is required to fill out'
            err=true
          } else {
            newErrMsgs.addressErr = ''
          }
          break;

        
        case 'city':
          if(city === ''){
            newErrMsgs.cityErr = 'City is required to fill out'
            err=true
          } else {
            newErrMsgs.cityErr = ''
          }
          break;

      
        case 'country':
          if(country === ''){
            newErrMsgs.countryErr = 'Country is required to fill out'
            err=true
          } else {
            newErrMsgs.countryErr = ''
          }
          break;


        case 'password':
          //password must contain more than 8 characters; one uppercase, one lowercase, one number, one special character
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          const isValidPassword = passwordRegex.test(password)
          if(password === ''){
            newErrMsgs.passwordErr = 'Password is required to fill out'
          } else if(isValidPassword){
            newErrMsgs.passwordErr = ''
          } else {
            newErrMsgs.passwordErr = 'Password be at least 8 characters long with at least one uppercase letter, one lowercase letter, one special character, and one number'
            err=true
          }
          break;
        case 'passwordConfirmation':
          //password must match password confirmation
          const passwordIsVerified = password === passwordConfirmation
          if(passwordConfirmation === ''){
            newErrMsgs.passwordConfirmationErr = 'Confirm password is required to fill out'
            err = true
          } else if(passwordIsVerified){
            newErrMsgs.passwordConfirmationErr = ''
          } else {
            newErrMsgs.passwordConfirmationErr = 'Password confirmation does not match password'
            err=true
          }
          break;
        default:

        return
      }
    })
    //set the new error messages and return a boolean based on whether or not there were no errors
    setErrMessages(newErrMsgs)
    forceUpdate()
    if(err){
      return(false)
    } else {
      return(true)
    }
  }
}

export default Signup;

