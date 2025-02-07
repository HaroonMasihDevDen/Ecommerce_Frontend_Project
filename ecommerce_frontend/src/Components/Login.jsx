import React, { useState } from "react";
import { useMutation } from 'react-query';
import { AlertCircle } from "lucide-react";
import { login } from '../api/auth';

const Login = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const loginMutation = useMutation(login, {
    onSuccess: () => {
      try {
        const lastLocation = localStorage.getItem('lastLocation');
        localStorage.removeItem('lastLocation');
        if (lastLocation != null) {
          window.location.replace(lastLocation);
        } else {
          window.location.href = '/';
        }
      } catch (error) {
        window.location.href = '/';
      }
    },
    onError: (error) => {
      // Error will be handled by the UI automatically via mutation.error
    }
  });

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation.mutate({
      user: {
        email: enteredEmail,
        password: enteredPassword
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 sm:p-6 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left side - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 space-y-8">
          <div className="text-center">
            <h1
              onClick={() => { window.location = "/"; }}
              className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity"
            >
              GlamourGate
            </h1>
            <p className="mt-3 text-gray-500">Welcome back! Please sign in to continue.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {loginMutation.error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2">
                <AlertCircle size={20} />
                <span>{loginMutation.error.message || "Login failed. Please try again."}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm text-start font-medium text-gray-700 block">Email address</label>
              <input
                type="email"
                required
                value={enteredEmail}
                onChange={(e) => setEnteredEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">Forgot password?</a>
              </div>
              <input
                type="password"
                required
                value={enteredPassword}
                onChange={(e) => setEnteredPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={loginMutation.isLoading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium
                hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out
                flex items-center justify-center"
            >
              {loginMutation.isLoading ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <p className="text-center text-gray-600">
            Not a member?{" "}
            <a href="/register" className="text-indigo-600 hover:text-indigo-500 font-medium">
              Create an account
            </a>
          </p>
        </div>

        {/* Right side - Image */}
        <div className="hidden md:block w-1/2 bg-cover bg-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/10" />
          <img
            src="/ecommerce_store_bg.png"
            alt="Fashion Store"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;