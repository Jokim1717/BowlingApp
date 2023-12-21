import { Link } from 'react-router-dom';
import React, { useState } from "react";



const Home = () => {
  return (
    <div>
      <h2>Welcome to Bowling Score Tracker!</h2>
      <p>
        If you already have an account, <Link to="/login">login here</Link>.
      </p>
      <p>
        If you don't have an account, <Link to="/register">register here</Link>.
      </p>
    </div>
  );
};

export default Home;