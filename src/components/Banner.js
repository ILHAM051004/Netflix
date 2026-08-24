import React, { useEffect, useState } from "react";

const Banner = ({ memories = [] }) => {
  const [memory, setMemory] = useState(null);

  useEffect(() => {
    if (!memories.length) {
      setMemory(null);
      return;
    }

    const randomMemory = memories[Math.floor(Math.random() * memories.length)];

    setMemory(randomMemory);
  }, [memories]);

  if (!memory) {
    return null;
  }

  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(${memory.image})`,
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">{memory.title}</h1>

        <div className="banner__buttons">
          <button className="banner__button">Play</button>

          <button className="banner__button">My List</button>
        </div>

        <div className="banner__description">
          <strong>{memory.category}</strong>

          <span>
            &nbsp; • &nbsp;
            {memory.date}
          </span>

          <br />

          {memory.overview}
        </div>
      </div>

      <div className="banner__cover" />
    </div>
  );
};

export default Banner;
