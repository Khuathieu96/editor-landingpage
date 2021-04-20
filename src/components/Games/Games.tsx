import React from 'react';
import './styles.css';
import RGL, { WidthProvider } from 'react-grid-layout';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../store/useStore';
import { useHistory } from 'react-router';

const ReactGridLayout = WidthProvider(RGL);

const GenerateDOM = ({ game }: any) => {
  let history = useHistory();
  return (
    <div
      style={{
        backgroundImage: `url("${game.image.url}")`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        height: '100%',
        width: '100%',
        cursor: 'pointer',
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        history.push(`/game/${game.id}`);
      }}
    >
      <div className='text'>{game.name}</div>
    </div>
  );
};

const Games = observer(() => {
  const store = useStores();

  return (
    <ReactGridLayout
      className='layout'
      cols={12}
      width={1200}
      rowHeight={30}
      isBounded={true}
      onDragStop={(layout, oldItem, newItem, _, e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('dragstop', e);
      }}
      // onLayoutChange={(layout) => {
      //   console.log('layout', layout);
      // }}
    >
      {store.games.map((game: any, i: number) => (
        <div key={game.id} data-grid={game.dataGrid}>
          <GenerateDOM game={game} key={game.id} />{' '}
        </div>
      ))}

      {/* {store.games.map((game: any, i: number) => (
       
          <div
            className='text'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('onclick');
              // history.push(`/game/${game.id}`);
            }}
          >
            {game.name}
        
        </div>
      ))} */}
    </ReactGridLayout>
  );
});

export default Games;
