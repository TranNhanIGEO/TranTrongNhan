import clsx from 'clsx';
import { FC, useCallback, useMemo } from 'react';
import { DotButtonsProps } from './DotSliderTypes';

const DotButtons: FC<DotButtonsProps> = ({ slideIndex, slideCount, className, onDotClick, ...props }) => {
  const slideCountArr: number[] = useMemo(() => Array.from({ length: slideCount }, (_, i) => i), [slideCount]);

  const dotsClass = clsx('element-dot-buttons', className);
  const dotClass = useCallback(
    (index: number) => clsx('element-dot-button', { active: slideIndex === index }),
    [slideIndex],
  );

  return (
    <ul className={dotsClass} {...props}>
      {slideCountArr?.map(idx => (
        <li key={idx} className={dotClass(idx)} onClick={() => onDotClick(idx)} />
      ))}
    </ul>
  );
};

export default DotButtons;
