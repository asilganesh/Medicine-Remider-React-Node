
import { Link } from "react-router-dom"


const IvalidScreenBeforeLogin=()=>{

    return(

        <>
        <h1>This invalid page</h1>
        <Link to="/login"> <button>Back to Login</button></Link>
        </>
    )

}

export default IvalidScreenBeforeLogin