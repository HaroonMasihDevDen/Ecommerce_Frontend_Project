import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { useMutation } from 'react-query';
import { validateToken } from '../api/auth';
import ProductAndCategoryGrid from '../Components/ProductAndCategoryGrid';
import ProductCard from '../Components/ProductCard';

export default function Home() {

  const productItems =
   {
      id: 1,
      name: 'Italian Cotton Shirts',
      price: 599,
      description: 'This is a high-quality Italian cotton shirt.',
      discountPercentage: 20,
      imageUrl: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb',
   }
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
      <div className="p-4 h-[70rem]">
         
        <div className='ProductAndCategoryGrid h-[100%] w-full p-3 '>
          <ProductAndCategoryGrid></ProductAndCategoryGrid>
        </div>
      </div>

    </>
  );
}
