import "./styles/index.scss";
import { FC, useMemo } from 'react'
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

import { AuthState } from "stores/auth/authStateTypes";
import { ValidationModel } from "models/validationModel";
import { authStore } from "stores/auth/authSlice";
import { ProfileFormModel } from "models/DTOs/userModel";
import AuthFormHeader from "./components/AuthFormHeader";
import FormUpsert from 'components/Form/FormUpsert';
import FormTextInput from "components/Form/FormTextInput";

import useChangeProfile from "hooks/auth/useChangeProfile";
import FormFileInput from "components/Form/FormFileInput";

const Profile: FC = () => {
  const { errors }: AuthState = useSelector(authStore);
  const errorMessages: ValidationModel<ProfileFormModel> = errors as ValidationModel<ProfileFormModel>;

  const { 
    formData, 
    validationErrors, 
    handleChange, 
    handleChangeProfile 
  } = useChangeProfile();

  const imageValue = useMemo(() => {
    if (!formData.avatar) return;
    return formData.file?.size ? URL.createObjectURL(formData.file) : `${process.env.REACT_APP_SERVER_DOMAIN}/${formData.avatar}`;
  }, [formData.avatar, formData.file]);

  return (
    <div className="auth-form mx-auto p-6 rounded-2">
      <AuthFormHeader 
        title="My Profile" 
        message="Please enter your information to change profile" 
      />
      <FormUpsert onSubmit={handleChangeProfile}>
        <FormFileInput
          label="Ảnh đại diện"
          error={errorMessages?.avatar ?? validationErrors?.avatar}
          name={'avatar' as keyof ProfileFormModel}
          value={imageValue ?? ""}
          onChange={handleChange}
        />
        <FormTextInput
          label="Số điện thoại"
          type='text'
          error={errorMessages?.phoneNumber ?? validationErrors?.phoneNumber}
          name={'phoneNumber' as keyof ProfileFormModel}
          value={formData.phoneNumber ?? ""}
          onChange={handleChange}
        />
        <FormTextInput
          label="Tên đầy đủ"
          type='text'
          error={errorMessages?.fullName ?? validationErrors?.fullName}
          name={'fullName' as keyof ProfileFormModel}
          value={formData.fullName ?? ""}
          onChange={handleChange}
        />
        <FormTextInput
          label="Địa chỉ nhà ở"
          type='text'
          error={errorMessages?.homeAddress ?? validationErrors?.homeAddress}
          name={'homeAddress' as keyof ProfileFormModel}
          value={formData.homeAddress ?? ""}
          onChange={handleChange}
        />
        <Button className="w-100 mb-5" variant="primary" type="submit">
          Submit
        </Button>
      </FormUpsert>
    </div>
  )
}

export default Profile