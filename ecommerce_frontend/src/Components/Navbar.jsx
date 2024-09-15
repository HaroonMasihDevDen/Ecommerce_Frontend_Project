import React, { useState, useRef, useEffect } from 'react'
import { validateToken } from '../api/auth';
import CategoryCard from './CategoryNestedList';
import { BiShoppingBag } from "react-icons/bi";
import Cookies from "js-cookie";


export default function Navbar() {
   const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);
   const [isUserLoggedIn, setIUserLoggedIn] = useState(false);
   const userDropdownRef = useRef(null);
   const [userName, setUserName] = useState(null);
   const [userEmail, setUserEmail] = useState(null);

   const validateTokenForCheckUserSession = async () => {
      const res = await validateToken();
      if (res) {
         setIUserLoggedIn(true);
         setUserName(localStorage.getItem('userName'));
         setUserEmail(localStorage.getItem('userEmail'));
      }
      else {
         setUserName(null);
         setUserEmail(null);
         setIUserLoggedIn(false);
      }

   };


   const openUserPanel = () => {
      setIsUserPanelOpen(true);
      if (userDropdownRef.current) {
         userDropdownRef.current.classList.remove('hidden');
      }
   };
   const closeUserPanel = () => {
      setIsUserPanelOpen(false);
      if (userDropdownRef.current) {
         userDropdownRef.current.classList.add('hidden');
      }
   };

   useEffect(() => {
      validateTokenForCheckUserSession();
   });

   const showCategoriesInNavBar = () => {
      alert("show categories in navigation bar");
   };

   const endUserSession = () => {
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      setIUserLoggedIn(false);
      Cookies.remove('Authorization');
      alert("User Log Out Successfully");
   };

   return (
      <div>
         <header className="antialiased">
            <nav className="bg-pile-300 text-white border-gray-200 px-4 lg:px-6 py-2 dark:bg-gray-800">
               <div className="flex flex-wrap justify-between items-center ">
                  <div className="flex justify-start items-center">

                     <a href="https://flowbite.com" className="flex mr-4">
                        {/* <img src="/logo1.png" className="mr-3 h-8" alt="Aurora Logo" /> */}
                        <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white" style={{ fontFamily: 'cursive' }}>Aurora</span>
                     </a>
                     <form action="#" method="GET" className="hidden lg:block lg:pl-2">
                        <label htmlFor="topbar-search" className="sr-only">Search</label>

                        <div className="relative mt-1 lg:w-96">
                           <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" /> </svg>
                           </div>
                           <input type="text" name="product" id="topbar-search" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-9 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" />
                        </div>
                     </form>
                  </div>
                  <div className='flex' >
                     <div className=''>
                        <ul className='bg-transparent font-medium text-lg text-white flex flex-row gap-x-10 py-1' style={{ fontFamily: 'Helvetica' }}>
                           <li>
                              <button className='text-white transition-all ease-in-out hover:border-b' onClick={() => { window.location = "/" }}>
                                 Home
                              </button>
                           </li>
                           <li>
                              <button className='text-white transition-all ease-in-out hover:border-b'
                                 // onMouseEnter={showCategoriesInNavBar}
                                 onClick={showCategoriesInNavBar}>
                                 <label htmlFor="" className='cursor-pointer'>
                                    Categories
                                 </label>
                                 {/* <CategoryCard /> */}
                              </button>
                           </li>
                           <li>
                              <button className='text-white transition-all ease-in-out hover:border-b'>
                                 About
                              </button>
                           </li>


                           {isUserLoggedIn === true ? (
                              <>
                                 <li>
                                    <div className="flex items-center lg:order-2">
                                       {/* <button type="button" className="hidden sm:inline-flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"><svg aria-hidden="true" className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg> New Widget</button> */}
                                       <button id="toggleSidebarMobileSearch" type="button" className="p-2 text-gray-500 rounded-lg lg:hidden hover:text-gray-900 hover:bg-green-400 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                          <span className="sr-only">Search</span>
                                          {/* <!-- Search icon --> */}
                                          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                          </svg>
                                       </button>

                                       <button type="button" onClick={openUserPanel} className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="dropdown">
                                          <span className="sr-only">Open user menu</span>
                                          <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo" />
                                       </button>
                                       {/* <!-- Dropdown menu --> */}
                                       <div ref={userDropdownRef} className=" hidden text-end animate-fadeinup  bg-pile-50 absolute end-6 top-14 z-50 my-4 w-56  list-none rounded rounded-t-md divide-y divide-gray-300 shadow-2xl dark:bg-gray-700 dark:divide-gray-600">
                                          <div className="bg-pile-700 pe-3 rounded-t-md">
                                             <button
                                                onClick={closeUserPanel}
                                                className="text-white ps-2 hover:text-gray-400 dark:text-gray-400 dark:hover:text-white"
                                             >
                                                <i className="fas fa-times"></i>
                                             </button>

                                          </div>
                                          <div className="py-3 px-4 text-center">
                                             <span className="block text-sm font-semibold text-gray-900 dark:text-white">{userName}</span>
                                             <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{userEmail}</span>
                                          </div>
                                          <ul className="text-start py-1 text-gray-500 dark:text-gray-400" aria-labelledby="dropdown">
                                             <li>
                                                <a href="#" className="block py-2 px-4 text-sm hover:bg-pile-400 hover:text-white  dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">My profile</a>
                                             </li>
                                             <li>
                                                <a href="#" className="block py-2 px-4 text-sm hover:bg-pile-400 hover:text-white dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">Account settings</a>
                                             </li>
                                          </ul>
                                          <ul className="py-1 text-gray-500 dark:text-gray-400" aria-labelledby="dropdown">
                                             <li>
                                                <a href="/cart" className="flex items-center py-2 px-4 text-sm hover:bg-pile-400 hover:text-white dark:hover:bg-gray-600 dark:hover:text-white">
                                                   <i className="fa fa-shopping-cart pe-2" aria-hidden="true"></i>
                                                   Cart
                                                </a>
                                             </li>
                                             <li>
                                                <a href="#" className="flex items-center py-2 px-4 text-sm hover:bg-pile-400 hover:text-white dark:hover:bg-gray-600 dark:hover:text-white">
                                                   <svg className="mr-2 w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"> <path d="m1.56 6.245 8 3.924a1 1 0 0 0 .88 0l8-3.924a1 1 0 0 0 0-1.8l-8-3.925a1 1 0 0 0-.88 0l-8 3.925a1 1 0 0 0 0 1.8Z" /> <path d="M18 8.376a1 1 0 0 0-1 1v.163l-7 3.434-7-3.434v-.163a1 1 0 0 0-2 0v.786a1 1 0 0 0 .56.9l8 3.925a1 1 0 0 0 .88 0l8-3.925a1 1 0 0 0 .56-.9v-.786a1 1 0 0 0-1-1Z" /> <path d="M17.993 13.191a1 1 0 0 0-1 1v.163l-7 3.435-7-3.435v-.163a1 1 0 1 0-2 0v.787a1 1 0 0 0 .56.9l8 3.925a1 1 0 0 0 .88 0l8-3.925a1 1 0 0 0 .56-.9v-.787a1 1 0 0 0-1-1Z" /> </svg>
                                                   Collections
                                                </a>
                                             </li>
                                             <li>
                                                <a href="#" className="flex justify-between items-center py-2 px-4 text-sm hover:bg-pile-400 hover:text-white dark:hover:bg-gray-600 dark:hover:text-white">
                                                   <span className="flex items-center">
                                                      <svg className="mr-2 w-4 h-4 text-primary-600 dark:text-primary-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"><path d="m7.164 3.805-4.475.38L.327 6.546a1.114 1.114 0 0 0 .63 1.89l3.2.375 3.007-5.006ZM11.092 15.9l.472 3.14a1.114 1.114 0 0 0 1.89.63l2.36-2.362.38-4.475-5.102 3.067Zm8.617-14.283A1.613 1.613 0 0 0 18.383.291c-1.913-.33-5.811-.736-7.556 1.01-1.98 1.98-6.172 9.491-7.477 11.869a1.1 1.1 0 0 0 .193 1.316l.986.985.985.986a1.1 1.1 0 0 0 1.316.193c2.378-1.3 9.889-5.5 11.869-7.477 1.746-1.745 1.34-5.643 1.01-7.556Zm-3.873 6.268a2.63 2.63 0 1 1-3.72-3.72 2.63 2.63 0 0 1 3.72 3.72Z" /></svg>
                                                      Pro version
                                                   </span>
                                                   <svg className="w-2.5 h-2.5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" /></svg>
                                                </a>
                                             </li>
                                          </ul>
                                          <ul className="py-1 text-gray-500 text-center dark:text-gray-400" aria-labelledby="dropdown">
                                             <li className='scursor-pointer' onClick={endUserSession} >
                                                <a className="block py-2 px-4 text-sm cursor-pointer hover:bg-pile-400 hover:text-white dark:hover:bg-gray-600 dark:hover:text-white">
                                                   Sign out
                                                </a>
                                             </li>
                                          </ul>
                                       </div>
                                    </div>



                                 </li>
                                 <li><div className=' me-4'>
                                    <span className='relative bg-blue-300'>
                                       {/* <span className='ms-1 text-xs absolute text-gray-900 px-1 rounded-full bg-red-200'>

                                            </span> */}
                                       <span>
                                          <BiShoppingBag className='text-3xl text-pile-50 cursor-pointer' onClick={() => { window.location = "/cart" }} />
                                       </span>

                                    </span>
                                 </div></li>
                              </>

                           ) : (
                              <>
                                 <li>

                                    <button className='text-white transition-all ease-in-out hover:border-b'
                                       onClick={() => { window.location = "/login" }}>
                                       <label htmlFor="" className='cursor-pointer'>
                                          Sign In
                                       </label>
                                       {/* <CategoryCard /> */}
                                    </button>




                                 </li>
                                 <li>
                                    <button className='text-white transition-all ease-in-out hover:border-b'
                                       onClick={() => { window.location = "/register" }}>
                                       <label htmlFor="" className='cursor-pointer'>
                                          Sign Up
                                       </label>
                                       {/* <CategoryCard /> */}
                                    </button>
                                 </li>
                              </>
                           )}
                        </ul>
                     </div>
                  </div>
               </div>
            </nav>
         </header>
      </div >
   )
}
