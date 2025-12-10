import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import { Alert, Button, Checkbox, Form, Input, Typography } from 'antd';
import { history, useModel } from 'umi';
import { login } from '@/services/auth';
import './index.less';

interface LoginFormValues {
  identifier: string;
  password: string;
  rememberMe: boolean;
}

const LoginPage: React.FC = () => {
  const [form] = Form.useForm<LoginFormValues>();
  const { setAuth, isAuthenticated, hasToken } = useModel('auth');
  const [submitting, setSubmitting] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const identifierRef = useRef<InputRef>(null);

  useEffect(() => {
    if (isAuthenticated || hasToken) {
      history.replace('/dashboard');
      return;
    }
    identifierRef.current?.focus();
  }, [hasToken, isAuthenticated]);

  const handleSubmit = async (values: LoginFormValues) => {
    setGlobalError(null);
    setSubmitting(true);
    try {
      const response = await login(values);
      setAuth(response, values.rememberMe);
      history.push('/dashboard');
    } catch (error: any) {
      form.setFieldsValue({ password: '' });
      const message =
        error?.response?.data?.message || 'Tên đăng nhập hoặc mật khẩu không đúng';
      setGlobalError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const isSubmitDisabled = useMemo(() => {
    const hasErrors = form
      .getFieldsError()
      .some(({ errors }) => errors.length > 0);
    const touched = form.isFieldsTouched(true);
    return submitting || !touched || hasErrors;
  }, [form, submitting]);

  const handlePasswordKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (typeof event.getModifierState === 'function') {
      setCapsLockOn(event.getModifierState('CapsLock'));
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card__header">
          <Typography.Title level={3}>Đăng nhập VibeCoding</Typography.Title>
          <Typography.Paragraph type="secondary">
            Vui lòng nhập email/username và mật khẩu để tiếp tục.
          </Typography.Paragraph>
        </div>
        {globalError && (
          <Alert
            type="error"
            message={globalError}
            showIcon
            className="login-card__alert"
          />
        )}
        <Form<LoginFormValues>
          form={form}
          layout="vertical"
          initialValues={{ rememberMe: true }}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Email hoặc Username"
            name="identifier"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập email hoặc username',
              },
              {
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$|^[a-zA-Z0-9_.-]{3,}$/,
                message: 'Email không hợp lệ hoặc username tối thiểu 3 ký tự',
              },
            ]}
          >
            <Input ref={identifierRef} placeholder="vd. user@vibecoding.com" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu' },
              { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự' },
            ]}
            extra="Mật khẩu phân biệt chữ hoa/thường."
          >
            <Input.Password
              placeholder="Nhập mật khẩu"
              onKeyUp={handlePasswordKey}
              onKeyDown={handlePasswordKey}
              autoComplete="current-password"
            />
          </Form.Item>

          {capsLockOn && (
            <Alert
              type="warning"
              showIcon
              message="Caps Lock đang bật"
              className="login-card__alert"
            />
          )}

          <Form.Item name="rememberMe" valuePropName="checked">
            <Checkbox>Ghi nhớ đăng nhập trên thiết bị này</Checkbox>
          </Form.Item>

          <div className="login-card__actions">
            <Button type="link" onClick={() => history.push('/forgot-password')}>
              Quên mật khẩu?
            </Button>
          </div>

          <Button
            type="primary"
            htmlType="submit"
            loading={submitting}
            block
            disabled={isSubmitDisabled}
          >
            Đăng nhập
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
