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
        title="TERBARU"
        memories={memories}
        onDeleteMemory={onDeleteMemory}
      />

      <Slider
        title="DATE"
        category="DATE"
        memories={memories}
        onDeleteMemory={onDeleteMemory}
      />

      <Slider
        title="JALAN-JALAN"
        category="JALAN"
        memories={memories}
        onDeleteMemory={onDeleteMemory}
      />

      <Slider
        title="MAM"
        category="MAM"
        memories={memories}
        onDeleteMemory={onDeleteMemory}
      />

      <Slider
        title="SPECIAL"
        category="SPECIAL"
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
