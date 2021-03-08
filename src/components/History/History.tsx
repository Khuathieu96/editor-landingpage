import React from 'react';
import { Timeline } from 'antd';

interface Props {}

const History = ({}: Props) => {
  return (
    <Timeline mode='right'>
      <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
      <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
      <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
      <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
    </Timeline>
  );
};

export default History;
