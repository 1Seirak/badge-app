"use client";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    recipient: "",
    name: "",
    project: "",
  });
  const [status, setStatus] = useState("");
  const [badgeUrl, setBadgeUrl] = useState(""); // Contiendra l'URL après le mint
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("Génération du badge en cours...");
    
    try {
      const res = await fetch("/api/mint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setStatus(`✅ Succès ! Hash: ${data.hash.substring(0, 10)}...`);
        // On suppose que ton API renvoie l'URL de l'image générée
        if (data.imageUrl) setBadgeUrl(data.imageUrl);
      } else {
        setStatus(`❌ Erreur : ${data.error}`);
      }
    } catch (err) {
      setStatus("❌ Erreur lors de la connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Badge Minting Portal
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Adresse du Wallet (0x...)"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
            onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Nom du Récipiendaire"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Nom du Projet"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
            onChange={(e) => setFormData({ ...formData, project: e.target.value })}
            required
          />
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 text-white font-bold rounded-lg transition ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Chargement..." : "Mint Badge"}
          </button>
        </form>

        {status && (
          <p className="mt-4 text-sm text-center font-medium text-gray-600 break-words">
            {status}
          </p>
        )}

        {/* SECTION DYNAMIQUE DE L'IMAGE */}
        <div className="mt-8">
          {badgeUrl ? (
            <div className="animate-fadeIn">
              <p className="text-center text-sm font-bold text-green-600 mb-2">Votre Badge Officiel :</p>
              <img 
                src={badgeUrl} 
                alt="Generated Badge" 
                className="w-full h-auto rounded-lg border-4 border-green-100 shadow-md"
              />
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-12 flex flex-col items-center justify-center bg-gray-50">
              <div className="w-16 h-16 mb-2 text-gray-300">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <p className="text-gray-400 text-sm italic">L'aperçu apparaîtra ici après le mint</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}