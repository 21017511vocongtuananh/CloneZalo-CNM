import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ApiService from '../../services/apis';
import { Input, Button, message } from 'antd';

const SendOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get('mode'); // "register" hoặc "reset"

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmation, setConfirmation] = useState(null);

  const handleSendOTP = async () => {
    try {
      await ApiService.sendOTP(phone, setConfirmation);
    } catch (error) {
      message.error('Gửi OTP thất bại!');
    }
  };

  const handleVerifyOTP = async () => {
    try {
      await ApiService.verifyOTP(otp, confirmation);
      if (mode === 'reset') {
        navigate(`/reset-password?phone=${phone}`);
      } else {
        navigate(`/set-password?phone=${phone}`);
      }
    } catch (error) {
      message.error('Xác thực OTP thất bại!');
    }
  };

  return (
    <div className='flex items-center justify-center h-screen bg-gradient-to-b from-sky-300 to-blue-400'>
      <div className='bg-white p-8 rounded-xl shadow-lg text-center w-96'>
        <h2 className='text-2xl font-bold text-blue-600'>ZaLo</h2>
        <p className='text-gray-500 text-sm mt-1'>Đăng ký tài khoản Zalo</p>

        {/* Input số điện thoại */}
        <div className='flex mt-6'>
          {/* Dropdown mã quốc gia */}
          <select className='border border-gray-300 rounded-l px-3 py-2 bg-gray-100'>
            <option>VN</option>
          </select>
          <Input
            type='text'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder='Số điện thoại'
            className='border border-gray-300 rounded-r px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>

        <div className='flex items-center justify-between mt-2'>
          <label className='block text-sm font-medium text-gray-700 mt-1'>
            Mã xác thực
          </label>
          <span
            onClick={handleSendOTP}
            className='text-blue-500 cursor-pointer hover:underline'
          >
            Gửi OTP
          </span>
        </div>

        {/* Nhập mã OTP */}
        {confirmation && (
          <>
            <div className='mt-2 text-left'>
              <Input
                type='text'
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder='Nhập mã OTP'
                className='w-full p-2 border justify-center border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
              />
            </div>
            <Button
              onClick={handleVerifyOTP}
              className='mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition'
            >
              Xác thực mã OTP
            </Button>
          </>
        )}
        <Button
          onClick={() => navigate('/')}
          className='mt-4 w-full text-blue-600 font-medium hover:underline'
        >
          Quay về
        </Button>

        <div id='recaptcha-container' className='mt-4'></div>
      </div>
    </div>
  );
};

export default SendOTP;
