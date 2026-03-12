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
  const [loading, setLoading] = useState(false);

  // Thème ELCA Informatique
  const colors = {
    elcaRed: "#ff483a",
    dark: "#1a1a1a",
    background: "#fdfdfd",
    card: "#ffffff",
    border: "#eeeeee",
    text: "#2d2d2d"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("Transaction en cours sur Polygon Amoy...");
    try {
      const res = await fetch("/api/mint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("✅ Badge généré avec succès !");
        if (data.imageUrl) setBadgeUrl(data.imageUrl);
      } else {
        setStatus("❌ Erreur : " + data.error);
      }
    } catch (err) {
      setStatus("❌ Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px",
    borderRadius: "6px",
    border: `1px solid ${colors.border}`,
    marginBottom: "18px",
    fontSize: "15px",
    fontFamily: "'Segoe UI', Roboto, sans-serif",
    color: colors.text,
    backgroundColor: "#fafafa",
    boxSizing: "border-box"
  };

  const labelStyle = {
    display: "block",
    fontSize: "11px",
    fontWeight: "700",
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "6px"
  };

  return (
    <div style={{ 
      backgroundColor: colors.background, 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: "20px"
    }}>
      <div style={{ 
        backgroundColor: colors.card, 
        padding: "45px", 
        borderRadius: "2px", // Style plus corporate
        boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
        maxWidth: "480px",
        width: "100%",
        borderTop: `5px solid ${colors.elcaRed}` // Ligne de rappel ELCA
      }}>
        <h1 style={{ fontSize: "28px", fontWeight: "900", marginBottom: "5px", color: colors.dark }}>
          EDI CHALLENGE
        </h1>
        <p style={{ color: "#666", marginBottom: "35px", fontSize: "14px" }}>
          Badge Minting Portal — 2026
        </p>

        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>Recipient Wallet Address</label>
          <input 
            style={inputStyle}
            placeholder="0x..." 
            onChange={(e) => setFormData({ ...formData, recipient: e.target.value })} 
            required 
          />
          
          <label style={labelStyle}>Full Name</label>
          <input 
            style={inputStyle}
            placeholder="Sarah Kazi" 
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
            required 
          />
          
          <label style={labelStyle}>Main Project</label>
          <input 
            style={inputStyle}
            placeholder="Ex: ELCA Digital Innovation" 
            onChange={(e) => setFormData({ ...formData, project: e.target.value })} 
            required 
          />

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: "100%", 
              padding: "16px", 
              backgroundColor: loading ? "#ccc" : colors.elcaRed, 
              color: "white", 
              border: "none", 
              borderRadius: "4px", 
              fontWeight: "bold", 
              fontSize: "15px",
              textTransform: "uppercase",
              letterSpacing: "1px",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.3s ease"
            }}
          >
            {loading ? "Traitement..." : "Minter le Badge"}
          </button>
        </form>

        {status && (
          <div style={{ 
            marginTop: "25px", 
            padding: "12px", 
            borderRadius: "4px", 
            backgroundColor: status.includes("✅") ? "#f0fdf4" : "#fff5f5",
            color: status.includes("✅") ? "#16a34a" : colors.elcaRed,
            fontSize: "13px",
            textAlign: "center",
            border: `1px solid ${status.includes("✅") ? "#bbf7d0" : "#ffd8d8"}`
          }}>
            {status}
          </div>
        )}

        {/* Preview Section - Apparaît seulement si l'image est là */}
        {badgeUrl && (
          <div style={{ marginTop: "35px", borderTop: `1px solid ${colors.border}`, paddingTop: "25px" }}>
            <p style={{ fontSize: "12px", fontWeight: "bold", marginBottom: "15px", textAlign: "center", color: "#888" }}>VOTRE BADGE GÉNÉRÉ :</p>
            <img 
              src={badgeUrl} 
              alt="Generated NFT Badge" 
              style={{ width: "100%", borderRadius: "4px", boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }} 
            />
          </div>
        )}
      </div>
    </div>
  );
}