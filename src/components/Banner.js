import React, { useState } from "react";

const Banner = ({ memories = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(null);

  if (!memories.length) {
    return null;
  }

  const memory = memories[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((index) => (index === memories.length - 1 ? 0 : index + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((index) => (index === 0 ? memories.length - 1 : index - 1));
  };

  const handlePointerDown = (event) => {
    setStartX(event.clientX);
  };

  const handlePointerUp = (event) => {
    if (startX === null) return;

    const distance = event.clientX - startX;

    if (Math.abs(distance) > 50) {
      if (distance < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    setStartX(null);
  };

  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(${memory.image})`,
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <div className="banner__contents">
        <h1 className="banner__title">{memory.title}</h1>

        <div>
          <button className="banner__button">ILY</button>
          <button className="banner__button">3000</button>
        </div>

        <div className="banner__meta">
          <strong>{memory.category}</strong>
          <span>•</span>
          <span>{memory.date}</span>
        </div>
      </div>

      <button
        type="button"
        className="banner__arrow banner__arrow--left"
        onPointerDown={(event) => event.stopPropagation()}
        onClick={prevSlide}
      >
        ‹
      </button>

      <button
        type="button"
        className="banner__arrow banner__arrow--right"
        onPointerDown={(event) => event.stopPropagation()}
        onClick={nextSlide}
      >
        ›
      </button>

      <div className="banner__dots">
        {memories.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={index === currentIndex ? "active" : ""}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Banner ${index + 1}`}
          />
        ))}
      </div>

      <div className="banner__cover" />
    </div>
  );
};

export default Banner;
