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
        path: "/allPatients",
        element: <AllPatients />,
        loader: () => fetch('http://localhost:5000/allPatients')
      },
      {
        path: "/patientDetails/:id",
        element: <PatientDetails />,
        loader: ({ params }) => fetch(`http://localhost:5000/allPatients/${params.id}`)
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
