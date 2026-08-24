import React, { useState } from "react";

const MemoryUpload = ({ onClose, onSave }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("KELUARGA");
  const [date, setDate] = useState("");
  const [overview, setOverview] = useState("");
  const [error, setError] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    setError("");

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
      setPreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    if (!image) {
      setError("Silakan pilih foto terlebih dahulu.");
      return;
    }

    if (!title.trim()) {
      setError("Silakan isi judul kenangan.");
      return;
    }

    const newMemory = {
      id: Date.now(),
      title: title.trim(),
      original_name: title.trim(),
      overview: overview.trim() || "Kenangan yang ingin selalu diingat.",
      category,
      date,
      image,
    };

    onSave(newMemory);
    onClose();
  };

  return (
    <div className="memory-upload">
      <div className="memory-upload__overlay" onClick={onClose} />

      <div className="memory-upload__content">
        <div className="memory-upload__header">
          <h2>Tambah Kenangan</h2>

          <button
            type="button"
            onClick={onClose}
            className="memory-upload__close"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="memory-upload__photo">
            {preview ? (
              <img src={preview} alt="Preview kenangan" />
            ) : (
              <div>
                <span>＋</span>
                <strong>Pilih Foto</strong>
                <small>Dari perangkat kamu</small>
              </div>
            )}

            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>

          <div className="memory-upload__field">
            <label>Judul</label>

            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Contoh: Liburan ke Bali"
            />
          </div>

          <div className="memory-upload__field">
            <label>Kategori</label>

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="KELUARGA">Keluarga</option>
              <option value="LIBURAN">Liburan</option>
              <option value="TEMAN">Teman</option>
              <option value="FAVORIT">Favorit</option>
            </select>
          </div>

          <div className="memory-upload__field">
            <label>Tanggal</label>

            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>

          <div className="memory-upload__field">
            <label>Deskripsi</label>

            <textarea
              value={overview}
              onChange={(event) => setOverview(event.target.value)}
              placeholder="Ceritakan sedikit tentang kenangan ini..."
              rows="4"
            />
          </div>

          {error && <div className="memory-upload__error">{error}</div>}

          <button type="submit" className="memory-upload__submit">
            SIMPAN KENANGAN
          </button>
        </form>
      </div>
    </div>
  );
};

export default MemoryUpload;
