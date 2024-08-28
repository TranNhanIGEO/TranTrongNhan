import "./styles/index.scss";
import { FC } from 'react'
import { Button, Form, FormControlProps } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { AuthState } from "stores/auth/authStateTypes";
import { ValidationModel } from "models/validationModel";
import { authStore } from "stores/auth/authSlice";
import { RegisterModel } from "models/DTOs/authModel";
import AuthFormHeader from "./components/AuthFormHeader";
import FormUpsert from 'components/Form/FormUpsert';
import FormTextInput from "components/Form/FormTextInput";

import configs from 'configs';
import useRegister from "hooks/auth/useRegister";

const formControls: FormControlProps[] = [
  { name: "email", type: "email", placeholder: "Your Email" },
  { name: "userName", type: "text", placeholder: "Your Username" },
  { name: "password", type: "password", placeholder: "Your Password" },
  { name: "confirmPassword", type: "password", placeholder: "Your Confirm Password" }
];

const Register: FC = () => {
  const { errors }: AuthState = useSelector(authStore);
  const errorMessages: ValidationModel<RegisterModel> = errors as ValidationModel<RegisterModel>;

  const { 
    formData, 
    validationErrors, 
    handleChange, 
    handleRegister 
  } = useRegister();

  return (
    <div className="auth-form mx-auto p-6 rounded-2">
      <AuthFormHeader 
        title="Sign Up" 
        message="Please enter your information to sign up" 
      />
      <FormUpsert onSubmit={handleRegister}>
        {formControls.map(control => (
          <FormTextInput
            key={control.name}
            type={control.type}
            placeholder={control.placeholder}
            error={errorMessages?.[control.name as keyof RegisterModel] ?? validationErrors?.[control.name as keyof RegisterModel]}
            name={control.name as keyof RegisterModel}
            value={formData?.[control.name as keyof RegisterModel]}
            onChange={handleChange}
          />
        ))}
        <Button className="w-100 mb-5" variant="primary" type="submit">
          Sign Up
        </Button>
      </FormUpsert>
      <hr className="w-50 mx-auto" />
      <Form.Group className="mt-4">
        <span className="text-black-50">Do you already an account? </span>
        <Link className="text-primary" to={configs.routes.auth.login}>Sign in</Link>
      </Form.Group>
    </div>
  )
}

export default Register