import { useRef } from 'react';
import { FeedbackViewModel } from 'models/DTOs/feedbackModel';
import { QueryModel } from 'models/Query/queryModel';
import configs from 'configs';
import FeedbackCard from '../components/Card/Feedback/FeedbackCard';
import DotSlider from '../components/Slider/Dots/DotSlider';
import Heading from '../components/Heading/Heading';
import useQuery from 'hooks/common/useQuery';
import useGetFeedbacks from 'hooks/feedbackCRUD/useGetFeedbacks';
import useAnimation from 'hooks/common/useAnimation';

const queryModel: QueryModel<FeedbackViewModel> = {
  ...configs.query.feedbacks,
  pageSize: 4,
};

const Feedbacks = () => {
  const { debouncedQuery } = useQuery(queryModel);
  const { records } = useGetFeedbacks(debouncedQuery);

  const animateRef = useRef<HTMLDivElement>(null);
  useAnimation(animateRef);

  return (
    <section className="element-container container-sm">
      <div className="element-overlay rounded-3">
        <div className="element-bg-image" style={{ backgroundImage: 'url(/img/feedback.jfif)' }} />
      </div>
      <div className="feedbacks-wrapper position-relative">
        <Heading title="Feedback từ khách hàng" />
        <div ref={animateRef} className="element-animate">
          <DotSlider className="row">
            {records?.map(feedback => (
              <FeedbackCard key={feedback.id} feedback={feedback} />
            ))}
          </DotSlider>
        </div>
      </div>
    </section>
  );
};

export default Feedbacks;
