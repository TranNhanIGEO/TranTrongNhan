import "./styles/index.scss";
import { FC } from 'react'
import { Button, FormControlProps } from "react-bootstrap";
import { useSelector } from "react-redux";

import { AuthState } from "stores/auth/authStateTypes";
import { ValidationModel } from "models/validationModel";
import { authStore } from "stores/auth/authSlice";
import { ResetPasswordModel } from "models/DTOs/authModel";
import AuthFormHeader from "./components/AuthFormHeader";
import FormUpsert from 'components/Form/FormUpsert';
import FormTextInput from "components/Form/FormTextInput";

import useResetPassword from "hooks/auth/useResetPassword";

const formControls: FormControlProps[] = [
  { name: "password", type: "password", placeholder: "Your Password" },
  { name: "confirmPassword", type: "password", placeholder: "Your Confirm Password" }
];

const ResetPassword: FC = () => {
  const { errors }: AuthState = useSelector(authStore);
  const errorMessages: ValidationModel<ResetPasswordModel> = errors as ValidationModel<ResetPasswordModel>;

  const { 
    formData, 
    validationErrors, 
    handleChange, 
    handleResetPassword 
  } = useResetPassword();

  return (
    <div className="auth-form mx-auto p-6 rounded-2">
      <AuthFormHeader 
        title="Reset Password" 
        message="Please enter your information to reset password" 
      />
      <FormUpsert onSubmit={handleResetPassword}>
        {formControls.map(control => (
          <FormTextInput
            key={control.name}
            type={control.type}
            placeholder={control.placeholder}
            error={errorMessages?.[control.name as keyof ResetPasswordModel] ?? validationErrors?.[control.name as keyof ResetPasswordModel]}
            name={control.name as keyof ResetPasswordModel}
            value={formData?.[control.name as keyof ResetPasswordModel]}
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

export default ResetPassword