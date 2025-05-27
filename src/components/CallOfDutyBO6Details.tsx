import React, { useState } from "react";

const gameDetails = {
  title: "Call of Duty®: Black Ops 6 – Lote Multigeneración",
  description:
    "Call of Duty: Black Ops 6 es un shooter de acción trepidante con una campaña intensa, modos multijugador y zombis. Sumérgete en una experiencia de combate de última generación con gráficos mejorados y jugabilidad fluida.",
  price: "$64.99+",
  ageRating: "18+",
  images: [
    "https://i.blogs.es/027089/black-ops-6/1200_800.webp"
  ],
  requirements: {
    min: "Procesador: Intel i5-2500K / AMD Ryzen R5 1600X, RAM: 8GB, GPU: GTX 960 / Radeon RX 470, Almacenamiento: 100GB",
    rec: "Procesador: Intel i7-8700K / AMD Ryzen 7 2700X, RAM: 16GB, GPU: RTX 2060 / Radeon RX 5700XT, Almacenamiento: 100GB SSD"
  }
};

const initialReviews = [
  { user: "Carlos", rating: 5, comment: "¡Increíble juego, gráficos y jugabilidad de otro nivel!" },
  { user: "Ana", rating: 4, comment: "Muy bueno, pero el modo zombis podría tener más mapas." },
  { user: "Luis", rating: 5, comment: "La campaña es brutal, lo recomiendo totalmente." },
];

const tabs = ["Detalles", "Opiniones", "Más"];

const accent = "#a259ff"; // Morado principal de la página
const accentLight = "#c299fc";
const accentDark = "#6d28d9";

const CallOfDutyBO6Details: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Detalles");
  const [reviews, setReviews] = useState(initialReviews);
  const [newReview, setNewReview] = useState({ user: "", rating: 5, comment: "" });
  const [galleryIndex, setGalleryIndex] = useState(0);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.user && newReview.comment) {
      setReviews([newReview, ...reviews]);
      setNewReview({ user: "", rating: 5, comment: "" });
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#181c1f] via-[#23272b] to-[#101214] pb-16">
      {/* Header principal */}
      <div className="relative w-full h-80 md:h-96 flex items-center justify-center overflow-hidden mb-8">
        <img
          src={gameDetails.images[0]}
          alt="header-bg"
          className="absolute w-full h-full object-cover opacity-40 blur-sm scale-110"
        />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-5xl mx-auto px-6 gap-8">
          <img
            src={gameDetails.images[0]}
            alt="portada"
            className="w-56 h-72 rounded-xl shadow-2xl border-4 border-gray-800 object-cover"
          />
          <div className="flex-1 flex flex-col items-start gap-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">{gameDetails.title}</h1>
            <div className="flex items-center gap-4 mt-2">
              <span style={{background: accentDark}} className="text-white px-3 py-1 rounded text-xs font-bold">18+ AÑOS</span>
              <span style={{color: accent}} className="text-lg font-bold">★ 4.8</span>
            </div>
            <button style={{background: accent, color: '#fff'}} className="mt-4 hover:brightness-110 px-8 py-3 rounded-lg text-lg font-bold shadow-lg transition">Comprar {gameDetails.price}</button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex gap-6 border-b-2 border-gray-700 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              style={activeTab === tab ? { borderColor: accent, color: accent } : {}}
              className={`py-3 px-6 text-lg font-semibold transition border-b-4 ${activeTab === tab ? "border-[3px] border-solid" : "border-transparent text-gray-400 hover:text-white"}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Galería tipo slider */}
        <div className="mb-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {gameDetails.images.map((img, idx) => (
              <img
                key={img}
                src={img}
                alt={`screenshot-${idx}`}
                style={galleryIndex === idx ? { borderColor: accent, boxShadow: `0 0 0 2px ${accentLight}` } : {}}
                className={`w-40 h-28 object-cover rounded-lg border-4 transition cursor-pointer ${galleryIndex === idx ? "scale-105" : "border-gray-700 opacity-70 hover:opacity-100"}`}
                onClick={() => setGalleryIndex(idx)}
              />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <img
              src={gameDetails.images[galleryIndex]}
              alt="screenshot-grande"
              className="w-full max-w-2xl h-80 object-cover rounded-xl border-4 border-gray-800 shadow-xl"
            />
          </div>
        </div>

        {/* Contenido de tabs */}
        <div className="bg-[#181c1f] rounded-xl shadow-lg p-8">
          {activeTab === "Detalles" && (
            <div>
              <h2 style={{color: accent}} className="text-2xl font-bold mb-4">Descripción</h2>
              <p className="text-gray-200 text-lg leading-relaxed">{gameDetails.description}</p>
            </div>
          )}
          {activeTab === "Opiniones" && (
            <div>
              <h2 style={{color: accent}} className="text-2xl font-bold mb-4">Opiniones de usuarios</h2>
              <form onSubmit={handleReviewSubmit} className="mb-6 bg-gray-800/80 p-4 rounded-lg flex flex-col md:flex-row gap-4 items-center">
                <input
                  type="text"
                  placeholder="Tu nombre"
                  className="px-3 py-2 rounded bg-gray-700 text-white flex-1"
                  value={newReview.user}
                  onChange={e => setNewReview({ ...newReview, user: e.target.value })}
                  required
                />
                <select
                  className="px-3 py-2 rounded bg-gray-700 text-white"
                  value={newReview.rating}
                  onChange={e => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                >
                  {[5,4,3,2,1].map(r => <option key={r} value={r}>{r}★</option>)}
                </select>
                <textarea
                  placeholder="Escribe tu opinión..."
                  className="w-full md:w-1/2 px-3 py-2 rounded bg-gray-700 text-white"
                  value={newReview.comment}
                  onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
                  required
                />
                <button type="submit" style={{background: accent, color: '#fff'}} className="hover:brightness-110 px-6 py-2 rounded font-bold">Enviar</button>
              </form>
              <div className="space-y-4">
                {reviews.map((rev, idx) => (
                  <div key={idx} className="bg-gray-800/80 p-4 rounded-lg flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{rev.user}</span>
                      <span style={{color: accent}}>{'★'.repeat(rev.rating)}</span>
                    </div>
                    <p className="text-gray-200 text-lg">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "Más" && (
            <div>
              <h2 style={{color: accent}} className="text-2xl font-bold mb-4">Requisitos del sistema</h2>
              <div className="mb-3">
                <span className="font-semibold text-white">Mínimos:</span> <span className="text-gray-300">{gameDetails.requirements.min}</span>
              </div>
              <div>
                <span className="font-semibold text-white">Recomendados:</span> <span className="text-gray-300">{gameDetails.requirements.rec}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallOfDutyBO6Details;
