
import React, { useContext, useEffect, useState } from 'react'
import styles from "./register.module.css"
import { Link, json, useNavigate } from 'react-router-dom'
import { loginData } from '../../NavigationStack/navigationStack'
import axios from 'axios'

const RegisterScreen = () => {
  const { userDetailsFromDB, setUserDetailsFromDB } = useContext(loginData)

  const [userName, setUserName] = useState()
  const [userNameErr, setUserNameErr] = useState("")

  const [mail, setMail] = useState()
  const [mailErr, setMailErr] = useState("")

  const [password, setPassword] = useState()
  const [passErr, setPassErr] = useState("")

  const [confirmPassword, setConfirmPassword] = useState()
  const [confirPassErr, setConfirmPassErr] = useState("")

  // const [loginroute, setloginroute] = useState(false)

  const navigate = useNavigate()


  useEffect(() => {

    fetchUserDetails()

  }, [])


  var userNameList = []
  var passwordList = []

  async function fetchUserDetails() {

    await axios.get("http://localhost:3002/getdetails")
      .then(response => {
        if (response.status === 200) {
          setUserDetailsFromDB(response.data)

        }
      })



  }




  // handling User Name

  const handleuserName = (event) => {

    let userNamevalid = event.target.value

    if (userNamevalid.length > 10) {
      setUserNameErr("Enter below 10 characters")
    }
    else {
      setUserNameErr("")
      setUserName(userNamevalid)
    }


  }

  //Handling Email

  const handleEmail = (event) => {


    let mailValid = event.target.value
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (pattern.test(mailValid)) {
      setMailErr("")
      setMail(mailValid)

    }
    else {
      setMailErr("Please Enter Valid Mail")
    }

  }

  // Handling Password

  const handlePassword = (event) => {


    let passValid = event.target.value
    let pattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (pattern.test(passValid)) {
      setPassErr("")
      setPassword(passValid)

    }
    else {
      setPassErr("password should contain atleast one number and one special character")
    }


  }

  //Handling confirm Password

  const handleConfirmPassword = (event) => {

    let confirmPassValid = event.target.value
    if (password == confirmPassValid) {
      setConfirmPassErr("")
      setConfirmPassword(confirmPassValid)
    }
    else {
      setConfirmPassErr("Password doesn't Match")
    }



  }

  const handleSubmit = () => {


    userName ?
      mail ?
        password ?
          confirmPassword ?

            USerDetails()
            : alert("Please enter confirm password")
          : alert("Please enter password")
        : alert("Please enter mail id")
      : alert("Please enter username");


  }

  //for posting user details in DB

  async function postUserDetails() {
    await axios.post("http://localhost:3002/register", {
      user_name: userName,
      mail: mail,
      password: password
    })
      .then((response) => {
        console.log(response);
      });
  }


  for (const { user_name, password } of userDetailsFromDB) {
    userNameList.push(user_name)
    passwordList.push(password)
  }


  const USerDetails = () => {


    if (userNameList.length >=0) {


      if (userNameList.includes(userName)) {

        alert("username already exists")
      }
      else {

        postUserDetails()

        setUserName("")
        setMail("")
        setPassword("")
        setConfirmPassword("")
        navigate("/login")
      }
    }

  }


  return (
    <><div className={styles.registerBox}>
      <h1>Register here</h1>
      <form className={styles.formElements}>

        {/* This is For Username Field */}

        <label htmlFor="userName">User Name : <br></br>
          <input type="text" id="userName" className={styles.inputElements} value={userName} onChange={handleuserName}></input>
        </label>
        {
          // Vallidation UserName

          userNameErr
            ?
            <p style={{ color: "red" }}>{userNameErr}</p>
            :
            null

        }


        {/* This is For Mail Field */}

        <label htmlFor="Mail">Mail :<br></br>
          <input type="mail" id='Mail' className={styles.inputElements} value={mail} onChange={handleEmail}></input>
        </label>

        {
          // Vallidation Mail Id

          mailErr
            ?
            <p style={{ color: "red" }}>{mailErr}</p>
            :
            null

        }

        {/* This is For Password Field */}

        <label htmlFor="password">Password :<br></br>
          <input type="password" id='password' className={styles.inputElements} value={password} onChange={handlePassword}></input>
        </label>

        {
          // Vallidation  Password

          passErr
            ?
            <p style={{ color: "red" }}>password should contain atleast <br></br>one number and one special character
            </p>
            :
            null

        }


        {/* This is For Confirm Password Field */}

        <label htmlFor="confirmpass">Confirm Password :<br></br>
          <input type="password" id='confirmpass' className={styles.inputElements} value={confirmPassword} onChange={handleConfirmPassword}></input>
        </label>

        {
          // Vallidation  confirm Password

          confirPassErr
            ?
            <p style={{ color: "red" }}>{confirPassErr}</p>
            :
            null

        }


        {/* This is For Button Field */}
        <button type="submit" onClick={handleSubmit}> Sign Up</button>
        {/* <Link to={loginroute ? "/login" : null}> <button type="submit" onClick={handleSubmit}> Sign Up</button></Link> */}
      </form>
      <p>Already have an Account? <Link to="/login" className={styles.Link}><b>Login Here</b></Link></p>
    </div>

    </>
  )
}

export default RegisterScreen
