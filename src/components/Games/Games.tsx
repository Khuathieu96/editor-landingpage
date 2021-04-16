import React from 'react';
import './styles.css';
import RGL, { WidthProvider } from 'react-grid-layout';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../store/useStore';
import { useHistory } from 'react-router';

const ReactGridLayout = WidthProvider(RGL);

const generateDOM = (games: any) => {
  return;
};

const Games = observer(() => {
  const store = useStores();
  let history = useHistory();

  return (
    <ReactGridLayout
      className='layout'
      cols={12}
      width={1200}
      rowHeight={30}
      isBounded={true}
      onDragStop={(layout, oldItem, newItem) => {
        console.log('dragstop', layout, oldItem, newItem);
      }}
      // onLayoutChange={(layout) => {
      //   console.log('layout', layout);
      // }}
    >
      {store.games.map((game: any, i: number) => (
        <div
          key={game.id}
          data-grid={game.dataGrid}
          onClick={() => history.push(`/game/${game.id}`)}
        >
          <span className='text'>{game.name}</span>
        </div>
      ))}
    </ReactGridLayout>
  );
});

export default Games;
