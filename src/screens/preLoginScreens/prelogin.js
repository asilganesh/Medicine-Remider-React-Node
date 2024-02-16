

import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginScreen from './Login'
import RegisterScreen from './Register'
import IvalidScreenBeforeLogin from './invalidScreen'

const PreLogin = () => {
  return (
    <>
      <Routes>
         <Route path="/" Component={RegisterScreen} />

        <Route path="/login" Component={LoginScreen} />

        <Route path="/*" Component={IvalidScreenBeforeLogin} />



      </Routes>

    </>
  )
}

export default PreLogin
