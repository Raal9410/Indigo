import React from 'react';
import {Link} from 'react-router-dom'
function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>Log into your account <Link to="/login">here</Link></p>
      <p>Create account <Link to="/signup">here</Link></p>
    </div>
  );
}

export default Home;
