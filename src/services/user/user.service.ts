import { IResponseData } from '../../models/IResponseData';
import { IUser } from '../../models/User/IUser';
import { axiosRequest } from '../../utils/configs/axios.config';

const BASE_API = `${process.env.NEXT_PUBLIC_API_URL}`;
const API_URL = `${BASE_API}/user`;

const createUser = (userData: IUser): Promise<IResponseData<IUser>> => {
  return axiosRequest.post<any, IResponseData<IUser>>(`${API_URL}`, userData);
};

const getUser = (userId: string): Promise<IResponseData<IUser>> => {
  return axiosRequest.get<any, IResponseData<IUser>>(`${API_URL}/${userId}`);
};

const updateUser = (userId: string, updateData: Partial<IUser>): Promise<IResponseData<IUser>> => {
  return axiosRequest.put<any, IResponseData<IUser>>(`${API_URL}/${userId}`, updateData);
};

const deleteUser = (userId: string): Promise<IResponseData<null>> => {
  return axiosRequest.delete<any, IResponseData<null>>(`${API_URL}/${userId}`);
};

export const UserService = {
  createUser,
  getUser,
  updateUser,
  deleteUser
};
