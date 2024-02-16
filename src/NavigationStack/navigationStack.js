

import React, { createContext, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import PostLogin from '../screens/postLoginScreens/postLogin'
import PreLogin from '../screens/preLoginScreens/prelogin'

 export const loginData=createContext()

const NavigationStack = () => {

  const[login,setLogin]=useState(false)
  const[userDetailsFromDB,setUserDetailsFromDB]=useState([])

  function changeLogin(){
    setLogin(true)
  }


  return (
    <>
                <loginData.Provider value={{ changeLogin,userDetailsFromDB,setUserDetailsFromDB,login}}>


            <BrowserRouter>

            {
                login
                ?
                <PostLogin/>
                :
                <PreLogin/>

            }


            </BrowserRouter>
            </loginData.Provider>


    
    </>
  )
}

export default NavigationStack
