import { useEffect } from 'react';
import { history } from 'umi';

const IndexPage: React.FC = () => {
  useEffect(() => {
    const token =
      localStorage.getItem('accessToken') ||
      sessionStorage.getItem('accessToken');
    if (token) {
      history.replace('/dashboard');
    } else {
      history.replace('/login');
    }
  }, []);

  return null;
};

export default IndexPage;
