import { useContext, useState } from "react"

import styles from "./index.module.css"
import NavBar from "../NavBar/navigation.js"
import Navigation2 from "../NavBar/navigation2.js"
import { DataShare } from "../Main/main.js"
import axios from "axios"


const AddMedicine=()=>{

    const{settingData}=useContext(DataShare)

    const[medicineName,setMedicineName]=useState()
    const[description,setDescription]=useState()
    const[remeinderTime,setRemeinderTime]=useState()

   

const medicineNamehandler=(event)=>{

    // console.log(event.target.value)
    setMedicineName(event.target.value)

}

const handleDescription=(event)=>{
    // console.log(event.target.value)
    setDescription(event.target.value)
}

const handleTime=(event)=>{
    // console.log("hello")
    setRemeinderTime(event.target.value)
}

const handleForm=(e)=>{
    e.preventDefault()

    // console.log(e)
    // setRemeinderTime(e.target.form[2].value)

    var obj={
        medicineName,
        description,
        remeinderTime


    }
    console.log(obj)
    settingData(obj)

    postUserDetails()

    setRemeinderTime('')
    setDescription('')
    setMedicineName('')

}

    //for posting Remindes data in DB

    async function postUserDetails() {
        await axios.post("http://localhost:3002/PostRemeinders", {
            medicine_name: medicineName,
            descr: description,
            time: remeinderTime
        })
          .then((response) => {
            console.log(response);
          });
      }

 

  


    return(
       
        <>
         
        {/* //this is Nav Bar */}
        <NavBar/>
        <Navigation2/>

       <div className={styles.formDiv}>
       <form className={styles.form}> 
            <label htmlfor="medicine_name"> 
            Medicine Name : <input className={styles.AddMedInput} id="medicine_name" type="text" value={medicineName} onChange={medicineNamehandler} required></input>
            </label>

            <label htmlFor="description">
                Description : <input  className={styles.AddMedInput} id="description" type="text" value={description} onChange={handleDescription} required></input>
            </label>

            <label htmlfor="remeindertime"> 
            Remeinder Time : <input className={styles.AddMedInput} id="remeindertime" type="datetime-local" value={remeinderTime} onChange={handleTime} required></input>
            </label>
            <button className={styles.button} type="submit" onClick={handleForm}>Add to Remeinder</button>
       

        </form>

       </div>
        </>

    )
}

export default AddMedicine