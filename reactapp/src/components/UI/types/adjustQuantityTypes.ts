import { ChangeEvent } from "react";

export interface AdjustQuantityProps {
    id: string;
    quantity: number;
    onQuantityChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onIncreaseQuantity: () => void;
    onDecreaseQuantity: () => void;
}