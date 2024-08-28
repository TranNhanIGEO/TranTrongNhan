import { FC } from 'react';
import Heading from '../components/Heading/Heading';
import ServeCard from '../components/Card/Serve/ServeCard';

const serves = [
  { id: 1, topText: 'Giao hoa tận nơi', bottomText: 'Đảm bảo hoa tươi', image: '/img/enthusiasm-delivery.png' },
  { id: 2, topText: 'Giao hoa nhanh', bottomText: 'Trong 90 - 120 phút', image: '/img/fast-delivery.png' },
  { id: 3, topText: 'Miễn phí giao hàng', bottomText: '(> 300k - Huyện Cần Giờ)', image: '/img/free-delivery.png' },
  { id: 4, topText: 'Giao hàng đúng mẫu', bottomText: 'Giao đúng tone màu', image: '/img/correct-delivery.png' },
];

const Serves: FC = () => {
  return (
    <section className="element-container container-sm">
      <div className="serves-wrapper p-5">
        <Heading title="Tại sao nên chọn Kiwi Florist" />
        <div className="d-flex flex-wrap">
          {serves.map(serve => (
            <ServeCard key={serve.id} serve={serve} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Serves;
