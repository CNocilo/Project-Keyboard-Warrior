import React from 'react';

const AboutPage = () => {
  return (
    <>
      <div className="container main-color">
        <div>
          <h1 className="title">About</h1>
        </div>
        <div>
          <ul className="nav nav-tabs" id="main-nav">
            <li className="nav-item">
              <a className="nav-link" href="home.html">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="about.html">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="leaderboard.html">Leaderboard</a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div className="content-container">
          <div className="container p-5 my-5 border content-section" id="about_style">
            <p>Get ready to elevate your typing skills to the next level with our cutting-edge typing game. Dive into an immersive experience where speed and accuracy collide in a sleek interface designed for the modern typist. Embark on a journey of mastery as you tackle challenging levels and push your limits to reach new heights. Whether you're a seasoned typist or just starting out, our game offers an exhilarating and dynamic environment to sharpen your skills and dominate the keyboard. It's time to unleash your inner typing warrior and conquer the digital realm like never before. Are you ready to type your way to victory?</p>
          </div>
          <div className="container p-5 my-5 border creators-section">
            <h2>About the Creators</h2>
            <ul id="creators_style">
              <li>Serendipitea - Co-founder and CEO</li>
              <li>Flapjack - Co-founder and CTO</li>
              <li>BobBBob - Co-founder and C-3P0</li>
              <li>JJ Chin - Co-founder and (S)CP-0</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;