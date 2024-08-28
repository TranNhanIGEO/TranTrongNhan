import { HTMLAttributes } from "react";

export interface ArrowSliderProps extends HTMLAttributes<HTMLDivElement> { }

export interface ArrowButtonsProps extends HTMLAttributes<HTMLDivElement> {
  slideIndex: number;
  slideCount: number;
  onNextArrowClick: () => void;
  onPrevArrowClick: () => void;
}
