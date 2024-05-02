import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../components/AuthContext'
import ReactCountryFlag from 'react-country-flag'
import countriesData from '../countries.json'

const UserPage = () => {
  const [userData, setUserData] = useState("")
  const [userHistory, setUserDHistory] = useState("")
  const { isAuthenticated, username } = useContext(AuthContext);

  let parsedCountries;
  if (typeof countriesData === 'string') {
    parsedCountries = JSON.parse(countriesData);
  } else {
    parsedCountries = countriesData;
  }
  const countriesArray = parsedCountries.countries;

  const fetchUserData = async () => {
    try {

      if (!username) {
        console.error('Username not available.')
        return;
      }

      const response = await fetch(`http://localhost:8000/api/userinfo?username=${username}`); // Replace with your API endpoint
      const responseHistory = await fetch(`http://localhost:8000/api/userhistory?username=${username}&limit=10`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json()
      const dataHistory = await responseHistory.json()
      setUserData(data);
      setUserDHistory(dataHistory)

      if (!userData) {
        console.error('Data did not pass through.')
      }

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserData()
    }
  }, [isAuthenticated, username]);

  const findCountry = (countryAbbrev) => {
    const countryFound = countriesArray.find(country => country.abbreviation === countryAbbrev)
    return countryFound.name
  }

  const dateConversion = (isoTimestamp) => {
    const dateObj = new Date(isoTimestamp)
    return `${dateObj.getDate()}-${dateObj.getMonth()}-${dateObj.getFullYear()} at ${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`
  }

  return (
    <section className="bg-cyan-400 p-[5%]">
      <div className="bg-cyan-600 p-[3%] bg-opacity-50 rounded-md shadow-md">
        <div className="bg-yellow-100 rounded-md p-[3%] shadow-md">      
          {userData && userHistory && ( // Check if userData is not null or undefined
            <div>
              <div className="flex justify-between">
                <h1 className="font-mono font-bold text-3xl py-[2%] pl-2">{username}</h1>
              </div>
              <div className="bg-yellow-200 p-[3%] rounded-md border-solid border-2 border-black" >
                <h2 className="font-mono text-xl pb-[2%]">Player Info</h2>
                <ul>
                  <li className="font-mono">Display Name: {userData.data.display_name}</li>
                  <li className="flex">
                    <p className="font-mono pr-2">Country: {findCountry(userData.data.country)}</p>
                    <ReactCountryFlag className="mt-1 text-xl" countryCode={userData.data.country} svg></ReactCountryFlag>
                  </li>
                  <li className="font-mono">Keyboard Type: {userData.data.keyboard}</li>
                  <li className="font-mono">Player Description: {userData.data.description}</li>
                </ul>
              </div>
              <div className="bg-yellow-200 mt-[3%] p-[3%] rounded-md border-solid border-2 border-black" >
                <h2 className="font-mono text-xl pb-[2%]">{userData.data.username}'s Play History</h2>
                  <div className="relative overflow-x-auto">
                    <table className="w-full font-mono text-base text-left rtl:text-right text-gray-900">
                        <thead className="text-lg font-mono text-gray-700 uppercase bg-yellow-200">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Play Time
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    WPM
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                          {userHistory.data.map((info, playtime) => (
                            <tr key={playtime} className="bg-yellow-200">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {dateConversion(info.timestamp)}
                                </th>
                                <td className="px-6 py-4">
                                    {info.wpm}
                                </td>
                            </tr>
                          ))}
                        </tbody>
                    </table>
                </div>
              </div>
              {/* Render other user data as needed */}
            </div>
          )}

        </div>
      </div>

    </section>
  )
}

export default UserPage