import { FC, Fragment } from 'react';
import { Navbar } from 'layouts/Admin/components';
import FeedbackTable from './Table';
import DeleteFeedback from './Delete';
import useFeedbackMangement from './hooks/useFeedbackManagement';

const FeedbackManager: FC = () => {
  const { isOpenModal, handleCloseModal, handleOpenModal, handleDeleteFeedback } = useFeedbackMangement();

  return (
    <Fragment>
      <Navbar title='Feedback management' />
      <FeedbackTable onOpenModal={handleOpenModal} />
      <DeleteFeedback isOpenModal={isOpenModal as boolean} onDelete={handleDeleteFeedback} onCloseModal={handleCloseModal} />
    </Fragment>
  );
};

export default FeedbackManager;
