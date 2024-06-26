import React from 'react';

const AboutPage = () => {
  return (
    // <section className="p-[5%]">
    //   <div className="bg-cyan-500 p-[2%]">
    //     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#22d3ee', color: '#fff' }}>
    //       <div className="content-container">
    //         <div className="container p-5 my-5 content-section text-black shadow-md" id="about_style" style={{ maxWidth: '800px', fontFamily: 'monospace', backgroundColor: '#fef9c3', padding: '40px', borderRadius: '10px',}}>
    //           <p style={{ fontSize: '1.5rem', lineHeight: '1.6' }}>Keyboard Warrior is a typing game designed to entertain and sharpen your typing skills. 
    //             With its simple yet engaging gameplay, you'll find yourself immersed in a world of words and letters.
    //             Challenge yourself with various levels and obstacles, all while having fun and improving your typing speed and accuracy. 
    //             Whether you're a beginner or a seasoned typist, Keyboard Warrior offers a fun and rewarding experience for everyone.
    //             Join the typing adventure today and see how fast your fingers can fly!</p>
    //         </div>
    //         <div className="container p-5 my-5 creators-section text-black shadow-md" style={{ maxWidth: '800px', fontFamily: 'monospace', backgroundColor: '#fef9c3', padding: '40px', borderRadius: '10px' }}>
    //           <h2 style={{ fontSize: '2rem' }}>About the Creators</h2>
    //           <ul id="creators_style" style={{ listStyleType: 'none', paddingLeft: 0 }}>
    //             <li>Serendipitea - Co-founder and CEO</li>
    //             <li>Flapjack - Co-founder and CTO</li>
    //             <li>BobBBob - Co-founder and C-3P0</li>
    //             <li>JJ Chin - Co-founder and (S)CP-0</li>
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <section className="p-[5%]">
      <div className="p-[3%] bg-cyan-600 bg-opacity-50 rounded-md">
        <div className="bg-yellow-100 rounded-md mb-[2%]">
          <p className="p-[5%] text-xl font-mono font-[600]">
            With its simple yet engaging gameplay, you'll find yourself immersed in a world of words and letters.
            Challenge yourself with various levels and obstacles, all while having fun and improving your typing speed and accuracy. 
            Whether you're a beginner or a seasoned typist, Keyboard Warrior offers a fun and rewarding experience for everyone.
            Join the typing adventure today and see how fast your fingers can fly!
          </p>
        </div>
        <div className="bg-yellow-100 rounded-md">
          <div className="p-[5%] text-lg font-mono font-[400]">
            <h2>About the Creators</h2>
            <ul>
              <li>Serendipitea - Co-founder and CEO</li>
              <li>Flapjack - Co-founder and CTO</li>
              <li>BobBBob - Co-founder and C-3P0</li>
              <li>JJ Chin - Co-founder and (S)CP-0</li>
            </ul>
          </div>

        </div>

      </div>


    </section>
  );
};

export default AboutPage;
