import axios from 'axios';
import { IResponseData } from '../../models/IResponseData';
import { IUser } from '../../models/User/IUser';

const BASE_API = `${process.env.NEXT_PUBLIC_API_URL}`;
const API_URL = `${BASE_API}/user`;

export class UserService {
  static async createUser(userData: IUser): Promise<IResponseData<IUser>> {
    const response = await axios.post<IResponseData<IUser>>(API_URL, userData);
    return response.data;
  }

  static async getUser(userId: string): Promise<IResponseData<IUser>> {
    const response = await axios.get<IResponseData<IUser>>(`${API_URL}/${userId}`);
    return response.data;
  }

  static async updateUser(userId: string, updateData: Partial<IUser>): Promise<IResponseData<IUser>> {
    const response = await axios.put<IResponseData<IUser>>(`${API_URL}/${userId}`, updateData);
    return response.data;
  }

  static async deleteUser(userId: string): Promise<IResponseData<null>> {
    const response = await axios.delete<IResponseData<null>>(`${API_URL}/${userId}`);
    return response.data;
  }
}
