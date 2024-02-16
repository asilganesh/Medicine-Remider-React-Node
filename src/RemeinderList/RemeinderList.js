import { useContext, useEffect, useMemo } from "react"
import NavBar from "../NavBar/navigation"
import Navigation2 from "../NavBar/navigation2"
import styles from "./index.module.css"
import { DataShare } from "../Main/main"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"



const RemeinderList = () => {
    const{data,settingData,setData}=useContext(DataShare)

    var obj = data
    

    useMemo(()=>{
    //   debugger;

        fetchReminders()

    },[])

// For fetching Reminders List

    async function fetchReminders() {

        await axios.get("http://localhost:3002/getReminders")
          .then(response => {
            if (response.status === 200) {
                setData(response.data)
                RemeinderAlert()

            }
          })
         

      }

    const RemeinderAlert=()=>{
        

        data.map((ele)=>{
            let remeinderTime=new Date(ele.time)
            let currentTime= new Date()
            console.log("remeinder time : "+remeinderTime);
            console.log("current time : "+currentTime);
            if (remeinderTime > currentTime) {
                const timeDifference = remeinderTime.getTime() - currentTime.getTime();
                console.log(timeDifference)
                setTimeout(() => {
                    alert(`Reminder: Time to take ${ele.medicine_name}!`);
                    console.log("set timeout called")

                }, timeDifference);
              }
        })
    }
   
    // const notifyReminder = (reminder) => {
    //     const { medicineName } = reminder;
    //     alert(`Reminder: Time to take ${medicineName}!`);

    //     // console.log(`Reminder: Time to take ${medicineName}!`)
    //     toast.info(`Reminder: Time to take ${medicineName}!`, { autoClose: false });
    //   };


    return (
        <>
         <NavBar/>
        <Navigation2/>
        <div className={styles.remeinders}>
          
            {
                data.length>0
                ?
               
                data.map((ele,ind) => 


                   <>
                    <div className={styles.card} key={ind}>
                        <div className={styles.cardbody}>
                            {/* <h4 className="card-title">{ele.medicineName}</h4>
                            <p className="card-text">{ele.description}</p>
                            <p className="card-text">{ele.remeinderTime}</p> */}
                            <p><b>Medicie Name : </b>{ele.medicine_name}</p>
                            <p><b>Description : </b>{ele.descr}</p>
                            <p><b>Remeinder Time : </b>{(ele.time)}</p>

                        </div>
                    </div>
                    
                   </>


                
                )
                :
                <h2>No remeinders are added</h2>

            }
            </div>
        </>

    )
}

export default RemeinderList