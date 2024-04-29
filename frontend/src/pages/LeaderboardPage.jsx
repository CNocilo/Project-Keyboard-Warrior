import React, { useState, useEffect } from 'react';
import ReactCountryFlag from "react-country-flag";

const LeaderboardPage = () => {
  // State to hold leaderboard data
  const [leaderboardData, setLeaderboardData] = useState([]);

  // Function to fetch leaderboard data from the API
  const fetchLeaderboardData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/leaderboard'); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard data');
      }
      const data = await response.json();
      setLeaderboardData(data.data);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    }
  };

  // Fetch leaderboard data when the component mounts
  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  // Fake leaderboard data for example
  const presetLeaderboardData = [
    { rank: 1, username: 'User1', wpm: 70, country: 'US', layout: 'QWERTY' },
    { rank: 2, username: 'User2', wpm: 65, country: 'GB', layout: 'QWERTY' },
    { rank: 3, username: 'User3', wpm: 60, country: 'CA', layout: 'QWERTY' },
    { rank: 4, username: 'User4', wpm: 55, country: 'DE', layout: 'QWERTY' },
    { rank: 5, username: 'User5', wpm: 50, country: 'FR', layout: 'QWERTY' },
  ];

  return (
    // <div className="container-fluid p-0 m-0" style={{ textAlign: 'center', color: '#000', backgroundColor: '#22d3ee', fontFamily: 'monospace', paddingBottom: '40px', fontSize: '125%' }}>
    // <h1 style={{ margin: '0', padding: '20px', fontSize: '2.5em' }}>Keyboard Warrior Leaderboard</h1>
    //   <div style={{ overflowX: 'auto' }}>
    //     <table className="table table-bordered" style={{ width: '80%', margin: '0 auto', borderCollapse: 'collapse', fontFamily: 'monospace', backgroundColor: '#fef9c3', border: '3px solid #fff', animation: 'borderAnimation 5s infinite alternate' }}>
    //       <thead>
    //         <tr>
    //           <th style={{ border: '3px solid #000', padding: '15px', height: '60px' }}>Rank</th>
    //           <th style={{ border: '3px solid #000', padding: '15px', height: '60px' }}>Username</th>
    //           <th style={{ border: '3px solid #000', padding: '15px', height: '60px' }}>WPM (Words per Minute)</th>
    //           <th style={{ border: '3px solid #000', padding: '15px', height: '60px' }}>Country</th>
    //           <th style={{ border: '3px solid #000', padding: '15px', height: '60px' }}>Layout</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {leaderboardData.length > 0 ? (
    //           leaderboardData.map((player, index) => (
    //             <tr key={index}>
    //               <td style={{ border: '3px solid #000', padding: '15px', height: '60px' }}>{player.rank}</td>
    //               <td style={{ border: '3px solid #000', padding: '15px', height: '60px' }}>{player.username}</td>
    //               <td style={{ border: '3px solid #000', padding: '15px', height: '60px' }}>{player.wpm}</td>
    //               <td style={{ border: '3px solid #000', padding: '15px', height: '60px', fontSize: '125%' }}>
    //                 <ReactCountryFlag countryCode={player.country} svg style={{ fontSize: '125%' }} />
    //               </td>
    //               <td style={{ border: '3px solid #000', padding: '15px', height: '60px' }}>{player.layout}</td>
    //             </tr>
    //           ))
    //         ) : (
    //           presetLeaderboardData.map((player, index) => (
    //             <tr key={index}>
    //               <td style={{ border: '3px solid #000', padding: '15px', height: '60px' }}>{player.rank}</td>
    //               <td style={{ border: '3px solid #000', padding: '15px', height: '60px' }}>{player.username}</td>
    //               <td style={{ border: '3px solid #000', padding: '15px', height: '60px' }}>{player.wpm}</td>
    //               <td style={{ border: '3px solid #000', padding: '15px', height: '60px', fontSize: '125%' }}>
    //                 <ReactCountryFlag countryCode={player.country} svg style={{ fontSize: '125%' }} />
    //               </td>
    //               <td style={{ border: '3px solid #000', padding: '15px', height: '60px' }}>{player.layout}</td>
    //             </tr>
    //           ))
    //         )}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
    
  <div className="p-[10%]">
    <div className="p-[2%] bg-cyan-500 rounded-md shadow-md">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <caption class="p-5 text-3xl font-mono font-[700] text-left rtl:text-right text-gray-900 bg-yellow-100">
              Global Leaderboard
                  <p class="mt-1 text-xl font-normal text-gray-500 dark:text-gray-400">Who's on top of the charts today..?</p>
              </caption>
              <thead class="text-lg text-gray-700 font-mono uppercase bg-yellow-100">
                  <tr>
                      <th scope="col" class="px-6 py-3">
                          Player Name
                      </th>
                      <th scope="col" class="px-6 py-3">
                          WPM
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Country
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Keyboard
                      </th>
                  </tr>
              </thead>
              <tbody>
                  {leaderboardData.length > 0 ? (
                      leaderboardData.map((player, index) => (
                        <tr key={index} class="bg-yellow-100">
                          <th scope="row" class="px-6 py-4 font-mono text-lg font-[400] text-gray-900 whitespace-nowrap">
                            {player.username}
                          </th>
                          <td class="px-6 py-3 text-lg">
                            {player.wpm}
                          </td>
                          <td class="px-6 py-3 text-3xl">
                            <ReactCountryFlag countryCode={player.country} svg />
                          </td>
                          <td class="px-6 py-3 text-lg">
                            {player.keyboardLayout}
                          </td>
                        </tr>
                      ))
                    ) : (
                      presetLeaderboardData.map((player, index) => (
                        <tr key={index} class="bg-yellow-100">
                          <th scope="row" class="px-6 py-4 font-mono text-lg font-[400] text-gray-900 whitespace-nowrap">
                            {player.username}
                          </th>
                          <td class="px-6 py-3 text-lg">
                            {player.wpm}
                          </td>
                          <td class="px-6 py-3 text-3xl">
                            <ReactCountryFlag countryCode={player.country} svg />
                          </td>
                          <td class="px-6 py-3 text-lg">
                            {player.keyboardLayout}
                          </td>
                        </tr>
                      ))
                    )}

              </tbody>
          </table>
      </div>
    </div>
  </div>

  );
};

export default LeaderboardPage;
