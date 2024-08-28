import { FC } from "react";
import { Link } from "react-router-dom";

const NotFound: FC = () => {
  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <div className="text-center">
        <h1>404 - Not Found</h1>
        <p className="mb-3">Oops! The page you are looking for could not be found.</p>
        <Link to="/" className="btn btn-primary rounded-5">Go to Home Page</Link>
      </div>
    </div>
  );
};

export default NotFound;