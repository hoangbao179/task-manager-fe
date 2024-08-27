import { IResponseData } from '../../models/IResponseData';
import { axiosRequest } from '../../utils/configs/axios.config';

const BASE_API = `${process.env.NEXT_PUBLIC_API_URL}`;

const login = (email: string, password: string): Promise<IResponseData<string>> => {
  return axiosRequest.post<any, IResponseData<string>>(`${BASE_API}/auth/login`, { email, password });
};

const register = (name: string, email: string, password: string): Promise<IResponseData<null>> => {
  return axiosRequest.post<any, IResponseData<null>>(`${BASE_API}/auth/register`, { email: email, password: password, fullName: name });
};

export const AuthService = {
  login,
  register
};