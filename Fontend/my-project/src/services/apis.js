import axios from 'axios';

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
