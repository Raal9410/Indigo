import React from 'react';
import {Link} from 'react-router-dom'
function Home() {
  return (
    <div className="home">
      <div className="homecard ">
        <div className="mainTitle">
      <h1>Indigo</h1>
        </div>
        <div className="slogan">
      <h3>Musicians meeting musicians by their own music taste.</h3>
        </div>
        <div className="getstarted">
      <h5 ><Link to="/login">Get started!</Link></h5>
        </div>
      </div>
    </div>
  );
}

export default Home;
