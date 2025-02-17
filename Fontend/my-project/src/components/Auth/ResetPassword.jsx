import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ApiService from '../../services/apis';
import { Input, Button, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let phone = queryParams.get('phone');

  if (phone) {
    phone = phone.replace(/\D/g, ''); // Loại bỏ tất cả các ký tự không phải là số
    if (phone.startsWith('84')) {
      phone = '0' + phone.slice(2); // Thay thế '84' bằng '0'
    }
  }

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleReset = async () => {
    if (password !== confirmPassword) {
      message.error('Mật khẩu không khớp!');
      return;
    }

    const resetPasswordDetails = {
      phoneNumber: phone,
      password: password
    };

    try {
      await ApiService.resetPassword(resetPasswordDetails);
      navigate('/');
    } catch (error) {
      message.error('Lỗi đặt lại mật khẩu!');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-blue-300'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-96'>
        <div className='text-center mb-6'>
          <h1 className='text-3xl font-bold text-blue-600'>Zalo</h1>
          <p className='text-gray-600 mt-3'>Đặt lại mật khẩu</p>
        </div>
        <div className='flex flex-col items-center gap-4 mt-8'>
          <Input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Mật khẩu mới'
            prefix={<LockOutlined />}
            className='w-full'
          />
          <Input
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Nhập lại mật khẩu'
            prefix={<LockOutlined />}
            className='w-full'
          />
          <Button onClick={handleReset} type='primary' className='w-full mt-4'>
            Xác nhận
          </Button>
          <Button onClick={() => navigate('/')} className='w-full'>
            Quay về
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
