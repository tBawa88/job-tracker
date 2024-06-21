import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  ErrorPage,
  HomeLayout,
  Landing,
  Login,
  Register,
  AddJob,
  AllJobs,
  Stats,
  Profile,
  Admin
} from './pages'
import DashBoardLayout from './pages/DashboardLayout'

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('dark-theme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme)
  return isDarkTheme;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Landing />
      },
      {
        path: 'login',
        element: <Login />
      },

      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'dashboard',
        element: <DashBoardLayout />,
        children: [
          {
            index: true,
            element: <AddJob />
          },
          {
            path: 'all-jobs',
            element: <AllJobs />
          },
          {
            path: 'stats',
            element: <Stats />
          },
          {
            path: 'profile',
            element: <Profile />
          },
          {
            path: 'admin',
            element: <Admin />
          }
        ]
      },
    ]
  },


])




function App() {
  return (
    <>
      <RouterProvider router={ router } />
    </>
  )
}

export default App
