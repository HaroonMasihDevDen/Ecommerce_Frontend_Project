import React, { useEffect,useState } from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Home() {
  const [userName ,setUserName]=useState(null);
  const [userEmail ,setUserEmail]=useState(null);

  const authenticate_token = async () => {
    alert("token verification function called ");
    try {
      const response = await axios.get("http://localhost:3001/validate_token", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': Cookies.get('Authorization'),
        }
      });

      console.log("token is:", Cookies.get('Authorization'));
      console.log("validate_token action res:", response);
      setUserName(response.data.data.name);
      setUserEmail(response.data.data.email);
      localStorage.setItem("userName",userName);
      localStorage.setItem("userEmail",userEmail);
      // return response.data;
    } catch (error) {
      console.log("Logout error:", error.response?.data);
      // throw new Error(error.response?.data || 'Network response was not ok');
    }
  };

  useEffect(() => {
    authenticate_token();

  }, []);

  return (
    <>
      <div className='navbar'>
        <Navbar userName={userName} userEmail={userEmail} />
      </div>
    </>
  );
}
