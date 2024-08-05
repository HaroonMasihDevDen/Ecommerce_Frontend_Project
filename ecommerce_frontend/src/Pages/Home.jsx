import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { useMutation } from 'react-query';
import { validateToken } from '../api/auth';

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
        {isUserLoggedIn !== null && (
          <Navbar userName={userName} userEmail={userEmail} is_User_Logged_In={isUserLoggedIn} />
        )}
      </div>
    </>
  );
}
