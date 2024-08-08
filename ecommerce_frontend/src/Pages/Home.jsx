import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { useMutation } from 'react-query';
import { validateToken } from '../api/auth';
import ProductAndCategoryGrid from '../Components/ProductAndCategoryGrid';

export default function Home() {
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

  const validateTokenMutation = useMutation(validateToken, {
    onSuccess: (data) => {
      const { name, email } = data.data;
      setUserName(name);
      setUserEmail(email);
      setIsUserLoggedIn(true);
      localStorage.setItem("userName", name);
      localStorage.setItem("userEmail", email);
    },
    onError: (error) => {
      console.error("Token validation error:", error.message);
      setUserName(null);
      setUserEmail(null);
      setIsUserLoggedIn(false);
    }
  });

  useEffect(() => {
    validateTokenMutation.mutate();
  }, []);

  return (
    <>
      <div className='navbar'>
        <Navbar></Navbar>
        {/* {isUserLoggedIn !== null && (
          <Navbar userName={userName} userEmail={userEmail} is_User_Logged_In={isUserLoggedIn} />
        )} */}
      </div>
      <div className="header">
        this is the headers
      </div>
      <div className="main-content">
         
        <div className='ProductAndCategoryGrid h-full w-full'>
          <ProductAndCategoryGrid></ProductAndCategoryGrid>

        </div>
      </div>

    </>
  );
}
