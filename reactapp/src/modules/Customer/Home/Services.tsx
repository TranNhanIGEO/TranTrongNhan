import { useRef } from 'react';
import ArrowSlider from '../components/Slider/Arrows/ArrowSlider';
import ServiceCard from '../components/Card/Service/ServiceCard';
import Heading from '../components/Heading/Heading';
import useAnimation from 'hooks/common/useAnimation';

const Services = () => {
  const animateRef = useRef<HTMLDivElement>(null);
  useAnimation(animateRef);

  return (
    <section className="element-container container-sm">
      <Heading title="Kiwi Florist Wedding & Event" isBreak />
      <div ref={animateRef} className="element-animate">
        <ArrowSlider className="row">
          <ServiceCard />
        </ArrowSlider>
      </div>
    </section>
  );
};

export default Services;
