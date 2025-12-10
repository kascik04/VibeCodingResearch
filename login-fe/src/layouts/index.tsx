import React from 'react';
import { Layout, Button, Typography } from 'antd';
import { history } from 'umi';
import { useModel } from 'umi';
import './index.less';

const { Header, Content } = Layout;

const BasicLayout: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const { currentUser, logout } = useModel('auth');

  return (
    <Layout className="basic-layout">
      <Header className="basic-layout__header">
        <div className="basic-layout__brand" onClick={() => history.push('/')}>VibeCoding Portal</div>
        <div className="basic-layout__actions">
          {currentUser ? (
            <Typography.Text className="basic-layout__welcome">
              Xin chào, {currentUser.name}
            </Typography.Text>
          ) : null}
          <Button type="link" onClick={logout} className="basic-layout__logout">
            Đăng xuất
          </Button>
        </div>
      </Header>
      <Content className="basic-layout__content">{children}</Content>
    </Layout>
  );
};

export default BasicLayout;
