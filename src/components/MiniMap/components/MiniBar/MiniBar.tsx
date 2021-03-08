import React from 'react';
import {
  PlusOutlined,
  PushpinOutlined,
  ColumnWidthOutlined,
  MinusOutlined,
} from '@ant-design/icons';
import { Tooltip, Divider, Row, Col, Button } from 'antd';

interface Props {}

const MiniBar = ({}: Props) => {
  return (
    <Row>
      <Col span={4}>
        <Tooltip title='Pin map'>
          <Button
            type='text'
            // color='primary'
            icon={<PushpinOutlined />}
          />
        </Tooltip>
      </Col>
      <Col span={4}>
        <Tooltip title='Fit to screen'>
          <Button
            type='text'
            // color='primary'
            icon={<ColumnWidthOutlined />}
          />
        </Tooltip>
      </Col>
      <Divider type='vertical' style={{ height: 'auto' }} />

      <Col span={4}>
        <Tooltip title='Zoom out'>
          <Button
            type='text'
            // color='primary'
            icon={<MinusOutlined />}
          />
        </Tooltip>
      </Col>
      <Col span={4}>
        <Tooltip title='Zoom in'>
          <Button
            type='text'
            // color='primary'
            icon={<PlusOutlined />}
          />
        </Tooltip>
      </Col>
      <Col span={4}>
        <Tooltip title='Zoom to 100%'>
          <Button
            type='text'
            // color='primary'
          >
            100%
          </Button>
        </Tooltip>
      </Col>
    </Row>
  );
};

export default MiniBar;
