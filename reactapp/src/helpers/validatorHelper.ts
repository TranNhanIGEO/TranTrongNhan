class ValidatorHelper {
  static supportedType = {
    image: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/tiff', 'image/webp'],
    video: ['video/mp4', 'video/quicktime', '.mov', '.mp4'],
  };

  static isValidUserInfo(value: string, regexp: RegExp): boolean {
    return regexp.test(value);
  }

  static isValidPhoneNumber(value: string): boolean {
    const pattern: RegExp = /^(?:\+84|84|0)(3|5|7|8|9)([0-9]{8})$/;
    return this.isValidUserInfo(value, pattern);
  };

  static isValidEmail(value: string): boolean {
    const pattern: RegExp = /^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
    return this.isValidUserInfo(value, pattern);
  };

  static isValidUserName(value: string): boolean {
    const pattern: RegExp = /^[a-z0-9]{8,32}$/;
    return this.isValidUserInfo(value, pattern);
  };

  static isValidPassword(value: string): boolean {
    const pattern: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,32}$/;
    return this.isValidUserInfo(value, pattern);
  };

  static isSupportedFile = (fileType: string, validType: 'image' | 'video'): boolean => {
    return this.supportedType[validType].includes(fileType);
  };

  static isFileSizeValid = (fileSize: number, maxSize: number): boolean => {
    return fileSize <= maxSize;
  };

  static isDecimalString = (value: string): boolean => {
    const pattern: RegExp = /^(\d{1,3}(,\d{3})*)(\.\d{2})?$/;
    return pattern.test(value);
  };

  static isGreaterThanOrEqualTo = (value: number, minValue: number): boolean => {
    return value >= minValue;
  }
  
  static isLessThanOrEqualTo = (value: number, maxValue: number): boolean => {
    return value <= maxValue;
  }
}

export default ValidatorHelper;
