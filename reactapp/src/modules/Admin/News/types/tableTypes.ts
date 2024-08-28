import { NewsViewModel } from 'models/DTOs/newsModel';

export interface NewsTableProps {
  onOpenModal: (item: NewsViewModel) => void;
}
