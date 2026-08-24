import React, { useEffect, useState } from "react";

const Banner = ({ memories = [] }) => {
  const [bannerMemories, setBannerMemories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(null);

  /*
   * Cek ukuran asli setiap foto.
   *
   * Portrait:
   * height > width
   *
   * Landscape:
   * width > height
   *
   * Square:
   * width === height
   *
   * Hanya portrait yang masuk banner.
   */
  useEffect(() => {
    let isMounted = true;

    const checkImages = async () => {
      const results = await Promise.all(
        memories.map(
          (memory) =>
            new Promise((resolve) => {
              const img = new Image();

              img.onload = () => {
                resolve({
                  memory,
                  isPortrait: img.naturalHeight > img.naturalWidth,
                });
              };

              img.onerror = () => {
                resolve({
                  memory,
                  isPortrait: false,
                });
              };

              img.src = memory.image;
            }),
        ),
      );

      if (!isMounted) return;

      const portraitMemories = results
        .filter((item) => item.isPortrait)
        .map((item) => item.memory);

      setBannerMemories(portraitMemories);
    };

    checkImages();

    return () => {
      isMounted = false;
    };
  }, [memories]);

  /*
   * Kalau jumlah banner berubah dan index
   * sudah tidak valid, kembali ke banner pertama.
   */
  useEffect(() => {
    if (bannerMemories.length > 0 && currentIndex >= bannerMemories.length) {
      setCurrentIndex(0);
    }
  }, [bannerMemories, currentIndex]);

  /*
   * Tidak ada foto portrait.
   */
  if (!bannerMemories.length) {
    return null;
  }

  const currentMemory = bannerMemories[currentIndex];

  /*
   * Banner berikutnya.
   */
  const nextBanner = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerMemories.length);
  };

  /*
   * Banner sebelumnya.
   */
  const prevBanner = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + bannerMemories.length) % bannerMemories.length,
    );
  };

  /*
   * Mulai swipe.
   */
  const handleTouchStart = (event) => {
    if (event.touches.length !== 1) return;

    setStartX(event.touches[0].clientX);
  };

  /*
   * Selesai swipe.
   */
  const handleTouchEnd = (event) => {
    if (startX === null) return;

    const endX = event.changedTouches[0].clientX;

    const distance = endX - startX;

    /*
     * Minimal geser 50px agar dianggap swipe.
     */
    if (Math.abs(distance) > 50) {
      if (distance < 0) {
        nextBanner();
      } else {
        prevBanner();
      }
    }

    setStartX(null);
  };

  /*
   * Drag menggunakan mouse di desktop.
   */
  const handleMouseDown = (event) => {
    setStartX(event.clientX);
  };

  const handleMouseUp = (event) => {
    if (startX === null) return;

    const distance = event.clientX - startX;

    if (Math.abs(distance) > 50) {
      if (distance < 0) {
        nextBanner();
      } else {
        prevBanner();
      }
    }

    setStartX(null);
  };

  const handleMouseLeave = () => {
    setStartX(null);
  };

  return (
    <section
      className="banner"
      style={{
        backgroundImage: `url(${currentMemory.image})`,
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {/* =========================
          CONTENT
      ========================= */}

      <div className="banner__contents">
        <h1 className="banner__title">{currentMemory.title}</h1>

        <div>
          <button
            type="button"
            className="banner__button"
            onMouseDown={(event) => event.stopPropagation()}
            onClick={(event) => event.stopPropagation()}
          >
            ILY
          </button>

          <button
            type="button"
            className="banner__button"
            onMouseDown={(event) => event.stopPropagation()}
            onClick={(event) => event.stopPropagation()}
          >
            3000
          </button>
        </div>

        <div className="banner__meta">
          <strong>{currentMemory.category}</strong>

          <span></span>

          <span>{currentMemory.date}</span>
        </div>

        <div className="banner__description">{currentMemory.overview}</div>
      </div>

      {/* =========================
          NAVIGATION
      ========================= */}

      {bannerMemories.length > 1 && (
        <>
          <button
            type="button"
            className="banner__arrow banner__arrow--left"
            onMouseDown={(event) => event.stopPropagation()}
            onTouchStart={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              prevBanner();
            }}
            aria-label="Banner sebelumnya"
          >
            ‹
          </button>

          <button
            type="button"
            className="banner__arrow banner__arrow--right"
            onMouseDown={(event) => event.stopPropagation()}
            onTouchStart={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              nextBanner();
            }}
            aria-label="Banner berikutnya"
          >
            ›
          </button>

          {/* =========================
              DOTS
          ========================= */}

          <div className="banner__dots">
            {bannerMemories.map((memory, index) => (
              <button
                key={memory.id}
                type="button"
                className={index === currentIndex ? "active" : ""}
                onMouseDown={(event) => event.stopPropagation()}
                onTouchStart={(event) => event.stopPropagation()}
                onClick={(event) => {
                  event.stopPropagation();
                  setCurrentIndex(index);
                }}
                aria-label={`Banner ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* =========================
          BOTTOM GRADIENT
      ========================= */}

      <div className="banner__cover" />
    </section>
  );
};

export default Banner;
