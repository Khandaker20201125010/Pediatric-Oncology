import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Main from './Main/Main';
import Login from './User/Login';
import AllPatients from './Patient/AllPatients';
import PatientDetails from './Patient/PatientDetails';
import Dashboard from './Dashboard/Dashboard';
import AuthProvider from './Providers/AuthProvider';
import PriveteRoutes from './Privetroots/PriveteRoutes';
import { HelmetProvider } from 'react-helmet-async';
import SignUp from './Signup/SignUp';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UpdatePatient from './Main/updatePatient/updatePatient';
import Error from './Eorror/Error';
import ViewAllPatients from './ViewallPatients/ViewAllPatients';

// Create an instance of QueryClient
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <Error   />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signUp',
        element: <SignUp />,
      },
      {
        path: '/',
        element: <AllPatients />,
        // loader: () => fetch('https://pediatric-oncology-server.vercel.app/allPatients'),
      },
      {
        path: '/updatePatient/:id',
        element: <PriveteRoutes><UpdatePatient /></PriveteRoutes>,
      
      },
      {
        path: '/patientDetails/:id',
        element: <PriveteRoutes><PatientDetails /></PriveteRoutes>,
        loader: ({ params }) => fetch(`https://pediatric-oncology-server.vercel.app/allPatients/${params.id}`),
      },
      {
        path: '/dashboard',
        element: <PriveteRoutes><Dashboard /></PriveteRoutes>,
      },
      {
        path: '/viewPatient',
        element: <PriveteRoutes><ViewAllPatients></ViewAllPatients></PriveteRoutes>,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Use the created queryClient instance here */}
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </StrictMode>
);
