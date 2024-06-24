import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './utils/customFetch'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {
  DashboardLayout,
  ErrorPage,
  HomeLayout,
  Landing,
  Login,
  Register,
  AddJob,
  AllJobs,
  Stats,
  Profile,
  Admin,
  EditJob
} from './pages'
import { loader as registerLoader } from './pages/Register';
import { action as registerAction } from './pages/Register'
import { action as loginAction } from './pages/Login';
import { loader as loginLoader } from './pages/Login'
import { action as logoutAction } from './pages/DashboardLayout';
import { loader as dashboardLoader } from './pages/DashboardLayout'
import { action as addJobAction } from './pages/AddJob';

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
        element: <Login />,
        loader: loginLoader,
        action: loginAction
      },
      {
        path: 'logout',
        action: logoutAction
      },

      {
        path: 'register',
        element: <Register />,
        loader: registerLoader,
        action: registerAction
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
          },
          {
            path: 'all-jobs',
            element: <AllJobs />
          },
          {
            path: 'edit-job/:id',
            element: <EditJob />
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
      <QueryClientProvider client={ queryClient }>
        <RouterProvider router={ router } />
        <ToastContainer position='top-right' />
      </QueryClientProvider>
    </>
  )
}

export default App
