import "./styles/index.scss"
import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import sanitizeHtml from 'sanitize-html';
import useGetNewsById from 'hooks/newsCRUD/useGetNewsById';

const NewsDetail: FC = () => {
  const { id } = useParams();
  const { record } = useGetNewsById(id);

  const content = useMemo(() => {
    return sanitizeHtml(record.content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2']),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ['src', 'alt'],
      },
    });
  }, [record.content]);

  return (
    <Container>
      <div dangerouslySetInnerHTML={{ __html: content }} className="my-6 news-detail"></div>
    </Container>
  );
};

export default NewsDetail;
