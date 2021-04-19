import React from 'react';
import { useParams } from 'react-router-dom';
import Screen from '../../components/Screen';

interface Props {}

const Game = () => {
  let { id } = useParams<{ id: string }>();

  return (
    <>
      <Screen id={id} />
    </>
  );
};

export default Game;
