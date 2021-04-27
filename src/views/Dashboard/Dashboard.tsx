import React from 'react';
import Games from '../../components/Games/Games';
import { NewGame } from '../../components/NewGame';

const Dashboard = () => {
  return (
    <>
      <h1>List game</h1>
      <NewGame />
      <Games />
    </>
  );
};

export default Dashboard;
