import { ethers } from 'ethers';
import { NextResponse } from 'next/server';
import abi from '../../../abi.json';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // 1. Connexion au réseau via tes variables d'environnement
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, wallet);

    // 2. CORRECTION : On utilise les noms exacts envoyés par ton formulaire
    // On prend 'data.recipientWallet' (l'adresse 0x...) 
    // et 'data.imageLink' (l'URL de l'image)
    console.log("Tentative de mint pour :", data.recipientWallet);
    
    const tx = await contract.mintBadge(data.recipientWallet, data.imageLink);

    // 3. On attend que la blockchain confirme la transaction (très important pour la démo)
    const receipt = await tx.wait();
    console.log("Mint réussi ! Hash :", tx.hash);

    return NextResponse.json({ 
      success: true, 
      hash: tx.hash,
      imageUrl: data.imageLink // On renvoie l'image pour l'afficher sur le badge final
    });

  } catch (error) {
    console.error("Erreur Mint API:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}