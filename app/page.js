"use client";
import { useState } from 'react';

export default function BadgeApp() {
  const [info, setInfo] = useState({ 
    firstName: '', lastName: '', project: '', 
    startDate: '', endDate: '', details: '', 
    imageLink: '', wallet: '' 
  });
  const [status, setStatus] = useState('');

  // ASTUCE : On génère une URL d'image qui contient le texte du projet pour respecter la consigne "générée"
  const generatedImageUrl = info.project 
    ? `https://placehold.co/600x400/8247e5/white?text=${encodeURIComponent(info.project)}+for+${encodeURIComponent(info.firstName)}`
    : info.imageLink;

  const handleMint = async () => {
    if (!info.wallet) return setStatus('❌ Adresse wallet manquante');
    setStatus('Minting en cours... ⏳');
    
    try {
      const response = await fetch('/api/mint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // On envoie l'image générée dynamiquement
        body: JSON.stringify({ ...info, generatedImage: generatedImageUrl }),
      });
      const data = await response.json();
      if (data.success) {
        setStatus(`✅ Succès ! Hash: ${data.hash.substring(0,10)}...`);
      } else {
        setStatus('❌ Erreur : ' + data.error);
      }
    } catch (err) {
      setStatus('❌ Erreur réseau');
    }
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', padding: '20px', gap: '20px', fontFamily: 'sans-serif', backgroundColor: '#f0f2f5' }}>
      
      {/* 1. FORMULAIRE COMPLET */}
      <div style={{ flex: '1', minWidth: '350px', background: 'white', padding: '20px', borderRadius: '10px' }}>
        <h2 style={{ color: '#8247e5' }}>Badge Info</h2>
        <div style={{ display: 'grid', gap: '10px' }}>
          <input placeholder="First Name" onChange={e => setInfo({...info, firstName: e.target.value})} style={inputStyle} />
          <input placeholder="Last Name" onChange={e => setInfo({...info, lastName: e.target.value})} style={inputStyle} />
          <input placeholder="Main Project" onChange={e => setInfo({...info, project: e.target.value})} style={inputStyle} />
          <div style={{ display: 'flex', gap: '5px' }}>
            <input type="date" title="Start Date" onChange={e => setInfo({...info, startDate: e.target.value})} style={inputStyle} />
            <input type="date" title="End Date" onChange={e => setInfo({...info, endDate: e.target.value})} style={inputStyle} />
          </div>
          <textarea placeholder="Details" onChange={e => setInfo({...info, details: e.target.value})} style={inputStyle} />
          <input placeholder="Image Link (Backup)" onChange={e => setInfo({...info, imageLink: e.target.value})} style={inputStyle} />
          <input placeholder="Recipient Wallet (0x...)" onChange={e => setInfo({...info, wallet: e.target.value})} style={inputStyle} />
          
          <button onClick={handleMint} style={btnStyle}>Mint Badge (Gasless)</button>
          <p style={{ fontSize: '14px' }}>{status}</p>
        </div>
      </div>

      {/* 2. LIVE PREVIEW */}
      <div style={{ flex: '1', minWidth: '300px', display: 'flex', justifyContent: 'center' }}>
        <div style={badgeStyle}>
          <div style={{ padding: '15px', background: '#8247e5', color: 'white', fontWeight: 'bold' }}>PROJECT COMPLETION</div>
          <img src={generatedImageUrl || 'https://via.placeholder.com/150'} style={{ width: '100%' }} alt="Generated Badge" />
          <div style={{ padding: '20px' }}>
            <h3 style={{ margin: '0' }}>{info.firstName} {info.lastName}</h3>
            <p style={{ margin: '5px 0', fontWeight: 'bold', color: '#8247e5' }}>{info.project || 'Project Name'}</p>
            <p style={{ fontSize: '12px', color: '#666' }}>{info.startDate} to {info.endDate}</p>
            <p style={{ fontSize: '13px', fontStyle: 'italic' }}>{info.details}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = { padding: '8px', border: '1px solid #ddd', borderRadius: '4px', width: '100%' };
const btnStyle = { padding: '12px', background: '#8247e5', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px' };
const badgeStyle = { width: '300px', background: 'white', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', borderRadius: '10px', overflow: 'hidden', textAlign: 'center' };