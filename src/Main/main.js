import { BrowserRouter, Route, Routes } from "react-router-dom"
import RemeinderList from "../RemeinderList/RemeinderList"
import AddMedicine from "../AddMedicine.js/AddMedicine"
import { createContext, useState } from "react"
import AboutScreen from "../screens/postLoginScreens/aboutScreen"
import SettingScreen from "../screens/postLoginScreens/settingScreen"
import IvalidScreenAfterLogin from "../screens/postLoginScreens/invalidScreen"


export const DataShare = createContext()

const MainComponent = () => {

    const [data, setData] = useState([])

    const settingData = (newData) => {
        // setData([...data, newData])
    }

    return (
        <>
            <DataShare.Provider value={{ settingData, data,setData }}>

                <Routes>

                    <Route path="/" Component={RemeinderList} />
                    <Route path="/addReminder" Component={AddMedicine} />
                    <Route path='/about' Component={AboutScreen} />
                    <Route path='/setting' Component={SettingScreen} />
                    <Route path="/addReminder" Component={AddMedicine} />

                    <Route path="/*" Component={IvalidScreenAfterLogin} />

                </Routes>

            </DataShare.Provider>

        </>

    )
}

export default MainComponent