"use client";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mainProject: "",
    startDate: "",
    completionDate: "",
    details: "",
    imageLink: "",
    recipientWallet: "",
  });
  const [status, setStatus] = useState("");
  const [badgeUrl, setBadgeUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const colors = {
    elcaRed: "#ff483a",
    dark: "#1a1a1a",
    background: "#f4f4f7",
    card: "#ffffff",
    border: "#e5e7eb",
    text: "#374151"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("Minting in progress...");
    try {
      const res = await fetch("/api/mint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("✅ Success! Badge minted.");
        if (data.imageUrl) setBadgeUrl(data.imageUrl);
      } else {
        setStatus("❌ Error: " + data.error);
      }
    } catch (err) {
      setStatus("❌ Connection error");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: `1px solid ${colors.border}`,
    marginBottom: "12px",
    fontSize: "14px",
    fontFamily: "inherit",
    boxSizing: "border-box"
  };

  const labelStyle = {
    display: "block",
    fontSize: "10px",
    fontWeight: "700",
    color: "#6b7280",
    textTransform: "uppercase",
    marginBottom: "4px",
    letterSpacing: "0.5px"
  };

  // Style commun pour les deux colonnes (Formulaire et Badge)
  const columnCardStyle = {
    flex: "1", 
    backgroundColor: colors.card, 
    padding: "35px", 
    borderRadius: "8px", 
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    borderTop: `4px solid ${colors.elcaRed}`,
    minHeight: "550px", // Pour que les deux colonnes aient la même taille
    display: "flex",
    flexDirection: "column"
  };

  return (
    <div style={{ 
      backgroundColor: colors.background, 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column",
      alignItems: "center", 
      justifyContent: "center",
      fontFamily: "'Segoe UI', Roboto, sans-serif",
      padding: "20px"
    }}>
      <div style={{ 
        display: "flex", 
        gap: "20px", 
        maxWidth: "1100px", 
        width: "100%",
        alignItems: "stretch" // Pour qu'elles fassent la même hauteur
      }}>
        
        {/* LEFT COLUMN: FORM */}
        <div style={columnCardStyle}>
          <h1 style={{ fontSize: "22px", fontWeight: "800", marginBottom: "20px", color: colors.dark }}>BADGE METADATA</h1>
          
          <form onSubmit={handleSubmit} style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: "10px" }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>First Name</label>
                <input style={inputStyle} placeholder="Jane" onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Last Name</label>
                <input style={inputStyle} placeholder="Doe" onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required />
              </div>
            </div>

            <label style={labelStyle}>Main Project</label>
            <input style={inputStyle} placeholder="Project Name" onChange={(e) => setFormData({ ...formData, mainProject: e.target.value })} required />

            <div style={{ display: "flex", gap: "10px" }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Start Date</label>
                <input type="date" style={inputStyle} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} required />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Completion Date</label>
                <input type="date" style={inputStyle} onChange={(e) => setFormData({ ...formData, completionDate: e.target.value })} required />
              </div>
            </div>

            <label style={labelStyle}>Details</label>
            <textarea style={{ ...inputStyle, height: "60px", resize: "none" }} placeholder="Brief description..." onChange={(e) => setFormData({ ...formData, details: e.target.value })} required />

            <label style={labelStyle}>Image Link</label>
            <input style={inputStyle} placeholder="https://..." onChange={(e) => setFormData({ ...formData, imageLink: e.target.value })} required />

            <label style={labelStyle}>Recipient Wallet</label>
            <input style={inputStyle} placeholder="0x..." onChange={(e) => setFormData({ ...formData, recipientWallet: e.target.value })} required />

            <button type="submit" disabled={loading} style={{ 
              width: "100%", 
              padding: "14px", 
              backgroundColor: loading ? "#9ca3af" : colors.elcaRed, 
              color: "white", 
              border: "none", 
              borderRadius: "4px", 
              fontWeight: "bold", 
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: "10px",
              fontSize: "14px",
              transition: "opacity 0.2s"
            }}>
              {loading ? "PROCESSING..." : "MINT BADGE"}
            </button>
          </form>
          {status && <div style={{ marginTop: "15px", fontSize: "12px", textAlign: "center", color: colors.elcaRed, fontWeight: "600" }}>{status}</div>}
        </div>

        {/* RIGHT COLUMN: PREVIEW (SIDE-BY-SIDE CONSISTENCY) */}
        <div style={columnCardStyle}>
          <h1 style={{ fontSize: "22px", fontWeight: "800", marginBottom: "20px", color: colors.dark }}>PREVIEW</h1>
          <div style={{ 
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: `1px dashed ${colors.border}`,
            borderRadius: "6px",
            backgroundColor: "#fafafa",
            overflow: "hidden"
          }}>
            <img 
              src={badgeUrl || "https://placehold.co/400x400/eeeeee/999999?text=Badge+Preview"} 
              alt="NFT Badge" 
              style={{ 
                width: "100%", 
                height: "auto", 
                maxWidth: "350px",
                borderRadius: "4px", 
                boxShadow: badgeUrl ? "0 8px 25px rgba(0,0,0,0.1)" : "none",
                transition: "all 0.5s ease"
              }} 
            />
            {!badgeUrl && (
              <p style={{ marginTop: "20px", fontSize: "12px", color: "#999", fontWeight: "500" }}>
                Ready to generate your badge
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}