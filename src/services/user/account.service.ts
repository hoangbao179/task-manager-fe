import { IResponseData } from '../../models/IResponseData';
import { IUser } from '../../models/User/IUser';
import { axiosRequest } from '../../utils/configs/axios.config';

const BASE_API = `${process.env.NEXT_PUBLIC_API_URL}`;
const API_URL = `${BASE_API}/account`;

const getCurrentUser = (): Promise<IResponseData<IUser>> => {
  return axiosRequest.get<any, IResponseData<IUser>>(`${API_URL}`);
}

export const AccountService  = {
  getCurrentUser
};
