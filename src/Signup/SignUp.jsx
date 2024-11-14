import React, { useContext, useRef, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { GiStethoscope } from "react-icons/gi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

const image_hosting_token = import.meta.env.VITE_IMAGE_HOSTING_TOKEN;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const cardRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, updateUserProfile, googleSignIn, facebookSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const imageFile = { image: data.photoURL[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      updateUserProfile(data.name, res.data.data.display_url).then(() => {
        axiosPublic.post("/users", {
          name: data.name,
          email: data.email,
          photo: res.data.data.display_url,
          role: "Guest",
        });
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User created successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/allPatients", { replace: true });
      });
    });
  };
  const handeleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        photo: result.user?.photoURL,
        role: "Guest",
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/allPatients", { replace: true });
      });
    });
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <Helmet>SignUp || Pediatric Oncology</Helmet>
      <div className="relative bg-white shadow-xl rounded-lg p-10 w-full max-w-lg border border-gray-200 mt-16">
        {/* Medical Logo/Icon */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <div className="h-20 w-20 flex items-center justify-center text-teal-500 text-5xl rounded-full border-4 border-white shadow-lg bg-white">
            <GiStethoscope />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center text-teal-700 mt-12 mb-6">
          Pediatric Oncology Sign Up
        </h2>

        <p className="text-gray-500 text-center ">
          Securely access patient data and records.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body bg-transparent relative z-10"
        >
          <h3 className="text-3xl font-bold">Sign Up</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              name="name"
              placeholder="Name"
              className="input input-bordered bg-transparent"
              required
            />
            {errors.name && (
              <span className="text-red-700 font-bold">
                This Name is required
              </span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Upload Photo</span>
            </label>

            <input
              type="file"
              {...register("photoURL", { required: true })}
              placeholder="Click to upload"
              className="w-full file:bg-transparent file-input file-input-bordered bg-transparent"
              required
            />
            {errors.photoURL && (
              <span className="text-red-700 font-bold">
                Photo URL is required
              </span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              name="email"
              placeholder="email"
              className="input input-bordered bg-transparent"
              required
            />
            {errors.email && (
              <span className="text-red-700 font-bold">
                This Email is required
              </span>
            )}
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: true,
                maxLength: 20,
                minLength: 6,
                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
              })}
              name="password"
              placeholder="password"
              className="input input-bordered bg-transparent pr-10"
              required
            />
            <div
              className="absolute inset-y-16 right-0 pr-3 flex items-center cursor-pointer text-blue-900"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FaRegEyeSlash className="text-xl text-white" />
              ) : (
                <FaRegEye className="text-xl text-white" />
              )}
            </div>

            {/* Error messages */}
            {errors.password?.type === "minLength" && (
              <p className="text-red-700">
                Password must be at least 6 characters
              </p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-red-700">
                Password can't exceed 20 characters
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-700">
                Password must include uppercase, lowercase, number, and special
                character
              </p>
            )}
          </div>

          <p className="text-black ">
            Please clink on sign in Button after required fill{" "}
          </p>
          <div>
            <input
              type="submit"
              className="btn bg-teal-900 rounded-md w-40  btn-info text-white text-xl font-bold"
              value="Sign In"
            />
          </div>
        </form>
        <div className="text-center ">
          <h6 className="mb-5">OR</h6>
          <button
            onClick={handeleGoogleSignIn}
            className="w-full p-2 border border-teal-700 hover:bg-teal-200 shadow-md flex justify-center rounded-xl gap-2 text-xl font-bold"
          >
            Google
            <FcGoogle className="text-3xl text-center font-bold" />
          </button>
        </div>
        <div className="mt-5">
          Don't have an account?{" "}
          <button>
            <span className="text-red-500 hover:font-bold">Sign UP</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
