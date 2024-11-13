
import { Navigate, useLocation } from "react-router-dom";

import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProvider";
import { useContext } from "react";

const PriveteRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="circ h-screen">
        <div className="load">Loading . . . </div>
        <div className="hands"></div>
        <div className="body"></div>
        <div className="head">
          <div className="eye"></div>
        </div>
      </div>
    );
  }

  if (user) {
    return children;
  }

  // Show alert before redirecting to login page
  Swal.fire({
    icon: "warning",
    title: "Please Login",
    text: "You need to log in to view this page.",
    showConfirmButton: true,
    timer: 3000,
  });

  return <Navigate state={{ from: location }} to="/" replace />;
};

export default PriveteRoutes;