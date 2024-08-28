import './Evaluation.scss';
import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';

export interface EvaluationProps extends HTMLAttributes<HTMLDivElement> {
  rating: number;
  onRatingChange?: (rating: number) => void;
}

const Evaluation: FC<EvaluationProps> = ({ rating = 1, onRatingChange, className }) => {
  const starArr = Array.from({ length: 5 }, (_, i) => i + 1).reverse();

  return (
    <div className={clsx("element-evaluation d-flex flex-row-reverse", className)}>
      {starArr.map(number => (
        <span
          key={number}
          onClick={() => onRatingChange && onRatingChange(number)}
          className={clsx('element-star', {
            "selected": number >= 1 && number === rating,
            'cursor-pointer': onRatingChange,
          })}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default Evaluation;
