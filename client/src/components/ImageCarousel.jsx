import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Sample images (replace with your actual images)
const images = [
  '/images/carousel-1.jpg', 
  '/images/carousel-2.jpg', 
  '/images/carousel-3.jpg',
];

const CarouselContainer = styled.div`
  position: relative;
  width: 100%; /* Full width of the parent container */
  max-width: 1152px; /* Limit the max width to prevent the images from being too big */
  height: 400px; /* Fixed height */
  overflow: hidden;
  margin: 100px auto 20px auto; /* 40px margin at the top, 20px margin at the bottom, centered horizontally */
  border: 1px solid white; /* Optional: Border for better visibility */
`;

const Image = styled.img`
  width: 100%; /* Take up the full width of the container */
  height: 100%; /* Maintain the height as specified in CarouselContainer */
  object-fit: cover; /* Maintain aspect ratio and cover the area */
  display: block;
  transition: opacity 0.5s ease-in-out;
`;

const Arrow = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  background-color: rgba(179, 213, 247, 0.5);
  color: white;
  width: 40px; /* Set the width */
  height: 40px; /* Set the height equal to the width */
  border-radius: 50%; /* Make it circular */
  display: flex; /* Center content inside */
  align-items: center; /* Vertically center */
  justify-content: center; /* Horizontally center */
  cursor: pointer;
  z-index: 1000;
  ${(props) => (props.direction === 'left' ? 'left: 20px;' : 'right: 20px;')}
`;


const Dots = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 5px;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => (props.$active ? 'white' : 'rgba(255, 255, 255, 0.5)')};
  cursor: pointer;
`;

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, []);

  const goToNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <CarouselContainer>
      <Arrow direction="left" onClick={goToPrevImage}>
        &#8592;
      </Arrow>
      <Image src={images[currentIndex]} alt="Carousel Slide" />
      <Arrow direction="right" onClick={goToNextImage}>
        &#8594;
      </Arrow>

      <Dots>
        {images.map((_, index) => (
          <Dot
            key={index}
            $active={index === currentIndex}  // Use transient prop
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </Dots>
    </CarouselContainer>
  );
};

export default ImageCarousel;
