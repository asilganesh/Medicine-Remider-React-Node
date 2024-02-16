import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./index.module.css"
import { Link } from 'react-router-dom';




const NavBar = () => {



    return (
        <>
           
                <div className={styles.containerfluid}>
                    <ul className={styles.navbar_nav}>
                        <li className="nav-item">
                            <Link  to="/" className="nav-link" >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link  to="/about"   className="nav-link" >
                                About Us
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link  to="/setting"className="nav-link" >
                                Settings
                            </Link>
                        </li>
                    </ul>
                    <h1 className={styles.name}>
                       + Medicine Remeinder Web
                    </h1>
                </div>
               
                
         


        </>
    )
}

export default NavBar