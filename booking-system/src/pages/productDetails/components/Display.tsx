import { ArrowLeft, ArrowRight } from 'iconsax-react';
import React, { useState } from 'react';

type MediaItem = {
  type: string;
  url: any;
  alt: any;
};

type RoomGalleryProps = {
  media: MediaItem[];
};


const Display: React.FC<RoomGalleryProps> = ({ media }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextItem = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === media.length - 1 ? 0 : prevIndex + 1
    );
  };
  const prevItem = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === media.length - 1 ? 0 : prevIndex - 1
    );
  };

  const currentMedia = media[currentIndex];

  return (
    <div className="room-gallery flex flex-col items-center">
      <div className="media-container w-full m-auto h-96">
        {currentMedia.type === 'image' ? (
          <img src={currentMedia.url} alt={currentMedia.alt} className=" h-full rounded-2xl m-auto md:w-10/12" />
        ) : (
          <video controls>
            <source src={currentMedia.url} type="video/mp4" className='w-full h-full' />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      <div className="controls flex justify-between p-2 md:w-10/12 w-full m-auto">
     <ArrowLeft onClick={prevItem} />
      <ArrowRight onClick={nextItem} />
      </div>
    </div>
  );
};

export default Display;
