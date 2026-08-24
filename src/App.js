import React, { useEffect, useState } from "react";

import HomePage from "./pages/HomePage";
import memoriesData from "./data/memories";
import { supabase } from "./utils/supabase";

const App = () => {
  const [memories, setMemories] = useState(memoriesData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMemories = async () => {
      try {
        const { data, error } = await supabase
          .from("memories")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Gagal mengambil memories dari Supabase:", error);
          return;
        }

        const uploadedMemories = (data || []).map((memory) => ({
          id: `supabase-${memory.id}`,
          databaseId: memory.id,
          title: memory.title,
          original_name: memory.title,
          overview: memory.overview,
          category: memory.category,
          date: memory.date,
          image: memory.image_url,
        }));

        setMemories(uploadedMemories);
      } catch (error) {
        console.error("Gagal memuat memories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMemories();
  }, []);

  const addMemory = (memory) => {
    setMemories((currentMemories) => [memory, ...currentMemories]);
  };

  const deleteMemory = async (id) => {
    const memoryToDelete = memories.find((memory) => memory.id === id);

    if (!memoryToDelete?.databaseId) {
      return;
    }

    const { error } = await supabase
      .from("memories")
      .delete()
      .eq("id", memoryToDelete.databaseId);

    if (error) {
      console.error("Gagal menghapus memory:", error);
      return;
    }

    setMemories((currentMemories) =>
      currentMemories.filter((memory) => memory.id !== id),
    );
  };

  if (loading) {
    return (
      <div className="app">
        <div style={{ padding: "40px", color: "#fff" }}>Memuat kenangan...</div>
      </div>
    );
  }

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
