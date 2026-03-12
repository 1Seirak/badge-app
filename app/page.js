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
    width: "100%", padding: "10px", borderRadius: "4px", border: `1px solid ${colors.border}`,
    marginBottom: "12px", fontSize: "14px", fontFamily: "inherit", boxSizing: "border-box"
  };

  const labelStyle = {
    display: "block", fontSize: "10px", fontWeight: "700", color: "#6b7280",
    textTransform: "uppercase", marginBottom: "4px", letterSpacing: "0.5px"
  };

  const columnCardStyle = {
    flex: "1", backgroundColor: colors.card, padding: "35px", borderRadius: "8px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)", borderTop: `4px solid ${colors.elcaRed}`,
    minHeight: "650px", display: "flex", flexDirection: "column"
  };

  return (
    <div style={{ backgroundColor: colors.background, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', Roboto, sans-serif", padding: "20px" }}>
      <div style={{ display: "flex", gap: "20px", maxWidth: "1100px", width: "100%", alignItems: "stretch" }}>
        
        {/* LEFT: FORM */}
        <div style={columnCardStyle}>
          <h1 style={{ fontSize: "22px", fontWeight: "800", marginBottom: "20px", color: colors.dark }}>BADGE METADATA</h1>
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
            <textarea style={{ ...inputStyle, height: "60px", resize: "none" }} placeholder="Brief description..." onChange={(e) => setFormData({ ...formData, details: e.target.value })} required />
            <label style={labelStyle}>Image Link</label>
            <input style={inputStyle} placeholder="https://..." onChange={(e) => setFormData({ ...formData, imageLink: e.target.value })} required />
            <label style={labelStyle}>Recipient Wallet</label>
            <input style={inputStyle} placeholder="0x..." onChange={(e) => setFormData({ ...formData, recipientWallet: e.target.value })} required />
            <button type="submit" disabled={loading} style={{ width: "100%", padding: "14px", backgroundColor: loading ? "#9ca3af" : colors.elcaRed, color: "white", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer", marginTop: "10px" }}>
              {loading ? "PROCESSING..." : "MINT BADGE"}
            </button>
          </form>
          {status && <div style={{ marginTop: "15px", fontSize: "12px", textAlign: "center", color: colors.elcaRed, fontWeight: "600" }}>{status}</div>}
        </div>

        {/* RIGHT: LIVE PREVIEW */}
        <div style={columnCardStyle}>
          <h1 style={{ fontSize: "22px", fontWeight: "800", marginBottom: "20px", color: colors.dark }}>LIVE PREVIEW</h1>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", border: `1px solid ${colors.border}`, borderRadius: "12px", background: "white", overflow: "hidden" }}>
            
            {badgeUrl ? (
               <img src={badgeUrl} alt="Final Badge" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            ) : (
              <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ width: "100%", height: "200px", backgroundColor: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: `2px solid ${colors.elcaRed}`, overflow: "hidden" }}>
                  {formData.imageLink ? (
                    <img src={formData.imageLink} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                  ) : (
                    <span style={{fontSize: "50px"}}>🖼️</span>
                  )}
                </div>

                <div style={{ padding: "30px", textAlign: "center", display: "flex", flexDirection: "column", flex: 1 }}>
                  <h2 style={{ color: colors.elcaRed, margin: "0", fontSize: "26px", fontWeight: "bold", textTransform: "uppercase" }}>
                    {formData.firstName || "First"} {formData.lastName || "Last"}
                  </h2>
                  <p style={{ fontWeight: "700", color: colors.dark, margin: "15px 0", fontSize: "18px" }}>
                    {formData.mainProject || "Project Name"}
                  </p>
                  <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.5" }}>
                    {formData.details || "Your project details and achievement description will appear here..."}
                  </p>
                  
                  <div style={{ marginTop: "auto", padding: "15px", backgroundColor: "#fafafa", borderRadius: "6px", fontSize: "11px", color: "#888" }}>
                    <strong>VALIDITY:</strong> {formData.startDate && formData.completionDate ? `${formData.startDate} to ${formData.completionDate}` : "Not specified"}
                  </div>
                </div>
              </div>
            )}
          </div>
          <p style={{ textAlign: "center", fontSize: "11px", color: "#999", marginTop: "15px" }}>
            {badgeUrl ? "OFFICIAL NFT GENERATED" : "REAL-TIME DRAFT"}
          </p>
        </div>

      </div>
    </div>
  );
}