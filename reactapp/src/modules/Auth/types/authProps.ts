import { ReactNode } from 'react';
import { ButtonProps } from 'react-bootstrap';

export interface ExternalLoginProps extends ButtonProps {
  text: string;
  icon: ReactNode;
}

export interface AuthFormHeaderProps {
  title: string;
  message: string;
}
