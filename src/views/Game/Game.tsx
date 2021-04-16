import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Screen from '../../components/Screen';
import { useStores } from '../../store/useStore';

interface Props {}

const Game = observer(() => {
  let { id } = useParams<{ id: string }>();
  const store = useStores();
  const game = store.getGame(id);
  console.log('game', game);

  return (
    <>
      <Screen />
    </>
  );
});

export default Game;
