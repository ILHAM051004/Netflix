import React, { useState } from "react";
import classNames from "classnames";

import MemoryDetail from "./MemoryDetail";

const Cards = ({ media, isLarge, onDeleteMemory }) => {
  const [isDetailOpen, setDetailOpen] = useState(false);

  const handleDelete = (event) => {
    event.stopPropagation();

    if (onDeleteMemory) {
      onDeleteMemory(media.id);
    }
  };

  return (
    <>
      <div className="media-card" onClick={() => setDetailOpen(true)}>
        <img
          className={classNames("media-card__poster", {
            "media-card__poster--large": isLarge,
          })}
          src={media.image}
          alt={media.title}
        />

        <div className="media-card__cover">
          <div className="media-card__name">{media.title}</div>

          <div className="media-card__description">{media.overview}</div>

          <button
            type="button"
            className="media-card__delete"
            onClick={handleDelete}
            aria-label={`Hapus ${media.title}`}
          >
            🗑
          </button>
        </div>
      </div>

      {isDetailOpen && (
        <MemoryDetail memory={media} onClose={() => setDetailOpen(false)} />
      )}
    </>
  );
};

export default Cards;
