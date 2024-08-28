import "./styles/index.scss";
import { FC } from 'react'
import { Button, Form, FormControlProps } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { AuthState } from "stores/auth/authStateTypes";
import { ValidationModel } from "models/validationModel";
import { authStore } from "stores/auth/authSlice";
import { ForgotPasswordModel } from "models/DTOs/authModel";
import AuthFormHeader from "./components/AuthFormHeader";
import FormUpsert from 'components/Form/FormUpsert';
import FormTextInput from "components/Form/FormTextInput";

import configs from 'configs';
import useForgotPassword from "hooks/auth/useForgotPassword";

const formControls: FormControlProps[] = [
  { name: "email", type: "email", placeholder: "Your Email" },
];

const ForgotPassword: FC = () => {
  const { errors }: AuthState = useSelector(authStore);
  const errorMessages: ValidationModel<ForgotPasswordModel> = errors as ValidationModel<ForgotPasswordModel>;

  const { 
    formData, 
    validationErrors, 
    handleChange, 
    handleForgotPassword 
  } = useForgotPassword();

  return (
    <div className="auth-form mx-auto p-6 rounded-2">
      <AuthFormHeader 
        title="Forgot Password" 
        message="Please enter your email to reset your password" 
      />
      <FormUpsert onSubmit={handleForgotPassword}>
        {formControls.map(control => (
          <FormTextInput
            key={control.name}
            type={control.type}
            placeholder={control.placeholder}
            error={errorMessages?.[control.name as keyof ForgotPasswordModel] ?? validationErrors?.[control.name as keyof ForgotPasswordModel]}
            name={control.name as keyof ForgotPasswordModel}
            value={formData?.[control.name as keyof ForgotPasswordModel]}
            onChange={handleChange}
          />
        ))}
        <Button className="w-100 mb-5" variant="primary" type="submit">
          Submit
        </Button>
      </FormUpsert>
      <hr className="w-50 mx-auto" />
      <Form.Group className="mt-4">
        <span className="text-black-50">Do you remember your password? </span>
        <Link className="text-primary" to={configs.routes.auth.login}>Sign in</Link>
      </Form.Group>
    </div>
  )
}

export default ForgotPassword