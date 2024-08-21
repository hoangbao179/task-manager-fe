import axios from 'axios';
import { IResponseData } from '../../models/IResponseData';
import { IUser } from '../../models/User/IUser';

const BASE_API = `${process.env.NEXT_PUBLIC_API_URL}`;
const LOGIN_URL = `${BASE_API}/auth/login`;
const REGISTER_URL = `${BASE_API}/auth/register`;

export class AuthService {
  static async login(email: string, password: string): Promise<IResponseData<{ token: string }>> {
    const response = await axios.post<IResponseData<{ token: string }>>(LOGIN_URL, { email, password });
    return response.data;
  }

  static async signUp(fullName: string, email: string, password: string): Promise<IResponseData<IUser>> {
    const response = await axios.post<IResponseData<IUser>>(REGISTER_URL, { fullName, email, password });
    return response.data;
  }
}
