import React from 'react';
import { Link } from 'react-router-dom';

interface Props {}

const Dashboard = ({}: Props) => {
  return (
    <>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/game'>Game</Link>
        </li>
      </ul>
    </>
  );
};

export default Dashboard;
