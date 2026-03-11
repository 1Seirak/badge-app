import { ethers } from 'ethers';
import { NextResponse } from 'next/server';
import abi from '../../../abi.json';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Connexion à la blockchain avec TA clé privée
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, wallet);

    // On lance le mint vers l'adresse du destinataire
    // Note: Adapte le nom de la fonction 'safeMint' si elle s'appelle différemment dans ton contrat Remix
    // On remplace safeMint par mintBadge pour correspondre à ton contrat Remix
// Remplace l'ancienne ligne par celle-ci pour utiliser l'image générée
const tx = await contract.mintBadge(data.wallet, data.generatedImage);

    return NextResponse.json({ success: true, hash: tx.hash });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}