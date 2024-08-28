import { IResponseData } from '../../models/IResponseData';
import { ILoginForm } from '../../models/User/ILoginForm';
import { IUserForm } from '../../models/User/IUserForm';
import { axiosRequest } from '../../utils/configs/axios.config';

const BASE_API = `${process.env.NEXT_PUBLIC_API_URL}`;

const login = (loginForm: ILoginForm): Promise<IResponseData<string>> => {
  return axiosRequest.post<any, IResponseData<string>>(`${BASE_API}/auth/login`, loginForm );
};

const register = (data: IUserForm): Promise<IResponseData<null>> => {
  return axiosRequest.post<any, IResponseData<null>>(`${BASE_API}/auth/register`, data );
};

export const AuthService = {
  login,
  register
};