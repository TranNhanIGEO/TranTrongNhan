import "./Heading.scss";
import { FC } from 'react';

export interface HeadingProps {
  title: string;
  isBreak?: boolean;
}

const Heading: FC<HeadingProps> = ({ title, isBreak = false }) => {
  return (
    <div className="text-center mb-6">
      <h1 className="ff-pacifico fw-bolder">{title}</h1>
      {isBreak && <hr className="my-0 mx-auto w-25" style={{ minWidth: 250 }} />}
    </div>
  );
};

export default Heading;
