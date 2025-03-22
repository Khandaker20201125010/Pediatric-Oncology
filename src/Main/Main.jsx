import { Outlet, useLocation, } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Main = () => {
  const location = useLocation();
  const noHeaderFooter = location.pathname === "/login" || location.pathname === "/signUp";
   
  return (
    <div className="">
    
      {noHeaderFooter || <Navbar></Navbar>}
     
      <Outlet />
    </div>
  );
};

export default Main;
