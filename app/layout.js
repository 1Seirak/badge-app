export const metadata = {
  title: 'Badge NFT Generator',
  description: 'Générateur de badges sans frais',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}