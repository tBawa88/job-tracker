import { Outlet } from "react-router-dom"
import Wrapper from '../assets/wrappers/Dashboard'
import { BigSidebar, SmallSidbar, Navbar } from "../components"
import { useState, createContext, useContext } from "react"
import { checkDefaultTheme } from "../App"
const DashboardContext = createContext();

const DashBoardLayout = () => {

    //temp, later this will come from server
    const user = { name: 'john' }
    const [showSidebar, setShowSidbar] = useState(false)
    const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme())

    const toggleDarkTheme = () => {
        const newDarkTheme = !isDarkTheme;
        setIsDarkTheme(newDarkTheme);
        document.body.classList.toggle('dark-theme', newDarkTheme)
        localStorage.setItem('dark-theme', newDarkTheme)
        console.log("dark theme toggled")

    }

    const toggleSidebar = () => {
        setShowSidbar(oldState => !oldState)
    }
    const logoutUser = async () => {
        console.log("user logged out")
    }

    return <Wrapper>
        <DashboardContext.Provider
            value={ {
                user,
                showSidebar,
                isDarkTheme,
                toggleDarkTheme,
                toggleSidebar,
                logoutUser
            } }
        >
            <main className="dashboard">
                <SmallSidbar />
                <BigSidebar />
                <div >
                    <Navbar />
                    <div className="dashboard-page">
                        <Outlet />
                    </div>
                </div>
            </main>
        </DashboardContext.Provider>
    </Wrapper>

}

export const useDashboardContext = () => useContext(DashboardContext);
export default DashBoardLayout