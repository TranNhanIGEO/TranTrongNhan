import { HTMLAttributes } from "react";

export interface DotSliderProps extends HTMLAttributes<HTMLDivElement> { }

export interface DotButtonsProps extends HTMLAttributes<HTMLUListElement> {
  slideIndex: number;
  slideCount: number;
  onDotClick: (index: number) => void;
}
