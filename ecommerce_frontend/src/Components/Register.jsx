import React, { useState } from "react";
import { register } from '../api/auth';


export default function Register() {
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (enteredPassword !== enteredConfirmPassword) {
      alert('Passwords do not match');
      return;
    }
    const user = {
      user: {
        name: enteredName,
        email: enteredEmail,
        password: enteredPassword,
      }
    };

    try {
      const response = await register(user);
      alert('Registration successful');
      window.location.href = '/login'; // Redirect to login page after registration
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
      alert(`Registration failed: ${errorMessage}`);
    }
  };



  return (
    <>
      <div className="px-[10rem] py-[5rem] flex">
        <div className="flex justify-center w-full border border-2xl shadow-lg">
          <div className="flex min-h-full w-[40%] flex-col justify-center px-8 py-12">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                alt="Your Company"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                className="mx-auto h-10 w-auto"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign up for an account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleRegister} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="flex text-sm font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      onChange={(e) => setEnteredName(e.target.value)}
                      className="flex w-full rounded-md border-0 py-1.5 ps-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="flex text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      onChange={(e) => setEnteredEmail(e.target.value)}
                      className="flex w-full rounded-md border-0 py-1.5 ps-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="flex text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      onChange={(e) => setEnteredPassword(e.target.value)}
                      className="flex w-full rounded-md border-0 py-1.5 ps-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirm-password"
                    className="flex text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      required
                      onChange={(e) => setEnteredConfirmPassword(e.target.value)}
                      className="flex w-full rounded-md border-0 py-1.5 ps-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    // onClick={handleRegister}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign up
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Sign in
                </a>
              </p>
            </div>
          </div>
          <div className="slider flex min-h-full flex-1 flex-col justify-center">
            <img
              alt="Ecommerce Store"
              src="/ecommerce_store_bg.png"
              className="mx-auto h-full w-auto"
            />
          </div>
        </div>
      </div>
    </>
  );
};