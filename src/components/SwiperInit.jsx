import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

/**
 * @param {{ images: string[], swiperClass: string }} props
 */

export default function SwiperSlider({ images = [], swiperClass = '' }) {
  return (
    <div className="relative w-full h-full">
      <Swiper
        modules={[Navigation]}
        loop={true}
        navigation={{
          nextEl: `.swiper-button-next.${swiperClass}`,
          prevEl: `.swiper-button-prev.${swiperClass}`,
        }}
        className={`w-full h-full ${swiperClass}`}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`slide-${index}`}
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-105"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Botones personalizados por instancia */}
      <div className={`swiper-button-prev ${swiperClass} text-[#3A725F]`}></div>
      <div className={`swiper-button-next ${swiperClass} text-[#3A725F]`}></div>
    </div>
  );
}
