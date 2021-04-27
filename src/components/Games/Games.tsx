import React, { useState } from 'react';
import './styles.css';
import RGL, { WidthProvider } from 'react-grid-layout';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../store/useStore';
import { useHistory } from 'react-router';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const ReactGridLayout = WidthProvider(RGL);

const GenerateDOM = observer(({ game }: any) => {
  let history = useHistory();
  const [hover, setHover] = useState(false);
  const store = useStores();
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
      onMouseLeave={() => setHover(false)}
      onMouseEnter={() => setHover(true)}
    >
      <div className='text'>{game.name}</div>
      {hover && (
        <Button
          type='primary'
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            history.push(`/game/${game.id}`);
          }}
        >
          Open game
        </Button>
      )}{' '}
      <Button
        type='text'
        icon={<DeleteOutlined />}
        onClick={() => store.remove(game.id)}
      ></Button>
    </div>
  );
});

const Games = observer(() => {
  const store = useStores();

  return (
    <ReactGridLayout
      className='layout'
      cols={12}
      width={1200}
      rowHeight={30}
      isBounded={true}
      onLayoutChange={(layout) => {
        store.updatePositionGame(layout);
      }}
    >
      {store.games.map((game: any, i: number) => (
        <div key={game.id} data-grid={game.dataGrid}>
          <GenerateDOM game={game} key={game.id} />{' '}
        </div>
      ))}
    </ReactGridLayout>
  );
});

export default Games;
