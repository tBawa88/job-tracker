import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './utils/customFetch'
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
  Admin
} from './pages'
import { action as registerAction } from './pages/Register'


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
        element: <Register />,
        action: registerAction
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
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
      <QueryClientProvider client={ queryClient }>
        <RouterProvider router={ router } />
      </QueryClientProvider>
    </>
  )
}

export default App
