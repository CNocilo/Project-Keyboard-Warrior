import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeaderboardPage = () => {
  // State to hold leaderboard data
  const [leaderboardData, setLeaderboardData] = useState([]);

  // Function to fetch leaderboard data
  const fetchLeaderboardData = async () => {
    try {
      const response = await axios.get('leaderboard.json'); // Adjust the URL as per your file location
      setLeaderboardData(response.data);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    }
  };

  // Fetch leaderboard data on component mount
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
              <td>{player.playerName}</td>
              <td>{player.score}</td>
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
