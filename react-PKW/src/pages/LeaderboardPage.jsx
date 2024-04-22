import React, { useState } from 'react';

const LeaderboardPage = () => {
  // State to hold leaderboard data
  const [leaderboardData, setLeaderboardData] = useState([
    { rank: 1, playerName: 'usrnm1', score: 122, country: 'USA', layout: 'US' },
    { rank: 2, playerName: 'hacker123', score: 110, country: 'UK', layout: 'Dvorak' },
    { rank: 3, playerName: 'Bob', score: 105, country: 'Canada', layout: 'US' },
    // Add more initial data as needed
  ]);

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
          {leaderboardData.map((player) => (
            <tr key={player.rank}>
              <td>{player.rank}</td>
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