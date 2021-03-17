import React from 'react';
import {
  PlusOutlined,
  PushpinOutlined,
  ColumnWidthOutlined,
  MinusOutlined,
} from '@ant-design/icons';
import { Tooltip, Divider, Row, Col, Button } from 'antd';

interface Props {
  handlePinMiniMap: () => void;
  stageScale: number;
  handleZoom: (value: string) => void;
}

const MiniBar = ({ stageScale, handlePinMiniMap, handleZoom }: Props) => {
  return (
    <Row>
      <Col span={4}>
        <Tooltip title='Pin map'>
          <Button
            type='text'
            // color='primary'
            onClick={handlePinMiniMap}
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
        <Tooltip title='Zoom in'>
          <Button
            type='text'
            // color='primary'

            onClick={() => handleZoom('in')}
            icon={<MinusOutlined />}
          />
        </Tooltip>
      </Col>
      <Col span={4}>
        <Tooltip title='Zoom out'>
          <Button
            type='text'
            // color='primary'

            onClick={() => handleZoom('out')}
            icon={<PlusOutlined />}
          />
        </Tooltip>
      </Col>
      <Col span={4}>
        <Tooltip title='Zoom to 100%'>
          <Button
            type='text'
            onClick={() => handleZoom('100')}
            // color='primary'
          >
            {Math.floor(stageScale * 100)}%
          </Button>
        </Tooltip>
      </Col>
    </Row>
  );
};

export default MiniBar;
