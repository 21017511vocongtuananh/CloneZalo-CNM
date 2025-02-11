import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../services/apis.js';
import CustomButton from '../components/Button/Button.jsx';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const data = await loginApi(phoneNumber, password);
      localStorage.setItem('token', data.token);
      navigate('/user');
    } catch (error) {
      setError(error.message || 'Số điện thoại hoặc mật khẩu không đúng!');
      console.error('Login failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-96'>
        <div className='text-center mb-6'>
          <h1 className='text-3xl font-bold text-blue-600'>Zalo</h1>
          <p className='text-gray-600'>Đăng nhập với mật khẩu</p>
        </div>
        {error && <p className='text-red-500 text-center mb-4'>{error}</p>}
        <form onSubmit={handleLogin}>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='phone'
            >
              Số điện thoại
            </label>
            <div className='flex'>
              <select className='border border-gray-300 rounded-l px-3 py-2 bg-gray-100'>
                <option>+84</option>
              </select>
              <input
                type='text'
                id='phone'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder='Số điện thoại'
                className='border border-gray-300 rounded-r px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
              />
            </div>
          </div>
          <div className='mb-6'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='password'
            >
              Mật khẩu
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Mật khẩu'
              className='border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          <CustomButton type='submit' isLoading={isLoading}>
            Đăng nhập
          </CustomButton>
        </form>
        <div className='text-center mt-4'>
          <p className='text-gray-500'>
            Chưa có tài khoản?{' '}
            <span
              className='text-blue-500 cursor-pointer hover:underline'
              onClick={() => navigate('/register')}
            >
              Đăng ký ngay
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
