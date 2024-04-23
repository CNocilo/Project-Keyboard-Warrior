import React, { useState } from 'react';

const Test = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Perform login logic here (e.g., API call, authentication)
    if (username === 'admin' && password === 'password') {
      setError('');
      setIsLoggedIn(true);
      alert('Login successful!');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <>
          <h1>Login</h1>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <button onClick={handleLogin}>Login</button>
        </>
      ) : (
        <div>
          <h1>Welcome, {username}!</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Test;