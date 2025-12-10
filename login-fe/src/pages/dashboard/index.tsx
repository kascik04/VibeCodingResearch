import React from 'react';
import { Card, Descriptions, Result, Typography } from 'antd';
import { useModel } from 'umi';
import './index.less';

const DashboardPage: React.FC = () => {
  const { currentUser } = useModel('auth');

  if (!currentUser) {
    return (
      <Result
        status="info"
        title="Đang tải thông tin người dùng"
        subTitle="Vui lòng chờ trong giây lát..."
      />
    );
  }

  return (
    <div className="dashboard-page">
      <Card title="Thông tin tài khoản">
        <Descriptions column={1} size="middle" bordered>
          <Descriptions.Item label="Họ tên">
            {currentUser.name}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {currentUser.email}
          </Descriptions.Item>
          <Descriptions.Item label="ID người dùng">
            {currentUser.id}
          </Descriptions.Item>
        </Descriptions>
        <Typography.Paragraph className="dashboard-page__note">
          Bạn đã đăng nhập thành công vào hệ thống VibeCoding Training. Từ đây có
          thể chuyển hướng sang các module học tập khác.
        </Typography.Paragraph>
      </Card>
    </div>
  );
};

export default DashboardPage;
