import { observer } from 'mobx-react-lite';
import React, { useCallback, useState } from 'react';
import debounce from 'lodash/debounce';
import { useStores } from '../../store/useStore';
import { Dialog } from '../Dialog';
import { ImageType, StatusGameType } from '../../types/types';
import { v4 as uuidv4 } from 'uuid';
import { Card, Col, Input, InputNumber, Row, Typography } from 'antd';
import { UploadImage } from '../Setting/components';
import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: 'oG9Bop0QS4kK1kmwXfq37bg8-Y0X1CqDcVcZBmmoZxk',
});

const initNewGame = () => {
  const id = uuidv4();
  return {
    cols: 5,
    rows: 5,
    id,
    image: { url: '', width: 0, height: 0 },
    name: 'New Game',
    status: StatusGameType.NEW,
    dataGrid: { x: 0, y: 0, h: 2, w: 2, i: id },
  };
};

const NewGame = observer(() => {
  const store = useStores();
  const { Title } = Typography;
  const [visible, setVisible] = useState(false);
  const [listImageSearch, setListImageSearch] = useState<any[]>([]);

  const [newGame, setNewGame] = useState(initNewGame());

  const handleAddNewGame = () => {
    const { cols, rows, id, image, name, status, dataGrid } = newGame;
    if (newGame.image.url) {
      store.addNewGame(cols, rows, id, image, name, status, dataGrid);
      handleClose();
    } else alert('wrong input');
  };

  const handleClose = () => {
    setVisible(false);
    setNewGame(initNewGame());
    setListImageSearch([]);
  };

  const handleCreateNewGame = (
    key: string,
    value: ImageType | number | string,
  ) => {
    setNewGame((prev) => ({ ...prev, [key]: value }));
  };
  const handleImage = (value: ImageType) => {
    const mincale = Math.max(
      1,
      value.width / window.innerWidth,
      value.height / window.innerHeight,
    );
    const wNew = value.width / mincale;
    const hNew = value.height / mincale;

    setNewGame((prev) => ({
      ...prev,
      image: value,
      dataGrid: {
        ...prev.dataGrid,
        x: (store.games.length * 2) % 12,
        y: 0,
        w: Math.round((wNew / window.innerWidth) * 12),
        h: Math.round((hNew / window.innerHeight) * 22),
      },
    }));
  };

  const debouncedSearch = useCallback<(value: string) => void>(
    debounce((nextValue: string) => handleFindImage(nextValue), 400),
    [], // will be created only once initially
  );

  const handleFindImage = (value: string) => {
    unsplash.search
      .getPhotos({
        query: value,
        page: 1,
        perPage: 10,
        // color: 'green',
        orientation: 'landscape',
      })
      .then((result) => {
        if (result.type === 'success') {
          const photo = result.response;
          setListImageSearch(result.response.results);
          console.log('photo', photo);
        }
      });
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
                <Title level={5}>Name</Title>
                <Input
                  value={newGame.name}
                  onChange={(e) => {
                    handleCreateNewGame('name', e.target.value);
                  }}
                />
              </Row>
              <Row gutter={[8, 16]}>
                <Title level={5}>Image</Title>

                <Input
                  title='Search image at unsplash'
                  onChange={(e) => {
                    debouncedSearch(e.target.value);
                  }}
                />
                <Row>
                  {listImageSearch.length > 0 &&
                    listImageSearch.map((item) => (
                      // <Image width={200} src={item.urls.thumb} />
                      <Card
                        key={item.id}
                        hoverable
                        style={{ width: 240 }}
                        onClick={() => {
                          handleImage({
                            url: item.urls.thumb,
                            width: item.width,
                            height: item.height,
                          });
                        }}
                        cover={<img alt='example' src={item.urls.thumb} />}
                      >
                        {/* <Meta title="Europe Street beat" description="www.instagram.com" /> */}
                      </Card>
                    ))}
                </Row>
                <Title>Or</Title>
                <UploadImage
                  handleOnChange={(value: ImageType) => handleImage(value)}
                  imageDefault={newGame.image.url}
                />
              </Row>
            </>
          }
        />
      )}
    </>
  );
});

export default NewGame;
