import { FC } from 'react';
import { StatisticalSummaryProps } from './types/StatisticalSummary';

const StatisticalSummary: FC<StatisticalSummaryProps> = ({ title, data, icon }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mx-3">
      <div className="w-100 text-nowrap">
        <p className="fw-bold fs-7 ff-roboto text-muted">{title}</p>
        <p className="fw-bolder fs-4 ff-montserrat text-dark">{data}</p>
      </div>
      <div className="bg-muted rounded-3 text-white p-3">{icon}</div>
    </div>
  );
};

export default StatisticalSummary;
