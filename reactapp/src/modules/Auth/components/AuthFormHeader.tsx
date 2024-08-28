import { Fragment } from "react/jsx-runtime";
import { AuthFormHeaderProps } from "../types/authProps";

const AuthFormHeader: React.FC<AuthFormHeaderProps> = ({ title, message }) => {
  return (
    <Fragment>
      <div className="mb-3 text-center">
        <h4 className="fw-bolder">{title}</h4>
      </div>
      <div className="mb-4 text-center">
        <p className="text-muted">{message}</p>
      </div>
    </Fragment>
  );
};

export default AuthFormHeader;
