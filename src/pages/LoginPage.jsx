import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);


const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://demo-api.syaifur.io/api/login",
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

     const authToken = response.data.data.token;
     localStorage.setItem("authToken", authToken);
    

      if (response.data.code === 200) {
        setResponseMessage(response.data.message);
        setForm({
          email: "",
          password: "",
        });

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        }).then(() => {
          navigate("/dashboard");
        })
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || "Server error occurred");
      } else {
        setErrorMessage("No connection. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center ">
      <div className="container p-5 ">
        <div className="max-w-md mx-auto p-6 rounded-2xl bg-white shadow-md flex flex-col items-center gap-5">
          <h1 className="text-2xl sm:text-3xl text-green-400 font-bold">
            Login
          </h1>

          {responseMessage && (
            <div className="bg-green-200 p-3 rounded-xl text-green-700 font-bold w-full text-center">
              {responseMessage}
            </div>
          )}

          {errorMessage && (
            <div className="bg-red-200 p-3 rounded-xl text-red-700 font-bold w-full text-center">
              {errorMessage}
            </div>
          )}

          <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-green-400" htmlFor="email">
                Email
              </label>
              <input
                required
                value={form.email}
                onChange={handleChange}
                name="email"
                className="px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 border border-gray-300 outline-none transition duration-200 w-full"
                type="email"
                placeholder="Email"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-green-400" htmlFor="password">
                Password
              </label>
              <input
                required
                value={form.password}
                onChange={handleChange}
                name="password"
                className="px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 border border-gray-300 outline-none transition duration-200 w-full"
                type="password"
                placeholder="Password"
              />
            </div>

            <p href="#" className="">
              don&apos;t have an account?{" "}
              <a className="text-green-400 font-semibold hover:text-green-500" href="/register">
                Register
              </a>
            </p>

            <button
              className={`bg-green-500 px-4 py-3 rounded-xl text-white font-bold hover:bg-green-600 transition-all duration-200 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={isLoading}>
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
