import { BannerViewModel } from 'models/DTOs/bannerModel';

export interface BannerTableProps {
  onOpenModal: (item: BannerViewModel) => void;
}
