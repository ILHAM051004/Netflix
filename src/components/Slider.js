import React from "react";

import Cards from "./Cards";

const Slider = ({ title, category, memories = [], onDeleteMemory }) => {
  const filteredMemories = category
    ? memories.filter((memory) => memory.category === category)
    : memories;

  return (
    <div className="media-slider">
      <h3 className="media-slider__title">{title}</h3>

      <div className="media-slider__cards">
        {filteredMemories.map((memory) => (
          <Cards
            key={memory.id}
            media={memory}
            mediaType="memory"
            isLarge
            onDeleteMemory={onDeleteMemory}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
