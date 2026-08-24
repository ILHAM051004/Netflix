import React, { useEffect, useState } from "react";

import HomePage from "./pages/HomePage";
import memoriesData from "./data/memories";

const App = () => {
  const [memories, setMemories] = useState(() => {
    const savedMemories = localStorage.getItem("netflix_memories");

    if (savedMemories) {
      try {
        return JSON.parse(savedMemories);
      } catch (error) {
        console.error("Gagal membaca memories:", error);
      }
    }

    return memoriesData;
  });

  useEffect(() => {
    localStorage.setItem("netflix_memories", JSON.stringify(memories));
  }, [memories]);

  const addMemory = (memory) => {
    setMemories((currentMemories) => [memory, ...currentMemories]);
  };

  const deleteMemory = (id) => {
    setMemories((currentMemories) =>
      currentMemories.filter((memory) => memory.id !== id),
    );
  };

  return (
    <div className="app">
      <HomePage
        memories={memories}
        onAddMemory={addMemory}
        onDeleteMemory={deleteMemory}
      />
    </div>
  );
};

export default App;
