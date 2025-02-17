import axios from 'axios';
import { auth } from './firebaseConfig';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { message } from 'antd';

export default class ApiService {
  static BASE_URL = import.meta.env.VITE_API_BASE_URL;

  static getHeader() {
    const token = localStorage.getItem('token');
    return {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    };
  }

  static async loginApi(loginDetails) {
    try {
      const response = await axios.post(
        `${this.BASE_URL}/auth/login`,
        loginDetails
      );
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Đăng nhập thất bại';
    }
  }

  static async resetPassword(resetPasswordDetails) {
    try {
      const response = await axios.post(
        `${this.BASE_URL}/users/resetPassword`,
        resetPasswordDetails
      );
      message.success('Đặt lại mật khẩu thành công!');
      return response.data;
    } catch (error) {
      message.error(
        'Đặt lại mật khẩu thất bại: ' +
          (error.response?.data?.message || 'Không xác định')
      );
    }
  }

  // 🔥 Gửi OTP đến số điện thoại
  static async sendOTP(phone, setConfirmation) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      'recaptcha-container',
      {
        size: 'invisible'
      }
    );

    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone,
        window.recaptchaVerifier
      );
      setConfirmation(confirmationResult);
      message.success('OTP đã gửi, vui lòng kiểm tra tin nhắn!');
    } catch (error) {
      message.error('Lỗi gửi OTP:', error);
      throw error;
    }
  }

  // 🔥 Xác thực OTP và gửi token lên server
  static async verifyOTP(otp, confirmation) {
    try {
      const result = await confirmation.confirm(otp);
      const idToken = await result.user.getIdToken();

      const response = await axios.post(`${this.BASE_URL}/auth/verify`, null, {
        params: { token: idToken }
      });

      return response.data;
    } catch (error) {
      message.error('Lỗi xác thực OTP:', error);
      throw error;
    }
  }

  static async getAllUser() {
    try {
      const response = await axios.get(`${this.BASE_URL}/users/get-all`, {
        headers: this.getHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy thông tin all user:', error);
    }
  }

  static async getConversation() {
    try {
      const response = await axios.get(`${this.BASE_URL}/conversation`, {
        headers: this.getHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy thông tin conversation:', error);
    }
  }

  static async getPhoneLogin() {
    try {
      const response = await axios.get(`${this.BASE_URL}/users/get-phone`, {
        headers: this.getHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy thông tin phone user:', error);
    }
  }

  static isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
