import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Screen from '../../components/Screen';
import { useStores } from '../../store/useStore';

interface Props {}

const Game = observer(() => {
  let { id } = useParams<{ id: string }>();
  const store = useStores();

  useEffect(() => {
    if (id) {
      store.setCurrentGame(id);
    }
  }, [id]);

  return (
    <>
      <Screen />
    </>
  );
});

export default Game;
