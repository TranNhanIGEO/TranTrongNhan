import { FeedbackViewModel } from 'models/DTOs/feedbackModel';

export interface FeedbackTableProps {
  onOpenModal: (item: FeedbackViewModel) => void;
}
