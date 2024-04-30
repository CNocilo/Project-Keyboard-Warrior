import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../components/AuthContext'

const UserPage = () => {
  const [userData, setUserData] = useState("")
  const { isAuthenticated, username } = useContext(AuthContext);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/userinfo?username=${username}`); // Replace with your API endpoint

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData()
  }, []);

  return (
    <section className="bg-cyan-400 p-[5%]">
      <div className="bg-yellow-100 rounded-md p-[3%]">
        <h1 className="font-mono text-lg">Username: {username}</h1>
        

      </div>

    </section>
  )
}

export default UserPage