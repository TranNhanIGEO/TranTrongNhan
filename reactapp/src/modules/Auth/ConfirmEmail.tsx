import './styles/index.scss';
import { FC, useEffect } from 'react';
import useConfirmEmail from 'hooks/auth/useConfirmEmail';

const ConfirmEmail: FC = () => {
  const { handleConfirmEmail } = useConfirmEmail();

  useEffect(() => {
    let isCalledApi = false;

    if (!isCalledApi) {
      handleConfirmEmail();
    }

    return () => { isCalledApi = true; }
  }, [handleConfirmEmail]);

  return (
    <div className="auth-form mx-auto p-6 rounded-2">
      <div className="text-center">
        <h3>Welcome, </h3>
        <p className="mb-3">We are verifying, please wait a moment...</p>
      </div>
    </div>
  );
};

export default ConfirmEmail;
