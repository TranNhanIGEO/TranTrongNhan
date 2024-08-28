import "./styles/index.scss";
import { FC } from 'react'
import { Button, FormControlProps } from "react-bootstrap";
import { useSelector } from "react-redux";

import { AuthState } from "stores/auth/authStateTypes";
import { ValidationModel } from "models/validationModel";
import { authStore } from "stores/auth/authSlice";
import { ChangePasswordModel } from "models/DTOs/userModel";
import AuthFormHeader from "./components/AuthFormHeader";
import FormUpsert from 'components/Form/FormUpsert';
import FormTextInput from "components/Form/FormTextInput";

import useChangePassword from "hooks/auth/useChangePassword";

const formControls: FormControlProps[] = [
  { name: "currentPassword", type: "password", placeholder: "Your Current Password" },
  { name: "newPassword", type: "password", placeholder: "Your New Password" },
  { name: "confirmPassword", type: "password", placeholder: "Your Confirm Password" }
];

const ChangePassword: FC = () => {
  const { errors }: AuthState = useSelector(authStore);
  const errorMessages: ValidationModel<ChangePasswordModel> = errors as ValidationModel<ChangePasswordModel>;

  const { 
    formData, 
    validationErrors, 
    handleChange, 
    handleChangePassword 
  } = useChangePassword();

  return (
    <div className="auth-form mx-auto p-6 rounded-2">
      <AuthFormHeader 
        title="Change Password" 
        message="Please enter your information to change password" 
      />
      <FormUpsert onSubmit={handleChangePassword}>
        {formControls.map(control => (
          <FormTextInput
            key={control.name}
            type={control.type}
            placeholder={control.placeholder}
            error={errorMessages?.[control.name as keyof ChangePasswordModel] ?? validationErrors?.[control.name as keyof ChangePasswordModel]}
            name={control.name as keyof ChangePasswordModel}
            value={formData?.[control.name as keyof ChangePasswordModel]}
            onChange={handleChange}
          />
        ))}
        <Button className="w-100 mb-5" variant="primary" type="submit">
          Submit
        </Button>
      </FormUpsert>
    </div>
  )
}

export default ChangePassword