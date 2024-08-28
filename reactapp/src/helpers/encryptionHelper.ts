import CryptoJS from 'crypto-js';
import { ProfileViewModel } from 'models/DTOs/userModel';
import { jwtDecode, JwtPayload } from 'jwt-decode';

class EncryptionHelper {
  static hashPassword = (password: string): string => {
    return CryptoJS.SHA256(password).toString();
  }

  static decodeToken = (token: string): ProfileViewModel | null => {
    if (!token) return null;
    const decodeJWT: JwtPayload = jwtDecode(token);
    const keyJWT = Object.keys(decodeJWT);
    const valueJWT = Object.values(decodeJWT);
    const claimXMLS = process.env.REACT_APP_CLAIM as string;
    const emptyString = "";
    const userView = keyJWT.reduce((acc, val, i) => {
      val = val.includes(claimXMLS) ? val.replace(claimXMLS, emptyString) : val;
      return { ...acc, [val]: valueJWT[i] };
    }, {});
    return userView as ProfileViewModel;
  }
}

export default EncryptionHelper;
