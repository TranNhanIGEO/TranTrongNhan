import './ServeCard.scss';
import { FC } from 'react';

export interface ServeCardProps {
  serve: {
    id: number;
    image: string;
    topText: string;
    bottomText: string;
  };
}

const ServeCard: FC<ServeCardProps> = ({ serve }) => {
  return (
    <div className="col-lg-3 col-6 text-center">
      <img src={serve.image} alt={serve.topText + serve.bottomText} loading="lazy" />
      <h6 className="ff-montserrat fw-bolder">{serve.topText}</h6>
      <h6 className="ff-montserrat fw-bolder">{serve.bottomText}</h6>
    </div>
  );
};

export default ServeCard;
