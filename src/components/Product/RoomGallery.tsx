import React, { useState } from 'react';

type MediaItem = {
  type: string;
  url: any;
  alt: any;
};

type RoomGalleryProps = {
  media: MediaItem[];
};


const RoomGallery: React.FC<RoomGalleryProps> = ({ media }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextItem = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === media.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentMedia = media[currentIndex];

  return (
    <div className="room-gallery">
      <div className="media-container w-full h-60">
        {currentMedia.type === 'image' ? (
          <img src={currentMedia.url} alt={currentMedia.alt} className="w-full h-60 rounded-xl" />
        ) : (
          <video controls>
            <source src={currentMedia.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
};

export default RoomGallery;
