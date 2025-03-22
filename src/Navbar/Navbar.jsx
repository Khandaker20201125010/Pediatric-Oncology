import React, { useContext } from "react";
import { FaUserDoctor } from "react-icons/fa6";
import { MdDashboardCustomize } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const handelLogOut = () => {
    logOut().then(() => {
      toast.success("Logout toasted!");
    });
  };
  const links = (
    <>
      <li>
        <NavLink
          data-tip="All Patients"
          className={({ isActive }) => {
            return isActive
              ? "font-bold text-blue-900 hover:text-blue-700 tooltip tooltip-warning  text-3xl  tooltip-bottom rounded-full"
              : "font-bold text-teal-900 hover:text-blue-600 tooltip tooltip-warning tooltip-bottom text-3xl";
          }}
          to="/"
        >
          <FaUserDoctor />
        </NavLink>
      </li>

      <li>
        <NavLink
          data-tip="Dashboard"
          className={({ isActive }) => {
            return isActive
              ? "font-bold text-blue-900 hover:text-blue-700 tooltip tooltip-warning  text-3xl  tooltip-bottom rounded-full"
              : "font-bold text-teal-900 hover:text-blue-600 tooltip tooltip-warning tooltip-bottom text-3xl";
          }}
          to="/dashboard"
        >
          <MdDashboardCustomize />
        </NavLink>
      </li>
    </>
  );
  const mlinks = (
    <>
      <li>
        <NavLink
          data-tip="All Patients"
          className={({ isActive }) => {
            return isActive
              ? "font-bold text-blue-900 hover:text-blue-700 tooltip tooltip-warning  text-xl  tooltip-bottom rounded-full"
              : "font-bold text-teal-900 hover:text-blue-600 tooltip tooltip-warning tooltip-bottom text-xl";
          }}
          to="/"
        >
          All Patients
        </NavLink>
      </li>

      <li>
        <NavLink
          data-tip="Dashboard"
          className={({ isActive }) => {
            return isActive
              ? "font-bold text-blue-900 hover:text-blue-700 tooltip tooltip-warning  text-xl  tooltip-bottom rounded-full"
              : "font-bold text-teal-900 hover:text-blue-600 tooltip tooltip-warning tooltip-bottom text-xl";
          }}
          to="/dashboard"
        >
          Dashboard
        </NavLink>
      </li>
      <li>
        {user ? (
          <>
            <button
              className=" btn btn-success btn-sm text-white "
              onClick={handelLogOut}
            >
              Leave
            </button>
          </>
        ) : (
          <>
            <Link to="/">
              <button className="btn btn-success btn-sm text-white">
                Join us
              </button>
            </Link>
          </>
        )}
      </li>
    </>
  );
  return (
    <div className="bg-teal-100">
      <div className="">
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {mlinks}
              </ul>
            </div>
            <a className="ml-10 font-bold text-xl">Pediatric-Oncology</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className=" menu-horizontal gap-5 px-1 text-blue">{links}</ul>
          </div>
          <div className="navbar-end">
            {user ? (
              <>
                <button
                  className=" btn btn-success btn-sm text-white "
                  onClick={handelLogOut}
                >
                  Leave
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="btn btn-success btn-sm text-white">
                    Join 
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
