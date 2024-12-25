import axios from 'axios';
import React, { useState } from 'react';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); 
        setErrorMessage('');
        setResponseMessage('');

        try {
            const response = await axios.post("http://demo-api.syaifur.io/api/register", form, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(response.data)

            if (response.data.code === 201) {
                setResponseMessage(response.data.message);
                setForm({
                    name: '',
                    email: '',
                    password: ''
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
                  title: "Register successfully",
                }).then(() => {
                  navigate("/");
                });
            } else {
                setErrorMessage('Registration failed. Please try again.');
            }
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message || 'Server error occurred');
            } else {
                setErrorMessage('No connection. Please try again later.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="container p-5">
          <div className="max-w-lg mx-auto p-8 rounded-xl shadow-md bg-white flex flex-col items-center gap-6">
            <h1 className="text-2xl sm:text-3xl text-green-400 font-bold">
              Halaman Register
            </h1>

            {responseMessage && (
              <div className="w-full bg-green-200 p-3 rounded-xl text-green-700 font-bold text-center">
                {responseMessage}
              </div>
            )}

            {errorMessage && (
              <div className="w-full bg-red-200 p-3 rounded-xl text-red-700 font-bold text-center">
                {errorMessage}
              </div>
            )}

            <form
              className="flex flex-col gap-4 w-full"
              onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label className="font-bold text-green-400" htmlFor="name">
                  Nama
                </label>
                <input
                  required
                  value={form.name}
                  onChange={handleChange}
                  name="name"
                  id="name"
                  className="px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400 border border-gray-300 outline-none transition duration-200"
                  type="text"
                  placeholder="Nama"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-green-400" htmlFor="email">
                  Email
                </label>
                <input
                  required
                  value={form.email}
                  onChange={handleChange}
                  name="email"
                  id="email"
                  className="px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400 border border-gray-300 outline-none transition duration-200"
                  type="email"
                  placeholder="Email"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-green-400" htmlFor="password">
                  Password
                </label>
                <input
                  required
                  value={form.password}
                  onChange={handleChange}
                  name="password"
                  id="password"
                  className="px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400 border border-gray-300 outline-none transition duration-200"
                  type="password"
                  placeholder="Password"
                />
              </div>

              <p href="#" className="">
                Already have an account?{" "}
                <a
                  className="text-green-400 font-semibold hover:text-green-500"
                  href="/">
                  Login
                </a>
              </p>

              <button
                className={`bg-green-500 w-full py-3 rounded-xl text-white font-bold hover:bg-green-600 transition-all duration-200 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                type="submit"
                disabled={isLoading}>
                {isLoading ? "Registering..." : "Register"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
};

export default RegisterPage;
