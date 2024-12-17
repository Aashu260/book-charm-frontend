import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateInputs = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasUppercase = /[A-Z]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (Values.username.trim() === "") {
      newErrors.username = "Username is required";
    } else if (Values.username.length < 3) {
      newErrors.username = "Username must be more than 2 characters";
    }

    if (Values.email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(Values.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (Values.password.trim() === "") {
      newErrors.password = "Password is required";
    } else if (Values.password.length < 6) {
      newErrors.password = "Password must be more than 6 characters";
    } else if (!hasUppercase.test(Values.password)) {
      newErrors.password =
        "Password must include at least one uppercase letter";
    } else if (!hasSpecialChar.test(Values.password)) {
      newErrors.password =
        "Password must include at least one special character";
    }

    return newErrors;
  };

  const submit = async () => {
    const newErrors = validateInputs();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch("https://book-charm-backend.onrender.com/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Values),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate("/login");
      } else {
        const errorData = await response.json();
        setErrors({ server: errorData.message || "Signup failed." });
      }
    } catch (error) {
      console.error(error);
      setErrors({ server: "An error occurred. Please try again later." });
    }
  };

  return (
    <div className="h-auto bg-amber-100 px-12 py-24 flex items-center justify-center">
      <div className="bg-neutral-50 shadow-lg shadow-black/50 rounded-lg px-16 py-10">
        <p className="mb-10 text-amber-950 font-semibold text-3xl flex justify-center items-center">
          Sign Up
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
            {errors.username && (
              <p className="text-red-600 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          <div className="mt-8">
            <label>Email</label>
            <input
              type="text"
              className="w-full mt-2 bg-amber-100 text-amber-950 p-2 border-2 border-gray-500 outline-amber-800 outline-offset-2"
              placeholder="email"
              name="email"
              value={Values.email}
              onChange={change}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mt-8">
            <label>Password</label>
            <input
              type="password"
              className="w-full mt-2 bg-amber-100 text-amber-950 p-2 border-2 border-gray-500 outline-amber-800 outline-offset-2"
              placeholder="password"
              name="password"
              value={Values.password}
              onChange={change}
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
          </div>

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
              SignUp
            </button>
          </div>

          <p className="flex flex-col mt-10 items-center justify-center text-amber-950 font-semibold">
            Already have an account?
            <Link
              to="/login"
              className="mt-2 hover:bg-gray-100 hover:scale-110 transition-transform md:hover:bg-transparent"
            >
              <u>LogIn</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
