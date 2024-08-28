import './ServiceCard.scss';
import { FC } from 'react';

const ServiceCard: FC = () => {
  return (
    <div className="col-lg-3 col-md-6 col-6">
      <div className="services-image overflow-hidden m-3 rounded-3 cursor-pointer">
        <img className="object-fit-cover" src="@Model?[i]?.ImageUrl" alt="" loading="lazy" />
      </div>
    </div>
  );
};

export default ServiceCard;
