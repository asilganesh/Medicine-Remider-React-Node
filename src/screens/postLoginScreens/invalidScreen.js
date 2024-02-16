import { Link } from "react-router-dom"


const IvalidScreenAfterLogin=()=>{

    return(

        <>
        <h1>This invalid page</h1>
        <Link to="/"> <button>Back to Home</button></Link>
        </>
    )

}

export default IvalidScreenAfterLogin