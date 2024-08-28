import configs from 'configs';
import StringHelper from 'helpers/stringHelper';
import { GetUsersService } from './userServiceTypes';

class UserService {
  static getUsers = async ({ queryData, axiosJWT }: GetUsersService) => {
    return await axiosJWT.get(configs.apis.admin.user + "?" + StringHelper.toParams(queryData));
  };
}

export default UserService;
