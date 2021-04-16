import React from 'react';
import Games from '../../components/Games/Games';
import { NewGame } from '../../components/NewGame';

interface Props {}

const Dashboard = ({}: Props) => {
  return (
    <>
      <h1>List game</h1>
      <NewGame />
      <Games />
    </>
  );
};

export default Dashboard;
