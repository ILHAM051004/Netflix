import React, { useState } from "react";

import Header from "../components/Header";
import Banner from "../components/Banner";
import Slider from "../components/Slider";
import MemoryUpload from "../components/MemoryUpload";

const HomePage = ({ memories, onAddMemory, onDeleteMemory }) => {
  const [isUploadOpen, setUploadOpen] = useState(false);

  return (
    <div>
      <Header />

      <Banner memories={memories} />

      <button
        type="button"
        className="memory-add-button"
        onClick={() => setUploadOpen(true)}
      >
        +
      </button>

      <Slider
        title="KENANGAN TERBARU"
        memories={memories}
        onDeleteMemory={onDeleteMemory}
      />

      <Slider
        title="KELUARGA"
        category="KELUARGA"
        memories={memories}
        onDeleteMemory={onDeleteMemory}
      />

      <Slider
        title="LIBURAN"
        category="LIBURAN"
        memories={memories}
        onDeleteMemory={onDeleteMemory}
      />

      <Slider
        title="MOMEN SPESIAL"
        category="FAVORIT"
        memories={memories}
        onDeleteMemory={onDeleteMemory}
      />

      {isUploadOpen && (
        <MemoryUpload
          onClose={() => setUploadOpen(false)}
          onSave={onAddMemory}
        />
      )}
    </div>
  );
};

export default HomePage;
