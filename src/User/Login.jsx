import { GiStethoscope } from "react-icons/gi";

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="relative bg-white shadow-xl rounded-lg p-10 w-full max-w-lg border border-gray-200">
        {/* Medical Logo/Icon */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <div className="h-20 w-20 flex items-center justify-center text-teal-500 text-5xl rounded-full border-4 border-white shadow-lg bg-white">
            <GiStethoscope />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-teal-700 mt-12 mb-6">
          Pediatric Oncology Login
        </h2>

        {/* Subtitle */}
        <p className="text-gray-500 text-center mb-8">
          Securely access patient data and records.
        </p>

        {/* Form */}
        <form>
          {/* Email Input */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-500 transition duration-300 shadow-md"
          >
            Login
          </button>

          {/* Forgot Password */}
          <div className="text-center mt-4 text-sm">
            <a href="#" className="text-teal-600 hover:underline">
              Forgot Password?
            </a>
          </div>
        </form>

        {/* Footer Links */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            <a href="#" className="hover:underline">
              Terms of Service
            </a>{" "}
            |{" "}
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
