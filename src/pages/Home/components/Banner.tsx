import React, { useState, useEffect } from 'react';

interface Slide {
  imageUrl: string;
  text: string;
}

interface ImageSliderProps {
  slides: Slide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const Banner: React.FC<ImageSliderProps> = ({
  slides,
  autoPlay = true,
  autoPlayInterval = 3000,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (autoPlay) {
      timer = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, autoPlayInterval);
    }

    return () => {
      clearInterval(timer);
    };
  }, [autoPlay, slides, autoPlayInterval]);

  const showSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="slider-container m-auto">
      <div className="slider p-2 ">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide relative ${index === currentSlide ? 'active' : 'hidden'} md:h-60 h-40 w-full`}
            style={{ transform: `translateX(${index - currentSlide}00%)` }
          } 
          >
            <img src={slide.imageUrl} alt={`Slide ${index}`} className="md:w-8/12 w-11/12 md:h-60 h-40 m-auto rounded-lg" />
            <div className="text-overlay absolute bottom-5 md:w-80 w-52 left-5 text-center md:left-52 text-xl md:text-3xl font-black bg-slate-900 bg-opacity-30 p-2 rounded-md text-white z-40">{slide.text}</div>
          </div>
        ))}
      </div>
      <div className="slider-dots md:w-9/12 m-auto  items-center justify-center gap-2 flex ">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`p-1 rounded-full border border-slate-400 w-fit  ${index === currentSlide ? 'bg-slate-400 border border-slate-700 ' : ''}`}
            onClick={() => showSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Banner;
