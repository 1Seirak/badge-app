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
    background: "#fdfdfd",
    card: "#ffffff",
    border: "#eeeeee",
    text: "#2d2d2d"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("Minting your badge on Polygon Amoy...");
    try {
      const res = await fetch("/api/mint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("✅ Success! Badge minted and sent.");
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
    color: colors.text,
    backgroundColor: "#fafafa",
    boxSizing: "border-box"
  };

  const labelStyle = {
    display: "block",
    fontSize: "10px",
    fontWeight: "700",
    color: "#888",
    textTransform: "uppercase",
    marginBottom: "4px"
  };

  return (
    <div style={{ backgroundColor: colors.background, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif", padding: "40px 20px" }}>
      <div style={{ backgroundColor: colors.card, padding: "40px", borderRadius: "2px", boxShadow: "0 15px 35px rgba(0,0,0,0.1)", maxWidth: "500px", width: "100%", borderTop: `6px solid ${colors.elcaRed}` }}>
        <h1 style={{ fontSize: "24px", fontWeight: "900", marginBottom: "5px", color: colors.dark }}>EDI CHALLENGE 2026</h1>
        <p style={{ color: "#666", marginBottom: "30px", fontSize: "13px" }}>Blockchain Certification Portal</p>

        <form onSubmit={handleSubmit}>
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
          <textarea style={{ ...inputStyle, height: "60px", resize: "none" }} placeholder="Short description..." onChange={(e) => setFormData({ ...formData, details: e.target.value })} required />

          <label style={labelStyle}>Image Link (URL)</label>
          <input style={inputStyle} placeholder="https://..." onChange={(e) => setFormData({ ...formData, imageLink: e.target.value })} required />

          <label style={labelStyle}>Recipient Wallet Address</label>
          <input style={inputStyle} placeholder="0x..." onChange={(e) => setFormData({ ...formData, recipientWallet: e.target.value })} required />

          <button type="submit" disabled={loading} style={{ width: "100%", padding: "15px", backgroundColor: loading ? "#ccc" : colors.elcaRed, color: "white", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer", textTransform: "uppercase", marginTop: "10px" }}>
            {loading ? "Processing..." : "Mint & Send Badge"}
          </button>
        </form>

        {status && <div style={{ marginTop: "20px", padding: "12px", fontSize: "13px", textAlign: "center", backgroundColor: "#f9f9f9", border: "1px solid #eee", color: colors.text }}>{status}</div>}

        {badgeUrl && (
          <div style={{ marginTop: "30px", textAlign: "center" }}>
            <p style={labelStyle}>NFT Badge Preview:</p>
            <img src={badgeUrl} alt="NFT Badge" style={{ width: "100%", borderRadius: "4px", marginTop: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
          </div>
        )}
      </div>
    </div>
  );
}