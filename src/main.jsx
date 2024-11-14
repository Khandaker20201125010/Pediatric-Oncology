import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Main from './Main/Main';
import Login from './User/Login';
import AllPatients from './Patient/AllPatients';
import PatientDetails from './Patient/PatientDetails';
import Dashboard from './Dashboard/Dashboard';
import AuthProvider from './Providers/AuthProvider';
import PriveteRoutes from './Privetroots/PriveteRoutes';
import { HelmetProvider } from 'react-helmet-async';
import SignUp from './Signup/SignUp';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <div>404 Not found</div>,
    children: [
      {
        path: "/",
        element: <Login />
      },
      {
        path: "/signUp",
        element: <SignUp />
      },
      {
        path: "/allPatients",
        element: <PriveteRoutes><AllPatients /></PriveteRoutes>,
        loader: () => fetch('http://localhost:5000/allPatients')
      },
      {
        path: "/patientDetails/:id",
        element:<PriveteRoutes><PatientDetails /></PriveteRoutes> ,
        loader: ({ params }) => fetch(`http://localhost:5000/allPatients/${params.id}`)
      },
      {
        path: "/dashboard",
        element:<PriveteRoutes><Dashboard /></PriveteRoutes> ,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <HelmetProvider>
   <AuthProvider> <RouterProvider router={router} /></AuthProvider>
   </HelmetProvider> 
  </StrictMode>,
)
