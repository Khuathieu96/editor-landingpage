import React, { ReactChild } from 'react';

interface Props {
  children: ReactChild;
}

const FullLayout = ({ children }: Props) => {
  return <>{children}</>;
};

export default FullLayout;
