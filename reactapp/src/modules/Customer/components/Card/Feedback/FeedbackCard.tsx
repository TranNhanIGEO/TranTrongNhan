import "./FeedbackCard.scss";
import { FC } from 'react'
import { FeedbackViewModel } from 'models/DTOs/feedbackModel';
import Evaluation from "../../Evaluation/Evaluation";

export interface FeedbackCardProps {
    feedback: FeedbackViewModel;
  }
  
const FeedbackCard: FC<FeedbackCardProps> = ({ feedback }) => {
  return (
    <div className="position-relative col-lg-6 col-12 my-6">
    <div className="feedback-card d-flex flex-column justify-content-between h-100 p-6 rounded-3 bg-white">
      <div className="feedback-card-text text-center mb-3">
        <p className="ff-pacifico fs-4">{feedback.comment}</p>
      </div>
      <div className="feedback-card-rating d-flex align-items-center">
        <div className="overflow-hidden rounded-circle">
          <img className="object-fit-cover" src={`${process.env.REACT_APP_SERVER_DOMAIN}/${feedback.userAvatar}`} alt="" loading="lazy" />
        </div>
        <div className="ms-5">
          <p className="ff-pacifico fs-4">{feedback.userFullName}</p>
          <Evaluation rating={feedback.vote} className="justify-content-end" />
        </div>
      </div>
      <div className="feedback-card-logo">
        <img className="object-fit-cover" src="/logo.png" alt="" />
      </div>
    </div>
  </div>
  )
}

export default FeedbackCard