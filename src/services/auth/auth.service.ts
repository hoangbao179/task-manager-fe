import { IResponseData } from '../../models/IResponseData';
import { IUserForm } from '../../models/User/IUserForm';
import { axiosRequest } from '../../utils/configs/axios.config';

const BASE_API = `${process.env.NEXT_PUBLIC_API_URL}`;

const login = (email: string, password: string): Promise<IResponseData<string>> => {
  return axiosRequest.post<any, IResponseData<string>>(`${BASE_API}/auth/login`, { email, password });
};

const register = (data: IUserForm): Promise<IResponseData<null>> => {
  return axiosRequest.post<any, IResponseData<null>>(`${BASE_API}/auth/register`, { data });
};

export const AuthService = {
  login,
  register
};