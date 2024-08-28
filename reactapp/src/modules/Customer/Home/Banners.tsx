import { FC } from 'react';
import { BannerViewModel } from 'models/DTOs/bannerModel';
import useGetBanners from 'hooks/bannerCRUD/useGetBanners';
import useQuery from 'hooks/common/useQuery';
import configs from 'configs';
import { QueryModel } from 'models/Query/queryModel';
import useBannerSlider from './hooks/useBannerSlider';

const queryModel: QueryModel<BannerViewModel> = {
  ...configs.query.banners,
  pageSize: 5,
};

const Banners: FC = () => {
  const { debouncedQuery } = useQuery(queryModel);
  const { records } = useGetBanners(debouncedQuery);
  const {
    slideIndex,
    handleNextSlide,
    handlePrevSlide,
    handleToSlide,
    handleMouseOver,
    handleMouseOut,
  } = useBannerSlider(records.length);

  return (
    <section className="element-container container-sm">
      <div className="banners-wrapper position-relative overflow-hidden rounded-3">
        <div className="banners-slider d-flex justify-content-center" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
          {records?.map((banner, idx) => (
            <div key={banner.id} className={`slide ${slideIndex === idx ? "d-block" : "d-none"}`}>
              <img className="element-image" src={`${process.env.REACT_APP_SERVER_DOMAIN}/${banner.image}`} alt={banner.categoryName} />
            </div>
          ))}
          <div className="element-overlay d-flex align-items-center justify-content-center">
            <div className="element-bg-image" style={{ backgroundImage: 'url(/img/banner-foreground.png)', width: 500, height: 400 }} />
          </div>
        </div>
        <div className="banners-buttons">
          <button className="prev-slide fs-4 fw-bolder" onClick={handlePrevSlide}>&#10094;</button>
          <button className="next-slide fs-4 fw-bolder" onClick={handleNextSlide}>&#10095;</button>
        </div>
        <ul className="banners-dots d-flex justify-content-center">
          {records?.map((banner, idx) => (
            <li key={banner.id} className={`dot-slide ${slideIndex === idx ? "active" : ""}`} onClick={() => handleToSlide(idx)}></li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Banners;
