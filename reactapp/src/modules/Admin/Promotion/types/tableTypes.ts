import { PromotionViewModel } from 'models/DTOs/promotionModel';

export interface PromotionTableProps {
  onOpenModal: (item: PromotionViewModel) => void;
}
