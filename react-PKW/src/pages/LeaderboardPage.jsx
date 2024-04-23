import React, { useState, useEffect } from 'react';

const LeaderboardPage = () => {
  // State to hold leaderboard data
  const [leaderboardData, setLeaderboardData] = useState([]);

  // Function to fetch leaderboard data from the API
  const fetchLeaderboardData = async () => {
    try {
      const response = await fetch('https://api.example.com/leaderboard'); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard data');
      }
      const data = await response.json();
      setLeaderboardData(data);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    }
  };

  // Fetch leaderboard data when the component mounts
  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  return (
    <div className="container my-5 mt-5">
      <h3>All Time Leaderboard</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>WPM (Words per Minute)</th>
            <th>Country</th>
            <th>Layout</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((player, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{player.username}</td>
              <td>{player.wpm}</td>
              <td>{player.country}</td>
              <td>{player.layout}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardPage;
