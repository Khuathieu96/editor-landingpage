import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useStores } from '../../store/useStore';
import { Dialog } from '../Dialog';
import { StatusGameType } from '../../types/types';
import { v4 as uuidv4 } from 'uuid';
import { Col, Input, InputNumber, Row, Typography } from 'antd';
import { UploadImage } from '../Setting/components';
import { GameType } from '../../store/store';

interface Props {}

const initNewGame = () => {
  const id = uuidv4();
  return {
    cols: 5,
    rows: 5,
    id,
    url: '',
    name: 'New Game',
    status: StatusGameType.NEW,
    dataGrid: { x: 0, y: 0, h: 2, w: 2, i: id },
  };
};

const NewGame = observer(({}: Props) => {
  const store = useStores();
  const { Title } = Typography;
  const [visible, setVisible] = useState(false);
  const [newGame, setNewGame] = useState<GameType>(initNewGame());

  const handleAddNewGame = () => {
    if (newGame.url) {
      store.addNewGame(newGame);
      handleClose();
    } else alert('wrong input');
  };

  const handleClose = () => {
    setVisible(false);
    setNewGame(initNewGame());
  };

  const handleCreateNewGame = (key: string, value: number | string) => {
    setNewGame((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <button onClick={() => setVisible(true)}>add Game</button>
      {visible && (
        <Dialog
          title='Add new Game'
          visible={visible}
          handleOk={() => handleAddNewGame()}
          handleCancel={() => handleClose()}
          content={
            <>
              <Row gutter={[8, 16]}>
                <Col span={12}>
                  <Title level={5}>Columns</Title>
                  <InputNumber
                    value={newGame.cols}
                    min={1}
                    onChange={(e) => {
                      handleCreateNewGame('cols', e);
                    }}
                  />
                </Col>

                <Col span={12}>
                  <Title level={5}>Rows</Title>
                  <InputNumber
                    value={newGame.rows}
                    min={1}
                    onChange={(e) => {
                      handleCreateNewGame('rows', e);
                    }}
                  />
                </Col>
              </Row>
              <Row gutter={[8, 16]}>
                <Col span={12}>
                  <Title level={5}>Name</Title>
                  <Input
                    value={newGame.name}
                    onChange={(e) => {
                      handleCreateNewGame('name', e.target.value);
                    }}
                  />
                </Col>
                <Col span={12}>
                  <UploadImage
                    handleOnChange={(value: string) =>
                      handleCreateNewGame('url', value)
                    }
                    imageDefault={newGame.url}
                  />
                </Col>
              </Row>
            </>
          }
        />
      )}
    </>
  );
});

export default NewGame;
