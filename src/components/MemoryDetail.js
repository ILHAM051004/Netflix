import React from "react";

const MemoryDetail = ({ memory, onClose }) => {
  if (!memory) {
    return null;
  }

  return (
    <div className="memory-detail">
      <div className="memory-detail__overlay" onClick={onClose} />

      <div className="memory-detail__content">
        <button
          type="button"
          className="memory-detail__close"
          onClick={onClose}
        >
          ×
        </button>

        <img
          className="memory-detail__image"
          src={memory.image}
          alt={memory.title}
        />

        <div className="memory-detail__info">
          <h2>{memory.title}</h2>

          <div className="memory-detail__meta">
            <strong>{memory.category}</strong>

            {memory.date && (
              <>
                <span>•</span>
                <span>{memory.date}</span>
              </>
            )}
          </div>

          <p>{memory.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MemoryDetail;
