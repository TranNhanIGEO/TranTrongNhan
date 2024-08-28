import "./styles/index.scss"
import { FC, Fragment } from 'react';
import Banners from './Banners';
import Products from './Products';
import Categories from './Categories';
import Notes from './Notes';
import Serves from './Serves';
// import Services from './Services';
import Feedbacks from './Feedbacks';
import News from './News';

const Home: FC = () => {
  return (
    <Fragment>
      <Banners />
      <Products title="Sản phẩm mới" isNew />
      <Products title="Sản phẩm bán chạy" isBestSelling />
      <Categories />
      <Notes />
      <Products categoryId='39A48C2C-081A-4D88-8014-2A45E16433B6' title="Hoa khai trương" />
      <Products categoryId='B993A419-275B-4A27-A2EC-65191C337E40' title="Bó hoa hồng" />
      <Products categoryId='2c17d277-4075-4f84-8b01-e8b1b84a1633' title="Bó hoa sáp" />
      <Serves />
      {/* <Services /> */}
      <Feedbacks />
      <News />
    </Fragment>
  );
};

export default Home;
