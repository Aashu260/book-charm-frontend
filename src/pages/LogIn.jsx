import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";

const LogIn = () => {
  const [Values, setValues] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({}); // State to handle form errors
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error when user starts typing
  };

  const submit = async () => {
    const newErrors = {};

    // Validation
    if (Values.username.trim() === "") {
      newErrors.username = "Username is required";
    }
    if (Values.password.trim() === "") {
      newErrors.password = "Password is required";
    }

    // If errors exist, update state and stop submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch("https://book-charm-backend.onrender.com/api/v1/log-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Values),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        // Store data in localStorage
        dispatch(authActions.login());
        dispatch(authActions.changeRole(data.role));
        localStorage.setItem("id", data.id); // Use data.id from backend
        localStorage.setItem("token", data.token); // Use data.token from backend
        localStorage.setItem("role", data.role); // Use data.role from backend
        navigate("/");

      } else {
        const errorData = await response.json();
        setErrors({ server: errorData.message || "Login failed." });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ server: "An error occurred. Please try again later." });
    }
  };

  return (
    <div className="h-auto bg-amber-100 px-12 py-24 flex items-center justify-center">
      <div className="bg-neutral-50 shadow-lg shadow-black/50 rounded-lg px-16 py-10">
        <p className="mb-10 text-amber-950 font-semibold text-3xl flex justify-center">
          Log In
        </p>
        <div className="mt-4">
          <div>
            <label>Username</label>
            <input
              type="text"
              className="w-full mt-2 bg-amber-100 text-amber-950 p-2 border-2 border-gray-500 outline-amber-800 outline-offset-2"
              placeholder="username"
              name="username"
              value={Values.username}
              onChange={change}
            />
            {/* Username Error */}
            {errors.username && (
              <p className="text-red-600 text-sm mt-1">{errors.username}</p>
            )}
          </div>
          <div className="mt-8">
            <label>Password</label>
            <input
              type="password" // Change type to "password"
              className="w-full mt-2 bg-amber-100 text-amber-950 p-2 border-2 border-gray-500 outline-amber-800 outline-offset-2"
              placeholder="password"
              name="password"
              value={Values.password}
              onChange={change}
            />
            {/* Password Error */}
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          {/* Server Error */}
          {errors.server && (
            <p className="text-red-600 text-sm mt-4 text-center">
              {errors.server}
            </p>
          )}
          <div className="mt-12 flex justify-center items-center">
            <button
              className="text-amber-950 bg-amber-100 shadow shadow-amber-950 rounded-3xl text-xl font-semibold px-6 py-2 text-center hover:text-white hover:bg-amber-950 hover:scale-110 transition-transform focus:ring-2 focus:ring-gray-200"
              onClick={submit}
            >
              LogIn
            </button>
          </div>
          <p className="flex flex-col mt-10 items-center justify-center text-amber-950 font-semibold">
            Already have an account?
            <Link
              to="/signup"
              className="mt-2 hover:bg-gray-100 hover:scale-110 transition-transform md:hover:bg-transparent"
            >
              <u>SignUp</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
