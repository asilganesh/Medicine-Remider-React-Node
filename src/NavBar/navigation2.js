
import { Link } from "react-router-dom"
import styles from "./index.module.css"


const Navigation2 = () => {

    return (
        
        <>

        <div className={styles.Switch}>
            <div className={styles.RemeinderList}>
            <Link to="/" className="nav-link" >
                               Medicine Remeinders List
                            </Link>
            </div>
            <div className={styles.AddToRemeinder}>
            <Link to="/addReminder"className="nav-link" >
                                Add Medicine
                            </Link>

            </div>
     
            
                            
                   
                     
                         
        </div>
                     



        </>

    )
}

export default Navigation2