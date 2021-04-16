import React, { useContext, useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Button, InputNumber, Row, Col, Typography } from 'antd';
import { Dialog } from '../Dialog';
import { observer } from 'mobx-react-lite';
import { GameSettingContext } from '../../context/GameContext/GameContext';
import { UploadImage } from './components';
import { storeGamesList } from '../../store/store';
import { StatusGameType } from '../../types/types';
import { v4 as uuidv4 } from 'uuid';

const Setting = observer((props) => {
  const [visible, setVisible] = useState(false);
  const { Title } = Typography;

  return (
    <div style={{ position: 'absolute', bottom: 20, left: 20, zIndex: 1 }}>
      <Button
        type='primary'
        shape='circle'
        icon={<SettingOutlined />}
        onClick={() => setVisible(true)}
      />
      <Dialog
        title='Setting'
        visible={visible}
        handleOk={() => setVisible(false)}
        handleCancel={() => setVisible(false)}
        content={
          <>
            Setting
            {/* <Row gutter={[8, 16]}>
              <Col span={12}>
                <Title level={5}>WIDTH_TILE</Title>
                <InputNumber
                  defaultValue={gameSettingStore.WIDTH_TILE}
                  onChange={(e) => {
                    gameSettingStore.setWidthTitle(e);
                  }}
                />
              </Col>

              <Col span={12}>
                <Title level={5}>WIDTH_FRAMES</Title>
                <InputNumber
                  defaultValue={gameSettingStore.WIDTH_FRAMES}
                  onChange={(e) => {
                    gameSettingStore.setWidthFrames(e);
                  }}
                />
              </Col>
            </Row>
            <Row gutter={[8, 16]}>
              <Col span={12}>
                <Title level={5}>HEIGHT_FRAMES</Title>
                <InputNumber
                  defaultValue={gameSettingStore.HEIGHT_FRAMES}
                  onChange={(e) => {
                    gameSettingStore.setHeightFrames(e);
                  }}
                />
              </Col>

              <Col span={12}>
                <Title level={5}>NUMBER_TILES</Title>
                <InputNumber
                  defaultValue={gameSettingStore.NUMBER_TILES}
                  onChange={(e) => {
                    gameSettingStore.setNumberTiles(e);
                  }}
                />
              </Col>
            </Row>
            <Row gutter={[8, 16]}>
              <Col span={12}>
                <Title level={5}>NUMBER_COLUMNS</Title>
                <InputNumber
                  defaultValue={gameSettingStore.NUMBER_COLUMNS}
                  onChange={(e) => {
                    gameSettingStore.setNumberColumn(e);
                  }}
                />
              </Col>

              <Col span={12}>
                <Title level={5}>NUMBER_ROWS</Title>
                <InputNumber
                  defaultValue={gameSettingStore.NUMBER_ROWS}
                  onChange={(e) => {
                    gameSettingStore.setNumberRows(e);
                  }}
                />
              </Col>
            </Row>
            <Row gutter={[8, 16]}>
              <UploadImage
                handleOnChange={(value: string) =>
                  gameSettingStore.setImageUrl(value)
                }
                imageDefault={gameSettingStore.IMAGE_URL}
              />
            </Row>
           */}
          </>
        }
      />
    </div>
  );
});

export default Setting;
