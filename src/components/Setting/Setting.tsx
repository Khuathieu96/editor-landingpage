import React, { useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Button, InputNumber, Row, Col, Typography } from 'antd';
import { Dialog } from '../Dialog';

interface Props {}

const Setting = ({}: Props) => {
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
            <Row gutter={[8, 16]}>
              <Col span={12}>
                <Title level={5}>WIDTH_TILE</Title>
                <InputNumber defaultValue={50} />
              </Col>

              <Col span={12}>
                <Title level={5}>WIDTH_FRAMES</Title>
                <InputNumber defaultValue={1000} />
              </Col>
            </Row>
            <Row gutter={[8, 16]}>
              <Col span={12}>
                <Title level={5}>HEIGHT_FRAMES</Title>
                <InputNumber defaultValue={500} />
              </Col>

              <Col span={12}>
                <Title level={5}>NUMBER_TILES</Title>
                <InputNumber defaultValue={200} />
              </Col>
            </Row>
            <Row gutter={[8, 16]}>
              <Col span={12}>
                <Title level={5}>NUMBER_COLUMNS</Title>
                <InputNumber defaultValue={20} />
              </Col>

              <Col span={12}>
                <Title level={5}>NUMBER_ROWS</Title>
                <InputNumber defaultValue={10} />
              </Col>
            </Row>
          </>
        }
      />
    </div>
  );
};

export default Setting;
