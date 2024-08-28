import "./styles/index.scss";
import { FC } from 'react'
import { BsFacebook } from 'react-icons/bs';
import { FcGoogle } from "react-icons/fc";
import { Button, ButtonGroup, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { LoginModel } from "models/DTOs/authModel";
import { AuthState } from "stores/auth/authStateTypes";
import { authStore } from "stores/auth/authSlice";
import { ValidationModel } from "models/validationModel";
import AuthFormHeader from "./components/AuthFormHeader";
import FormUpsert from 'components/Form/FormUpsert';
import FormTextInput from "components/Form/FormTextInput";
import ExternalLogin from 'modules/Auth/components/ExternalLogin';

import configs from 'configs';
import useLogin from "hooks/auth/useLogin";
import useFacebookLogin from "hooks/auth/useFacebookLogin";
import useGoogleLogin from "hooks/auth/useGoogleLogin";

// const formControls: FormControlProps[] = [
//   { name: "userNameOrEmail", type: "text", placeholder: "Your UserName Or Email" },
//   { name: "password", type: "password", placeholder: "Your Password" }
// ]

const Login: FC = () => {
  const { errors }: AuthState = useSelector(authStore);
  const errorMessages: ValidationModel<LoginModel> = errors as ValidationModel<LoginModel>;
  const { 
    formData, 
    validationErrors, 
    handleChange, 
    handleLogin 
  } = useLogin();

  const { handleFacebookLogin } = useFacebookLogin();
  const { handleGoogleLogin } = useGoogleLogin();
  
  const externalLogins = [
    { text: 'Facebook', icon: <BsFacebook fill="blue" size={20} />, onClick: handleFacebookLogin },
    { text: 'Google', icon: <FcGoogle size={20} />, onClick: handleGoogleLogin },
  ];

  return (
    <div className="auth-form mx-auto p-6 rounded-2">
      <AuthFormHeader
        title="Sign In" 
        message="Please enter username and password to sign in" 
      />
      <FormUpsert onSubmit={handleLogin}>
        <FormTextInput
          type={"text"}
          placeholder={"Your UserName Or Email"}
          error={errorMessages?.["userNameOrEmail"] ?? validationErrors?.["userNameOrEmail"]}
          name={"userNameOrEmail"}
          value={formData?.["userNameOrEmail"]}
          onChange={handleChange}
        />
        <FormTextInput
          type={"password"}
          placeholder={"Your Password"}
          error={errorMessages?.["password"] ?? validationErrors?.["password"]}
          name={"password"}
          value={formData?.["password"]}
          onChange={handleChange}
        />
        <Form.Group className="d-flex justify-content-between mb-5">
          <Form.Check type="checkbox" label="Remember me" className="text-muted" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} />
          <Link className="text-primary" to={configs.routes.auth.forgetPassword}>Forgot password?</Link>
        </Form.Group>
        <Button className="w-100 mb-5" variant="primary" type="submit">
          Sign In
        </Button>
      </FormUpsert>
      <hr className="w-50 mx-auto" />
      <ButtonGroup className="d-flex gap-3 mt-5">
        {externalLogins.map(el => (
          <ExternalLogin key={el.text} text={el.text} icon={el.icon} onClick={el.onClick} />
        ))}
      </ButtonGroup>
      <Form.Group className="mt-4">
        <span className="text-black-50">Don’t have an account? </span>
        <Link className="text-primary" to={configs.routes.auth.register}>Sign up</Link>
      </Form.Group>
    </div>
  )
}

export default Login