import React, { useState, useRef, useEffect } from 'react';
import { LogIn, UserPlus, Search, ShoppingCart, User, ChevronDown, ShoppingBag, Settings, LogOut, X } from 'lucide-react';
import { getCartItemCount } from '../api/cart';
import Cookies from "js-cookie";
import { validateToken } from '../api/auth';

export default function Navbar({ searchProducts }) {
   const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);
   const [isUserLoggedIn, setIUserLoggedIn] = useState(false);
   const [userName, setUserName] = useState(null);
   const [userEmail, setUserEmail] = useState(null);
   const [searchQuery, setSearchQuery] = useState("");
   const userDropdownRef = useRef(null);
   const containerRef = useRef(null);
   const [cartItemCount, setCartItemCount] = useState(0);


   useEffect(() => {
      validateTokenForCheckUserSession();
   }, []);

   useEffect(() => {
      function fetchCartItemCount() {
         getCartItemCount().then((itemCount) => {
            setCartItemCount(itemCount);
         });
      }
      fetchCartItemCount();
   }, []);

   const validateTokenForCheckUserSession = async () => {
      const res = await validateToken();
      if (res) {
         setIUserLoggedIn(true);
         setUserName(localStorage.getItem('userName'));
         setUserEmail(localStorage.getItem('userEmail'));
      } else {
         setUserName(null);
         setUserEmail(null);
         setIUserLoggedIn(false);
      }
   };

   const toggleUserPanel = () => {
      setIsUserPanelOpen(!isUserPanelOpen);
   };

   const endUserSession = () => {
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      setIUserLoggedIn(false);
      Cookies.remove('Authorization');
      window.location = '/';
   };

   const handleSearch = (e) => {
      e.preventDefault();
      searchProducts(searchQuery);
   };

   return (
      <div className="sticky top-0 z-50  backdrop-blur-md">
         <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
               {/* Logo */}
               <div className="flex-shrink-0">
                  <a href="/" className="text-2xl font-bold text-blue-600" style={{ fontFamily: 'cursive' }}>
                     GlamourGate
                  </a>
               </div>

               {/* Navigation Links */}
               {/* <div className="hidden md:flex items-center space-x-8">
                  <NavLink href="/" label="Home" />
                  <NavLink href="/new-arrivals" label="New Arrivals" />
                  <NavLink href="/about" label="About" />
               </div> */}

               {/* Search Bar */}
               <div className="flex-1 max-w-md mx-4">
                  <form onSubmit={handleSearch} className="relative">
                     <input
                        type="text"
                        className="w-full bg-white border rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                     />
                     <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </form>
               </div>

               {/* Right Section */}
               <div className="flex items-center space-x-6">
                  {/* Cart Icon */}
                  {isUserLoggedIn ? (
                     <>
                        <button
                           onClick={() => { window.location = "/cart" }}
                           className="relative p-2 rounded-full transition-colors"
                        >
                           <ShoppingCart className="h-6 w-6 text-gray-600" />
                           <span className="absolute top-0 right-0 h-5 w-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                              {cartItemCount}
                           </span>
                        </button>

                        <div className="relative">
                           <button
                              onClick={toggleUserPanel}
                              className="flex items-center space-x-2 p-2 rounded-lg transition-colors"
                           >
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                 <span className="text-blue-600 font-medium">
                                    {userName?.[0]?.toUpperCase()}
                                 </span>
                              </div>
                              <ChevronDown className="h-4 w-4 text-gray-600" />
                           </button>

                           {isUserPanelOpen && (
                              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 border">
                                 {/* Close button */}
                                 <button
                                    onClick={() => setIsUserPanelOpen(false)}
                                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
                                    aria-label="Close menu"
                                 >
                                    <X size={18} />
                                 </button>

                                 <div className="px-4 py-2 border-b">
                                    <p className="font-medium text-gray-900 pr-6 capitalize">{userName}</p>
                                    <p className="text-sm text-gray-500">{userEmail}</p>
                                 </div>

                                 {/* Profile Link */}
                                 <a
                                    href="/profile"
                                    className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                 >
                                    <User size={16} className="mr-3 text-gray-500" />
                                    My Profile
                                 </a>

                                 {/* Orders Link */}
                                 <a
                                    href="/orders"
                                    className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                 >
                                    <ShoppingBag size={16} className="mr-3 text-gray-500" />
                                    My Orders
                                 </a>

                                 {/* Settings Link */}
                                 <a
                                    href="/settings"
                                    className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                 >
                                    <Settings size={16} className="mr-3 text-gray-500" />
                                    Settings
                                 </a>

                                 {/* Sign Out Button */}
                                 <button
                                    onClick={endUserSession}
                                    className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                 >
                                    <LogOut size={16} className="mr-3" />
                                    Sign Out
                                 </button>
                              </div>
                           )}
                        </div>
                     </>
                  ) : (
                     <div className="flex items-center space-x-3">
                        <button
                           onClick={() => { window.location = "/login" }}
                           className="flex border items-center space-x-1 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                           <LogIn className="h-4 w-4" />
                           <span>Sign In</span>
                        </button>
                        <button
                           onClick={() => { window.location = "/register" }}
                           className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                           <UserPlus className="h-4 w-4" />
                           <span>Sign Up</span>
                        </button>
                     </div>
                  )}
               </div>
            </div>
         </nav>
      </div>
   );
}

// Helper Components
const NavLink = ({ href, label }) => (
   <a
      href={href}
      className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium relative group"
   >
      {label}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform" />
   </a>
);

const NavDropdownLink = ({ href, label }) => (
   <a
      href={href}
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
   >
      {label}
   </a>
);