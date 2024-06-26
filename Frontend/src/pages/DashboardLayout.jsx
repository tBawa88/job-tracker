import { Outlet, redirect, useSubmit, useFetcher } from "react-router-dom"
import Wrapper from '../assets/wrappers/Dashboard'
import { BigSidebar, SmallSidbar, Navbar } from "../components"
import { useState, useEffect, createContext, useContext } from "react"
import { checkDefaultTheme } from "../App"
import { useQuery } from "@tanstack/react-query"
import { getCurrentUser } from "../utils/httpHelpers"
import customFetch from "../utils/customFetch"
import { toast } from "react-toastify"


const DashboardContext = createContext();
let firstMount = true;
const ONE_DAY = 24 * 60 * 60 * 1000;
const DashBoardLayout = () => {
    // const submit = useSubmit();
    useEffect(() => {
        if (!firstMount)
            return;
        firstMount = false;
        setTimeout(() => {  //auto logout after one day
            logoutUser();
        }, ONE_DAY)
    });

    let user, isTestUser;
    const fetcher = useFetcher();
    const [showSidebar, setShowSidbar] = useState(false)
    const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme())

    const { data } = useQuery({
        queryKey: ['user'],
        queryFn: getCurrentUser,
        staleTime: 5000,
        onError: () => {
            fetcher.submit(null, { method: 'POST', action: '/logout' })
        }
    })
    if (data) {
        user = data.user;
        isTestUser = data.isTestUser;
    }

    const toggleDarkTheme = () => {
        const newDarkTheme = !isDarkTheme;
        setIsDarkTheme(newDarkTheme);
        document.body.classList.toggle('dark-theme', newDarkTheme)
        localStorage.setItem('dark-theme', newDarkTheme)

    }

    const toggleSidebar = () => {
        setShowSidbar(oldState => !oldState)
    }
    const logoutUser = async () => {
        fetcher.submit(null, { method: 'POST', action: '/logout' })
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
                        <Outlet context={ user } />
                    </div>
                </div>
            </main>
        </DashboardContext.Provider>
    </Wrapper>

}

export const useDashboardContext = () => useContext(DashboardContext);
export default DashBoardLayout;

//checking if user is logged in before loading /dashboard
export const loader = async () => {
    try {
        const response = await customFetch.get('/auth/status');
        if (!response.data.authenticated) {
            toast.error("User not Logged in", { autoClose: 2000 })
            return redirect('/login')
        }
        return null;
    } catch (error) {
        toast.error("Error while checking user status, Pls Login")
        return redirect('/login')
    }
}

//logout action
export const action = async () => {
    try {
        await customFetch.post('/auth/logout');
        toast.success('Logged Out')
        return redirect('/login')
    } catch (error) {
        toast.error('Error loggin out')
        return null;
    }
}