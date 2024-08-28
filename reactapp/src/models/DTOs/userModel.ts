export interface ProfileModel {
  phoneNumber?: string;
  fullName?: string;
  homeAddress?: string;
  avatar?: string;
}

export interface ProfileFormModel extends ProfileModel {
  file?: File;
}

export interface ProfileViewModel extends ProfileModel {
  id: string;
  userName: string;
  email: string;
  role?: string | string[];
  emailConfirmed?: boolean;
  // phoneNumberConfirmed?: boolean;
  // twoFactorEnabled?: boolean;
  // lockoutEnabled?: boolean;
  // accessFailedCount?: number;
  // lockoutEnd?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ChangePasswordModel {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangeEmailModel {
  email: string;
}
