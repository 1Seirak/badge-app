"use client";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    recipient: "",
    name: "",
    project: "",
  });
  const [status, setStatus] = useState("");
  const [badgeUrl, setBadgeUrl] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Chargement...");
    try {
      const res = await fetch("/api/mint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("✅ Succès !");
        if (data.imageUrl) setBadgeUrl(data.imageUrl);
      } else {
        setStatus("Erreur lors du mint.");
      }
    } catch (err) {
      setStatus("Erreur de connexion.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "400px", margin: "auto" }}>
      <h1>Badge Portal</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          placeholder="Wallet 0x..."
          onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
          style={{ padding: "8px" }}
        />
        <input
          placeholder="Nom"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          style={{ padding: "8px" }}
        />
        <input
          placeholder="Projet"
          onChange={(e) => setFormData({ ...formData, project: e.target.value })}
          style={{ padding: "8px" }}
        />
        <button type="submit" style={{ padding: "10px", cursor: "pointer" }}>Mint Badge</button>
      </form>

      <p>{status}</p>

      {/* LA CORRECTION : On affiche l'image UNIQUEMENT si badgeUrl n'est pas vide */}
      {badgeUrl && (
        <div style={{ marginTop: "20px" }}>
          <p>Votre Badge :</p>
          <img src={badgeUrl} alt="Badge" style={{ width: "100%", borderRadius: "10px" }} />
        </div>
      )}
    </div>
  );
}