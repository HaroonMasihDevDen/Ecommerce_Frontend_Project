import React, { useState } from "react";
import { useMutation } from 'react-query';
import Cookies from 'js-cookie';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook



export default function Login() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  // const navigate = useNavigate();

  const mutation = useMutation(async (userData) => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        user: userData,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      console.log("res:", response.data);
      console.log("res.body:", response.data.body);
  
      // Assuming the token is in the 'Authorization' header
      const token = response.headers['authorization'];
      if (token) {
        Cookies.set('Authorization', token); // Store the token in cookies
        alert("Session token stored in Cookies successfully");
        let userName=response.data.status.data.user["name"];
        let userEmail=response.data.status.data.user["email"];
        // alert(userName);
        // alert(response.data["email"]);
        localStorage.setItem("userName",userName);
        localStorage.setItem("userEmail",userEmail);
      } else {
        alert("Authorization is missing in response headers");
      }

  
      alert("User successfully logged in");
      // navigate('/'); 
      window.location.href = '/';
      return response.data;
    } catch (error) {
      console.log("res in failure:", error.response?.data);
      alert(error || error.response?.data || 'Network response was not ok');
      throw new Error('Network response was not ok');
    }
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ email: enteredEmail, password: enteredPassword });
  };
  
  return (
    <>
    
      <div class="px-[10rem] py-[5rem] flex  ">
        <div class="flex justify-center w-full border border-2xl shadow-lg">
          <div className="flex min-h-full w-[40%] flex-col justify-center px-8 py-12 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                alt="Your Company"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                className="mx-auto h-10 w-auto"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleSubmit} method="POST" className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900 flex"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      onChange={(e) => setEnteredEmail(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 ps-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      autoComplete="current-password"
                      onChange={(e) => setEnteredPassword(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 ps-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div class="lx zg zm flex">
                  <div class="lx zg">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      class="oc se adw agc ayn bnu"
                    />
                    <label for="remember-me" class="jw lu awg awv axz ms-2">
                      Remember me
                    </label>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  
                  >
                    Sign in
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?{" "}
                <a
                  href="#"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Sign up
                </a>
              </p>
              {/* <button onClick={logoutAction}>Logout</button> */}
            </div>
          </div>
          <div className="slider flex min-h-full flex-1 flex-col justify-center">
            <img
              alt="Ecommerce Store"
              src="/ecommerce_store_bg.png"
              // src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-full w-auto"
            />
          </div>
        </div>
      </div>
    </>
  );
}
