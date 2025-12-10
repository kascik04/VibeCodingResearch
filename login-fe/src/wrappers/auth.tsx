import React from 'react';
import { Spin } from 'antd';
import { useModel, history } from 'umi';

const AuthWrapper: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const { isAuthenticated, hasToken, isBootstrapping } = useModel('auth');

  if (isBootstrapping) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
        }}
      >
        <Spin tip="Đang kiểm tra phiên đăng nhập..." />
      </div>
    );
  }

  if (!isAuthenticated && !hasToken) {
    if (history.location.pathname !== '/login') {
      history.push('/login');
    }
    return null;
  }

  return <>{children}</>;
};

export default AuthWrapper;