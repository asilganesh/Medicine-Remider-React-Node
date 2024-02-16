import { Link, useNavigate } from "react-router-dom"
import styles from "./register.module.css"
import { useContext, useEffect, useState } from "react"
import { loginData } from "../../NavigationStack/navigationStack"
import axios from "axios"

const LoginScreen = () => {
  // const{changeLogin}=useContext(loginData)
  const{userDetailsFromDB,setUserDetailsFromDB,changeLogin,login}=useContext(loginData)


  const [userName, setUserName] = useState()
  const [userNameErr, setUserNameErr] = useState("")

  const [password, setPassword] = useState()
  const [passErr, setPassErr] = useState("")

  const navigate=useNavigate()

  var userNameList=[]
  var passwordList=[]

  useEffect(()=>{

    fetchUserDetails()
    console.log(userNameList);
console.log(passwordList);

  },[])

  async function fetchUserDetails(){

    await axios.get("http://localhost:3002/getdetails")
     .then(response=>{
       if(response.status===200){
        console.log(response.data);
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
  
  


  const handleSubmit=(e)=>{
    e.preventDefault()
    for(const {user_name,password} of userDetailsFromDB){
      userNameList.push(user_name)
      passwordList.push(password)
    }
   

    if(userNameList.includes(userName)){
      if(passwordList.includes(password)){
        alert('login successfull')
        
        changeLogin()
        navigate('/')
        console.log(login)
      }
      else{
        alert("invalid password")
       
      }
    }
    else{
      alert('invalid username')
    }
  }

    return (
        <><div className={styles.registerBox}>
      <h1>Login here</h1>
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
       
        <button type="submit" onClick={handleSubmit}> Login</button>
      </form>
      <p>Don't have an Account? <Link to="/" className={styles.Link}><b>SignUp Here</b></Link></p>
      </div>

    </>
    )
}

export default LoginScreen