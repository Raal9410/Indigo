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
      <h5 >Get started <Link to="/login">here</Link> !</h5>
        </div>
      </div>
    </div>
  );
}

export default Home;
