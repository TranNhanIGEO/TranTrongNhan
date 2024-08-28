import { AxiosParam, QueryDataParam } from "../baseServiceTypes";
import { ProfileViewModel } from "models/DTOs/userModel";

export interface GetUsersService extends QueryDataParam<ProfileViewModel>, AxiosParam { };
