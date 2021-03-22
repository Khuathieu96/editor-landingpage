import Modal from 'antd/lib/modal/Modal';
import React from 'react';

interface Props {
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  content: React.ReactNode;
  title: string;
}

const Dialog = ({ visible, title, handleOk, handleCancel, content }: Props) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {content}
    </Modal>
  );
};

export default Dialog;
